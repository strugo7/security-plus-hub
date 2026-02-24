# Lesson: Backups and Recovery Strategies
**Module:** 3.4

## Introduction: The Importance of Early Planning
Backups are considered one of the best recovery methods when things go wrong. Almost every IT professional will tell you that it is important to have a backup, but this statement is only the first step. To implement a true backup strategy, we must consider many variables and make complex configuration decisions even before performing the first backup.

## 1. Backup Variables
Before starting to back up, the process must be planned based on the following questions:
• *Data Volume:* Are we dealing with a few megabytes, terabytes of data, or even more?
• *Media Type:* Where will we store the information? On a local hard drive? On tapes? Or perhaps in the cloud?
• *Storage Location:* Will the media be kept on-site or off-site?
• *Backup Software:* Will we use a third-party solution or the built-in tools of the operating system?
• *Schedule:* Do we back up everything every day? Or maybe perform daily updates and a full backup only once a week?
All of these decisions have a direct impact on the backup process and the ability to restore information.

## 2. Backup Location: On-site vs. Off-site
Many organizations combine the following two strategies to get the best of both worlds.
**A. On-site Backup**
• *Definition:* The data and the backup media are located in the same physical location where the original system is located.
• *Advantages:*
    ◦ Speed: The information is immediately available for restoration.
    ◦ Cost: Usually cheaper because there is no need to pay for an external storage facility.
    ◦ Communication: Does not require internet bandwidth or a WAN link to transfer the data.
**B. Off-site Backup**
• *Definition:* Transferring the data to a different physical location. This can be done over the network (to another site or to the cloud) or by physical shipment of tapes or drives.
• *Advantages:* Provides protection against a local disaster (such as a fire in the main building).
• *Restoration:* Since the remote location is connected to the network, the information can be restored from anywhere, even if the original data center is down.

## 3. Backup Schedule and Frequency
When do we perform a backup? The answer depends on the rate of data change.
• *Static servers:* If there is a server where the files barely change, an hourly backup is unnecessary. A weekly backup might suffice.
• *Dynamic servers:* Systems with frequent changes require frequent backups (daily or hourly).
*Backup Sets:* It is customary to manage multiple sets of backups simultaneously to allow "going back in time" to different points:
1. Daily backup: About 30 backups a month.
2. Weekly backup: 4 backups a month.
3. Monthly backup: 12 backups a year. Managing this requires careful planning of media and storage space.

## 4. Backup Security
From an information security perspective, the backup is a "soft underbelly". It contains all the secrets and sensitive information of the organization.
*The Physical Risk (An example from the field):* The instructor describes a case where backup tapes were put into an employee's vehicle to transfer them to external storage. The employee stopped on the way for errands, and their car was broken into and the tapes were stolen. All the organizational information fell into the hands of a malicious third party.
*The Solution: Encryption*
• You must encrypt the information on the media (tapes/disks) before it leaves the organization.
• Cloud backup: Encryption is almost mandatory. We have no idea who might access the physical servers at the cloud provider. Encryption ensures that even if there is access to the files, they cannot be read without the key.
• Key management: You must ensure that the recovery keys are well kept, otherwise the backup is useless.

## 5. Snapshots
With the rise in the use of virtualization (VM) and cloud computing, the use of Snapshots has become very common.
• *The Principle:* Backing up an entire system "at the click of a button". The system creates a copy of the virtual machine and sets it aside.
• *Common Use:* Before making a significant change to the system. If the change fails, a Rollback (reverting to a previous configuration) can be performed within seconds.
• *Incremental Mechanism:*
    ◦ Monday (Snapshot 1): Full backup of the machine (e.g., 100GB).
    ◦ Tuesday (Snapshot 2): The users changed only 40GB. The Snapshot will only save these changes, but will represent the full system.
    ◦ Wednesday (Snapshot 3): 20GB of new data was added. The Snapshot will save only that. This method saves space and allows for a very fast backup (sometimes every 24 hours).

## 6. Recovery Testing
One of the critical problems in the industry is that organizations back up, but do not test to verify that they can restore.
• *Disaster Simulation:* Proactive restorations must be performed (for example, choosing a database and restoring it to a test server).
• *Application Testing:* It is not enough that the files were restored ("the file exists"). You must ensure that the application knows how to open the file and work with it.
• *Testing Different Sources:* If there is a daily, weekly, and monthly backup – tests must be performed for each of these types to ensure all mechanisms are working properly.

## 7. Replication
Replication differs from a traditional backup in that it is performed in real-time or close to it.
• *How it works:* Information written at the main site is immediately copied to one or more remote sites simultaneously.
• *Use for Disaster Recovery:* Replication is mostly used for Hot Sites. If the main site goes down, the remote site (which contains a fully up-to-date copy of the information) can go into operation immediately at a moment's notice.
• *Advantage:* Minimum data loss (very low RPO) and high availability.

## 8. Journaling and Preventing Data Corruption
One of the biggest fears of IT personnel is a power outage in the middle of writing data to a disk, which causes Data Corruption.
*The Journaling Solution:* File systems and databases use a "journal" to protect the information:
1. *Writing to the journal:* The system writes the planned action into a Journal file.
2. *Executing the action:* Only after the registration in the journal is complete, the information is copied to the main database.
3. *Recovery:*
    ◦ If power is lost while writing to the journal: The information in the journal is lost, but the main database is not harmed (because we haven't touched it yet).
    ◦ If power is lost while writing to the database: The system reboots, detects there was a crash, reads the journal, and completes the missing actions or deletes partial actions. This prevents corruption.

## Executive Summary
An effective backup strategy requires planning many variables: location (On-site for speed vs. Off-site for survivability), frequency (according to the rate of data change), and security (encryption to prevent physical or digital theft). Using technologies like Snapshots allows for quick rollback in virtualization, and Replication ensures business continuity in real-time. Additionally, Journaling mechanisms protect against data corruption at the disk level. Above all, routine Recovery Testing must be performed to ensure the backups are actually usable when the moment of truth arrives.
