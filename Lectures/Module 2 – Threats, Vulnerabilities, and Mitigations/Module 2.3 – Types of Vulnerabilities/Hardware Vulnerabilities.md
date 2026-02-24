# Lesson: Hardware Vulnerabilities
**Module:** 2.3

## The Proliferation of Hardware Devices
Modern local networks feature a massive number of connected hardware devices beyond traditional laptops and servers. The explosion of the **Internet of Things (IoT)** means that devices like smart thermostats, refrigerators, garage doors, and electronic locks are all connected nodes on the network.
*   **The Black Box Limitation:** These devices run embedded operating systems, but users generally have zero access or visibility into how they operate. 
*   **The Risk:** Because they are connected to the network, every single one of these physical devices represents a potential attack vector for a threat actor.

## Firmware and Patching Challenges
The embedded operating system running on IoT and hardware devices is known as **firmware**. 
*   **Vendor Reliance:** Because the hardware is a closed system, consumers and IT administrators rely exclusively on the original manufacturer to develop, release, and distribute security patches for vulnerabilities.
*   **Slow Response Times:** Unlike software giants (Microsoft, Apple, Linux) who release patches in days or weeks, hardware manufacturers historically deprioritize IT security. Some critical vulnerabilities in IoT devices have gone unpatched by the manufacturer for well over a year, leaving consumers exposed.

## Equipment Lifecycles (EOL and EOSL)
Understanding a hardware device's lifecycle is critical to mitigating hardware vulnerabilities. Manufacturers use specific terminology to dictate when they will stop supporting a product:

1.  **End of Life (EOL)**
    *   **Definition:** The manufacturer announces they will stop *selling* the product.
    *   **Implication:** This serves as a primary warning that the hardware is aging. Most manufacturers will still provide critical security patches and support during the EOL phase, but it signals the beginning of the end.
2.  **End of Service Life (EOSL)**
    *   **Definition:** The absolute final cutoff where the manufacturer ceases *all* support, including security patches.
    *   **Implication:** Once a device reaches EOSL, any newly discovered vulnerabilities will remain unpatched forever. Organizations must plan to aggressively replace or isolate EOSL devices immediately.

## Securing Legacy Platforms
Large enterprises, industrial control systems, and data centers often operate legacy hardware or systems running outdated middleware that have long surpassed their EOSL.
*   **The Business Challenge:** Legacy devices often run highly critical, specialized functions that cannot simply be turned off or easily replaced with modern equivalents without severe disruption.
*   **Mitigation Strategies:** When replacing a legacy device is impossible, administrators must wrap the device in compensatory security controls. This includes implementing extreme firewall restrictions denying direct inbound connections, using localized Intrusion Prevention Systems (IPS), and ensuring the legacy system resides on an isolated VLAN with no direct internet access.
