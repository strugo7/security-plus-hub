# Lesson: Physical Attacks
**Module:** 2.4

## The Importance of Physical Security
In cybersecurity, enormous resources are dedicated to stopping remote and digital intrusion vectors. However, organizations can easily overlook the physical security of their infrastructure.
*   **The Fundamental Rule:** If an attacker can gain unrestricted, unmonitored physical access to a computer, server, or data center, they functionally have full administrative control over that system and its data. 
*   Physical attacks bypass advanced operating system firewalls, encryption software, and intrusion detection systems entirely.

## Brute Force Physical Attacks
In digital security, brute force refers to rapidly guessing passwords. In physical security, brute force means exactly what it sounds like: forcing entry.
*   **The Threat:** If a server room door is locked, an attacker may simply use heavy tools to break the lock, force the door off its hinges, or shatter an adjacent window to climb inside. 
*   **Risk Assessment:** Security architects must critically evaluate the durability of physical entry points. Standard office doors and glass walls provide zero resistance against a determined attacker attempting to gain physical access to a sensitive network switch or server rack.

## RFID Cloning
Many organizations utilize RFID (Radio Frequency Identification) powered access badges and key fobs to secure physical doors and restrict unauthorized entry. 
*   **The Vulnerability:** RFID cards rely on broadcasting a specific unique ID wirelessly. This signal can be intercepted or duplicated.
*   **The Attack:** Highly inexpensive, pocket-sized RFID cloner devices (costing under $50) are readily available online. An attacker merely needs to brush up against an employee in a crowded train or elevator with a concealed scanner. In seconds, the device grabs the wireless emitted ping and writes an exact cryptographic clone to a blank card in their pocket.
*   **Mitigation:** This trivial vulnerability highlights why organizations must augment RFID badge scanners with **Multi-Factor Authentication (MFA)**, requiring employees to also type a localized PIN on a keypad alongside swiping their badge.

## Environmental Attacks
If an attacker cannot compromise the computing hardware directly via brute force or passcard, they can attack the physical environment maintaining the servers.
*   **Power Subversion:** An attacker outside the building could physically assault external power transformers, cut data lines, or disable local backup generators, bringing an entire data center entirely offline instantly.
*   **HVAC Sabotage:** Heating, Ventilation, and Air Conditioning (HVAC) systems are often network-accessible but drastically less secure than core servers. An attacker gaining remote access to the HVAC control unit can intentionally disable the data center's cooling infrastructure. 
*   **The Result:** As server room temperatures skyrocket, critical servers and massive storage arrays will automatically trip their thermal safety shutdowns and pull themselves offline, effectively engineering a massive, sustained environmental Denial of Service.
