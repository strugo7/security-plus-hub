# Lesson: Firewall Types
**Module:** 3.2

## The Evolution of the Firewall
Traditional, legacy firewalls (Stateless Firewalls) operated exclusively at OSI Layer 4. They examined traffic based strictly on source IP, destination IP, and TCP/UDP port numbers. If port 80 was unconditionally open, any traffic utilizing port 80 was automatically permitted to pass, regardless of whether it contained legitimate HTTP data or a malicious exploit script.

## Unified Threat Management (UTM)
To counter advanced threats, vendors began designing **Unified Threat Management (UTM)** appliances. 
*   **All-in-One Engine:** A UTM physically combines multiple disparate security features into one single, rack-mounted hardware appliance. 
*   **Features:** Within one box, an organization gets a perimeter firewall, URL content filtering, an Intrusion Detection System (IDS), anti-spam processing, bandwidth shaping, and a VPN concentrator.
*   **The Drawback:** Inspecting traffic sequentially across six different processing engines requires massive CPU overhead. Activating all features on a UTM frequently crippled total network throughput, creating severe bottlenecks.

## Next-Generation Firewalls (NGFW)
The modern enterprise perimeter is protected by the **Next-Generation Firewall (NGFW)**.
*   **Layer 7 Inspection:** An NGFW operates at OSI Layer 7 (The Application Layer). It executes Deep Packet Inspection (DPI) to look fundamentally inside the data payload.
*   **Application Awareness:** Because it reads Layer 7, the NGFW makes routing decisions based on the *actual application* being executed, not just the port. 
*   **Execution:** A network administrator can configure the NGFW to universally allow Facebook (port 443), but explicitly *block* the Facebook Messenger application component (also port 443). The NGFW distinguishes the microscopic application streams within the encrypted tunnel.
*   **Integration:** NGFWs natively integrate active Intrusion Prevention System (IPS) engines and dynamic URL categorization, blocking traffic strictly based on contextual threat intelligence rather than static rules.

## Web Application Firewalls (WAF)
While an NGFW broadly protects the corporate network boundary, a **Web Application Firewall (WAF)** is explicitly designed to protect a specific, individual web server.
*   **The Focus:** WAFs are entirely blind to standard network routing. They are engineered purely to intercept, parse, and deeply analyze inbound HTTP/HTTPS connections destined for a backend web application.
*   **The Protection:** It meticulously screens user input. If a user attempts to type malicious SQL injection code or a Cross-Site Scripting (XSS) exploit into a web form, the WAF mathematically identifies the malicious string syntax and instantly drops the connection before the code ever reaches the fragile backend database.
*   **Compliance:** Deploying a WAF is a strict, unconditional regulatory mandate for organizations processing credit cards under the Payment Card Industry Data Security Standard (PCI-DSS).
