# Lesson: Encryption Technologies
**Module:** 1.4

## Introduction: Dedicated Security Hardware
Encryption technologies provide us with the ability to store keys securely, perform cryptographic functions, and maintain data privacy. In this lesson, we will focus on the hardware components and systems designed exactly for this purpose. We will learn about the difference between protection chips for a single computer (TPM) and encryption behemoths for data centers (HSM), understand how thousands of keys are managed simultaneously, and discover what the "Secure Enclave" is that likely exists on your mobile phone.

## 1. Trusted Platform Module (TPM)
*Practical Context: Full-disk Encryption*
The most common use of a TPM in organizations is for Full-disk encryption, such as the use of BitLocker.
• *Secure key storage:* The TPM can generate and store BitLocker keys locally and securely on the system.
• *Protection against attacks:* Access to the TPM is protected by a password. The mechanism is built in such a way that a Brute Force attack or a Dictionary Attack cannot be launched against it to extract the information stored inside.

## 2. The Secure Enclave
*Technical Capabilities of the Secure Enclave:*
The Secure Enclave includes a set of advanced hardware capabilities:
1. *Separate Boot ROM:* The processor manages and monitors the boot process of the system.
2. *True Random Number Generator:* Used for creating strong keys.
3. *Real-time encryption:* Encrypting information as it enters and leaves the memory.
4. *Root Keys:* Cryptographic keys built into the hardware that cannot be changed, serving as a foundation for all other encryptions in the system.
5. *Hardware AES encryption:* Performing encryption operations efficiently at the processor level.

## Executive Summary
Encryption technologies provide hardware and software solutions for data protection. At the level of the individual device, the TPM chip provides secure key storage and protection against Brute Force attacks (which is critical for BitLocker). For data centers, HSM components provide centralized key management and encryption acceleration for thousands of servers. Managing keys within the organization is handled using Key Management Systems that enable automatic Key Rotation and centralized reporting. Finally, in mobile devices and personal computers, the separate Secure Enclave processor guarantees data privacy through hardware encryption (AES) and secure boot process management.
