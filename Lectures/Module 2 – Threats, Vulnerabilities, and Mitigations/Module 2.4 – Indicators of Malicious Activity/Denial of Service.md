# Lesson: Denial of Service
**Module:** 2.4

## Introduction to Denial of Service
A **Denial of Service (DoS)** attack occurs when an attacker intentionally forces a critical service, network, or application to fail, rendering it completely unavailable for legitimate users. 

### Why DoS Attacks Occur
*   **Extortion and Disruption:** Attackers may disable a service to extort a ransom, act as a smokescreen while they infiltrate and exfiltrate data from another segment of the network, or inflict massive reputational and financial damage on a competitor.
*   **Vulnerability Exploitation:** Many DoS attacks exploit unpatched software vulnerabilities or inherent design flaws to intentionally crash an application process.
*   **Accidental DoS:** Not all DoS issues are malicious. A junior administrator internally creating an unrecognized routing loop without spanned-tree protocol running, or downloading a massive Linux ISO over a weak internet trunk, can effectively create a DoS for the entire business. 

## Distributed Denial of Service (DDoS)
A standard DoS attack originates from a single source computer. However, a **Distributed Denial of Service (DDoS)** attack utilizes hundreds of thousands of different devices scattered globally to simultaneously overwhelm the target's bandwidth and computing resources.

### The Power of Botnets
Attackers do not manually sit at hundreds of thousands of keyboards. They utilize malware to compromise vulnerable devices online (PCs, unpatched IoT devices, cameras) without the owners' knowledge.
*   **Command and Control:** The attacker links these compromised devices into massive 'robot networks' called **Botnets**, centrally managed by a Command and Control (C2) server.
*   **Execution:** The attacker issues a single command over the C2 infrastructure, instructing millions of botnet nodes to immediately flood the target server with traffic. 
*   **Asymmetric Threat:** An individual attacker with highly limited personal resources wields the combined asymmetrical firepower of millions of systems, capable of shattering enterprise web services. The infamous Zeus botnet controlled over 3.6 million devices at its peak.

## Amplification Attacks
To maximize the devastation of a DDoS, attackers deploy **amplification** techniques. An amplification attack exploits standard, publicly accessible internet protocols that fundamentally reply with more data than they receive.

### The Mechanism of DNS Amplification
The Domain Name System (DNS), Network Time Protocol (NTP), and ICMP are highly susceptible to amplification. 
1.  **The Spoof:** The Command and Control server instructs the entire botnet to send a massive wave of tiny, 15-byte DNS queries to unprotected "Open DNS Resolvers" across the internet. 
2.  **The Misdirection:** The botnet alters the network packets, spoofing the "Return/Source IP Address" to match the target victim's web server.
3.  **The Amplified Execution:** The Open DNS Resolvers process the tiny queries and obediently send the massive 1,300-byte DNS query responses (an 86x amplification) directly to the spoofed target server. The target server is completely caught off guard by a catastrophic tsunami of amplified data returning from legitimate DNS servers, crippling its infrastructure instantly.
