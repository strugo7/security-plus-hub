# Lesson: Penetration Tests
**Module:** 5.5

## Beyond Vulnerability Scanning
While a vulnerability scanner passively safely identifies potential weaknesses, **Penetration Testing (Pen Testing)** executes aggressive, active exploitation of those specific vulnerabilities to fundamentally prove the massive risk they present.

Penetration testing is not exclusively digital. **Physical Penetration Testing** involves heavily credentialed specialists attempting to physically breach a corporate facility—picking locks, tailgating employees, or bypassing electronic badge readers. If an attacker gains physical access to a server, digital security software is entirely irrelevant; they can violently reboot the system from external media and immediately extract all encrypted data.

## Red Team vs. Blue Team
Penetration tests are complex, highly structured simulated war games.
*   **Red Team (Offense):** The dedicated group of elite security personnel actively attempting to aggressively breach the systems, exploit the profound vulnerabilities, and simultaneously deeply conceal their movements from detection.
*   **Blue Team (Defense):** The organization's internal security team completely unaware of the precise attack timing. They must actively detect the Red Team's subtle intrusions in real-time, aggressively block the attacks, and rapidly patch the exploited vulnerabilities.
*   *(Note: A "Purple Team" is a collaborative exercise where the Red and Blue teams aggressively share real-time feedback to massively optimize the organization's defenses).*

## Penetration Test Perspectives (Environments)
Before the attack commences, the organization heavily defines precisely how much information the attackers are provided.
*   **Known Environment (White Box):** The attackers are provided full, unyielding disclosure of the colossal internal infrastructure—complete network maps, full routing tables, and explicit server configurations. This intensely maximizes the tester's efficiency.
*   **Partially Known Environment (Gray Box):** The attackers are provided a limited subset of data (e.g., only the IP addresses of the specific database cluster). This intensely focuses the attack on a highly specific target.
*   **Unknown Environment (Black Box / Blind Test):** The attackers are provided absolutely zero internal intelligence. They must aggressively simulate a true, external hacker, painstakingly mapping the massive network from scratch.

## Reconnaissance
Before a single aggressive packet is explicitly fired, the Red Team executes sweeping **Reconnaissance** to systematically gather massive intelligence.

**Passive Reconnaissance:**
Gathering intelligence *without* ever directly aggressively touching the target's network. The intense goal is absolute stealth.
*   *Techniques:* Exhaustively analyzing corporate social media, aggressively scouring public Reddit forums for employee complaints regarding server software, dumpster diving for discarded network diagrams, and executing complex Social Engineering campaigns against third-party vendors.

**Active Reconnaissance:**
Aggressively querying the target's actual devices. This is highly visible and will absolutely trigger massive firewall alerts and SIEM log entries.
*   *Techniques:* Executing aggressive Ping Scans across entire /16 subnets, running vicious Port Scans, actively querying corporate DNS servers, and performing Operating System Fingerprinting to exactly identify the specific version of Linux the core router is executing.
