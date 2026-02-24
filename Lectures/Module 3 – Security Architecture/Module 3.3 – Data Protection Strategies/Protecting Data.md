# Lesson: Protecting Data
**Module:** 3.3

## Geographic Restrictions and Geofencing
One way to protect data is to make policy decisions on where the data is located and where the user requesting it might be physically located. These are **geographic restrictions**.
*   **IP-Based Location:** We can estimate location by seeing what IP subnet a user is connecting from. While reasonably accurate for internal workstations, it fails for wireless or external mobile devices.
*   **Geolocation:** Using GPS coordinates from mobile devices or cross-tabulating known 802.11 wireless SSIDs provides a highly accurate description of a person's physical location.
*   **Geofencing:** Once location coordinates are established, we can enforce **Geofencing**. If an employee is physically standing inside the corporate headquarters (inside the geofence), they can access the sensitive database. If they step out the front door, access is immediately and automatically revoked.

## Encryption Fundamentals
A primary method for protecting data across all states (rest, transit, use) is **Encryption**.
*   **The Process:** Encryption takes open, readable data (**Plaintext**) and mathematically scrambles it into a completely unreadable format (**Ciphertext**).
*   **Confusion:** A core principle of cryptography is *confusion*, where the resulting ciphertext looks radically and dramatically different from the original plaintext, hiding all patterns.
*   **Decryption:** Provided you have the correct cryptographic algorithm and the highly guarded **Decryption Key**, the ciphertext can be mathematically reversed back into the original plaintext.

## Hashing and Integrity
Unlike encryption, **Hashing** is a one-way cryptographic function.
*   **The Concept:** A hash mathematically represents data as a fixed-length string of text, often called a *message digest* or a *digital fingerprint*. 
*   **One-Way:** Crucially, you cannot reverse calculate the original plaintext from the hash. If you hash an entire gigabyte video file, the output is simply a short string of characters. 
*   **The Purpose:** Hashing proves **Integrity**. When downloading a file, the publisher provides the file's hash. You download the file and run the same hashing algorithm. If your resulting hash perfectly matches the publisher's hash, you mathematically prove the file was not corrupted or maliciously altered during transit.
*   **Collisions:** A fundamental rule of hashing is that two different inputs must *never* produce the exact same output hash. If they do, it is called a **Collision**, which violently breaks the security of the algorithm.

## Obfuscation and Data Masking
*   **Obfuscation:** Taking perfectly understandable data (like source code) and running it through a processor that makes it intentionally confusing and extremely difficult for a human to read or reverse-engineer, while ensuring the code still compiles and functions normally.
*   **Data Masking:** Hiding specific portions of sensitive data before presenting it. A classic example is a receipt printing only the last four digits of a credit card (`**** **** **** 1234`), natively protecting the full number from shoulder surfing.

## Tokenization
**Tokenization** is fundamentally different from encryption or hashing because there is no complex mathematics involved to "protect" the data.
*   **The Implementation:** Instead of transmitting an actual credit card number across the network, the system substitutes the sensitive data with a completely random, digitally generated **Token**. 
*   **The Security:** If an attacker intercepts the network traffic and steals the token, it is entirely useless. The token is typically single-use, and there is absolutely no mathematical relationship between the token and the original credit card number to decipher.

## Segmentation and Permission Restrictions
*   **Segmentation:** Large organizations avoid storing all customer data in one colossal database. By segmenting the data across multiple disconnected databases, an attacker who breaches one system only gets a fraction of the total data, minimizing the catastrophic impact.
*   **Permission Restrictions:** Enforcing strict Access Control Lists (ACLs). This ensures that even authenticated users are strictly limited to accessing only the specific files and directories required to perform their daily job functions (Least Privilege).
