# Lesson: Identity and Access Management
**Module:** 4.6

## The Core of IAM
The foundational goal of **Identity and Access Management (IAM)** is simple in concept but incredibly complex to execute at an enterprise scale: rapidly ensuring the *right people* have the *right level of access* to the *right resources* at specifically the *exact right time*.

IAM encompasses the entire lifecycle of an identity: from the moment an employee is hired (Onboarding), mapping their roles and department, actively managing their permissions as they get promoted or change departments, and rapidly, ruthlessly severing all access the second they are terminated (Offboarding).

## Identity Proofing
Before assigning access to highly confidential corporate data, you must definitively prove the requesting individual is genuinely who they claim to be. This is **Identity Proofing**.
*   **The Requirement:** An organization cannot simply trust a remote user who calls the Help Desk claiming to be the new Vice President of Sales based solely on their word. They need a formalized verification framework.
*   **Documentation (Attestation):** This often requires formal processes, typically involving human resources evaluating legally binding, government-issued documents (driver's licenses, passports). Without solid identity proofing, the entire IAM foundation is fatally flawed.

## Authentication vs. Authorization
These two intertwined concepts are distinct and handle entirely separate functions.
*   **Authentication (Who you are):** The mathematical process of definitively validating a user's identity. Do you possess the correct password matching this specific username? Are you presenting a valid fingerprint? It proves you are genuinely John Smith.
*   **Authorization (What you can do):** Determining permissions. Now that the system has successfully authenticated you are definitively John Smith, what files, databases, and structural areas of the network are you actively permitted to access?

## Single Sign-On (SSO)
Without SSO, an employee might have 15 different usernames and passwords for 15 disparate corporate applications, leading to severe password fatigue and users writing passwords on sticky notes.
*   **The Solution:** SSO allows the user to robustly authenticate exactly *once* in the morning against a central, heavily secured Identity Provider. That central provider then seamlessly issues behind-the-scenes cryptographic access tokens, silently authorizing the user to access all 15 applications throughout the day without ever prompting for an additional password.

## LDAP (Lightweight Directory Access Protocol)
In large, localized enterprise environments, **LDAP** is the undisputed protocol for directly accessing and heavily querying directory services databases (most notably, Microsoft Active Directory).
*   **The Function:** If a firewall requires authentication, it doesn't maintain its own local database. Instead, it securely queries the colossal central Active Directory database via the LDAP protocol: "Is the password user 'JSmith' just typed valid?"
*   **The Structure:** LDAP meticulously organizes the massive directory entirely via a strict hierarchical tree structure, utilizing attributes like `DC` (Domain Component), `OU` (Organizational Unit), and `CN` (Common Name) to precisely isolate an individual user hidden amongst 100,000 employees.

## SAML (Security Assertion Markup Language)
While LDAP is exceptional for internal, local network authentication, it struggles violently to authenticate users reliably across the public internet to separate cloud providers. **SAML** was primarily engineered to establish robust Single Sign-On trust relationships entirely across massive, disparate organizational boundaries.
*   **The Mechanism:** SAML operates completely within the web browser. The user authenticates against their primary corporate Identity Provider. The provider generates a heavily encrypted, digitally signed XML "Assertion" token. The user's browser seamlessly passes this token to the external cloud service (e.g., Salesforce). Salesforce mathematically trusts the cryptographic signature and instantly grants access without requiring a local login.

## OAuth and OpenID Connect (OIDC)
SAML suffers from a fatal flaw: it was engineered before the dominance of mobile applications and heavily relies on web browsers, making it extremely difficult to implement cleanly in native smartphone apps or server-to-server APIs.
*   **OAuth (Authorization):** A modern, API-driven framework strictly designed to delegate *authorization*. If you grant a third-party application (like a mobile game) the ability to access your Google Docs, you don't give the game your actual Google password. OAuth securely governs assigning that application a heavily restricted, revokable mathematical access token.
*   **OpenID Connect (Authentication):** Because OAuth natively does *not* provide authentication, it is fundamentally paired with OIDC. OIDC sits precisely on top of the robust OAuth framework, providing the critical missing element: verifying the actual identity of the user.
