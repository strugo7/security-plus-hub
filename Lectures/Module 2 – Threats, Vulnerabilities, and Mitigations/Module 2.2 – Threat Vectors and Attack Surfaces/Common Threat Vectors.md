Common Threat Vectors: A Comprehensive Guide to Information Security and Risk Management

Lesson: Common Threat Vectors

Based on Module 2.2 - CompTIA Security+ SY0-701Introduction: What is a Threat Vector?

Attackers constantly seek new ways to gain access to organizational systems. The method an attacker uses to gain this access is called a Threat Vector or sometimes an Attack Vector. In this lesson, we will review the diverse avenues—from simple text messages, through image files, to the supply chain—that attackers use to try and penetrate our defenses. The goal is to identify not only the known threats but also to understand where unknown vulnerabilities might be lurking.
1. Messaging Systems

Messaging systems are a very common starting point for attackers, simply because almost all of us use them for daily communication.

A. Email

This is a classic platform for attackers.
The Method: Sending malicious links that tempt the user to click on them.
The Result: Installation of Malware or redirection to a Phishing page that impersonates a legitimate site (such as a bank login) to steal access credentials.
B. Text Messages (SMS)

This vector is particularly common on mobile devices.
The Technique: The attacker sends an SMS message attempting to grab your attention and get you to click on a link.
Real-World Example: A "spam" message impersonating the postal service (USPS), claiming you have a package that was stopped due to an incorrect address. The attached link leads to a malicious website.
C. Instant Messages / Direct Messages (IM / DM)

Using direct chats allows the attacker to "speak" with you directly.
The Advantage for the Attacker: These methods are highly effective in Social Engineering attacks. The attacker exploits the trust the user has in the messaging system to send fake invoices, or to try and defraud through Cryptocurrency Scams.
2. Image-based Attack Vectors

Many tend to think that images are innocent files, but certain formats can pose a significant risk.

The SVG (Scalable Vector Graphic) Vector
The Technical Essence: An SVG file is essentially an XML file that describes the image, not a regular binary image. This is a format supported by most browsers.
The Risk: Since it is XML, the attacker can Embed malicious code within the image description.
HTML or JavaScript code can be injected.
When the browser displays the image (for example, a simple triangle), it simultaneously runs the injected script.
Example: Running a Cross-Site Scripting (XSS) attack hidden within a seemingly legitimate image file. While most browsers attempt to block this, a browser vulnerability or code not recognized as classic XSS may bypass the defenses.
3. File-based Vectors

Files that we download and open are an obvious attack vector (like Executables that run in memory), but the threat also exists in more complex formats.

A. PDF Documents

Adobe PDF serves as a "Holding place" for various objects. It can contain text, images, and even Scripting, which makes it an excellent starting point for an attack.

B. Compressed Files
The Method: Hiding the threat inside a ZIP or RAR file.
The Goal: Obfuscation. The attacker hopes the user will only see an innocent ZIP file, but inside it, among hundreds of files, a single malicious file will be hidden.
C. Office Documents and Macros

Documents, spreadsheets, and presentations can contain macro commands.
Although they are mostly useful, an attacker can write a macro that collects personal information from the computer and sends it out.
D. Browser Extensions/Add-ins

Adding a browser extension can install malware, exposing the entire system to risk.
4. Telephony and VoIP

Voice communication networks also serve as a platform for attack.
Vishing (Voice Phishing): An attempt to elicit credit card details or personal information via a phone call.
Spam over IP: Using Voice-over-IP systems to send massive amounts of spam messages in an automated process.
War Dialing: Scanning for unlisted phone numbers to find modems or access to systems.
Denial of Service (DoS): Flooding the messaging or telephony system to disrupt the organization's activity.
5. Physical Vectors: USB and Removable Drives

Sometimes, the "low-tech" solution bypasses the most sophisticated defenses.

Bypassing Defenses in Air-Gapped Networks

Organizations invest millions in Firewalls and filtering systems, but a single USB drive worth $10 can bypass everything.
The Method: The attacker scatters USB drives in the company parking lot. A curious employee picks up the drive and connects it to a computer on the internal network.
Air-Gapped Network: This is a network without a physical connection to the external internet. USB is one of the most effective ways to introduce malware or exfiltrate information from it.
"Keyboard" Attack (USB acting as Keyboard)

Modified USB drives can identify themselves to the computer as a keyboard. Upon connection, the drive "types" malicious commands rapidly on the screen, without human intervention.
6. Software and Vulnerabilities (Software Vulnerabilities)

Managing software updates is an ongoing challenge for security experts.

A. Unpatched Software

Older versions contain known security vulnerabilities.
If the vulnerability is known to attackers but has not yet been fixed in the organization, they have a significant advantage.
Solution: Routine software updates (Patching) for the operating system and all applications.
B. Agentless / Web-based Systems

In web applications, the software is not installed locally on the computer but runs on a central server.
The Risk: If the attacker infects the central server, they potentially infect all clients that connect to it, as everyone runs a new Instance that comes from the compromised server.
C. Unsupported Systems

Operating systems or hardware for which the manufacturer has stopped providing updates.
The Risk: The lack of security patches makes the system completely exposed.
The Challenge: Identifying forgotten systems ("old computer under the desk") that IT is unaware of. Inventory management and periodic network scans are critical for identifying these systems.
7. Networking Vectors

The network infrastructure itself is a digital "highway" that attackers exploit for movement.
Wireless Networks: Using outdated protocols (WEP, WPA) exposes the network. It is recommended to upgrade to WPA3 and use 802.1X for user authentication (prevents access without the appropriate Credential).
Rogue Access Points: Unauthorized access points that act as a backdoor to the network.
Bluetooth: Used for Reconnaissance and identifying systems in the vicinity, or as an entry point if the implementation is insecure.
Open Ports: A web server opens ports 80 (HTTP) and 443 (HTTPS). Every open port is a potential door. The more services installed, the larger the attack surface becomes.
Misconfiguration: A simple configuration error in complex systems can allow unauthorized access.
8. Default Credentials

One of the simplest yet most dangerous threats.
The Problem: Network equipment (routers, modems) comes with default usernames and passwords (such as admin/admin).
The Information: Websites like routerpasswords.com publish these passwords for anyone to find.
The Solution: Changing the password upon the first login.
9. Supply Chain

This vector allows an attacker to penetrate the organization "through the front door" via a trusted third party.

A. Penetration through Suppliers and Partners
MSP (Managed Service Provider): A managed service provider that has access to your systems for maintenance. If the MSP is breached, the attacker also has access to you.
Case Study - Target (2013): Attackers penetrated the network of an air conditioning (HVAC) contractor who worked with Target. From there, they "jumped" to Target's network and distributed malware to Points of Sale (POS) to steal credit card numbers.
B. Hardware and Counterfeits
During the Manufacturing Stage: Injecting malware into the equipment already at the factory or later by a third party.
Counterfeit Hardware: A 2020 example of fake Cisco Catalyst switches. Such equipment cannot be updated (Patching) and may contain built-in backdoors.
Executive Summary

Threat Vectors are diverse and constantly changing. They include digital vectors such as Messaging systems (Phishing via Email/SMS), malicious files (PDF, SVG, Office Macros), and exploiting Software Vulnerabilities (Unpatched/Unsupported Systems). Additionally, there are physical vectors like USB drives (bypassing Air-Gapped networks), networking vectors (Bluetooth, open ports, Default Credentials), and complex vectors in the Supply Chain (such as a breach through an MSP or counterfeit hardware). Effective defense requires awareness of all these access channels and proactive management of each one.