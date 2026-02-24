# Lesson: Application Security
**Module:** 4.1

## Introduction: The Challenge in Secure Development
IT professionals are often required to install security patches for applications that have been found to contain vulnerabilities, such as Buffer Overflows or SQL Injections. The process of developing an application from scratch is challenging, and there is always a tension or delicate balance between the speed of development (how fast the application will be ready) and its level of security.

## 1. Input Validation and Fuzzing
Application developers must ensure that any unexpected data put into an application will not be improperly interpreted by the system.
• *Input Validation:* Checking the data being entered into forms, fields, or freeform text areas to prevent malicious code injection.
• *Fuzzing:* An automated testing process that inputs random types of data into these fields to see how the application reacts. If the application performs unexpectedly or crashes, the developer may need to adjust their input validation methods to handle it.

## 2. Secure Cookies
Cookies are small bits of information stored inside a browser that help track information, personalize web pages, and maintain sessions once a user logs in.
• Because they contain sensitive session details or personal information, developers must secure them.
• While not explicitly detailed in the transcript snippet, industry standards enforce using attributes so cookies are only transmitted over encrypted connections (HTTPS) and are not accessible by client-side scripts, protecting them from interception.

## 3. Static Code Analysis (SAST)
One way developers test the security of their applications is by using a Static Application Security Testing (SAST) tool.
• *The Process:* Developers put their source code into the static analyzer, which scans it to find potential vulnerabilities like buffer overflows or database injections.
• *Limitations:* It is not perfect. It cannot identify security issues arising from poor logic implementation (like flawed cryptography), and developers must manually review the output to filter out false positives.

## 4. Code Signing
When you install an application, there is a risk that malware has been embedded within it. Code signing answers two critical questions: Has the application been altered since it left the developer? And does it truly originate from that specific developer?
• *How it works:* The developer digitally signs the code using asymmetric encryption, with a key signed by a trusted Certificate Authority (CA).
• *The Check:* During installation, the operating system analyzes the code and checks the digital signature. If the validation fails, it prompts the user that something has changed with the application.

## 5. Sandboxing
Sandboxing is a useful security technique that limits an application's environment.
• *Execution:* When an application runs, it is isolated and only has access to the data necessary for it to work. For example, a mobile browser does not have default access to your camera roll, limiting an attacker's scope if the browser is compromised.
• *Development:* Developers also use digital sandboxes separated from the production network to safely build and test new applications without risking the rest of the organization.

## 6. Monitoring and Logs
Protection does not end with development. Developers build monitoring mechanisms directly into the application.
• *The Goal:* To identify in real-time if someone is trying to attack the application (for example, identifying multiple SQL Injection attempts) or trying to take advantage of an old vulnerability.
• *Identifying Anomalies:* The system generates detailed logs. Analysts and developers can review these logs and identify suspicious activity, such as unusual file transfers or a sudden increase in the traffic volume of a specific user.
