# Lesson: Secure Infrastructures
**Module:** 3.2

## The Concept of Security Zones
A mature network architecture does not treat all devices equally. **Security Zones** are used to logically segregate different network segments based entirely on their security requirements, operational function, or the sensitivity of the data they process. This is distinctly different from simply assigning subnets.
*   **The Trusted Zone (Inside):** The highly secure internal network housing the employee workstations, internal databases, and active directory servers.
*   **The Untrusted Zone (Outside):** The open internet. Complete chaos.
*   **The Screened Subnet (DMZ):** A highly specialized, tightly controlled middle ground. If the organization hosts a public web server, it is placed in the Screened Subnet. The untrusted internet is allowed to access the web server, but the web server itself is strictly blocked from initiating connections deeper into the Trusted internal corporate network.

## Minimizing the Attack Surface
An attacker constantly probes the perimeter looking for an entry vector—an unpatched application, an open firewall port, or a gullible employee. The sum total of all potential vulnerabilities and entry points into an organization is known as the **Attack Surface**.
*   **The Goal:** Security architects strive to minimize the attack surface to the absolute lowest possible denominator.
*   **Execution:** This means explicitly blocking every non-essential protocol at the firewall, auditing internal application code to prevent SQL injections, forcing multi-factor authentication everywhere, and running automated patch management to close known exploits.

## Securing Connectivity
It is not enough to secure the servers; the literal cables connecting the devices must be secured against interception.
*   **Physical Protection:** Ensuring network drops in isolated conference rooms are turned off when inactive to prevent a visitor from plugging in a rogue laptop.
*   **Application-Level Encryption:** Recognizing that physical cables might be tapped, security engineers mandate end-to-end encryption (like HTTPS or TLS). Even if an attacker uses a packet sniffer to capture the traffic natively off the wire, the payload remains entirely unreadable ciphertext.
*   **Secure Remote Access:** Utilizing IPsec tunnels for permanent site-to-site connectivity between branch offices, or deploying VPN concentrators to ensure traveling remote workers have an encrypted pathway into the corporate environment.
