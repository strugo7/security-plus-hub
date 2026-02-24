# Lesson: Network Appliances
**Module:** 3.2

## Jump Servers
An enterprise internal network is intentionally difficult to access from the outside. A **Jump Server** (or Bastion Host) is a highly secured, heavily audited gateway server explicitly designed to manage remote administrative access.
*   **The Workflow:** If an IT administrator is off-site and needs to configure an internal database, they cannot connect directly to it across the internet. They must authenticate strongly (MFA) to the external-facing Jump Server. Once securely logged into the Jump Server, they execute a second session initiating specifically from that machine into the internal network to manage the database.

## Forward and Reverse Proxies
A **Proxy** sits as a dedicated middleman intercepting communications between a client and a destination server. 
*   **Filtering and Caching:** Proxies frequently perform URL content filtering to block employees from visiting malicious sites. They also aggressively cache large website elements; if 50 employees load the exact same news homepage, the proxy downloads the images once and serves them locally to the internal network, saving massive bandwidth.
*   **Forward Proxy:** Installed inside the corporate network to govern outbound employee internet traffic. The employee asks the proxy to fetch a website on their behalf. The proxy goes to the internet, receives the site, scans it for malware, and then hands it back to the internal employee.
*   **Reverse Proxy:** Placed on the perimeter pointing inward. Internet users want to access the corporate web server. They hit the reverse proxy instead. The proxy analyzes the inbound request, verifies it is not an attack, fetches the data from the internal web server, and replies out to the internet user. The attacker never touches the actual web server directly.
*   **Transparent Proxy:** An inline proxy that intercepts web traffic seamlessly. The end-user does not configure any proxy settings in their browser and remains entirely unaware the proxy is managing their connection.

## Load Balancers
A **Load Balancer** is essential for high availability and enterprise scale. If thousands of users connect to `www.bank.com`, a single web server would violently crash.
*   **Distribution:** A load balancer accepts the single inbound URL request and dynamically distributes the traffic across a cluster of 20 backend web servers. 
*   **Fault Tolerance:** It constantly pings the servers. If Server #4 fails, the load balancer removes it from the rotation and instantly redirects new users to the surviving 19 servers.
*   **SSL Offloading:** Cryptographic decryption introduces massive CPU overhead. Advanced load balancers handle the mathematically intense SSL decryption at the perimeter, passing raw plaintext HTTP traffic to the backend web servers, freeing them up to focus entirely on application processing.

## Sensors and Collectors (The SIEM)
Modern networks generate billions of lines of raw log data daily.
*   **Sensors:** Tiny software agents or dedicated network taps constantly capturing network statistics, firewall block logs, and failed server authentications in real-time.
*   **Collectors:** A massive, centralized database—typically a **Security Information and Event Management (SIEM)** server. Hundreds of disparate sensors all stream their raw logs into the SIEM collector. The SIEM rapidly correlates the data, generating massive data dashboards and triggering automated alarms if an attack pattern emerges across multiple devices simultaneously.
