# Lesson: Secure Baselines
**Module:** 4.1

## The Need for Security Baselines
When an application or operating system is deployed out-of-the-box, it is optimized for ease-of-use and broad compatibility, not security. A **Security Baseline** is a documented, standardized minimum set of mandatory security configurations that must be universally applied to every single system in the enterprise before it is permitted to touch the production network.

A baseline dictates exact parameters: mandating the local firewall is enabled, explicitly disabling legacy protocols like Telnet, setting extreme password complexity requirements, and restricting highly specific file system permissions.

## Developing the Baseline
Administrators do not need to invent these highly complex configurations from scratch.
*   **Vendor Baselines:** Software manufacturers intimately know the vulnerabilities of their own code. Microsoft, for example, publishes extensive, free Security Baseline documentation explicitly detailing how to rigidly lockdown Windows Server and Windows 10.
*   **Third-Party Benchmarks:** Organizations frequently adopt universally respected, vendor-neutral baselines published by the **Center for Internet Security (CIS)**. These highly detailed, step-by-step guides provide the industry gold standard for securing almost any operating system, database, or cloud architecture.

## The Complexity of Group Policy
Implementing a baseline in a massive enterprise environment is an incredibly complex engineering task.
*   **The Scope:** A modern Windows 10 operating system contains over 3,000 completely distinct Group Policy settings modifying everything from registry keys to UI elements.
*   **Microsoft Security Compliance Toolkit (SCT):** An enterprise cannot manually click through 3,000 settings on 500 laptops. Microsoft provides tools like the SCT, which allows administrators to download the pre-configured, heavily audited baseline matrix and instantly push those thousands of secure settings out to the entire domain automatically.

## Deployment and Automation
*   **Centralized Management:** Deploying a baseline requires robust automation. Windows systems utilize **Active Directory Group Policy Objects (GPOs)** to ruthlessly enforce the baseline continuously. Mobile devices require a **Mobile Device Manager (MDM)** to push secure corporate lockdown policies remotely to iPhones and Androids.
*   **Continuous Enforcement:** If a rogue administrator manually turns off the firewall on a sensitive database server, the automated GPO policy must detect the deviation and violently force the firewall back on within 90 minutes, ensuring the secure baseline remains intact.

## Maintaining the Baseline
A baseline is not a static document; the threat landscape evolves continuously.
*   **Patching and Updates:** When a new zero-day vulnerability is catastrophic, the baseline must immediately be updated to mandate the installation of the emergency patch across the entire global enterprise.
*   **Application Conflicts:** Sometimes, the rigid security manufacturer baseline violently breaks the functionality of an ancient, legacy corporate application. The security architect must carefully test the baseline in a lab environment, analyze the conflict, and selectively modify the parameters to balance extreme security with the necessity of keeping the business operational.
*   **Auditing:** Administrators deploy continuous vulnerability scanners to relentlessly audit the network, searching for any disparate system that has fallen out of compliance with the mandated baseline.
