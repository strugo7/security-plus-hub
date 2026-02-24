# Lesson: On-path Attacks
**Module:** 2.4

## Introduction to On-path Attacks
An **On-path Attack** (formerly known as a Man-in-the-Middle or MitM attack) occurs when an attacker successfully positions themselves strategically between two communicating devices on a network.
*   **The Mechanism:** The attacker effectively acts as a hidden proxy. All data transmitted from Device A meant for Device B is first routed to the attacker. The attacker receives it, reads it, potentially modifies it, and forwards it to Device B.
*   **The Danger:** The attack occurs entirely transparently. Neither the sender nor the recipient is aware that their network traffic is actively being intercepted and manipulated in real time.

## ARP Poisoning (ARP Spoofing)
The most common method to execute a local on-path attack is by abusing the **Address Resolution Protocol (ARP)**. 
*   **The Protocol Vulnerability:** ARP is an inherently trusting, legacy protocol used on local networks (IPv4) to map IP addresses to physical MAC hardware addresses. Crucially, ARP contains zero native authentication mechanisms. If a device receives an ARP update, it blindly trusts it and updates its local cache.
*   **The Exploit:** An attacker on the local subnet sends massive waves of forged, unsolicited ARP responses to the victim's laptop and the local default gateway (the router). 
*   **The Poisoning:** The attacker tells the laptop: *"I am the router, send all internet traffic to my MAC address."* Simultaneously, the attacker tells the router: *"I am the laptop, send all return traffic to my MAC address."*
*   **The Result:** Both device caches are poisoned. All internet traffic destined for the router now flows directly through the attacker's machine, allowing complete interception.

## On-path Browser Attacks
While traditional ARP poisoning attacks network infrastructure, an **On-path Browser attack** (Man-in-the-Browser) executes entirely locally on the victim's machine.
*   **The Vector:** The victim inadvertently installs malware (a Trojan) that acts as a hidden local proxy directly integrating with their web browser.
*   **Evading Encryption:** Network-level HTTPS encryption is completely useless against this attack because the malware sits *inside* the browser. It captures data *before* the browser software encrypts it for transmission, and reads incoming data *after* the browser decrypts it.
*   **The Execution:** When a user legitimately logs into their banking portal, the malware captures the plaintext credentials directly from the input fields. While the user is logged in, the malware can silently initiate unauthorized banking transfers entirely behind the scenes using the victim's active, authenticated session.
