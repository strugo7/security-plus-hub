# Lesson: Malicious Code
**Module:** 2.4

## The Necessity of Malicious Code
Attackers frequently rely on humans making mistakes—using default passwords, misconfiguring firewalls, or falling victim to phishing emails. However, if a target organization has excellent security hygiene (no default credentials, alert users, heavily restricted firewalls), the attacker must physically force their way into the system. This requires the execution of **Malicious Code**.

## Forms of Malicious Code
Malicious code is not a single entity; it describes specialized exploit scripts and unique application payloads designed specifically to break the intended logic of an application or operating system.
*   **Binary Executables:** Traditional malware or ransomware payloads compiled into standalone executable files (`.exe` in Windows) designed to automatically deploy upon execution.
*   **Command Line Scripts:** Attackers frequently leverage native operating system tools (Powershell, Bash) to run malicious, fileless scripts entirely in the system's memory, evading traditional hard drive antivirus scans.
*   **Web Injections:** Cross-Site Scripting (XSS) and SQL Injections are precise strings of malicious code designed to manipulate backend web databases or execute unauthorized tasks in a victim's active browser session.

## High-Profile Exploits
The deployment of malicious code is responsible for the most devastating, wide-scale cyber attacks in history.
1.  **WannaCry Ransomware:** The WannaCry attack utilized malicious code to exploit a fundamental flaw in the Server Message Block (SMB) protocol. It allowed attackers to execute arbitrary, remote code across millions of unpatched Windows machines globally, instantly deploying the ransomware payload without any user interaction.
2.  **Cross-Site Scripting (British Airways):** Attackers infiltrated the British Airways web infrastructure and successfully injected 22 lines of malicious JavaScript code directly onto the checkout page. The malicious code silently executed in the browsers of hundreds of thousands of customers, capturing their credit card data and routing it directly to the attacker's servers in real-time.
3.  **SQL Injections (Estonian Healthcare):** Attackers utilized a malicious SQL injection script against the Central Health Database of Estonia. By manipulating the backend database queries, the malicious code bypassed the front-end security and successfully breached the highly sensitive health records of the entire nation's citizenry.
