// src/data/sectionsData.ts
// CompTIA Security+ SY0-701 domain/topic structure

export interface Lesson {
    id: string;
    title: string;
    estimatedMinutes: number;
}

export interface Topic {
    id: string;
    title: string;
    description: string;
    lessons?: Lesson[];
}

export interface Section {
    id: number;
    title: string;
    description: string;
    weight: number;
    icon: string;
    topics: Topic[];
}

export const SECTIONS_DATA: Section[] = [
    {
        id: 1,
        title: 'General Security Concepts',
        description: 'Foundational security principles, controls, cryptography, and authentication mechanisms that form the basis of all security operations.',
        weight: 12,
        icon: 'shield',
        topics: [
            {
                id: '1.1',
                title: 'Security Controls',
                description: 'Understand preventive, detective, corrective, and compensating controls. Compare technical, administrative, and physical control categories.',
                lessons: [
                    { id: '1.1.1', title: 'Categories of Security Controls', estimatedMinutes: 15 },
                    { id: '1.1.2', title: 'Control Types and Examples', estimatedMinutes: 20 },
                ],
            },
            {
                id: '1.2',
                title: 'Fundamental Security Concepts',
                description: 'CIA Triad (Confidentiality, Integrity, Availability), AAA framework, non-repudiation, and the principle of least privilege.',
                lessons: [
                    { id: '1.2.1', title: 'CIA Triad Deep Dive', estimatedMinutes: 20 },
                    { id: '1.2.2', title: 'Authentication, Authorization, Accounting', estimatedMinutes: 15 },
                    { id: '1.2.3', title: 'Zero Trust Architecture', estimatedMinutes: 25 },
                ],
            },
            {
                id: '1.3',
                title: 'Change Management Processes',
                description: 'Business impact analysis, change advisory boards, rollback plans, testing procedures, and version control.',
                lessons: [
                    { id: '1.3.1', title: 'Change Control Workflow', estimatedMinutes: 15 },
                    { id: '1.3.2', title: 'Impact Analysis Techniques', estimatedMinutes: 20 },
                ],
            },
            {
                id: '1.4',
                title: 'Cryptographic Solutions',
                description: 'PKI, symmetric vs asymmetric encryption, hashing, digital signatures, certificates, and key management practices.',
                lessons: [
                    { id: '1.4.1', title: 'Symmetric vs Asymmetric Encryption', estimatedMinutes: 25 },
                    { id: '1.4.2', title: 'PKI and Certificate Management', estimatedMinutes: 30 },
                    { id: '1.4.3', title: 'Hashing and Digital Signatures', estimatedMinutes: 20 },
                    { id: '1.4.4', title: 'TLS and Secure Protocols', estimatedMinutes: 20 },
                ],
            },
        ],
    },
    {
        id: 2,
        title: 'Threats, Vulnerabilities & Mitigations',
        description: 'Comprehensive coverage of attack types, malware categories, social engineering, application vulnerabilities, and effective mitigation strategies.',
        weight: 22,
        icon: 'bug_report',
        topics: [
            {
                id: '2.1',
                title: 'Threat Intelligence',
                description: 'Threat actors, their motivations and capabilities, APTs, threat intelligence sources (OSINT, ISACs), and the intelligence lifecycle.',
                lessons: [
                    { id: '2.1.1', title: 'Threat Actor Types and Motivations', estimatedMinutes: 20 },
                    { id: '2.1.2', title: 'Threat Intelligence Sources', estimatedMinutes: 15 },
                ],
            },
            {
                id: '2.2',
                title: 'Network-Based Attacks',
                description: 'DDoS, MITM, ARP spoofing, DNS poisoning, session hijacking, and network protocol vulnerabilities.',
                lessons: [
                    { id: '2.2.1', title: 'DoS and DDoS Attacks', estimatedMinutes: 20 },
                    { id: '2.2.2', title: 'Man-in-the-Middle Techniques', estimatedMinutes: 25 },
                    { id: '2.2.3', title: 'Protocol Vulnerabilities', estimatedMinutes: 20 },
                ],
            },
            {
                id: '2.3',
                title: 'Application Vulnerabilities',
                description: 'SQL injection, XSS, CSRF, buffer overflows, path traversal, OWASP Top 10, and secure coding practices.',
                lessons: [
                    { id: '2.3.1', title: 'SQL Injection Attacks', estimatedMinutes: 25 },
                    { id: '2.3.2', title: 'Cross-Site Scripting (XSS)', estimatedMinutes: 20 },
                    { id: '2.3.3', title: 'OWASP Top Ten Overview', estimatedMinutes: 30 },
                ],
            },
            {
                id: '2.4',
                title: 'Social Engineering',
                description: 'Phishing variants, vishing, smishing, pretexting, baiting, and organizational defenses against human-based attacks.',
                lessons: [
                    { id: '2.4.1', title: 'Phishing and Spear Phishing', estimatedMinutes: 20 },
                    { id: '2.4.2', title: 'Other Social Engineering Techniques', estimatedMinutes: 15 },
                ],
            },
            {
                id: '2.5',
                title: 'Vulnerability Scanning',
                description: 'Vulnerability assessment vs penetration testing, CVSS scoring, scanning tools, and remediation prioritization.',
                lessons: [
                    { id: '2.5.1', title: 'CVSS Scoring System', estimatedMinutes: 20 },
                    { id: '2.5.2', title: 'Scanning Tools and Techniques', estimatedMinutes: 25 },
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Security Architecture',
        description: 'Infrastructure design principles, network segmentation, cloud security models, virtualization, and applying Zero Trust across enterprise environments.',
        weight: 18,
        icon: 'account_tree',
        topics: [
            {
                id: '3.1',
                title: 'Architecture Models',
                description: 'On-premises vs cloud vs hybrid, IaaS/PaaS/SaaS responsibilities, serverless, microservices, and the shared responsibility model.',
                lessons: [
                    { id: '3.1.1', title: 'Cloud Service Models', estimatedMinutes: 20 },
                    { id: '3.1.2', title: 'Shared Responsibility Model', estimatedMinutes: 15 },
                ],
            },
            {
                id: '3.2',
                title: 'Security Principles in Infrastructure',
                description: 'Segmentation, DMZ, jump servers, bastion hosts, air gaps, resilience, redundancy, and high availability design.',
                lessons: [
                    { id: '3.2.1', title: 'Network Segmentation and DMZ', estimatedMinutes: 25 },
                    { id: '3.2.2', title: 'High Availability and Redundancy', estimatedMinutes: 20 },
                ],
            },
            {
                id: '3.3',
                title: 'Data Protection',
                description: 'Data classification, data at rest/in-transit/in-use, DLP solutions, backup strategies, and data sovereignty.',
                lessons: [
                    { id: '3.3.1', title: 'Data States and Classification', estimatedMinutes: 15 },
                    { id: '3.3.2', title: 'DLP Technologies', estimatedMinutes: 20 },
                ],
            },
            {
                id: '3.4',
                title: 'Resilience and Recovery',
                description: 'RPO, RTO, MTTR, MTBF, DR planning, backup types (full, incremental, differential), and BC/DR testing.',
                lessons: [
                    { id: '3.4.1', title: 'Business Continuity Planning', estimatedMinutes: 20 },
                    { id: '3.4.2', title: 'Disaster Recovery Strategies', estimatedMinutes: 25 },
                ],
            },
        ],
    },
    {
        id: 4,
        title: 'Security Operations',
        description: 'Day-to-day operational security including monitoring, identity management, endpoint hardening, incident response, and digital forensics.',
        weight: 28,
        icon: 'monitor_heart',
        topics: [
            {
                id: '4.1',
                title: 'Identity and Access Management',
                description: 'MFA, SSO, federation, SAML, OAuth 2.0, RBAC, ABAC, PAM, and identity lifecycle management.',
                lessons: [
                    { id: '4.1.1', title: 'Authentication Methods and MFA', estimatedMinutes: 25 },
                    { id: '4.1.2', title: 'IAM Models (RBAC, ABAC)', estimatedMinutes: 20 },
                    { id: '4.1.3', title: 'Privileged Access Management', estimatedMinutes: 20 },
                ],
            },
            {
                id: '4.2',
                title: 'Endpoint and Application Security',
                description: 'EDR, antivirus, application whitelisting, host-based firewalls, patch management, and hardening baselines.',
                lessons: [
                    { id: '4.2.1', title: 'Endpoint Detection and Response', estimatedMinutes: 25 },
                    { id: '4.2.2', title: 'System Hardening Techniques', estimatedMinutes: 20 },
                ],
            },
            {
                id: '4.3',
                title: 'Vulnerability Management',
                description: 'Vuln scanning, patch management workflows, CVE/NVD databases, CVSS scoring, and remediation tracking.',
                lessons: [
                    { id: '4.3.1', title: 'Vulnerability Lifecycle', estimatedMinutes: 20 },
                    { id: '4.3.2', title: 'Patch Management Processes', estimatedMinutes: 15 },
                ],
            },
            {
                id: '4.4',
                title: 'Network Monitoring',
                description: 'IDS vs IPS, SIEM systems, log analysis, NetFlow, anomaly detection, and threat hunting fundamentals.',
                lessons: [
                    { id: '4.4.1', title: 'SIEM and Log Management', estimatedMinutes: 25 },
                    { id: '4.4.2', title: 'IDS/IPS Technologies', estimatedMinutes: 20 },
                ],
            },
            {
                id: '4.5',
                title: 'Secure Cloud Usage',
                description: 'Cloud security posture management, CASB, container security, serverless security, and cloud access controls.',
                lessons: [
                    { id: '4.5.1', title: 'Cloud Access Security Broker (CASB)', estimatedMinutes: 20 },
                    { id: '4.5.2', title: 'Container and Kubernetes Security', estimatedMinutes: 25 },
                ],
            },
            {
                id: '4.6',
                title: 'Incident Response',
                description: 'PICERL process (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned), tabletop exercises.',
                lessons: [
                    { id: '4.6.1', title: 'The PICERL Framework', estimatedMinutes: 25 },
                    { id: '4.6.2', title: 'Containment and Eradication Strategies', estimatedMinutes: 20 },
                ],
            },
            {
                id: '4.7',
                title: 'Digital Forensics',
                description: 'Evidence preservation, chain of custody, forensic tools, memory analysis, disk imaging, and legal considerations.',
                lessons: [
                    { id: '4.7.1', title: 'Forensic Investigation Process', estimatedMinutes: 20 },
                    { id: '4.7.2', title: 'Chain of Custody and Legal Aspects', estimatedMinutes: 15 },
                ],
            },
        ],
    },
    {
        id: 5,
        title: 'Security Program Management',
        description: 'Governance, risk management, compliance frameworks, data privacy regulations, vendor risk, and security awareness programs.',
        weight: 20,
        icon: 'policy',
        topics: [
            {
                id: '5.1',
                title: 'Governance',
                description: 'Security policies, standards, procedures, guidelines, organizational roles (CISO, DPO), and security program structure.',
                lessons: [
                    { id: '5.1.1', title: 'Security Policy Framework', estimatedMinutes: 20 },
                    { id: '5.1.2', title: 'Organizational Security Roles', estimatedMinutes: 15 },
                ],
            },
            {
                id: '5.2',
                title: 'Risk Management',
                description: 'Risk assessment methodologies, qualitative vs quantitative analysis, ALE, SLE, ARO, risk treatments, and risk registers.',
                lessons: [
                    { id: '5.2.1', title: 'Risk Assessment Methodologies', estimatedMinutes: 25 },
                    { id: '5.2.2', title: 'Quantitative Risk Analysis', estimatedMinutes: 20 },
                ],
            },
            {
                id: '5.3',
                title: 'Compliance and Regulations',
                description: 'GDPR, HIPAA, PCI DSS, FERPA, SOX, compliance audits, and regulatory penalties.',
                lessons: [
                    { id: '5.3.1', title: 'GDPR and Data Privacy', estimatedMinutes: 20 },
                    { id: '5.3.2', title: 'HIPAA and Healthcare Security', estimatedMinutes: 15 },
                    { id: '5.3.3', title: 'PCI DSS Requirements', estimatedMinutes: 20 },
                ],
            },
            {
                id: '5.4',
                title: 'Third-Party Risk Management',
                description: 'Vendor assessments, supply chain risk, SLAs, data processing agreements, and third-party audits.',
                lessons: [
                    { id: '5.4.1', title: 'Supply Chain Risk Management', estimatedMinutes: 20 },
                    { id: '5.4.2', title: 'Vendor Assessment Frameworks', estimatedMinutes: 15 },
                ],
            },
            {
                id: '5.5',
                title: 'Security Awareness Training',
                description: 'Phishing simulations, security culture, training metrics, role-based training, and insider threat awareness.',
                lessons: [
                    { id: '5.5.1', title: 'Building a Security Culture', estimatedMinutes: 20 },
                    { id: '5.5.2', title: 'Phishing Simulation Programs', estimatedMinutes: 15 },
                ],
            },
        ],
    },
];
