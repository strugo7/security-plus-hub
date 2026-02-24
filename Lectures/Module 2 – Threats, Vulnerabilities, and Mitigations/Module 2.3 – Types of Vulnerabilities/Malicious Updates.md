# Lesson: Malicious Updates
**Module:** 2.3

## Introduction
Security professionals constantly advise keeping your operating systems and applications patched to the latest versions to correct known vulnerabilities. However, the update mechanism itself represents an attack vector. When you apply an update, you are effectively installing entirely new code into your system. Attackers occasionally manage to embed malicious software directly into a seemingly legitimate update payload.

## Update Best Practices
Although patching is critical, you should employ several best practices during the update process:
*   **Backup First:** Before making any changes or applying a major patch, always perform a system backup. If the update breaks your system (or is malicious), a backup allows an immediate return to a stable, previously known good configuration.
*   **Verify the Source:** Ensure that the software patch is retrieved from a trusted source, specifically the official application developer's website. You should disregard suspicious, unsolicited pop-up prompts (e.g., claiming a browser needs an update) that appear during routine web searches.

## Trust and Digital Signatures
Operating systems frequently verify an update's authenticity by checking its **digital signature**.
*   **Verification:** A digital signature proves the file originated directly from the software giant (such as Microsoft, Adobe, or Google) and has not been covertly tampered with in transit.
*   **Automated Application Verification:** Some applications have an over-the-air update process built directly into the app that seamlessly checks these digital signatures behind the scenes without user interaction.

## The SolarWinds Supply Chain Attack
Even a perfectly verified digital signature cannot guarantee absolute safety if the developer's infrastructure is compromised at the source.

In December 2020, major IT management company **SolarWinds** reported their enterprise networking tool, Orion, was distributing updates infected with malicious code. 
*   **How it Happened:** Attackers secretly gained access to the core software development server at SolarWinds months earlier. They systematically injected their malware directly into the source code of the official application.
*   **The Execution:** When SolarWinds compiled the official update, the malicious code was bundled in. The company then digitally signed the legitimate-looking package and distributed it to thousands of customers.
*   **The Impact:** Government agencies, military contractors, and Fortune 500 companies blindly installed the infected update because it passed all security and cryptographic signature checks. The attackers gained full remote command over some of the most sensitive networks in the world.
