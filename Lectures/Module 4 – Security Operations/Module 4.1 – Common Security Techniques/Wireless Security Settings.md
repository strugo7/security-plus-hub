# Lesson: Wireless Security Settings
**Module:** 4.1

## Introduction: The Challenge in Securing the Air
Securing wireless networks poses a clear and immediate challenge: all information is sent "over the air". This means that an attacker located nearby can listen to this communication. If the information is sent in the clear, the attacker will be able to see everything that is transmitted. In addition, there is the challenge of allowing access only to authorized users. Generally, we require a username, password, or some other type of authentication during the initial connection. In this lesson, we will learn about encryption protocols, the AAA framework, and how technologies like RADIUS and 802.1X protect the organization.

## 1. Encryption and Integrity Principles
**A. Encrypting the Traffic:** The default configuration in most private wireless networks is to encrypt all traffic passing through the network.
• *The Goal:* Even if an attacker gains access to the data (the packets) passing through the wireless network, they will not be able to read their content thanks to the encryption.

**B. Integrity Check:** We must ensure that the protocols on the network guarantee data integrity. That is, traffic sent by the original station will be received on the other side exactly as it was sent, without modifications.
• *Professional Term:* This check is often referred to as MIC (Message Integrity Check).

## 2. The Evolution of WPA Protocols
Over the years, networks have used different protocols, with the transition from WPA2 to WPA3 bringing dramatic security improvements.

**A. WPA2 and its Vulnerabilities:** For many years we used WPA2. Although it encrypted the data, it had a significant security concern related to the initial connection to the network:
• *The Four-way Handshake:* A process that occurs during the initial connection.
• *The Vulnerability:* There is a Hash value associated with this handshake. The attacker's goal is to capture this Hash during the connection.
• *Attack Vector:* Once the attacker holds the Hash, they can take it offline and run a Brute Force Attack to discover the Pre-shared Key.
• *Attack Efficiency:* Today, using GPU processing or cloud-based password cracking, it is possible to reverse-engineer and discover the password within a few days.

**B. WPA3 and New Technologies:** The update to WPA3 introduced new technologies to prevent these Brute Force attacks:
1. *GCMP Protocol:* A new block cipher mode (Galois Counter Mode Protocol).
    ◦ This is a stronger cipher than the one used in WPA2.
    ◦ It includes Data Confidentiality as well as a message integrity check (MIC) included in the Galois Message Authentication Code.
2. *Changing the Authentication Process:* The handshake process has completely changed.
    ◦ Mutual Authentication: Both the client device and the access point authenticate each other.
    ◦ Session Keys: Generated on the endpoint devices instead of sending Hashes over the network.
    ◦ Elimination of the Four-way Handshake: Since there is no four-way handshake, no Hash is sent over the network, and therefore the attacker has nothing to crack via Brute Force.

**C. SAE (Simultaneous Authentication of Equals):** The method for creating the shared keys in WPA3 is called SAE.
• *Technological Basis:* A derivative of the Diffie-Hellman Key Exchange. This allows the creation of a shared key on both sides with the addition of an authentication component.
• *Alias:* In some documents, you will see this handshake referred to as the Dragonfly Handshake.
• *User Privacy:* Every user on the network receives a different Session Key. This means that even if everyone uses the same Pre-shared Key, one user cannot see the traffic of other users on the network.

## 3. Authentication Methods
Network security varies depending on the environment (home vs. corporate).

**A. Open System / None:** When the router setting is "Open System" or "None", there is no authentication and no security at all on the wireless network.

**B. WPA3-Personal (WPA-PSK):**
• *Definition:* Use of a Pre-shared Key (PSK).
• *Usage:* Common in home networks. Everyone uses the same password to connect.
• *Organizational Weakness:* In a workplace, a situation where everyone shares the same key is highly insecure.

**C. WPA3-Enterprise (WPA3-802.1X):**
• *Definition:* The access point requires a username and password.
• *Mechanism:* Authentication is linked to a Centralized Authentication Server running protocols like RADIUS, LDAP, or TACACS.
• *Advantage:* Every employee has Separate Credentials, and access can be blocked for specific individuals or attackers.

## 4. The AAA Framework
A central authentication server is often referred to as an AAA Server. The process begins with Identification - usually the username. Then come the three A's:
1. *Authentication:* Combining the username with a password (a secret) to prove that you are who you claim to be.
2. *Authorization:* After gaining access, which specific resources is the user allowed to access?
3. *Accounting:* Recording the metrics of the activity (when the user logged in, how much data was sent/received, when they logged out).

## 5. Centralized Authentication Protocols (RADIUS, 802.1X, EAP)
**A. RADIUS**
• *Acronym:* Remote Authentication Dial-In User Service.
• *Usage:* Despite the name "Dial-in", it is used for a variety of purposes: VPN connections, server logins, and configuration changes on switches/routers.
• *Role:* Checking the username and password against the central AAA server.

**B. 802.1X / NAC**
• *Definition:* Also known as Network Access Control (NAC).
• *Role:* Prevents access to the network (wireless or wired) until the successful completion of the credential delivery process.
• *Management:* Enables centralized management – if an employee leaves, you simply disable their account on the server and they lose access from all devices.

**C. EAP (Extensible Authentication Protocol)**
• *Definition:* A framework that allows embedding the authentication within the 802.1X process.
• *Flexibility:* Allows vendors to customize the authentication process for specific requirements.

## 6. The 802.1X Process
This process involves three services/components, which are sometimes located on different devices:
1. *Supplicant:* The user/device attempting to connect.
2. *Authenticator:* The device being connected to (such as the access point).
3. *Authentication Server:* The AAA server on the back-end.

*Process Flow (Step-by-Step):*
1. The Supplicant tries to connect. The Authenticator blocks access and sends a message: "Is this a new connection? Provide credentials".
2. The Supplicant sends an EAP response with their name (e.g., James).
3. The Authenticator passes this to the authentication server and asks if it should start the process. The server approves.
4. The Authenticator requests credentials (password, etc.). The Supplicant types and sends them.
5. The information is forwarded to the authentication server, which Validates the information and instructs the Authenticator to allow access.

This process happens very quickly "behind the scenes" without the user's knowledge, as long as the correct details were provided.

## Executive Summary
Securing wireless networks requires transitioning from old protocols like WPA2 (which is vulnerable to Brute Force attacks on the four-way handshake) to the modern WPA3 protocol. WPA3 introduces GCMP encryption, mutual authentication, and the SAE (Dragonfly) mechanism that issues unique session keys for each user and prevents offline password cracking. In an organizational environment, it is mandatory to use WPA3-Enterprise, which implements the AAA framework via the 802.1X (NAC) protocol and a central RADIUS server. This combination ensures that each user has separate credentials, and allows for centralized and secure access management, authentication (via EAP), and auditing.
