# Lesson: Viruses and Worms
**Module:** 2.4

## Introduction: The Critical Difference in Distribution
Viruses and worms are types of Malware used by attackers to gain access to our systems. Although these terms are sometimes used interchangeably, there is a fundamental technical difference in how they operate and spread. In this lesson, we will learn to distinguish between a virus (which requires human intervention) and a worm (which self-replicates independently), understand the elusive danger of Fileless Viruses that operate only in the computer's memory, and analyze a WannaCry case study to see how a worm can cause massive damage across a network.

## 1. The Computer Virus
**A. Definition and Analogy:** Just like a virus in the human body, a computer virus is code that can Replicate itself from one computer to another. Once a virus runs, it can move through the file system on the computer or attempt to access other file systems across the network.

**B. The Execution Mechanism: The Need for Intervention:** A critical point: for a virus to start working, it requires some form of Intervention, usually by a human. The user must take an active action, such as Clicking a link or executing an Executable file.

**C. Impact and Detection:**
• *Visible Impact:* We tend to associate viruses with failures or Downtime. For the vast majority of viruses, this is indeed the case.
• *Hidden Impact:* There are "silent" viruses that sit in the background, and the user is completely unaware they are infected.

**D. Defense: Antivirus Software:** From the user's perspective, a virus is one of the most common security concerns. Therefore, modern operating systems include Antivirus software.
• *How it Works:* It constantly runs in the background and monitors executable files to see if it recognizes software previously marked as malicious.
• *Practical Context:* This is why keeping the Signature File constantly updated is mandatory. The antivirus relies on these signatures to identify malicious code.

## 2. Common Virus Types
Beyond the standard virus triggered by clicking on an application, there are other types:
1. *Boot Sector Virus:* Lives in the system's boot sector. When the computer boots up, the virus automatically runs as part of the startup process.
2. *Script Viruses:* Browsers, operating systems, and many apps can run scripts. These scripts can contain malicious code.
3. *Macro Viruses:* Written in the macro language of applications like Microsoft Office, exploiting Vulnerabilities in that software.

## 3. Fileless Viruses
This is a sophisticated type of virus that poses a challenge to traditional security tools.

**A. Unique Characteristics:**
• *Fileless:* The virus does not use files stored on the Storage Drive. It never writes software or malicious code to the disk.
• *Antivirus Evasion:* Because most antivirus software looks for data written to the drive, this virus often successfully evades detection.
• *Running in Memory:* Almost all of the virus's activity takes place in the system's RAM / Memory.

**B. The Infection Chain (Attack Vector):** The typical process includes:
1. *User Action:* The user clicks on a malicious link (in an email or on a site).
2. *Exploitation:* The link leads to a site that exploits a vulnerability in the OS or applications (like Flash, Java, or a known Windows flaw). Through this vulnerability, the virus enters the OS.

**C. Execution and Persistence:** After the virus runs in memory:
• *Running Scripts:* The virus launches legitimate applications like PowerShell to download and run more scripts in memory.
• *Malicious Actions:* It can install other software, delete data, or transfer data to a third party (Exfiltration).
• *Persistence Mechanism:* Since the virus is in RAM, it would be deleted upon reboot. To survive, it usually adds an Autostart configuration to the Windows Registry, so the process restarts the next time the system boots.

## 4. Worms
**A. Definition and Difference from a Virus:** While a virus requires interaction (clicking a link), a Worm is malware that can run without any User Intervention.

**B. Replication and Distribution:** The worm Self-replicates across systems independently. Since most modern systems are networked, the worm can easily and efficiently move to any system on the network.
• *Speed:* Worms replicate at the "Speed of the network". Without a limiting factor, the infection spreads incredibly fast.

**C. Mitigation and Defense:** The most effective defense tools against worms are those that monitor and block network traffic:
• *Network-based Firewalls.*
• *Personal Firewalls.*
• *Intrusion Prevention Systems (IPS).*
• *The Importance of Signatures:* These technologies must recognize the worm and have the appropriate Signatures to stop the malicious traffic from traversing from one machine to another.

## 5. Case Study: WannaCry
The instructor presents WannaCry as a rare but devastating example of combining a worm with ransomware.
*Stages of the Attack:*
1. *Scanning:* The infected computer scans the network to find another system vulnerable to the flaw.
2. *Exploitation:* The worm uses an Exploit called EternalBlue.
3. *Installation:* After infiltrating, a Backdoor is installed.
4. *Activating the Payload:* The worm downloads the Ransomware code and infects the machine. At this point, the user's files are encrypted and become unavailable.
5. *Continued Distribution:* The newly infected machine continues the process, looking for more victims on the network.

## Executive Summary
The main difference between a virus and a Worm is the need for human intervention: a virus requires an action (like running a file), whereas a worm self-replicates across the network independently. While traditional viruses can be detected in files, Fileless Viruses operate entirely in RAM, exploiting legitimate tools like PowerShell and Registry mechanisms to survive reboots. Defending against worms (such as WannaCry, which spread Ransomware via EternalBlue) requires firewalls and IPS with updated signatures to halt the spread at the network level.
