# Lesson: Hashing and Digital Signatures
**Module:** 1.4

## Introduction: The Digital Fingerprint
The hashing process (Hashing) is one of the cornerstones of information security, providing us with three main principles: Integrity, Authentication, and Non-repudiation. Cryptographic hashing is used to represent data using a short text string. We will often hear the terms Message Digest or Fingerprint in this context. Just as a human fingerprint represents a person, a digital fingerprint represents information stored elsewhere. It is important to remember that hashing is not Encryption; you cannot recover the original data if all you have is the Hash, just as you cannot recreate a person solely based on their fingerprint.

## 1. Hashing Fundamentals
**A. Uniqueness and Sensitivity to Changes**
To demonstrate how hashing works, we will use a very common algorithm called SHA256. This algorithm generates 256 bits of information, represented as 64 hexadecimal characters.
• *Demonstration:* Let's take the sentence: "My name is Professor Messer." (with a period at the end). Running this sentence in a hashing application will produce a long string of characters.
• *Sensitivity:* If we change just a single character in the sentence, for example, replacing the period with an exclamation mark ("!"), the resulting Hash will be completely different from the first one.
• *Conclusion:* This feature allows us to verify integrity. If the Hash has changed, it means the original information has changed. We expect different outputs to be received for every type of different input.
**B. Collisions**
Ideally, we would never want different situations to produce the same Hash.
• *Definition:* A situation where two different inputs produce exactly the same Hash value is called a Collision.
• *Rarity:* In practical use with modern algorithms, collisions should be an extremely rare event.
• *Case Study - MD5:* The MD5 hashing algorithm is an example of an algorithm where collision issues were found in 1996. Because of this, the unequivocal recommendation is not to use MD5 anymore. In the example presented in the source, you can see two inputs with minuscule differences (single different characters) that produce exactly the same Hash in MD5.

## 2. Practical Uses of Hashing
**A. File Integrity**
One of the most common uses is verifying that a file we downloaded is identical to the source.
• *The Scenario:* Downloading important files, such as a Linux Distribution.
• *The Process:* The download site displays the Hash of the ISO file. The user downloads the file, runs the same hashing algorithm on their local computer, and compares the result to the one on the site. If the Hashes are identical, the file is exactly the same file that exists on the site.
**B. Password Storage**
We should never store user passwords as Plain text, and it is also not recommended to encrypt them (because encryption can be decrypted if the key is stolen).
• *The Solution:* Storing the Hash of the password. Thus, even if the database is breached, the attacker does not have the passwords themselves but only their representation.
• *The Login Process:* The user enters a password -> The system performs a Hash on it -> The system compares the result to the Hash stored on the server. If there is a match, access is granted.

## 3. Password Protection: Salting & Rainbow Tables
Attackers have developed methods for reverse engineering hashes to discover passwords.
**A. Rainbow Tables**
This is a pre-compiled set of all possible inputs and their corresponding Hashes.
• *The Threat:* Using such a table, an attacker can take a password Hash and discover the original password within a few seconds, instead of spending days or weeks on a Brute Force attack.
**B. Salting**
To defend against rainbow tables, we add additional information to the password before hashing.
• *The Process:* Adding random information called Salt to the original password.
• *The Result:* Even if two users chose the same password (e.g., "dragon"), each of them will have a different, random Salt appended to it. As a result, the Hash stored in the database will be completely different for each of them.
• *Effectiveness:* Using Salt renders rainbow tables unusable, forcing the attacker to resort to much slower methods.

## 4. Digital Signatures
A digital signature is the electronic equivalent of signing a physical document, combining hashing with asymmetric cryptography.
**A. Goals of the Digital Signature**
1. *Integrity:* Proof that the message was not altered during transmission.
2. *Authentication:* Proving the source of the message (the identity of the sender).
3. *Non-repudiation:* The sender cannot deny that they were the one who sent the message.
**B. The Technical Mechanism (Keys Usage)**
The signing process is almost the opposite of regular data encryption:
• *Signing:* The sender uses their Private Key to create the signature.
• *Verification:* The receiver uses the sender's Public Key to verify the signature. If the verification fails, it means something in the document has changed and it cannot be trusted.
**C. The Signing and Verification Process - Step by Step (Alice & Bob Scenario)**
Alice wants to send Bob an email message with the content "You're hired, Bob" and sign it digitally.
1. *Creating the Signature (at Alice's end):*
    ◦ The source message (Plaintext) is "You're hired, Bob".
    ◦ Alice's email software performs Hashing on this message.
    ◦ Then, the software encrypts the Hash that was generated using Alice's Private Key.
    ◦ This encrypted result is the Digital Signature, and it is attached to the message.
    ◦ Note: The message itself is sent as plain text (in this example); only the signature is appended to it.
2. *Verifying the Signature (at Bob's end):*
    ◦ Bob receives the message and the signature.
    ◦ Bob's email software takes the digital signature and decrypts it using Alice's Public Key.
    ◦ The result of the decryption is the original Hash that Alice created.
    ◦ Simultaneously, Bob performs an independent Hashing operation on the text he received ("You're hired, Bob").
    ◦ The Comparison: The software compares the Hash decrypted from the signature with the Hash currently calculated. If they are identical – the signature is verified: the document has not been altered, and it was indeed sent by Alice.

## Executive Summary
Hashing is a one-way process for creating a digital "fingerprint" that ensures the Integrity of information (e.g., downloading ISO files). Weak algorithms like MD5 are prone to Collisions and should therefore be avoided in favor of SHA256. In password security, using Salting – adding random information before hashing – is critical to neutralize the threat of Rainbow Tables that allow rapid cracking. Digital Signatures use hashing and asymmetric keys (signing with a Private Key, verifying with a Public Key) to provide not only integrity but also Authentication and Non-repudiation.
