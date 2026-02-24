# Lesson: Hardening Techniques
**Module:** 2.5

## Introduction to Hardening
**Hardening** is the systematic process of securing a system by comprehensively reducing its attack surface. This involves methodically eliminating non-essential software, locking down configurations, and strictly adhering to the principle of least privilege.

## Operating System Hardening
An operating system out of the box is geared toward ease of use, not necessarily maximum security. Hardening it involves strict configuration:
*   **Routine Updates:** Ensure an automated patch management schedule exists to rapidly implement critical OS and security updates.
*   **Enforce Password Complexity:** System policy must algorithmically enforce minimum password length (e.g., 14 characters) and mandate combinations of uppercase, lowercase, numerical, and special characters. 
*   **Access Limitations:** Disable unnecessary default accounts (like 'Guest') out of the box. Implement strict firewall rules limiting Management protocol access (like SSH or RDP) strictly to the IT subnet range.
*   **Endpoint Integration:** Deploy advanced Anti-Virus and continuous monitoring software. 
*   **Data Encryption:** Encrypt the entire underlying system using Full Disk Encryption (FDE), and implement VPN requirements for any remote administrative communication.

## Endpoint Detection and Response (EDR)
The modern threat landscape generates over a million new malware variants daily, rendering signature-based antivirus obsolete. **Endpoint Detection and Response (EDR)** provides behavioral, next-generation security.
*   **Behavioral Diagnostics:** EDR does not rely exclusively on recognizing explicitly known bad files. It monitors user and system behavior. If a standard application like Microsoft Word suddenly attempts to launch Powershell and alter critical OS registry keys, EDR immediately recognizes the behavioral anomaly as malicious.
*   **Root-Cause Analysis:** Upon detecting a threat, the EDR aggressively maps its execution trajectory. How did the file arrive? What network connections did it attempt to span?
*   **Automated Response:** The fundamental differentiator is "Response". EDR acts autonomously to contain a recognized threat—immediately quarantining the compromised machine by entirely severing its network adapter to prevent lateral movement, while sending alerts to the SIEM.

## Host-Based Network Security
Security must operate concurrently at the network perimeter and directly on the workstation. 
*   **Host-Based Firewalls:** A native OS firewall dictates exactly which ports and applications are permitted to send or receive data on the specific hardware device, halting unauthorized remote connection attempts even if the perimeter firewall was breached.
*   **Host-Based Intrusion Prevention System (HIPS):** While similar to an EDR, a HIPS acts specifically to preemptively halt known local execution vectors, actively preventing buffer overflows or unauthorized memory injections before they corrupt the running OS state.

## Advanced Configuration Controls
Hardware components and embedded appliances ship fully functional out of the box, necessitating immediate review of their default parameters.
*   **Default Credentials:** Before any device (router, IoT thermostat, switch) touches an active deployment network, the administrator must log in and change the manufacturer’s initial default administrative password, ensuring it never hits production with common internet credentials intact.
*   **Port Utilization Scanning:** Systems frequently run multiple legacy services unnecessarily. Every active network port correlates exactly to an open listening application. Administrators employ tools like network mapper (`nmap`) to scan a system, documenting its active listening ports, and aggressively disabling or blocking any network ports that are not critical to the device's business function.
*   **Software Minimization:** The easiest vulnerability to patch is an application that has simply been uninstalled. Removing unnecessary bloatware applications from the system permanently eliminates entire vectors of attack.
