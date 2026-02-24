# Lesson: Indicators of Compromise
**Module:** 2.4

## Translating Events to Incidents
An **Indicator of Compromise (IoC)** is a specific piece of forensic data, a system artifact, or a behavioral anomaly that provides high confidence that a network or operating system has been successfully breached by a threat actor. Security analysts constantly monitor for IoCs to transition from maintaining routine security posture to initiating active incident response.

## Critical Indicators of Compromise

### 1. Unusual Account Activity
*   **Unexpected Account Lockouts:** Users discovering their accounts locked out without having entered an incorrect password frequently indicates an attacker is actively initiating brute force or password spraying attacks against the authentication infrastructure.
*   **Impossible Travel:** A login from corporate headquarters in New York at 9:00 AM, followed instantly by a successful login utilizing the exact same credentials originating from an IP address in Moscow at 9:05 AM. Physics dictates the user cannot travel that fast, strongly indicating credential theft.

### 2. Evidence of Malware Evasion
Once attackers establish a foothold, their primary objective is to maintain persistence and evade detection.
*   **Security Service Disruption:** If enterprise antivirus or Endpoint Detection and Response (EDR) agents mysteriously fail, or an organization's centralized patch management system is suddenly blocked from distributing critical updates to specific machines, an attacker may have disabled them to secure their presence.

### 3. Anatomical Network Anomalies
Network traffic patterns provide critical evidence of active malicious operation.
*   **Resource Consumption:** A massive, unexplained spike in outbound bandwidth utilization completely out of normal business hours (e.g., a massive data transfer at 3:00 AM) is a primary indicator that an attacker is actively exfiltrating sensitive organizational data to a remote command server.
*   **Service Unavailability:** If internal servers or applications suddenly crash or become unresponsive without standard administrative cause, an attacker may be aggressively probing the software with exploitation scripts, engineering an accidental or intentional Denial of Service.

### 4. Log Anomalies and Alterations
System logs are the authoritative record of network activity, and attackers aggressively target them.
*   **Out-of-Cycle Logging:** Observing massive configuration changes or application installs occurring outside the tightly governed, pre-approved organizational patch windows.
*   **Log Deletion or Modification:** If an analyst discovers that security logs have been scrubbed clean, entirely deleted, or abruptly stop reporting events on a critical server, it is an absolute indicator that an attacker has gained superuser access and is actively attempting to erase their forensic footprints.

### 5. Data Disclosure
The most publicly devastating IoC does not occur on the internal network at all. The sudden appearance of highly confidential organizational records, user databases, or proprietary source code on public pastebin sites, dark web marketplaces, or ransomware extortion dashboards is the ultimate indicator that a catastrophic breach has already concluded.
