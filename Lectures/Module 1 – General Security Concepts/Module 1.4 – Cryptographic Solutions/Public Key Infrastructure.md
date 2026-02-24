# Lesson: Public Key Infrastructure
**Module:** 1.4

## Introduction: The Foundations of Modern Encryption
PKI technologies form the basis for our modern encryption. The term Public Key Infrastructure (PKI) is a very broad term in cryptography. Although it is customary to think of it only as technology, it refers to an entire complex including policies (Policies), procedures (Procedures), hardware, and software. All of these together are responsible for the creation, distribution, management, storage, revoking (Revoking), and execution of other processes related to Digital Certificates. In this lesson, we will dive deep into the differences between symmetric and asymmetric encryption, understand how keys are created, and how they are managed in an organization.

## 1. Basic Concepts in PKI and Certificate Authorities
**A. Broad Definition**
As mentioned, PKI does not just boil down to technology. Even in the smallest company, implementing PKI requires a lot of planning and making decisions about the encryption methods to be used.

**B. Trust and Identity**
Often the term PKI is used to describe the way we associate a certificate with people or devices.
• *Certificate Authority (CA):* This process is usually done in conjunction with a CA. The system is based on our ability to trust ("Trust") that a certain user or a certain device is really who they claim to be.

## 2. Symmetric Encryption
Before we understand public key encryption, we must understand the basis: Symmetric Encryption.
**A. One key for all operations**
As the name implies, in symmetric encryption we use the exact same key for both the encrypt (Encrypt) and decrypt (Decrypt) operations of the information.
• *Cinematic Imagery:* The instructor likens this to a single secret key located inside a briefcase, connected by handcuffs to a courier. This ensures that no one else will gain access to the key, since whoever holds the symmetric key can decrypt anything that was encrypted using it.

## 3. Asymmetric Encryption
This is the heart of the PKI. Unlike symmetric encryption, here we use two different keys.
**A. The Key Pair**
We use one key for encryption and another key for decryption.
• *Mathematical connection:* These two keys are mathematically related (Mathematically Related). They are created at the same time and in the same process.
• *The Separation:*
    1. *Private Key:* A key that only one person or one device has access to. No one else sees it. It is customary to protect it with a password and local storage.
    2. *Public Key:* A key available to everyone. It can be published on a website, sent to friends, or attached to a social media page.

## 4. The Encryption Process: Alice and Bob Scenario
To illustrate the process, the instructor uses the classic example of Alice and Bob:
1. *The Preparation:* Alice created a key pair and published her Public Key to everyone. Bob wants to send her an encrypted message.
2. *The Encryption (Sender side):*
    ◦ Bob writes a Plaintext message ("Hello, Alice").
    ◦ He uses Alice's public key within the encryption software.
    ◦ The result is Ciphertext (encrypted text).
3. *The Security:* At this stage, even if someone obtains the Ciphertext and the public key, they cannot read the message.
4. *The Decryption (Receiver side):*
    ◦ Alice receives the encrypted message.
    ◦ She uses her Private Key to decrypt the Ciphertext.
    ◦ The result reverts to the original Plaintext that Bob originally sent.

## 5. Key Management and Key Escrow
When it comes to a single person, they manage their keys themselves. But in a corporate environment with hundreds or thousands of users, a management solution is required.
**A. The Corporate Problem**
What happens if an employee leaves the company, moves to another department, or loses access, but the organization still needs to decrypt the business information encrypted by them?
**B. The Solution: Key Escrow**
This is a process where a third party (or an authorized internal entity) holds a copy of the private keys.
• *Method of Implementation:* After the users create keys, the keys are also stored in a central location.
• *Uses:*
    1. Decrypting information of an employee who left the organization.
    2. Government collaboration or with business partners requiring access to encrypted information as part of a project.
• *The Dilemma:* Handing over the private key to others might seem Controversial, but in some organizations it is a necessary step to maintain data Availability and business continuity.

## Executive Summary
Public Key Infrastructure (PKI) is the totality of hardware, software, and policy for managing digital certificates and trust on the network. While symmetric encryption (a single key for all operations) is fast but difficult to manage on a large scale, asymmetric encryption solves this using a key pair: a public key for encryption (available to everyone) and a private key for decryption (secret). This process ensures that only the private key holder can read the information. In large corporate environments, the use of Key Escrow is required to ensure the organization can recover encrypted information even in the event of an employee leaving or loss of access.
