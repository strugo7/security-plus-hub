# Lesson: Application Attacks
**Module:** 2.4

## Introduction
The applications and software we use are often the "weak link" in our security armor. In this lesson, we will dive deep into several common attacks that exploit vulnerabilities in application code or configuration.

## 1. Injection Attacks
An injection attack is one of the most common ways to attack an application.
• *The Principle:* The attacker adds malicious code into an input field sent to the server or client device.
• *The Flaw:* Normally, the application is supposed to block such input. The attack succeeds when the application does not perform proper input validation of the incoming data.
• *Types:* The most common type is SQL Injection, but injections also exist in HTML, XML, LDAP, and other data types.

## 2. Buffer Overflow
This is an attack similar to an injection, which is also made possible due to a lack of input checking.
• *How it works:* Every variable in the software is allocated a certain amount of memory (Buffer). In this attack, the attacker inputs more data than the variable can hold. The excess data "overflows" into the adjacent memory area.
• *The Result:*
    ◦ In most cases: The application crashes.
    ◦ In sophisticated cases: If the attacker finds a buffer overflow that can be consistently reproduced, they can exploit it to run malicious code and gain access to the system.

## 3. Replay Attack
In this attack, the attacker uses legitimate information they have collected to impersonate a user.
• *The Process:* The attacker collects information passing over the network (such as a password Hash or a Session ID). They do this by listening to the network (Network Tap), ARP Poisoning, or malware on the victim's computer.
• *The Execution:* Once they have the information, they "replay" the information to the server. The server recognizes the valid identifier and grants the attacker access, without knowing that this is not the original user.
• *Common combination:* This is often used in conjunction with an On-path attack (man-in-the-middle) to collect the initial information.

## 4. Privilege Escalation
When a regular user connects to a system, they have limited permissions. The attacker aims to obtain higher permissions (such as Administrator).
• *Vertical Escalation:* Moving from a regular user to a system administrator.
• *Horizontal Escalation:* Moving from user A to user B (at the same permission level), in order to access another person's information.
• *Mitigation:*
    1. *Patching:* Closing the vulnerabilities that allow the escalation.
    2. *DEP (Data Execution Prevention):* A mechanism in the operating system that prevents the execution of code (Executable) in certain memory areas that are not intended for it.
    3. *ASLR (Address Space Layout Randomization):* The operating system randomly changes the location of data in memory upon every restart. This makes it difficult for the attacker to find the exact location to execute the attack.
• *Real-world example:* Vulnerability CVE-2023-29336 (May 2023). This is a vulnerability in the Win32k driver that allowed attackers to gain SYSTEM privileges (the highest level) in Windows systems.
