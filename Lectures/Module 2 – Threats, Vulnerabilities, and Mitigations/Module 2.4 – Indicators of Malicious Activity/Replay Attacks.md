# Lesson: Replay Attacks
**Module:** 2.4

## Introduction to Replay Attacks
A **Replay Attack** is an advanced exploitation technique where an attacker intercepts a legitimate, authenticated data transmission traversing the network, stores a copy of it, and then maliciously re-transmits (replays) that exact same data payload to the server at a later time.
*   **The Objective:** The primary goal is to impersonate the victim or fraudulently repeat an unauthorized action without ever needing to know the actual plaintext passwords or encryption keys involved.
*   **Prerequisites:** To capture the initial authenticated broadcast, the attacker typically utilizes an on-path interception attack, ARP poisoning, or local network packet sniffing tools (like Wireshark).

## Pass the Hash
"Pass the Hash" is a highly damaging, specialized replay attack focusing explicitly on the authentication process in Windows enterprise environments.
*   **The Vulnerability:** Modern operating systems do not transmit passwords across the network in plaintext. Instead, they run the password through a cryptographic algorithm and transmit the resulting **Hash**. The server authenticates the user by verifying the hash, not the password itself.
*   **The Exploit:** Rather than attempting to brutally crack the intercepted hash to discover the plaintext password (which could take centuries), the attacker simply captures the authenticated hash payload.
*   **The Replay:** The attacker initiates a new login session with the server and simply *replays* (passes) the captured hash. The server receives the mathematically correct hash, assumes the attacker is the legitimate user, and grants complete access.
*   **Mitigation:** Modern authentication protocols mandate the use of cryptographic "salt" and dynamic session tokens, ensuring that a hash used for login at 1:00 PM is mathematically invalid if replayed at 1:05 PM.

## Session Hijacking
**Session Hijacking** (or Sidejacking) is a replay attack explicitly targeting web application session management.
*   **Session IDs:** When you successfully log into a secure web application, the server generates a unique, temporary **Session ID** and stores it in your browser as a web cookie. Upon your next click, your browser submits the cookie to mathematically prove you are already authenticated, preventing you from having to log in on every single page load.
*   **The Exploit:** If the web session is transmitted across the network without end-to-end encryption, an attacker using a packet sniffer can easily intercept the plaintext cookie, effectively stealing the Session ID.
*   **The Hijack:** The attacker injects the stolen Session ID directly into their own browser. Because the web server relies entirely on the Session ID for authentication, it immediately assumes the attacker is the victim and grants them full administrative access to the active authenticated session.
*   **Mitigation:** The singular, absolute defense against session hijacking is enforcing strict, end-to-end HTTPS encryption (TLS) across all application layers, preventing the Session ID from ever traversing the network in readable plaintext.
