# Lesson: Mitigation Techniques
**Module:** 2.5

## The Concept of Mitigation
**Mitigation** refers to the proactive and reactive processes implemented to reduce the likelihood of a cyberattack succeeding, and critically, minimizing the severity of the operational or financial impact if an attack does occur.

## Patch Management
Patching is arguably the most critical preventative mitigation strategy. By perpetually maintaining software, operating systems, and firmware to their most modern versions, organizations completely eliminate the known, publicly documented vulnerabilities that attackers rely on. 
*   **Enterprise Patching:** Unlike home computers, enterprise IT departments do not set their massive fleets of servers to auto-update. Patches are rigorously tested in isolated staging environments prior to production rollout to ensure they do not accidentally cause system instability or application failures.

## Data Encryption Options
If an attacker successfully breaches the network boundary and accesses sensitive data, encryption acts as the final mitigation line, ensuring the attacker cannot read or utilize the stolen files.
*   **File-Level Encryption:** Capabilities built directly into modern operating systems (like the native Windows Encrypting File System - EFS) allow explicit encryption of highly compartmentalized individual files or folders.
*   **Full Disk Encryption (FDE):** Software natively built into operating systems (such as Windows BitLocker or macOS FileVault) encrypts the entire physical storage volume natively. If an enterprise laptop is stolen from an employee's vehicle, FDE ensures the attacker cannot extract sensitive data from the hard drive. 
*   **Database/Application Encryption:** Many modern applications process and encrypt data fundamentally within the application layer itself, providing a secondary protection layer independent from the underlying hardware or OS parameters.

## Comprehensive Monitoring and the SIEM
To successfully manage a modern enterprise, administrators must centralize and aggressively monitor thousands of disparate devices.
*   **The SIEM:** A **Security Information and Event Management (SIEM)** server acts as the central intake hub. Thousands of routers, switches, firewalls, and Windows servers continuously forward their raw system logs centrally to the SIEM.
*   **Threat Hunting:** The SIEM parses, correlates, and analyzes millions of log lines instantly, triggering automated alerts if it detects patterns indicative of a breach.

## Principles of User Management
*   **Least Privilege:** Users are granted the absolute minimum operational access and permissions necessary to execute their specific job function, and absolutely nothing more. If an attacker compromises a standard user's account, Least Privilege ensures they do not automatically inherit administrative domain rights.
*   **Temporary Elevation:** Administrators execute their standard daily tasks utilizing standard, non-privileged user accounts. They only utilize "Run As Administrator" logic when specifically necessitated, severely compressing the window of exposure.

## Network Access Control and Posture Assessment
*   **Posture Assessment:** When a device attempts to join the secure network, an automated verification process checks its health posture. Does it have the absolute newest antivirus definitions? Is its firewall enabled? Is the operating system fully patched?
*   **VLAN Quarantining:** If a device fails the posture assessment by lacking critical security updates, the network explicitly denies it entry to the production environment. Instead, it places the device into a highly restricted, isolated Quarantine VLAN engineered solely to force the device to update its software. Only after successfully updating is the device granted access to the production network.
