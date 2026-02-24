# Lesson: Encrypting Data
**Module:** 1.4

## Introduction: Protecting Data in Every State
We use many diverse encryption techniques to keep our data secure. In this lesson, we will learn how to protect data in various states: when it is stored in databases or on hard drives, and when it is traversing the network. Additionally, we will dive deep into cryptographic keys, understand the differences between various algorithms, and learn how to strengthen defenses against Brute Force attacks.

## 1. Encrypting Data at Rest
When we talk about protecting data stored on any storage device—such as an SSD, Hard Drive, or any other media—we refer to the concept of Data at Rest. There are two main approaches to implementing this encryption:
**A. Full Disk Encryption**
In this method, we encrypt the entire content of the drive or storage medium (Volume).
• *Operating Systems:*
    ◦ In Windows: The built-in tool for performing full drive encryption is called BitLocker.
    ◦ In macOS: The equivalent tool is called FileVault.
    ◦ Other operating systems offer similar solutions for encrypting the entire storage medium.

**B. File Level Encryption**
Sometimes there is no need to encrypt the entire drive, but only a single file or a specific folder within the system.
• *Encrypting File System (EFS):* In the Windows operating system, this is a feature built into the NTFS file system.
    ◦ *Practical Application:* To activate this, go to the "Properties" of the file or folder, select "Advanced" (Advanced Attributes), and check the option "Encrypt contents to secure data".
• There are also many third-party tools that allow similar functionality for Linux, macOS, and Windows.

## 2. Database Encryption
Most of the data we consume online is stored within databases. There are various strategies for protecting this data, and each has its pros and cons (Trade-offs) in terms of performance.
**A. Transparent Encryption**
• *The Principle:* Using a Symmetric Key to encrypt the entire contents of the database.
• *The Challenge (Overhead):* Every time data is pulled from the database, the system must perform a decryption process, and every time data is written—an encryption process. This creates a load on the system.

**B. Column Level Encryption**
Not all information in the database is sensitive or private. Sometimes it is better to encrypt only specific data to save resources.
• *Example:* Suppose there is a table in an employee database that includes: employee ID, first name, last name, and Social Security Number.
    ◦ We can leave the ID and names as Plain text.
    ◦ We will encrypt only the Social Security Number column.
• *The Practical Advantage:* If you need to search for an employee by name, the search is performed quickly on plain text without the need for decryption. Only if access to the Social Security Number is required will the system decrypt the specific record or column.

## 3. Data in Transit
When information is sent over the network, we must ensure that if someone taps into this connection, they will not be able to understand the content of the information.
**A. Browser Surfing (HTTPS)**
When you watch a video or browse a site, the communication is usually conducted over HTTPS. This means that all the data traversing the network is encrypted.
**B. Virtual Private Network (VPN)**
This solution is used to connect between different sites or for remote access.

## 4. Algorithm Comparison and Key Management
*Comparison between algorithms (Example: DES vs. AES):*
There is no need to know the exact diagrams for the exam, but it is important to understand the structural differences:
• *DES (Data Encryption Standard):* Includes 5 different steps, splits the data into left and right sides, and finally produces a 64-bit Ciphertext.
• *AES (Advanced Encryption Standard):* Operates completely differently—takes plaintext and a secret key, passes them through a Cipher, and produces an output. AES has versions that produce different output levels.
• *The Guiding Principle:* You cannot encrypt with DES and decrypt with AES. The Security Administrator must ensure that both sides agree in advance on the algorithm that will be used.

*Key Stretching / Key Strengthening:* This is an additional technique to protect existing keys.
• *The Method:* Performing the encryption or hashing process a large number of times on a single piece of information.
    ◦ *For example:* Performing a Hash on a password -> Performing a Hash on the result -> and so on (over and over again).
• *The Goal:* This creates additional Overhead for the attacker. If the attacker tries to perform a Brute Force attack on data that has undergone Key Stretching, they must perform the multiple decryption process for each and every guess, which significantly slows down the process and makes it unviable.

## Executive Summary
Information security requires encryption in three states: At Rest, where we will use full disk encryption (BitLocker, FileVault) or file encryption (EFS); in databases, where we choose between full transparent encryption and efficient column-level encryption (for sensitive data like SSN); and In Transit, via HTTPS or VPN tunnels (IPsec/SSL protocols). Encryption security relies on public and reliable algorithms (like AES) combined with secret Keys. To defend against Brute Force attacks, we use long keys (over 128-bit in symmetric encryption) and Key Stretching techniques that force the attacker to perform many operations for each cracking attempt.
