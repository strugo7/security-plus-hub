# Lesson: Blockchain Technology
**Module:** 1.4

## Introduction: Beyond Crypto
When we hear the word "blockchain", the immediate association is usually Cryptocurrency, like Bitcoin. While this technology forms the foundation for these currencies, its potential is much broader. In this lesson, we will dive "behind the scenes" of the blockchain, understand how it operates as a distributed ledger, and how encryption mechanisms (Hashing) ensure data integrity without the need for a central managing authority.

## 1. Core Principle: Distributed Ledger
The most professional and accurate definition for blockchain is a Distributed Ledger.
• *What is a ledger?* A list that records transactions.
• *What is distribution?* Unlike a regular bank where there is one central ledger saved on the bank's servers, in blockchain the ledger is available for anyone to view.
• *Redundancy and Transparency:* The most interesting characteristic is that everyone participating in the blockchain network holds a full copy of this ledger. There is no single "master" copy. All participants maintain the ledger together.
• *Real-time updates:* The moment any change is made to the ledger (a new transaction is recorded), this change is distributed and updated among all participants maintaining a copy of the ledger.
*Implication for the organization:* Eliminating the need for a "Trusted Intermediary". Reliability stems from everyone having exactly the same information, rather than from a single central authority.

## 2. Practical Uses (Use Cases)
Blockchain can be used for any application that requires reliable tracking of transactions or event logging. The source notes several diverse examples beyond transferring funds:
1. *Payment Processing:* The classic example – transferring Bitcoin or monetary value from person A to person B.
2. *Digital Identification:* Verifying identities in a secure and distributed manner.
3. *Supply Chain Monitoring:* Tracking a product from manufacturer to consumer to ensure authenticity and quality.
4. *Digital Voting:* A transparent electoral system that cannot be forged.
5. *Backup tracking:* Documenting the process of transferring data for backup to ensure the process is completed without changes.
6. *Asset registration:* Transferring ownership of an asset (such as a House Title) from one person to another in an official and indisputable manner.

## 3. The Transaction and Verification Process
How does information actually enter the blockchain? The process is built from several critical steps ensuring all participants are synchronized:
1. *Initiating the transaction:* An initial action is required (e.g., transferring home ownership or transferring currency).
2. *Broadcasting to the network:* Instead of sending the information to one party (like a bank teller), the transaction info is sent to everyone. Every device on the network maintaining the ledger receives the transaction details.
3. *Creating the block:* The single transaction joins other transactions waiting for approval. Together, they are packed into a larger "Block" of transactions.

## 4. Ensuring Data Integrity using Hashing
This is the most critical part for the Security+ exam. How do we know no one has altered the data in the distributed ledger? The answer lies in Hashing functions.
• *Closing the block:* To "sign" the block and make it part of the chain, the system adds a Hash to it.
• *The role of the Hash:* The Hash is a digital fingerprint of all the information existing within the block. It guarantees the Integrity of the transactions.
• *Distribution:* After signing, a copy of the signed block is sent to all participants in the network to update their ledgers.
*The defense mechanism against forgery:* If an attacker tries to enter the blockchain and change a small detail in one of the historical transactions:
1. The change in the information will cause the block's Hash to change immediately (because the Hash is calculated based on the content).
2. The rest of the devices on the network will receive the block, calculate the Hash themselves, and discover a mismatch.
3. The system will identify that the Hash is Invalid.
4. The forged block will be rejected ("thrown out") by the network, and the change will not be accepted.
This is the reason why this technology is considered so secure - forgery requires a simultaneous change across all participants, which is practically impossible.

## Executive Summary
Blockchain technology is an application of a Distributed Ledger that enables transparent transaction management without a central authority. Its uses range from crypto to supply chain management and real estate registration. Blockchain security is based on cryptography, and specifically on Hashing, which guarantees data Integrity: any malicious change in the information will cause a change in the Hash and the rejection of the block by the rest of the network participants.
