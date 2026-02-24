# Lesson: Zero-day Vulnerabilities
**Module:** 2.3

## Introduction: When the Attack Comes as a Surprise
In the world of information security, we are accustomed to dealing with known threats for which defensive solutions exist. However, sometimes an attack catches us completely by surprise. In this lesson, we will dive into one of the most frightening concepts in the industry: Zero-day attacks. We will learn what happens when attackers find a vulnerability in software before the vendor is aware of it, understand the dynamics between researchers and attackers, and see real-world examples from the industry (such as vulnerabilities in Chrome, Microsoft, and Apple) that illustrate how these vulnerabilities are exploited "In the wild" and how they can be tracked using the CVE database.

## 1. The Nature of the Hidden Vulnerability
**A. The Current State of Our Systems:** Our starting point must be realistic: The applications and Operating Systems we are using right at this very moment most likely contain Security Vulnerabilities within them.
• *The Problem:* We simply haven't identified what those vulnerabilities are yet. They exist in the code, but they are dormant and unknown.
• *The Future Solution:* Eventually, someone will discover this vulnerability, and then we will be required to provide Patches to close these security holes.

## 2. The Race to Discovery: Researchers vs. Attackers
Every day, people all over the world work to identify these vulnerabilities. They can be divided into two main groups, and the difference between them is critical to organizational security:

**A. The Researchers:** When security researchers identify a vulnerability, their goal is to share the information with the Developers. This collaboration allows the vendor to fix the problem before it becomes a threat.

**B. The Attackers:** Attackers are constantly working to identify and document these vulnerabilities, but their motivation is entirely different:
• *The Goal:* They want to find the vulnerabilities first.
• *The Advantage:* Early discovery allows them to Take advantage of the vulnerabilities without any patches being available to stop them.
• *The Action:* They write Attack Code specifically targeting that newly discovered vulnerability.

## 3. Defining a Zero-day Attack
**A. Information Gaps:** Attackers, naturally, do not intend to share the information they found with the software Vendor.
• *The Vendor's Perspective:* The software vendor has no idea that this vulnerability even exists.
• *The Result:* There is no Patch available for the vulnerability because, from the vendor's perspective, the problem has not yet been discovered.

**B. The Formal Definition:** When attackers begin Exploiting this vulnerability, and there is absolutely no patch available to mitigate (reduce the risk of) the problem, we call this a Zero-day attack.

**C. The Industry Response:** The moment the security community suddenly realizes there is a new type of attack that no one has seen before:
1. A "Flurry of work" begins to create a patch to mitigate the problem.
2. *The Window of Risk:* Until the patch is created, the attacker can continue to exploit the vulnerability unhindered.
• *Practical Context:* It is very difficult to defend a system when you have no idea the problem even exists.

## 4. Tracking and Real-World Examples (CVE)
To stay updated on Zero-day attacks or vulnerabilities in general, the central resource is the CVE (Common Vulnerabilities and Exposures) website at CVE.mitre.org.

The instructor presents critical examples from 2023 that illustrate the types of potential damage:

**A. Chrome Browser (April 2023):** A Zero-day attack was announced that included two dangerous elements:
1. Memory Corruption.
2. Sandbox Escape: The ability of malicious code to break out of the browser's isolated environment and harm the operating system.

**B. Microsoft (May 2023):** Microsoft introduced a Zero-day patch in response to a sophisticated attack:
• *The Vulnerability:* Self-signed code managed to execute during the UEFI boot process.
• *The Significance:* This action is supposed to be impossible if Secure Boot is used, indicating the severity of the breach that bypassed a fundamental defense mechanism.

**C. Apple - iOS and iPadOS (May 2023):** Apple had to release three separate patches to deal with Zero-day attacks:
1. Sandbox Escape: Similar to the Chrome case.
2. Disclosure of sensitive information.
3. Arbitrary Code Execution: The ability of an attacker to run any code they want on the device.

**D. Practical Importance:** Many of these Exploits were actively being used "In the wild". Therefore, it was critical for the companies (Google, Microsoft, Apple) to create patches that would close these vulnerabilities and prevent the attacks from continuing.

## Executive Summary
Zero-day Vulnerabilities are security weaknesses that are discovered and exploited by attackers before the vendor is aware of their existence and before a Security Patch has been released for them. This situation gives the attacker a significant temporary advantage, as the organization faces an unknown threat. Industry examples (such as bypassing Secure Boot in Microsoft or Sandbox Escape in Chrome and Apple) show how attackers actively use these vulnerabilities ("In the wild") to achieve arbitrary code execution or data leakage. The primary tool for tracking these threats once they are exposed is the CVE (Common Vulnerabilities and Exposures) database.
