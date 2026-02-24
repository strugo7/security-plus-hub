# Lesson: Firewalls
**Module:** 4.5

## The Role of the Firewall
A network-based firewall is an inline security appliance. It sits crucially between two networks (typically the internal trusted network and the untrusted internet) and makes binary, split-second decisions: either allow the traffic to pass or brutally drop it. 

Modern firewalls often handle significantly more than simple filtering: they frequently act as the network's primary layer 3 router (handling Network Address Translation and dynamic routing protocols) and act as massive VPN concentrators to terminate encrypted remote connections.

## Traditional vs. Next-Generation Firewalls
*   **Traditional Firewalls:** These are "dumb" regarding applications. They only understand IP addresses and basic Transport layer port numbers. If it sees traffic on TCP port 80, it simply assumes it is web traffic and allows it based on the rule. 
*   **Next-Generation Firewalls (NGFW):** Also known as an Application Layer Gateway or Deep Packet Inspection device. An NGFW actually reconstructs the data payload as it streams past to definitively identify the *exact application*. It recognizes that traffic on port 80 isn't just web browsing, it is specifically a user trying to upload a file to Dropbox. Because it understands the application context, you can create granular rules: "Allow users to view Facebook (the application), but physically block the 'Facebook Games' sub-application."

## Firewall Rules (Access Control Lists)
A firewall operates based on a strict list of rules, often called an **Access Control List (ACL)**. A rule is a logical statement containing parameters like Source IP, Destination IP, Port Number, Protocol (TCP/UDP), and the Action (Allow/Deny).

### Top-Down Processing
The placement of the rules mathematically dictates how the firewall operates:
1.  **Sequential Evaluation:** When a packet hits the firewall, it is evaluated against the very first rule at the top of the list.
2.  **The Match:** If the packet perfectly matches the parameters of rule #1, the firewall executes the action (Allow/Deny) and **stops processing**. It skips the rest of the list entirely. 
3.  **The Hierarchy:** If the packet does not match rule #1, it moves down to rule #2, and so forth. Therefore, highly specific, granular rules must be placed at the very top of the list, while broad, "catch-all" generic rules must be placed at the very bottom.

### The Implicit Deny
If a packet traverses the entire massive list of rules from top to bottom and fails to match a single one, it hits the foundational architecture of the firewall: the **Implicit Deny**. Any traffic that is not explicitly and formally allowed in the rule base is quietly and automatically dropped by default.

## The Screened Subnet (DMZ)
Organizations often host servers that the general public must access (like a corporate web server or an email gateway). It is dangerously risky to place these public-facing servers on the sensitive internal corporate network.
*   **The Architecture:** The firewall is configured with a third, completely isolated network interface called the **Screened Subnet** (formerly known as a DMZ).
*   **The Flow:** All internet traffic requesting the web server is safely routed by the firewall strictly to the Screened Subnet. The firewall explicitly prevents internet traffic from crossing over into the highly sensitive internal corporate network where the databases reside.

## Intrusion Prevention Systems (IPS)
While a firewall blocks traffic based on addresses/ports/applications, an **Intrusion Prevention System (IPS)** actively searches inside the "allowed" traffic for malicious exploits and malware. Modern NGFWs almost always include full IPS capabilities within the same physical box.

### IPS Methodologies
*   **Signature-Based:** The IPS downloads thousands of known, static "fingerprints" of malicious attacks. As traffic passes, it mathematically compares the packet stream against the signatures. If it matches a known malware signature perfectly, it drops the connection.
*   **Anomaly-Based (Heuristics):** The IPS learns what "normal" network traffic looks like. If it suddenly detects a massive, bizarre deviation from that baseline (like a sudden spike in malformed database queries), it dynamically attempts to block the anomaly, even if a specific signature does not currently exist.

### Tuning the IPS
An overly aggressive IPS will violently block legitimate corporate traffic, creating a **False Positive**. Administrators must carefully organize the thousands of IPS signatures into manageable "Rule Groups." They continuously tune the device, finding the delicate balance between maximizing security blocking and keeping the business operational.
