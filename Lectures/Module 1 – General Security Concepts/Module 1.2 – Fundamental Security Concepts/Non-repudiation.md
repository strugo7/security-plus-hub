# Lesson: Non-repudiation
**Module:** 1.2

## Introduction: Digital Signatures and Trust
One of the most important foundations of cryptography is ensuring that when someone sends data to a third party, that third party is able to verify that the information really came from the original sender. We are familiar with this concept in our daily lives when signing a contract: we sign our name at the bottom of the page, and if someone looks at it later, they can see our signature and reasonably conclude that the contract was signed by us. In the digital world, this concept is called Non-repudiation. In this lesson, we will learn how cryptography implements this using two critical components: Proof of Integrity and Proof of Origin (with high assurance of authenticity).

## 1. Proof of Integrity and Hashing
**A. Definition of Proof of Integrity**
Proof of integrity means that we can verify that any data we have received is exactly the same data that was originally sent. This confirms that our data is accurate, consistent, and that absolutely nothing inside the data has been changed while it was traversing the network.

**B. The Role of Cryptographic Hashes**
In cryptography, we accomplish this integrity check by using a Hash.
• *Definition:* A hash is a short string of text that we can create based on the data contained within the plaintext.
• *Terminology:* This is sometimes referred to as a Message Digest or a digital Fingerprint.
• *Mechanism:* Just like a human fingerprint uniquely identifies a person, a digital fingerprint represents data stored elsewhere. If the person (or the data) changes even slightly, the resulting fingerprint (or hash) will be completely different.
• *Important Distinction:* A cryptographic hash is not encryption. You cannot reverse the process or recreate the original data if the only thing you have is the hash, for the exact same reason you cannot physically recreate a person just by having their fingerprint.

## 2. Practical Example: The Hashing Process
To understand how sensitive hashing algorithms are, consider a practical example involving a large file.
• *The Scenario:* Imagine downloading Volume One of the Gutenberg Encyclopedia, which contains 8.1 megabytes of text data. You run an application that takes all of that data and creates a hash (fingerprint) of that specific volume.
• *The Modification:* Now, suppose you change just one single character anywhere inside that massive file. The overall file size remains exactly the same after making the change.
• *The Challenge:* It would be incredibly difficult for a human to read through 8.1 megabytes of text and somehow determine where that single individual change occurred.
• *The Result:* If you perform a hash on the newly changed data, you will see that the new hash value is very different from the original hash value.
• *The Value:* If you download this file, perform your own hash, and compare it to the sender's original hash, you can instantly see if something has been changed, corrupted, or modified. By using these hashes, we are able to provide Proof of Integrity.

## 3. Proof of Origin and Authentication
Although a hash is exceptionally good at verifying the integrity of the data, it does not inherently associate that data with a particular individual. We can verify the data wasn't changed, but we cannot verify who sent the data.

**A. Adding Proof of Origin**
To solve this, we add an additional level of integrity called Proof of Origin, which allows us to verify the specific person that sent the data to us. Sometimes you will see this referred to as Authentication when we are looking at the source of the message.

**B. Digital Signatures and Non-repudiation**
• *Implementation:* By using a Digital Signature, we provide the ultimate goal: Non-repudiation.
• *The Outcome:* Not only do we know exactly who sent the data to us, but anyone else could examine this transaction and verify beyond a doubt that the information we received really did come from the original sending party. The sender cannot deny having sent the message.

**C. The User Experience**
In modern applications, this entire process of creating and verifying a digital signature happens automatically behind the scenes, or simply by clicking a button on your screen. You normally never see the mathematical process occur, but having an understanding of the digital signature process helps you better appreciate the integrity and proof of origin that are so important for securing digital transactions.

## Executive Summary
Non-repudiation is a critical cryptographic function that prevents a sender from denying they sent a message while ensuring the recipient of its authenticity. It is achieved through a combination of Proof of Integrity (using a Hash or Message Digest to ensure the information has not been altered, acting as a digital fingerprint) and Proof of Origin (using a Digital Signature for authentication). This process guarantees that digital transactions are accurate, consistent, and definitively linked to their original source without the possibility of dispute.
