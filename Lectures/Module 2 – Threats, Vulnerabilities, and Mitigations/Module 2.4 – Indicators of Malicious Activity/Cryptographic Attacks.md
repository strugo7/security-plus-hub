# Lesson: Cryptographic Attacks
**Module:** 2.4

## Introduction to Cryptanalysis
Cryptography is designed to protect data even if that data is intercepted by an attacker. However, the systems that implement encryption are not invulnerable. A **Cryptographic Attack** explicitly targets weaknesses in the mathematical algorithms, or more commonly, the software implementation of the cryptography, to access the secure data without simply guessing the decryption key.

## Hash Collisions and the Birthday Attack
Hashing algorithms securely map data of arbitrary size to a fixed-size string of text (a hash). Crucially, a hashing algorithm must be deterministic—every unique file must produce a completely unique hash. 
*   **The Birthday Paradox:** In a room of 23 people, there is a 50% statistical probability that two people share the exact same birthday. In cryptography, this statistical phenomenon applies to hash generation.
*   **The Collision:** A **Hash Collision** occurs when an algorithm organically generates the *exact same* hash output for two completely different input files. 
*   **The Exploit:** If an attacker can mathematically manufacture a collision, they can forge digital signatures. They can create a malicious virus file that produces the exact same cryptographic hash as a legitimate Microsoft update file, completely bypassing security systems that rely on hash verification.
*   **The MD5 Vulnerability:** The MD5 hashing algorithm was globally deprecated because researchers demonstrated they could rapidly and reliably produce destructive hash collisions, rendering MD5 cryptographically broken for secure operations. The industry migrated to much larger algorithms (like SHA-256) where the mathematical probability of a collision is functionally zero.

## Downgrade Attacks
A **Downgrade Attack** does not attempt to break advanced cryptography; instead, it relies on entirely bypassing it by forcing the system to use obsolete, easily crackable legacy standards.
*   **The Execution:** Over time, systems maintain backward compatibility for older clients. An attacker sitting on-path intercepts the initial secure connection request and maliciously alters it, instructing the server that the client only supports obsolete, highly vulnerable legacy encryption (e.g., forcing a downgrade from secure TLS 1.3 to vulnerable SSL 3.0).
*   **The Exploit:** Once the systems agree to use the downgraded, mathematically broken legacy encryption, the attacker utilizes known automated exploits to effortlessly decrypt the resulting data stream.

## SSL Stripping
**SSL Stripping** is a specialized, devastating form of a downgrade attack that entirely removes encryption from secure web communications.
*   **The Mechanism:** An attacker initiates an on-path attack. When the victim types `http://bank.com`, the request is intercepted by the attacker.
*   **The Proxy Proxy:** The attacker establishes a secure, encrypted HTTPS connection directly with the bank's servers on behalf of the user. However, the attacker simultaneously maintains a completely unencrypted HTTP connection with the victim.
*   **The Result:** The web server communicates encrypted data to the attacker. The attacker receives it, decrypts it, reads it, and then explicitly strips away all encryption ("SSL strips") before forwarding the data to the victim over standard HTTP. The user assumes they are browsing securely, but the attacker is secretly reading every username, password, and financial record transmitted in plaintext.
