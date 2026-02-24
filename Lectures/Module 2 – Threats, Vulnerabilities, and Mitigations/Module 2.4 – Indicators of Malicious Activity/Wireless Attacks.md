# Lesson: Wireless Attacks
**Module:** 2.4

## Introduction: The Invisible Layer
Wireless networks are exposed to a wide variety of attacks, as the communication medium (radio waves) is open and accessible to anyone nearby. In this lesson, we will focus on two main types of Denial of Service (DoS) attacks in the wireless world:
1. Deauthentication Attack: A targeted attack that exploits a vulnerability in the network's management protocol.
2. RF Jamming: A physical attack that disrupts the frequencies on which the network operates.
We will learn how these attacks are carried out, what tools attackers use, and how the industry has advanced to prevent them.

## 1. Wireless Deauthentication Attack
This is a common and frustrating scenario: a user is browsing the wireless network, and suddenly disconnects without any warning or error message. After reconnecting, they disconnect again and again. This is the classic sign of a Deauthentication attack.

**A. The Technical Mechanism: Management Frames**
To understand the attack, one must understand how the network manages connections.
• *Theoretical Explanation:* Communication between the device and the Access Point includes Management Frames. These are messages that do not contain user data (such as web browsing), but are used to manage the connection "behind the scenes": connecting to the network, managing the connection, and disconnecting from it.
• *The Vulnerability:* In early versions of the 802.11 standard, management frames did not include any security mechanism. They were sent over the network in the clear and without Encryption. This means that any attacker located nearby can see this information and manipulate it.

**B. Stages of Executing the Attack (Demonstration)**
The instructor demonstrates how an attacker exploits this vulnerability using dedicated tools (such as the aircrack-ng suite):
1. *Reconnaissance Phase:*
    ◦ The attacker runs a tool called _airodump-ng_ to see all the networks and devices in the area.
    ◦ They identify the BSSID (the hardware address of the access point) and the MAC Address of the victim (for example, an iPhone whose address ends in 2E:FD).
2. *The Attack Phase:*
    ◦ The attacker uses the _aireplay-ng_ tool to proactively send spoofed Deauthentication frames.
    ◦ The command defines the access point and the specific device to be disconnected.
3. *The Result:*
    ◦ The victim's device receives the command and immediately disconnects from the network. As long as the attacker continues to transmit these frames, the victim will not be able to reconnect.

**C. Mitigation and Solutions**
IEEE engineers realized this was a critical security issue and made updates to the standard:
• *802.11ac Standard and above:* Starting with this update, certain critical management frames are encrypted by default.
• *What is encrypted?* Frames such as Disassociate, Deauthenticate, and Channel switch announcements are now protected and cannot be easily spoofed.
• *What is not encrypted?* Certain frames must remain in the clear to allow the initial connection to the network, such as Beacons, Probes, and the initial Association and Authentication stages.

## 2. RF Jamming
While a Deauthentication attack exploits a vulnerability in the protocol, RF Jamming is a physical-layer Denial of Service (DoS) attack that prevents communication by generating noise.

**A. Signal-to-Noise Ratio**
• *The Principle:* The attacker's goal is to decrease the Signal-to-Noise Ratio.
• *The Meaning:* The attacker transmits strong interference signals, so the user's device "hears" more noise than real information from the access point. If the device cannot distinguish the legitimate signal, it cannot transmit or receive information.

**B. Jamming Sources**
• *Unintentional Interference:* Often, we cause this ourselves. Microwave ovens and fluorescent lighting are known to generate interference in the 2.4 GHz frequency.
• *Malicious Interference:* An attacker can use transmitters to flood the frequency with data.

**C. Types of Malicious Jamming**
An attacker can choose different tactics to make detection difficult:
1. *Constant:* Continuous or random data transmission that completely blocks the channel.
2. *Flooding Legitimate Frames:* Sending a massive amount of valid frames to create load and noise.
3. *Reactive Jamming:* A more sophisticated method that makes Troubleshooting difficult. In this state, the attacker listens for silence on the network. Only when someone tries to transmit, the attacker activates the jammer ("turns up the volume") for a brief moment. When the network is quiet, there is no sign of jamming.

**D. Locating the Source: The "Fox Hunt"**
Since the attacker must be Local and close to the access point, they can be physically located.
• *The Method:* Using a Directional Antenna to scan the area.
• *The Challenge:* As you get closer to the source, the signal becomes very strong, making it difficult to identify the exact direction.
• *The Solution:* Using a component called an Attenuator, which lowers the strength of the received signal, allowing the searcher to continue triangulating until the jamming device is found.

## Executive Summary
Wireless Attacks exploit the open medium to perform Denial of Service (DoS). One type is the Deauthentication Attack, which exploits a vulnerability in older standards (prior to 802.11ac) where Management Frames were sent unencrypted, allowing an attacker to disconnect specific users from the network (resolvable by using modern standards that encrypt these frames). The second type is RF Jamming, which is based on flooding the frequency with noise and lowering the Signal-to-Noise Ratio, whether by a household appliance (microwave) or a malicious attacker. Locating such a jammer requires a physical triangulation process ("Fox Hunt") using directional antennas.
