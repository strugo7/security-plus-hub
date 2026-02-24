# Lesson: Misconfiguration Vulnerabilities
**Module:** 2.3

## The Threat of Misconfiguration
Some of the most common and devastating vulnerabilities in cybersecurity are entirely self-inflicted. **Misconfigurations** occur when administrators fail to properly secure systems, unintentionally providing attackers with immediate avenues to compromise the network. Threat actors constantly write automated scripts scanning the public internet searching for these trivial oversights.

## Exposed Data and Open Repositories
One of the fastest ways to leak sensitive intel is by configuring cloud data repositories incorrectly.
*   **The Open S3 Bucket:** It is surprisingly common for third-party administrators to provision an Amazon S3 storage bucket or internal database and forget to apply basic permission restrictions or password protections. 
*   **Automated Reconnaissance:** Attackers do not need to "hack" anything; they simply connect to the open repository and download its contents.
*   **Example:** In 2017, 14 million Verizon subscriber records were fully exposed on the internet because a third-party vendor left an Amazon S3 database completely open to the public without authentication.

## Unsecured Administrator Accounts
The highest priviledged accounts (the `root` account in Linux, or `Administrator` in Windows) are highly coveted targets.
*   **Weak Passwords:** Despite OS restrictions attempting to enforce complexity, administrators occasionally assign easily brute-forced passwords (e.g., "123456" or "admin") to superuser accounts.
*   **Default Credentials:** The Mirai Botnet is a continuous reminder of the danger of default credentials. Mirai contains a hardcoded list of over 60 default usernames and passwords used by IoT cameras, routers, and doorbells shipped straight from the factory. If left unchanged, the botnet automatically hacks the device and assimilates it into a global cyber-attack network.
*   **Best Practice Mitigation:** Disable direct remote login access for the `root` or `Administrator` accounts. Require administrators to login with a standard user account first, and subsequently use privilege escalation commands (`sudo` or "Run as Administrator") to perform critical tasks. 

## Insecure Protocols
Using encryption to secure data is only effective if the protocols in use theoretically support encryption. 
*   **The Cleartext Threat:** Protocols such as HTTP, Telnet, FTP, SMTP, and POP3 are legacy protocols that transmit data entirely in the clear. 
*   **Packet Sniffing:** Anyone conducting a simple packet capture (using software like Wireshark) on the local network can read usernames, passwords, emails, and sensitive user data traversing these unencrypted connections natively.
*   **Secure Alternatives:** To mitigate this misconfiguration, administrators must disable legacy cleartext services and exclusively enforce encrypted replacements like HTTPS, SSH, and SFTP.

## Overly Permissive Firewall Rules
Firewalls operate by explicitly allowing or explicitly denying access to specific port numbers and IP addresses. 
*   **The Complexity Problem:** Enterprise firewall rulesets are massive and highly complex. It is exceptionally easy for an administrator to accidentally configure a rule that leaves a critical port (e.g., RDP or SSH) open to the entire public internet.
*   **Rule Auditing:** If a port is unintentionally exposed, automated vulnerability scanners utilized by attackers will discover it in minutes. Organizations must perform periodic, rigorous firewall audits to ensure they are strictly limiting open network ports to only those required for absolute business functionality.
