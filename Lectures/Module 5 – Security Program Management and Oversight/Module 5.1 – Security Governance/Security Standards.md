# Lesson: Security Standards
**Module:** 5.1

## The Role of Standards
While broad "Policies" dictate the high-level goals of the organization, **Security Standards** meticulously define the exact, mandatory technical requirements and technological parameters necessary to practically enforce those policies.

Standards completely eliminate ambiguity. They ensure deep consistency across massive, complex enterprise environments. Many organizations adopt foundational standards directly from globally respected entities like the International Organization for Standardization (ISO) or the National Institute of Standards and Technology (NIST).

## Password Standards
A general security policy might state: "All user accounts must be fiercely protected." The corresponding **Standard** dictates exactly mathematically how that is achieved:
*   **The Parameters:** The standard explicitly mandates: Minimum 14 characters, mandatory inclusion of uppercase, lowercase, numbers, and special characters.
*   **The Storage:** The standard dictates that passwords must never be stored in plaintext; they must specifically be stored mathematically utilizing an aggressive hashing algorithm (like SHA-256) combined with a random cryptographic Salt.
*   **The Lifecycle:** The standard defines the precise frequency of mandatory password resets and the exact, heavily authenticated process a help desk technician must follow to issue a temporary password credential.

## Access Control Standards
Standards rigidly govern the complex mechanisms of assigning and destroying access.
*   **The Assignment:** The standard dictates the formal approval process. It might mandate that granting a user "Administrator" access requires the explicit, documented digital signature of a Director-tier manager.
*   **The Architecture:** In highly classified environments, the standard may completely forbid the use of Discretionary Access Control (DAC) and explicitly mandate the deployment of rigid Mandatory Access Control (MAC) frameworks (like SELinux).
*   **The Revocation:** Just as importantly, the standard dictates the unforgiving process of revocation. If a contractor is terminated, the standard mandates their VPN access must be mathematically severed within precisely 15 minutes.

## Physical Security Standards
Securing the physical perimeter requires universally applied, consistent standards, especially in global organizations.
*   **The Entrance:** The standard may aggressively mandate that all employees, contractors, and visitors must continuously display a physical ID badge above the waist.
*   **Access Mechanisms:** It might specify the exact technological standard for the doors: mandating the use of proximity card readers explicitly combined with a secondary biometric retinal scanner for access to the primary server room.
*   **The Rules of Engagement:** The standard dictates behavioral requirements, such as fiercely prohibiting "tailgating" (holding the secure door open for the person behind you) and mandating a permanent physical escort for all un-badged visitors.

## Encryption Standards
Due to the intense mathematical complexity of cryptography, standards must violently restrict the types of algorithms authorized for use on the corporate network.
*   **The Prohibition:** The standard explicitly blacklists inherently broken, obsolete algorithms (like DES or MD5).
*   **The Mandate:** It dictates the required cipher suites based on the data state:
    *   *Data at Rest:* The standard demands the entire physical hard drive must be aggressively encrypted utilizing AES-256 bit cryptography.
    *   *Data in Transit:* The standard vigorously mandates that all web traffic must be encapsulated entirely within a TLS 1.3 encrypted tunnel, fiercely rejecting any legacy SSL connections.
