# Lesson: Endpoint Security
**Module:** 4.5

## The Endpoint as a Vector
Securing the network edge with massive firewalls is critical, but attackers know that penetrating the edge is difficult. It is significantly easier to attack the soft target: the **Endpoint** (the employee's laptop or mobile device). Employees travel, connect to insecure hotel Wi-Fi networks, click phishing links, and unknowingly download malware. The endpoint must be aggressively defended.

## Posture Assessments and Network Access Control (NAC)
A massive enterprise cannot manually inspect every laptop before permitting it to attach to the internal corporate Wi-Fi. They utilize a system to automatically execute a **Posture Assessment**.
*   **The Concept:** Before a device is granted full access to the production network, it is placed in a heavily restricted quarantine VLAN. A posture assessment rapidly interrogates the device: Is the operating system fully patched? Is the antivirus software running with current definitions? Is the hard drive fully encrypted?
*   **The Enforcement:** If the device wildly fails the assessment (e.g., the antivirus contains signatures from two years ago), the NAC system blocks the device entirely. It often provides a limited "remediation" connection, allowing the user to download the required updates, pass the assessment, and ultimately gain production access.

### Types of NAC Agents
Executing the assessment requires software running on the endpoint.
1.  **Persistent Agent:** A heavy software application permanently installed on the laptop. It constantly analyzes the system 24/7, even when completely disconnected from the corporate network.
2.  **Dissolvable Agent:** Used for guest or contractor devices where permanent installation is forbidden. When the user attempts to connect, a tiny application dynamically downloads, executes the rapid health check entirely in memory, immediately reports the results, and cleanly deletes itself from the system.
3.  **Agentless NAC:** The system requires no local software at all. It relies entirely on pulling diagnostic data from centralized databases like Microsoft Active Directory precisely during the moment of user login.

## Endpoint Detection and Response (EDR)
Legacy antivirus relies overwhelmingly on static signatures. If a devastating zero-day virus lacks an existing signature, ancient antivirus completely ignores it. **EDR** represents a total paradigm shift.
*   **Behavioral Analysis:** EDR does not rely simply on signatures. It utilizes aggressive machine learning and deep behavioral analysis. It monitors system processes continuously. If an unknown application suddenly attempts to rapidly encrypt 10,000 PDF documents (classic ransomware behavior), EDR instantly recognizes the malicious pattern.
*   **The Response:** The "Response" in EDR is crucial. Upon detecting the anomaly, EDR can automatically, without human intervention, violently kill the running process, electronically sever the endpoint completely from the network (to prevent lateral spread), and instantly quarantine the malicious file.
*   **Root Cause Analysis:** EDR provides detailed telemetry. It permits the security engineer to mathematically track the entire infection chain (e.g., determining the malware originated from a maliciously crafted PDF sent by a specific email address).

## Extended Detection and Response (XDR)
**XDR** takes the massive capabilities of EDR and radically expands the scope beyond the isolated endpoint.
*   **The Correlation Engine:** EDR only knows what happens on *one* specific laptop. XDR continuously aggregates telemetry from 5,000 EDR agents, the core network firewalls, the cloud email gateway, and the domain controllers simultaneously.
*   **The Advantage:** By correlating multi-vector data, XDR catches sophisticated attacks that EDR misses. XDR can see the phishing email hitting the Gateway, track the user clicking the link on the Endpoint, and correlate it directly to the immediate, bizarre outbound network connection blocked by the Firewall, providing an overarching, omniscient view of the entire attack campaign.

## User Behavior Analytics (UBA)
XDR heavily leverages UBA. To identify abnormal behavior, the system must first intimately understand "normal."
*   **Establishing the Baseline:** UBA machine learning algorithms quietly observe an employee for weeks. They establish a baseline: "John from Accounting logs in rigidly between 8:00 AM and 5:00 PM, entirely from a Chicago IP address, and primarily accesses financial spreadsheets."
*   **Detecting Anomalies:** If "John's" account suddenly logs in at 3:00 AM from a hostile nation-state IP address and begins aggressively running rapid database extraction queries against the entire engineering repository, UBA instantly flags the massive deviation from the baseline and violently triggers an alert, realizing the account is almost certainly compromised.
