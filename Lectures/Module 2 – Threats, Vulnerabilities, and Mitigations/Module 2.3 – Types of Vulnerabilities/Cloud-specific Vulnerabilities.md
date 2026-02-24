Lesson: Cloud-specific Vulnerabilities

Based on Module 2.3 - CompTIA Security+ SY0-701

Introduction: The Shift to the Cloud and Associated Risks

In a relatively short period, organizations have widely adopted cloud technology. Today, almost every organization has one or more applications running in a Public Cloud. With this transition, we are also moving a massive amount of information (Data) to the cloud, which is often highly sensitive. The main challenge is that we do not always implement the Best Practices for securing these systems, which exposes them to a wide range of attacks.
Alarming Statistics: Neglecting Basic Security
The reality in the field shows fundamental failures in protecting cloud infrastructures. The following data illustrates the scope of the problem:
Lack of Strong Authentication: It is estimated that 76% of organizations do not use Multifactor Authentication (MFA) to log in to the Central Console that manages their cloud systems. This is a severe loophole that facilitates hostile takeover.
Unpatched Code: Approximately 63% of the code currently in the cloud is Unpatched.
Vulnerability Severity (CVSS): These vulnerabilities are not minor. In many cases, these are significant security issues scoring 7 or higher (out of 10) on the Common Vulnerability Scoring System (CVSS) rating system.
The Implication for the Organization: When an application is in the Public Cloud, anyone in the world can try to connect to it. High Severity vulnerabilities expose the organization to immediate risk.
Availability & Authentication Attacks
The very exposure of the application to the public internet invites specific types of attacks.

A. Denial of Service (DoS) Since the application is accessible to everyone, any attacker in the world can try to disable it.
This is often a Distributed Denial of Service (DDoS), as the attack is performed by many devices simultaneously from different locations worldwide.
B. Authentication Bypass & Misconfiguration If the Authentication Process is weak or Misconfigured, attackers can enter the application without appropriate Credentials.
Data Leakage: Such unauthorized access can lead to a significant Data Breach.
Importance of Configuration: In an environment where the whole world can connect, it is critical to ensure that the security settings surrounding the application are correctly configured.
Server and System Structure Vulnerabilities
Attackers exploit incorrect server settings to move within the system and leverage weaknesses in unpatched components.

A. Directory Traversal This is a common Misconfiguration in Web servers.
The Essence: The ability of users to manually move within the server's directory structure and access Subdirectories that should not be accessible. This should generally not be possible.
B. Remote Code Execution (RCE) If the operating system or application is Unpatched, an attacker can exploit this to run any application they want on your cloud system.

C. Real-World Examples: Log4j and Spring Cloud In recent years, vulnerabilities were discovered in applications that allowed attackers to exploit a weakness in the application to gain access to the Underlying System and additional systems in the same cloud.
Log4j and Spring Cloud Function: These are examples of vulnerabilities that were Easy to exploit – extensive cybersecurity knowledge was not required to exploit them.
The Reward: Despite the ease of execution, the attacker gains Full control over the system, making these vulnerabilities particularly dangerous.
Application Code Attacks
Insecure development exposes the application to code and memory level manipulations.

A. Out-of-bounds Write Attackers try to write information into Memory even if that area of memory is Unauthorized for the user.
The Result: This may allow an attacker to perform Remote Code Execution (RCE) or simply Crash the system and cause lack of availability.
B. Injections
Cross-site Scripting (XSS): This is possible when the application developer has not properly performed Input Validation for the fields in the application.
Code Injection and SQL Injection: Since the Data resides in the cloud along with the application, attackers exploit Code Injection, and specifically SQL Injection, to gain access to the databases and steal the information.
Executive Summary

Cloud infrastructure security is lacking in many organizations, as reflected in the low usage rates of MFA and the amount of Unpatched Code. These weaknesses, sometimes rated CVSS above 7, expose the organization to DoS attacks, Directory Traversal issues, and the exploitation of known vulnerabilities like Log4j that enable Remote Code Execution. Furthermore, poor development without Input Validation exposes the application to injection attacks (SQL Injection, XSS) and Out-of-bounds Write, which endanger the integrity and availability of organizational information.