# Lesson: Operating System Security
**Module:** 4.5

## Active Directory (AD)
In a major enterprise environment utilizing Microsoft Windows, the foundational core of the entire security operation is **Active Directory**.
*   **The Central Database:** Active Directory acts as a massive, centralized, highly redundant database. It contains cryptographic hashes of user passwords, detailed lists of every single computer on the domain, definitions of network file shares, and all printer configurations.
*   **Central Authentication:** Instead of managing 500 individual local passwords on 500 different laptops, all authentication is centralized. When a user types their password on a corporate laptop, that system securely queries the central Active Directory database to seamlessly validate the credentials across the entire network.
*   **Permissions:** AD provides the structural framework to assign permissions. Administrators create organizational Security Groups (e.g., "HR_Department") within AD and grant that singular group access to specific folders, vastly streamlining identity management.

## Group Policy
Active Directory manages *who* people are; **Group Policy** violently enforces *what* they are allowed to do.
*   **The Enforcement Engine:** Group Policy allows administrators to overlay thousands of mandatory configuration settings and security restrictions directly onto the users and computers listed in the Active Directory database.
*   **Centralized Control:** From one single central management console, an administrator can create a configuration dictating that USB drives are strictly disabled, the firewall cannot be turned off, and the user's desktop background is permanently locked to the corporate logo. 
*   **The Scale:** The active Directory infrastructure silently and automatically forces these mandatory Group Policy changes out to simultaneously lock down thousands of endpoints across the globe without requiring physical access to a single device.

## Security-Enhanced Linux (SELinux)
Operating systems natively handle permissions differently, leading to varying levels of default security.
*   **Discretionary Access Control (DAC):** A standard, "out-of-the-box" install of Linux operates using DAC. This means the person who creates a file (the owner) has the full "discretion" or authority to completely alter the permissions and grant anyone else on the system access to that file. 
*   **Mandatory Access Control (MAC):** In highly secure environments (military, financial), DAC is deemed too risky. The environment mandates that *only* the central administrator can explicitly set permissions. If a user creates a secret document, the underlying system rigidly prevents that user from accidentally or intentionally changing the permissions to share it publicly.

**SELinux Execution:** To achieve this extreme level of lockdown on Linux, organizations deploy a suite of kernel modifications called **Security-Enhanced Linux (SELinux)** (originally developed by the NSA). SELinux ruthlessly enforces the principle of Least Privilege at the deepest operating system level, ensuring that even if an attacker successfully compromises a particular application process on the server, the SELinux MAC framework physically prevents that process from accessing unauthorized files or seizing control of the wider system.
