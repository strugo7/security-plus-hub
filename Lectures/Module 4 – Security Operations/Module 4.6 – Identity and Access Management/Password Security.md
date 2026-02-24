# Lesson: Password Security
**Module:** 4.6

## Password Complexity and Entropy
If an organization fundamentally relies on passwords, it must rigidly enforce configurations that mathematically maximize the password's **Entropy** (its overall unpredictability and resistance to aggressive, automated cryptographic cracking tools).
*   **Complexity Rules:** The system is engineered to categorically reject passwords composed simply of single dictionary words. It forces the mandatory inclusion of upper and lowercase letters, numbers, and highly specific special characters.
*   **Password Length:** Length exponentially increases mathematical entropy far faster than complexity. An incredibly long phrase like `TheGreenDogRunsFast` is profoundly more mathematically difficult to crack than a complex but dangerously short password like `P@ss12`. Consequently, modern architectural standards repeatedly mandate massive minimum character lengths.
*   **Password Expiration (The Debate):** Historically, administrators violently forced users to change passwords every 30-90 days globally. However, modern guidance dictates this often heavily backfires. Frequent forced expiration relentlessly trains users to create incredibly weak, predictable passwords (e.g., `PasswordFall1!`, `PasswordWinter2!`). Many modern standards recommend abandoning forced expiration entirely unless there is verifiable evidence the credential was compromised.

## The Password Manager
The most fundamental security best practice demands users create completely unique, incredibly complex, massive passwords for every single website and application perfectly. Because achieving this is completely impossible for the human brain, security architectures must deploy a **Password Manager**.
*   **The Function:** A heavily secured vault that acts as a centralized database securely storing thousands of complex passwords. The entire massive database is fiercely protected by military-grade encryption keys. A password manager completely eliminates the inherent hazard of password reuse across completely disparate websites.
*   **The Master Key:** Because the entire database is protected by a solitary "Master Password," the overall security of the system relies utterly on defending that single credential. It absolutely mandates establishing highly aggressive Multi-Factor Authentication protecting the vault itself.

## The Shift to Passwordless
Passwords, regardless of length or complexity, are inherently, foundationally flawed because they simply can be shared or stolen. The industry is aggressively engineering the architectural shift toward completely **Passwordless Authentication**.
*   **The Implementation:** This entirely removes the fundamental reliance on anything the user "knows." Users authenticate relying completely on things they "have" (mobile phones generating cryptographic assertions) or things they "are" (Windows Hello facial biometric recognition). 
*   **The Advantage:** It mathematically destroys the primary vector for mass network compromise. An attacker in a hostile nation cannot perform a credential stuffing attack using a stolen generic password list if the entire target system fundamentally does not utilize passwords logically.

## Just-In-Time Permissions (JIT) (Related IAM Concept)
In an enterprise environment, establishing persistent, permanent Administrative accounts is incredibly dangerous. If an attacker violently breaches a standard, unprivileged user account, the damage is relatively contained. If they successfully breach an active Administrative account, they can instantly destroy the entire Active Directory domain natively.
*   **The JIT Solution:** Organizations systematically eliminate all permanent admin accounts. Instead, when an IT technician definitively requires administrative access to resolve a specific server failure, they formally submit a request to a central clearinghouse.
*   **Ephemeral Credentials:** The system generates a brand-new set of highly privileged administrator credentials on the fly, precisely assigns them to the technician, and crucially, sets an unalterable, heavily restricted time limit (e.g., 60 minutes).
*   **The Security:** Once the 60 minutes violently expire, the system automatically revokes the privileges and comprehensively obliterates the temporary credentials. Therefore, if the technician's workstation is compromised the following day, the attacker natively finds absolutely zero persistent administrative credentials left to exploit.
