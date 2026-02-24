# Lesson: Intrusion Prevention
**Module:** 3.2

## Moving Beyond the Firewall
Traditional firewalls determine what traffic can enter a network based entirely on ports and IP addresses. An **Intrusion Prevention System (IPS)** acts as a deeply analytical traffic cop. It analyzes the actual data payload traversing the network in real-time, searching aggressively for known exploit signatures, buffer overflows, or malicious behavioral anomalies.

## Detection vs. Prevention
*   **Intrusion Detection System (IDS):** A passive, reactionary system. If an IDS identifies malicious traffic crossing the network, it generates high-priority alerts and notifies the security analysts. Critically, it does not possess the capability to halt the attack; the malicious packets are permitted to hit their target while the alarms are ringing.
*   **Intrusion Prevention System (IPS):** An active, proactive system. The IPS sits directly in the line of traffic. If it detects a malicious payload attempting to enter the network, the IPS automatically and instantly terminates the connection, dropping the malicious packets before they ever reach the internal network.

## Active vs. Passive Monitoring Implementations
The physical installation footprint of the device dictates its operational capabilities.

### Active Monitoring (In-Line)
*   **The Architecture:** The IPS is physically cabled directly in between the internet firewall and the core internal switch. 100% of all network traffic physically flows *through* the processing engine of the IPS.
*   **The Advantage:** This is the only architecture that permits the IPS to actively drop packets and terminate malicious sessions in real-time, executing true "Prevention."

### Passive Monitoring (Out-of-Band)
*   **The Architecture:** The IPS is plugged securely into a mirrored port (a SPAN port) on the core switch or attached to a physical network tap. 
*   **The Process:** Standard network traffic flows normally to its destination. The switch dynamically generates an exact duplicate copy of every packet and silently forwards the cloned copy to the IPS.
*   **The Advantage:** Because the traffic is not forced through the IPS, an IPS hardware failure cannot accidentally cause a network outage. However, because it is only reviewing a carbon copy of the traffic after the fact, a passive system operates exclusively as an IDS—it can only alert, never block.

## Hardware Failure Modes
If an actively monitoring, in-line IPS physically loses power or experiences a catastrophic software crash, the engineering protocols dictate what happens to the network.
*   **Fail-Open:** The IPS shuts down its security analysis engine, effectively turning itself into a simple patch cable. All network traffic is permitted to flow freely without any security scanning. The network remains fully operational, but highly vulnerable. This is standard configuration to prevent enterprise disruption.
*   **Fail-Closed:** When the IPS crashes, it physically severs all network connectivity. Zero traffic is permitted across the link. While highly secure (no malicious traffic can enter), it creates an immediate network-wide catastrophic outage for legitimate users.
