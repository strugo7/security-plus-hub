# Lesson: SQL Injection
**Module:** 2.3

## Introduction to Code Injection
A code injection attack occurs when an attacker is able to insert their own executable commands or queries into the data input fields of an application. 
*   **The Failure:** Application developers must implement input validation to prevent user data from being processed as executable code. When this validation fails, injection attacks occur.
*   **Types:** There are many types of code injection, including HTML, XML, and SQL. 

## Structured Query Language (SQL) Injection
**SQL (Structured Query Language)** is the most popular language used by applications to interact with backend relational databases. A **SQL injection (SQLi)** occurs when an attacker inputs unauthorized SQL commands into a front-end application interface, manipulating the query sent to the database.

### The Mechanism of SQLi
Normally, a web application takes a user's input (e.g., a username "Smith") and inserts it into a hardcoded database query:
`SELECT * FROM users WHERE name = 'Smith'`

If the application is vulnerable to SQL injection, it does not sanitize the input. An attacker can input malicious syntax to alter the logic of the entire query. 
For example, entering `' OR '1'='1`:
`SELECT * FROM users WHERE name = '' OR '1'='1'`

Because the statement `1=1` is a mathematical absolute truth, the database circumvents the name requirement entirely and returns *every* record in the database.

## Impact of a Successful SQLi
When a database processes a maliciously injected SQL command, the attacker effectively gains direct, unauthorized control over the database backend. An attacker can:
1.  **Exfiltrate Data:** View and download sensitive records, credit card numbers, and passwords.
2.  **Modify Data:** Alter existing records, modify financial balances, or grant themselves administrative dashboard rights.
3.  **Destroy Data:** Delete tables entirely (e.g., executing a `DROP TABLE` command), causing a catastrophic denial of service.

## The Ease of Exploitation
Unlike other complex attacks requiring binary exploitation or memory manipulation, SQL injection is highly accessible to attackers.
*   **No Additional Software:** It requires no special hacking software. Attackers can execute SQLi entirely within a standard web browser using the existing application input fields. 
*   **The '1=1' Indicator:** If logs show database queries appending `OR 1=1`, `OR 'a'='a'`, or similar tautologies, the system is actively being targeted or has already been compromised by SQL injection.
