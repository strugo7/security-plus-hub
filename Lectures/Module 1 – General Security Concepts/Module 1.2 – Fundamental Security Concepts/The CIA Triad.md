# Lesson: The CIA Triad
**Module:** 1.2

## Introduction: The Foundations of Information Security
The CIA Triad describes the foundational goals of IT security. It is a mnemonic device designed to remind us of the core principles we protect: Confidentiality, Integrity, and Availability. Sometimes you will encounter the term AIC Triad; the use of this acronym is intended to differentiate the model from the US Central Intelligence Agency. However, because the CIA acronym is easier to remember, we typically use this term, understanding that it has no connection to the federal agency. You will often see the triad written as a triangle, with each leg representing one of these three security objectives.

## 1. Confidentiality
**A. Definition**
The letter 'C' in the triad represents Confidentiality. The goal is to prevent someone from gaining unauthorized access to private information. We must ensure that we provide the information only to the right people in a confidential way.

**B. Methods for Implementing Confidentiality**
1. *Encryption:* One of the most common ways to provide confidentiality. In this process, a person encrypts the data and sends it to another. The recipient decrypts the data to see the original plaintext.
    ◦ *Security Implication:* Anyone who is "in the middle" (On-path) and manages to intercept the encrypted data will not understand what is inside and will not be able to discern any important information.
2. *Access Controls:* Another method is setting boundaries on access. We can limit who is allowed to access specific types of information.
    ◦ *Practical Example:* Configurations that allow someone in the Marketing department to view and edit all marketing presentations, but completely restrict their access to information belonging to the Accounting department.
3. *Authentication:* Requiring additional Authentication Factors when logging into a system. A person will not be able to access an account unless they possess the appropriate authentication credentials. Adding more factors strengthens the level of confidentiality.

## 2. Integrity
**A. Definition**
The letter 'I' in the CIA Triad refers to Integrity. If we are sending information from one person to another, we want to be sure that the recipient really is receiving exactly what was sent from the origination, without any alterations.

**B. Methods for Implementing Integrity**
1. *Hashing and Digital Fingerprints:* We can verify integrity using hashing, which ensures that the information has not been altered.
2. *Digital Signatures and Certificates:* It is common to use digital certificates to identify devices or people and provide additional factors of integrity, especially when transferring data from one device to another.
3. *Non-repudiation:* This means that we have proof of integrity, and we can confirm without a doubt that the information we have received really did come from the originating party.

## 3. Availability
**A. Definition**
The letter 'A' in the CIA Triad stands for Availability. We want to be sure that all of our systems remain up and running at all times, ensuring that people have reliable access to the data they need to view.

**B. Methods for Implementing Availability**
1. *Fault Tolerance:* One way to provide availability is to design systems with multiple components. If one of those components fails, the secondary component can pick up the load and continue to operate normally.
2. *Patch Management:* To ensure systems remain available, they must be constantly managed and updated by patching. This ensures that the systems are as stable as possible and allows us to close any existing security holes, preventing attackers from gaining access through an exploit.

## Executive Summary
The CIA Triad forms the basis for any information security program and includes three critical goals: Confidentiality is achieved through encryption and access control to prevent information exposure; Integrity ensures that the information has not been altered using hashing and digital signatures; and Availability ensures that systems remain active for users through fault tolerance and patch management to prevent downtime and breaches.
