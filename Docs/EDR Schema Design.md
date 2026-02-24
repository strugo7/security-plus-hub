# CyberGuard Academy - EDR (Endpoint Detection & Response) Schema Design

**Date:** February 23, 2026
**Phase:** EDR Module Database Extension
**Stack:** PostgreSQL + Prisma ORM v7.4.1
**Extends:** Core CyberGuard Academy Schema (16 models)

---

## Overview

This document defines the database schema for an **Endpoint Detection & Response (EDR)** module that extends the CyberGuard Academy platform. The EDR module provides a hands-on security operations environment aligned with **Security+ SY0-701 Section 4: Security Operations (28% exam weight)**, covering topics 4.1-4.9 including monitoring, incident response, threat intelligence, and digital forensics.

---

## 1. Architecture Fit

### Integration with Existing Schema

```
Existing User ──┬── EdrEndpoint (agent-managed endpoints)
                ├── EdrAlert (assigned analyst)
                ├── EdrIncident (assigned/created by)
                ├── EdrResponseAction (executed by)
                └── EdrThreatHunt (created by)

EdrEndpoint ── EdrEvent ── EdrAlert ── EdrIncident
                                    ── EdrResponseAction

EdrThreatIntel ── EdrAlert (matched IOC)
EdrPolicy ── EdrAlert (triggered rule)
```

### Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Consistency** | Follows existing conventions: UUID IDs, `@@map()` snake_case, `@updatedAt`, JSONB for flexible data |
| **Bilingual** | `titleHe` / `descriptionHe` columns where applicable |
| **Performance** | GIN indexes on JSONB and array fields, denormalized fields for query-heavy dashboards |
| **Scalability** | Events table designed for high-volume ingestion with partitioning-ready timestamp indexes |
| **JSONB flexibility** | Raw event data, IOC details, forensic artifacts stored as JSONB |

---

## 2. New Enums (7)

| Enum | Values | Purpose |
|------|--------|---------|
| `EndpointOs` | windows, linux, macos, ios, android | Operating system classification |
| `EndpointStatus` | online, offline, isolated, compromised, decommissioned | Current endpoint state |
| `EventSeverity` | informational, low, medium, high, critical | Event/alert severity levels |
| `AlertStatus` | new, triaging, investigating, escalated, resolved, false_positive, suppressed | Alert lifecycle states |
| `IncidentStatus` | detected, confirmed, containment, eradication, recovery, post_incident, closed | IR lifecycle (NIST SP 800-61) |
| `IncidentClassification` | true_positive, false_positive, benign_positive | Post-investigation classification |
| `ResponseActionType` | isolate_host, kill_process, quarantine_file, block_ip, block_domain, disable_account, collect_forensics, run_script, restore_backup, update_policy | Automated/manual response actions |

### Prisma Enum Definitions

```prisma
enum EndpointOs {
  windows
  linux
  macos
  ios
  android
}

enum EndpointStatus {
  online
  offline
  isolated
  compromised
  decommissioned
}

enum EventSeverity {
  informational
  low
  medium
  high
  critical
}

enum AlertStatus {
  new_alert       @map("new")
  triaging
  investigating
  escalated
  resolved
  false_positive  @map("false-positive")
  suppressed
}

enum IncidentStatus {
  detected
  confirmed
  containment
  eradication
  recovery
  post_incident   @map("post-incident")
  closed
}

enum IncidentClassification {
  true_positive   @map("true-positive")
  false_positive  @map("false-positive")
  benign_positive @map("benign-positive")
}

enum ResponseActionType {
  isolate_host       @map("isolate-host")
  kill_process       @map("kill-process")
  quarantine_file    @map("quarantine-file")
  block_ip           @map("block-ip")
  block_domain       @map("block-domain")
  disable_account    @map("disable-account")
  collect_forensics  @map("collect-forensics")
  run_script         @map("run-script")
  restore_backup     @map("restore-backup")
  update_policy      @map("update-policy")
}
```

---

## 3. New Models (10)

### Model Summary

| # | Model | Table Name | Purpose |
|---|-------|------------|---------|
| 17 | **EdrEndpoint** | `edr_endpoints` | Managed endpoints (workstations, servers, mobile devices) with agent info |
| 18 | **EdrEvent** | `edr_events` | Raw telemetry events from endpoint agents (process, file, network, registry) |
| 19 | **EdrPolicy** | `edr_policies` | Detection rules and policies (YARA, Sigma, custom) |
| 20 | **EdrAlert** | `edr_alerts` | Generated alerts when events match detection rules |
| 21 | **EdrIncident** | `edr_incidents` | Escalated security incidents grouping related alerts |
| 22 | **EdrIncidentAlert** | `edr_incident_alerts` | Junction: many-to-many between incidents and alerts |
| 23 | **EdrResponseAction** | `edr_response_actions` | Containment/remediation actions taken on endpoints |
| 24 | **EdrThreatIntel** | `edr_threat_intel` | Threat intelligence indicators (IOCs, TTPs) |
| 25 | **EdrForensicArtifact** | `edr_forensic_artifacts` | Collected forensic evidence (memory dumps, disk images, logs) |
| 26 | **EdrThreatHunt** | `edr_threat_hunts` | Proactive threat hunting queries and results |

---

### 17. EdrEndpoint - Managed Endpoint

Represents a device monitored by the EDR agent.

```prisma
model EdrEndpoint {
  id              String         @id @default(uuid())
  hostname        String         @db.VarChar(255)
  ipAddress       String         @db.VarChar(45)   // IPv4 or IPv6
  macAddress      String?        @db.VarChar(17)
  os              EndpointOs
  osVersion       String         @db.VarChar(100)
  status          EndpointStatus @default(online)
  agentVersion    String         @db.VarChar(20)
  agentId         String         @unique @db.VarChar(64)
  lastHeartbeat   DateTime?
  tags            String[]       @default([])
  metadata        Json?          // { department, location, owner, domain, ou }
  enrolledBy      String         // User ID of admin who enrolled
  enrolledAt      DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  // Relations
  enrolledByUser  User                @relation(fields: [enrolledBy], references: [id])
  events          EdrEvent[]
  alerts          EdrAlert[]
  responseActions EdrResponseAction[]
  forensicArtifacts EdrForensicArtifact[]

  @@index([status])
  @@index([os])
  @@index([lastHeartbeat])
  @@index([tags], type: Gin)
  @@map("edr_endpoints")
}
```

**Key fields:**
- `agentId` - Unique agent identifier installed on the endpoint
- `lastHeartbeat` - Tracks agent connectivity; stale = potential compromise
- `metadata` (JSONB) - Flexible org context (department, location, AD OU)

---

### 18. EdrEvent - Telemetry Event

High-volume raw telemetry ingested from endpoint agents.

```prisma
model EdrEvent {
  id          String        @id @default(uuid())
  endpointId  String
  eventType   String        @db.VarChar(50)  // "process_create", "file_write", "network_connect", "registry_modify", "dns_query", "auth_attempt"
  severity    EventSeverity @default(informational)
  timestamp   DateTime      @default(now())
  processName String?       @db.VarChar(255)
  processId   Int?
  parentPid   Int?
  commandLine String?
  filePath    String?       @db.VarChar(1000)
  fileHash    String?       @db.VarChar(128) // SHA-256
  srcIp       String?       @db.VarChar(45)
  srcPort     Int?
  dstIp       String?       @db.VarChar(45)
  dstPort     Int?
  protocol    String?       @db.VarChar(10)
  userName    String?       @db.VarChar(100)
  rawData     Json          // Full event payload from agent
  tags        String[]      @default([])

  // Relations
  endpoint EdrEndpoint @relation(fields: [endpointId], references: [id])
  alerts   EdrAlert[]

  @@index([endpointId])
  @@index([eventType])
  @@index([severity])
  @@index([timestamp])
  @@index([fileHash])
  @@index([srcIp])
  @@index([dstIp])
  @@index([userName])
  @@index([tags], type: Gin)
  @@map("edr_events")
}
```

**Key fields:**
- `eventType` - Categorizes telemetry (process, file, network, registry, DNS, auth)
- `commandLine` - Full command for process events (critical for detection)
- `rawData` (JSONB) - Complete event payload for forensic analysis
- Heavy indexing on timestamp, IPs, hashes for fast correlation queries

---

### 19. EdrPolicy - Detection Rule

Detection rules that generate alerts when events match conditions.

```prisma
model EdrPolicy {
  id            String   @id @default(uuid())
  name          String   @db.VarChar(200)
  nameHe        String?  @db.VarChar(200)
  description   String
  descriptionHe String?
  ruleType      String   @db.VarChar(30)  // "sigma", "yara", "custom", "behavioral", "ml"
  ruleContent   Json     // Rule definition: { conditions, logic, query }
  severity      EventSeverity @default(medium)
  mitreAttackId String[] @default([])     // ["T1059.001", "T1055"]
  mitreTactic   String[] @default([])     // ["execution", "defense-evasion"]
  isEnabled     Boolean  @default(true)
  falsePositiveRate Decimal? @db.Decimal(5, 2)
  tags          String[] @default([])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  alerts EdrAlert[]

  @@index([ruleType])
  @@index([severity])
  @@index([isEnabled])
  @@index([mitreAttackId], type: Gin)
  @@index([mitreTactic], type: Gin)
  @@index([tags], type: Gin)
  @@map("edr_policies")
}
```

**Key fields:**
- `ruleContent` (JSONB) - Flexible rule definition supporting Sigma, YARA, behavioral, and ML-based detection
- `mitreAttackId` / `mitreTactic` - Maps to MITRE ATT&CK framework (Security+ 4.3)
- `falsePositiveRate` - Tracks rule quality for tuning

---

### 20. EdrAlert - Security Alert

Generated when an event matches a detection policy.

```prisma
model EdrAlert {
  id            String        @id @default(uuid())
  endpointId    String
  eventId       String?
  policyId      String?
  threatIntelId String?       // If triggered by IOC match
  title         String        @db.VarChar(300)
  description   String
  severity      EventSeverity
  status        AlertStatus   @default(new_alert)
  assignedTo    String?       // User ID of assigned analyst
  attackTechnique String?     @db.VarChar(100) // MITRE ATT&CK technique
  killChainPhase  String?     @db.VarChar(50)  // reconnaissance, weaponization, delivery, exploitation, installation, c2, actions
  evidence      Json          // { matchedIndicators, contextEvents[], screenshots }
  notes         String?
  resolvedAt    DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  // Relations
  endpoint    EdrEndpoint     @relation(fields: [endpointId], references: [id])
  event       EdrEvent?       @relation(fields: [eventId], references: [id])
  policy      EdrPolicy?      @relation(fields: [policyId], references: [id])
  threatIntel EdrThreatIntel? @relation(fields: [threatIntelId], references: [id])
  analyst     User?           @relation("AlertAnalyst", fields: [assignedTo], references: [id])
  incidentAlerts EdrIncidentAlert[]
  responseActions EdrResponseAction[]

  @@index([endpointId])
  @@index([severity])
  @@index([status])
  @@index([assignedTo])
  @@index([createdAt])
  @@index([attackTechnique])
  @@index([killChainPhase])
  @@map("edr_alerts")
}
```

**Key fields:**
- `killChainPhase` - Lockheed Martin Cyber Kill Chain mapping (Security+ 2.2)
- `attackTechnique` - MITRE ATT&CK technique ID
- `evidence` (JSONB) - Collected context for analyst investigation
- Full lifecycle tracking: new -> triaging -> investigating -> resolved/false_positive

---

### 21. EdrIncident - Security Incident

Escalated incidents grouping correlated alerts, following NIST SP 800-61 lifecycle.

```prisma
model EdrIncident {
  id              String                @id @default(uuid())
  title           String                @db.VarChar(300)
  description     String
  severity        EventSeverity
  status          IncidentStatus        @default(detected)
  classification  IncidentClassification?
  assignedTo      String?               // Lead analyst
  createdBy       String                // User who created/escalated
  attackVector    String?               @db.VarChar(100) // "phishing", "exploit", "insider"
  affectedAssets  Json?                 // [{ endpointId, hostname, role }]
  timeline        Json?                 // [{ timestamp, action, actor, details }]
  rootCause       String?
  impact          String?               // Business impact description
  lessonsLearned  String?               // Post-incident review
  containedAt     DateTime?
  eradicatedAt    DateTime?
  recoveredAt     DateTime?
  closedAt        DateTime?
  createdAt       DateTime              @default(now())
  updatedAt       DateTime              @updatedAt

  // Relations
  assignedUser    User?                 @relation("IncidentAnalyst", fields: [assignedTo], references: [id])
  creator         User                  @relation("IncidentCreator", fields: [createdBy], references: [id])
  incidentAlerts  EdrIncidentAlert[]
  responseActions EdrResponseAction[]
  forensicArtifacts EdrForensicArtifact[]

  @@index([severity])
  @@index([status])
  @@index([assignedTo])
  @@index([createdAt])
  @@index([classification])
  @@map("edr_incidents")
}
```

**Key fields:**
- `status` - Follows NIST incident response lifecycle: detected -> confirmed -> containment -> eradication -> recovery -> post_incident -> closed
- `timeline` (JSONB) - Chronological incident history for post-mortem
- `lessonsLearned` - Post-incident review (Security+ 4.8)
- Timestamps for each IR phase enable SLA/metrics tracking

---

### 22. EdrIncidentAlert - Incident-Alert Junction

Many-to-many relationship between incidents and alerts.

```prisma
model EdrIncidentAlert {
  id         String   @id @default(uuid())
  incidentId String
  alertId    String
  addedAt    DateTime @default(now())

  // Relations
  incident EdrIncident @relation(fields: [incidentId], references: [id], onDelete: Cascade)
  alert    EdrAlert    @relation(fields: [alertId], references: [id])

  @@unique([incidentId, alertId])
  @@index([incidentId])
  @@index([alertId])
  @@map("edr_incident_alerts")
}
```

---

### 23. EdrResponseAction - Response/Remediation Action

Containment and remediation actions executed on endpoints.

```prisma
model EdrResponseAction {
  id          String             @id @default(uuid())
  alertId     String?
  incidentId  String?
  endpointId  String
  actionType  ResponseActionType
  description String
  parameters  Json?              // { pid, filePath, ipAddress, scriptContent, ... }
  isAutomatic Boolean            @default(false)
  executedBy  String             // User or "system" for automated
  status      String             @default("pending") @db.VarChar(20)  // pending, running, completed, failed, rolled_back
  result      Json?              // { success, output, errorMessage, duration }
  executedAt  DateTime           @default(now())
  completedAt DateTime?
  rolledBackAt DateTime?

  // Relations
  alert    EdrAlert?    @relation(fields: [alertId], references: [id])
  incident EdrIncident? @relation(fields: [incidentId], references: [id])
  endpoint EdrEndpoint  @relation(fields: [endpointId], references: [id])
  executor User         @relation(fields: [executedBy], references: [id])

  @@index([alertId])
  @@index([incidentId])
  @@index([endpointId])
  @@index([actionType])
  @@index([status])
  @@index([executedAt])
  @@map("edr_response_actions")
}
```

**Key fields:**
- `actionType` - Specific response capability (isolate, kill, quarantine, block, etc.)
- `isAutomatic` - Distinguishes automated SOAR actions from manual analyst actions
- `rolledBackAt` - Supports action reversal (un-isolate host, unblock IP)

---

### 24. EdrThreatIntel - Threat Intelligence (IOCs)

Indicators of Compromise and threat intelligence feeds.

```prisma
model EdrThreatIntel {
  id            String        @id @default(uuid())
  indicatorType String        @db.VarChar(30)  // "ip", "domain", "hash_md5", "hash_sha256", "url", "email", "cve", "mutex"
  indicatorValue String       @db.VarChar(500)
  threatName    String?       @db.VarChar(200)  // "Cobalt Strike", "Emotet", "APT29"
  threatType    String?       @db.VarChar(50)   // "malware", "apt", "ransomware", "c2", "phishing"
  confidence    Int           @default(50)       // 0-100 confidence score
  severity      EventSeverity @default(medium)
  source        String        @db.VarChar(100)   // "MISP", "AlienVault OTX", "VirusTotal", "internal"
  mitreAttackId String[]      @default([])
  context       Json?         // { campaign, reportUrl, firstSeen, lastSeen, relatedIndicators }
  isActive      Boolean       @default(true)
  expiresAt     DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  // Relations
  alerts EdrAlert[]

  @@unique([indicatorType, indicatorValue])
  @@index([indicatorType])
  @@index([indicatorValue])
  @@index([threatName])
  @@index([isActive])
  @@index([severity])
  @@index([expiresAt])
  @@index([mitreAttackId], type: Gin)
  @@map("edr_threat_intel")
}
```

**Key fields:**
- `indicatorType` / `indicatorValue` - IOC key-value pair (IP, hash, domain, CVE)
- `confidence` - Scoring for prioritization (0-100)
- `source` - Attribution to intel feed for provenance
- `expiresAt` - TTL for time-sensitive indicators

---

### 25. EdrForensicArtifact - Digital Forensics Evidence

Collected forensic evidence tied to incidents.

```prisma
model EdrForensicArtifact {
  id           String   @id @default(uuid())
  incidentId   String
  endpointId   String
  artifactType String   @db.VarChar(50) // "memory_dump", "disk_image", "pcap", "event_log", "registry_hive", "browser_history", "prefetch"
  fileName     String   @db.VarChar(255)
  fileSize     BigInt                    // Bytes
  fileHash     String   @db.VarChar(128) // SHA-256 for integrity
  storagePath  String   @db.VarChar(500) // S3/local path
  chainOfCustody Json   // [{ timestamp, action, actor, notes }]
  analysisNotes String?
  metadata     Json?    // { tool, volatilityProfile, timeRange, ... }
  collectedBy  String   // User ID
  collectedAt  DateTime @default(now())

  // Relations
  incident  EdrIncident @relation(fields: [incidentId], references: [id])
  endpoint  EdrEndpoint @relation(fields: [endpointId], references: [id])
  collector User        @relation(fields: [collectedBy], references: [id])

  @@index([incidentId])
  @@index([endpointId])
  @@index([artifactType])
  @@index([collectedAt])
  @@map("edr_forensic_artifacts")
}
```

**Key fields:**
- `chainOfCustody` (JSONB) - Maintains evidence integrity chain (Security+ 4.9)
- `fileHash` - SHA-256 for evidence integrity verification
- `artifactType` - Categorizes evidence for forensic workflows

---

### 26. EdrThreatHunt - Proactive Threat Hunting

Proactive hypothesis-driven threat hunting queries and results.

```prisma
model EdrThreatHunt {
  id          String   @id @default(uuid())
  title       String   @db.VarChar(200)
  hypothesis  String   // "APT group X may have established persistence via scheduled tasks"
  query       String   // KQL/SQL query used for hunting
  queryType   String   @db.VarChar(20) // "kql", "sql", "sigma", "custom"
  mitreAttackId String[] @default([])
  status      String   @default("draft") @db.VarChar(20) // draft, running, completed, archived
  findings    Json?    // [{ description, severity, endpointIds, evidence }]
  resultCount Int      @default(0)
  createdBy   String
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  hunter User @relation(fields: [createdBy], references: [id])

  @@index([status])
  @@index([createdBy])
  @@index([createdAt])
  @@index([mitreAttackId], type: Gin)
  @@map("edr_threat_hunts")
}
```

**Key fields:**
- `hypothesis` - Structured hunting methodology
- `query` - Actual search query for reproducibility
- `findings` (JSONB) - Discovered threats with supporting evidence

---

## 4. Updated Entity-Relationship Diagram

```
                          ┌─────────────────────────────────────────────────────────────┐
                          │                    EXISTING MODELS                           │
                          │  User ── TopicProgress, QuizResult, FlashcardProgress, etc. │
                          └────────────────────────┬────────────────────────────────────┘
                                                   │
            ┌──────────────────────┬───────────────┼───────────────┬──────────────────┐
            │                      │               │               │                  │
            v                      v               v               v                  v
    ┌──────────────┐    ┌─────────────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────────┐
    │ EdrEndpoint  │    │ EdrThreatHunt   │  │ EdrAlert │  │ EdrIncident  │  │ EdrResponse  │
    │              │    │                 │  │          │  │              │  │   Action     │
    │ hostname     │    │ hypothesis      │  │ assigned │  │ assignedTo   │  │ executedBy   │
    │ agentId      │    │ query           │  │ To       │  │ createdBy    │  │              │
    │ enrolledBy ──┼────│ createdBy ──────┼──│──────────┼──│──────────────┼──│──────────────┘
    └──────┬───────┘    └─────────────────┘  └─────┬────┘  └──────┬───────┘
           │                                       │              │
           v                                       │              │
    ┌──────────────┐         ┌─────────────┐       │              │
    │  EdrEvent    │────────>│  EdrPolicy  │───────┘              │
    │              │         │             │                       │
    │ process/file │         │ Sigma/YARA  │  ┌───────────────┐   │
    │ network/reg  │         │ rules       │  │ EdrIncident   │<──┘
    │ rawData(JSON)│         └─────────────┘  │    Alert      │
    └──────────────┘                          │ (junction M:M)│
                                              └───────────────┘
    ┌──────────────────┐     ┌─────────────────────┐
    │ EdrThreatIntel   │     │ EdrForensicArtifact │
    │                  │     │                     │
    │ IOCs (IP, hash,  │     │ memory dumps, pcap  │
    │ domain, CVE)     │     │ chain of custody    │
    │ confidence score │     │ SHA-256 integrity   │
    └──────────────────┘     └─────────────────────┘
```

---

## 5. Security+ SY0-701 Topic Mapping

The EDR schema directly supports hands-on learning for these exam objectives:

| Topic | Title | EDR Models Used |
|-------|-------|-----------------|
| **4.1** | Security monitoring & alerting | EdrEvent, EdrAlert, EdrPolicy |
| **4.2** | Incident response activities | EdrIncident, EdrResponseAction, EdrForensicArtifact |
| **4.3** | Threat intelligence & hunting | EdrThreatIntel, EdrThreatHunt, EdrPolicy (MITRE mapping) |
| **4.4** | Vulnerability management | EdrThreatIntel (CVE indicators), EdrEndpoint (asset inventory) |
| **4.5** | Alerting & monitoring concepts | EdrAlert (triage, false positives), EdrPolicy (tuning) |
| **4.6** | Automation & orchestration | EdrResponseAction (SOAR - `isAutomatic` flag) |
| **4.8** | Incident investigation | EdrForensicArtifact (chain of custody, digital forensics) |
| **4.9** | Log management | EdrEvent (centralized telemetry), rawData JSONB |
| **2.2** | Threat landscape | EdrThreatIntel (APTs, malware), Kill Chain mapping on alerts |
| **2.4** | Attack techniques | EdrPolicy & EdrAlert (MITRE ATT&CK technique IDs) |

---

## 6. Required User Model Relation Updates

The following relation fields must be added to the existing `User` model:

```prisma
// Add to existing User model:
  enrolledEndpoints    EdrEndpoint[]
  assignedAlerts       EdrAlert[]          @relation("AlertAnalyst")
  assignedIncidents    EdrIncident[]       @relation("IncidentAnalyst")
  createdIncidents     EdrIncident[]       @relation("IncidentCreator")
  responseActions      EdrResponseAction[]
  forensicArtifacts    EdrForensicArtifact[]
  threatHunts          EdrThreatHunt[]
```

---

## 7. Index Strategy

### High-Volume Table: `edr_events`

| Index | Purpose |
|-------|---------|
| `endpointId` | Filter events per endpoint |
| `eventType` | Filter by telemetry category |
| `severity` | Dashboard severity filtering |
| `timestamp` | Time-range queries, partitioning key |
| `fileHash` | IOC hash correlation |
| `srcIp` / `dstIp` | Network threat hunting |
| `userName` | User behavior analytics |
| `tags` (GIN) | Flexible tagging queries |

### Recommended PostgreSQL Partitioning

```sql
-- Partition edr_events by month for performance at scale
CREATE TABLE edr_events (
  ...
) PARTITION BY RANGE (timestamp);

CREATE TABLE edr_events_2026_01 PARTITION OF edr_events
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE edr_events_2026_02 PARTITION OF edr_events
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
-- Continue monthly...
```

---

## 8. Schema Statistics

| Metric | Value |
|--------|-------|
| **New models** | 10 |
| **New enums** | 7 |
| **Total models (with existing)** | 26 |
| **Total enums (with existing)** | 13 |
| **JSONB fields** | 11 (rawData, ruleContent, evidence, affectedAssets, timeline, parameters, result, context, chainOfCustody, metadata, findings) |
| **GIN indexes** | 7 (tags on events/policies/endpoints, mitreAttackId, mitreTactic on policies/hunts/intel) |
| **User model new relations** | 7 |

---

## 9. Sample Queries (Conceptual)

### Active Critical Alerts with Endpoint Context
```sql
SELECT a.*, e.hostname, e.ip_address, e.os
FROM edr_alerts a
JOIN edr_endpoints e ON a.endpoint_id = e.id
WHERE a.severity = 'critical'
  AND a.status IN ('new', 'triaging', 'investigating')
ORDER BY a.created_at DESC;
```

### MITRE ATT&CK Coverage Heatmap
```sql
SELECT unnest(mitre_attack_id) AS technique,
       COUNT(*) AS detection_count,
       unnest(mitre_tactic) AS tactic
FROM edr_policies
WHERE is_enabled = true
GROUP BY technique, tactic
ORDER BY detection_count DESC;
```

### Incident Response Timeline
```sql
SELECT i.title, i.status,
       i.created_at AS detected,
       i.contained_at,
       i.eradicated_at,
       i.recovered_at,
       i.closed_at,
       EXTRACT(EPOCH FROM (i.contained_at - i.created_at))/60 AS mttr_minutes
FROM edr_incidents i
WHERE i.status != 'closed'
ORDER BY i.severity DESC, i.created_at ASC;
```

### IOC Match Correlation
```sql
SELECT ti.indicator_type, ti.indicator_value, ti.threat_name,
       COUNT(a.id) AS alert_count,
       array_agg(DISTINCT e.hostname) AS affected_hosts
FROM edr_threat_intel ti
JOIN edr_alerts a ON a.threat_intel_id = ti.id
JOIN edr_endpoints e ON a.endpoint_id = e.id
WHERE ti.is_active = true
GROUP BY ti.id
ORDER BY alert_count DESC;
```

---

## 10. Next Steps

1. **Add EDR models to `prisma/schema.prisma`** - Append the 10 models and 7 enums
2. **Update User model** - Add the 7 new relation fields
3. **Run migration** - `npm run db:migrate` to create EDR tables
4. **Seed EDR data** - Sample endpoints, policies (Sigma rules), and threat intel IOCs
5. **Build EDR API endpoints** - CRUD + specialized queries (alert triage, incident escalation)
6. **Build EDR Dashboard** - Real-time alert feed, MITRE heatmap, incident timeline
7. **Integrate with Simulations** - Link `SimulationType` attacks to generate EDR events/alerts
