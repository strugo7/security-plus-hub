# Lesson: Monitoring Data
**Module:** 4.5

## File Integrity Monitoring (FIM)
In a healthy environment, the core executable binaries and library packages for an application almost never change (unless formally patched/updated). If a critical system file suddenly changes overnight, it frequently indicates an attacker has successfully compromised the system and silently installed a backdoor or rootkit.
*   **The Concept:** A **File Integrity Monitor (FIM)** continuously calculates the cryptographic hash of every critical operating system file. If a file is maliciously altered by even a single byte, the hash calculation mathematically fails, instantly triggering a massive security alert.
*   **Tools:**
    *   *Windows:* `sfc` (System File Checker) provides basic, on-demand FIM capabilities to repair corrupted or modified core Windows binaries.
    *   *Linux:* **Tripwire** is a prominent, dedicated FIM application that continuously monitors Linux file systems in real-time.
    *   *HIPS:* Most modern Host Intrusion Prevention Systems (HIPS) natively incorporate robust FIM capabilities.

## Data Loss Prevention (DLP) Overview
DLP solutions are explicitly engineered to prevent sensitive organizational data (Medical records, Social Security Numbers, Proprietary Source Code) from ever leaving the corporate environment. DLP monitors data across three specific states.

### 1. Data in Motion (Network DLP)
This DLP solution operates as an inline network appliance or is integrated directly into the Next-Generation Firewall.
*   **The Function:** It aggressively inspects all outbound network packets in real-time. If an employee aggressively attempts to upload a 5GB database categorized as "Extremely Confidential" to a personal Google Drive account, the Network DLP instantly terminates the TCP connection and violently blocks the upload before it occurs.

### 2. Data in Use (Endpoint DLP)
This DLP solution is deployed as a software agent installed directly on the employee's physical laptop or workstation.
*   **The Function:** It monitors immediate, active user behavior. If a user attempts to highlight sensitive credit card numbers in a secure application, copy them, and then paste them into a completely unencrypted personal Word document, the Endpoint DLP agent intercepts the action and forcefully disables the "Paste" functionality.

### 3. Data at Rest (Storage DLP)
This DLP solution proactively scans corporate file servers, massive Storage Area Networks (SANs), or cloud storage buckets (like AWS S3).
*   **The Function:** It constantly crawls the file system searching for violations of policy. If a user accidentally saves an unencrypted Excel spreadsheet containing 50,000 plaintext employee Social Security numbers to a globally accessible public network share, the Data at Rest DLP immediately discovers it, quarantines the file, and alerts administrators.

## USB Blocking
The physical USB port represents a massive vector for data exfiltration and malware insertion.
*   **The Threat:** An employee plugging in a personal 1TB flash drive can silently copy gigabytes of proprietary corporate data and literally walk out the front door. Conversely, an attacker dropping a malicious USB drive in the corporate parking lot relies on a curious employee plugging it into a secured workstation, instantly deploying a rapid-infecting worm.
*   **The Solution:** Organizations utilize Endpoint DLP agents or Active Directory Group Policy to rigidly disable USB mass storage capabilities globally. Employees can still plug in a USB mouse or keyboard, but the system categorically refuses to mount any USB flash drives or external hard drives.

## Cloud and Email DLP
*   **Cloud DLP:** As organizations migrate completely to environments like Office 365 or Google Workspace, they must deploy Cloud Access Security Brokers (CASBs) or Cloud-native DLP to continuously monitor data sharing. If a user tries to share a confidential SharePoint document with an external Gmail address, the Cloud DLP blocks the share link.
*   **Email DLP:** Email remains a primary attack vector. Email DLP heavily scrutinizes every outbound message and its file attachments. If an employee attempts to carelessly email an unencrypted spreadsheet containing W-2 tax information, the Email DLP catches it, instantly blocks the outbound transmission, and quarantines the message for review.
