# Lesson: Multifactor Authentication
**Module:** 4.6

## The Weakness of Passwords
The vast majority of significant corporate data breaches fundamentally stem from stolen, leaked, or incredibly weak passwords. In an environment where attackers heavily utilize massive botnets designed entirely for relentless password spraying and credential stuffing, relying singularly on a password is an unacceptable architectural risk. Security mandates the implementation of **Multifactor Authentication (MFA)**.

MFA mathematically requires the user to successfully present two or more *entirely distinct categories* of authentication factors before access is granted. Providing two different passwords does not constitute MFA; that is simply single-factor authentication utilizing the same weak category twice.

## Factor 1: Something You Know
This is the most standard, recognizable, and inherently weakest factor because it can be trivially shared, written down, or socially engineered.
*   **Examples:** Passwords, PIN codes (Personal Identification Numbers used at ATMs), or the specific swiping pattern required to unlock a smartphone screen. Ultimately, it is information stored entirely within your brain.

## Factor 2: Something You Have
This heavily robust factor requires the user to physically possess a specific tangible item. An attacker violently halfway across the world cannot easily steal this physical object.
*   **Examples:** 
    *   **Smart Cards:** A physical badge containing an embedded cryptographic microchip, often utilized in conjunction with a PIN (fulfilling both "Have" and "Know").
    *   **Hardware Tokens:** Distinct keychain fobs (like RSA SecurID) that display a constantly changing, mathematically pseudo-random 6-digit code synchronized perfectly with a central server.
    *   **USB Security Keys:** Formidable USB devices containing an un-exportable private certificate. When physically inserted, it mathematically proves you possess the key.
    *   **Software Tokens / Mobile Phones:** Utilizing an application on a smartphone (like Google Authenticator) that generates synchronized codes. While convenient, receiving highly sensitive SMS text message codes is increasingly deprecated due to the severe vulnerability of SIM-swapping attacks.

## Factor 3: Something You Are (Biometrics)
This is fundamentally the strongest factor because it mathematically relies on unique, inherent physical characteristics that are exceptionally difficult for an attacker to effectively steal, synthesize, or replicate cleanly.
*   **Examples:** 
    *   **Fingerprint Scanners, Retina Scans, or Facial Recognition.**
*   **The Mechanism:** To prevent the massive danger of a biometric database being violently breached, biometric systems do not typically store a high-resolution image of your fingerprint. They store an incredibly dense, irreversible mathematical hash representing the unique geometry of the print. 
*   **The Limitation:** If a password is stolen, it is easily changed. If an attacker successfully replicates your biometric profile, you fundamentally cannot change your physical fingerprint, highlighting the critical architectural importance of utilizing biometrics strictly in conjunction with other distinct factors.

## Factor 4: Somewhere You Are (Location / Geolocation)
The fundamental physical or logical location of the user can act as a crucial, invisible authentication barrier.
*   **The Implementation:** If a user successfully inputs their correct password, but the login originates from a hyper-hostile, sanctioned nation-state IP address—while five minutes earlier they successfully swiped their physical badge into the New York corporate office—the system instantly flags the physical impossibility, denies the login request, and triggers a massive alert.
*   **Precision:** In highly secure environments, basic IP address routing is insufficient. The system may mandate hyper-accurate GPS coordinates directly from the mobile device to mathematically ensure the user is standing precisely inside a designated, secure physical geofence before granting access.
