# Lesson: Password Attacks
**Module:** 2.4

## The Vulnerability of Passwords
Passwords frequently serve as the initial and final security perimeter for an organization's systems. If an application developer erroneously configures a system to store user passwords in readable plaintext rather than securely hashing them, a database breach immediately exposes every single user account to compromise.

## Hashing: The Secure Storage Standard
A **Hash** is a one-way cryptographic mathematical algorithm. 
*   **The Transformation:** It takes data of an arbitrary length (your password) and transforms it into a fixed-length string of text (the fingerprint or message digest).
*   **The Mathematical Principle:** Even a microscopic change in the input password (e.g., changing `password!` to `password?`) results in a completely different hash output.
*   **One-Way Operation:** It is mathematically impossible to reverse-engineer the resulting hash back into its original plaintext password. Therefore, even if attackers steal the database containing the hashes, they do not inherently know your password.

## Password Spraying Attacks
**Password Spraying** is an automated attack designed to evade account lockouts and avoid detection by security monitoring tools.
*   **The Evasion:** Administrators globally enforce account lockouts (e.g., the account temporarily freezes after 5 incorrect login attempts). If an attacker tries 5,000 passwords against *one* account, the account locks instantly, sounding alarms.
*   **The Spray:** Instead of attacking one account with many passwords, the attacker takes 1 to 3 incredibly common passwords (e.g., `Password123!`, `Welcome1`) and systematically tests them against *thousands* of different user accounts across the enterprise. 
*   **The Result:** The attacker quietly discovers any accounts using weak passwords without tripping the standard lockout threshold.

## Brute Force Attacks
A true **Brute Force Attack** involves systematically guessing every conceivable combination of letters, numbers, and symbols until the correct password is mathematically determined.

### Online Brute Force
An online brute force attempts to guess the password directly against the live application's login portal over the network. 
*   **Limitation:** This is incredibly slow due to network latency and is highly prone to triggering rapid account lockouts.

### Offline Brute Force
An offline brute force is the preferred method for advanced attackers. 
*   **The Method:** The attacker first breaches the network to steal the backend file or database containing all the hashed passwords (e.g., the `/etc/shadow` file in Linux, or exporting the Active Directory NTDS.dit database).
*   **The Execution:** The attacker takes the hash file entirely offline to their own massive, highly powered parallel computing cluster. Because they are offline, there are zero account lockouts. The attacker rapidly generates millions of potential passwords per second, hashes them, and checks if the generated hash perfectly matches the stolen hash. When a match occurs, the password is cracked.
