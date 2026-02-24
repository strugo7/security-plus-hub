# Lesson: Security Policies
**Module:** 5.1

## The Foundation of Security
The primary objective of every security administrator is to establish and rigorously maintain **Confidentiality, Integrity, and Availability (CIA)**. 
*   **The Blueprint:** To achieve CIA at an enterprise scale, organizations require a comprehensive set of formalized rules and overarching directives known as **Security Policies**. 
*   **The Scope:** Policies define the "what" and the "why." (e.g., "All remote access must be heavily encrypted to protect patient data"). The deeply technical steps on exactly *how* to configure the VPN concentrator are governed by separate documents (Procedures and Standards).
*   **The Mandate:** In many mature organizations, the master Information Security Policy is not a mere recommendation; it is a rigid corporate mandate. Violating the policy frequently results in immediate formal disciplinary action or termination.

## Acceptable Use Policy (AUP)
The **AUP** is arguably the most recognized policy because it directly impacts every single user.
*   **The Function:** It meticulously defines exactly what is, and fundamentally what is not, acceptable behavior when utilizing corporate technology assets (laptops, mobile devices, internet connections). 
*   **Legal Protection:** The AUP explicitly forbids using corporate networks for illegal file sharing, accessing illicit material, or operating personal businesses. Crucially, before gaining network access, employees physically or digitally sign the AUP. If an employee is terminated for violating the rules, the signed AUP provides the organization with critical legal documentation defending the dismissal.

## Business Continuity and Disaster Recovery
Organizations become dangerously accustomed to 100% technological availability. Policies must heavily dictate the exact response when catastrophic failure occurs.
*   **Business Continuity Planning (BCP):** How does the business continue making money if a core system fails? If the primary credit card processing network violently crashes, the BCP dictates the immediate pivot to manual, offline processing utilizing physical carbon-copy machines and phone authorizations.
*   **Disaster Recovery Plan (DRP):** A sub-component of BCP dealing specifically with massive technological disasters (hurricanes obliterating the data center, systemic ransomware). The DRP dictates complex restorative actions: declaring a disaster, activating the secondary "hot site" across the country, and executing the massive restoration of terabytes of data from immutable backups.

## Incident Response Policies
When a security event occurs, the response cannot be chaotic.
*   **The Framework:** Incident response policies strictly dictate the structural handling of events like active malware infections, ongoing DDoS attacks, or a confirmed massive data exfiltration.
*   **The Roster:** The policy explicitly defines the formal Incident Response Roles:
    *   **The IR Team:** The specialized technical experts actively hunting the threat.
    *   **IT Management:** Providing immediate resources and budget.
    *   **Compliance Officers:** Ensuring all actions strictly adhere to complex legal mandates.
    *   *(Note: NIST Special Publication 800-61 Revision 2 is the foundational document governing structural incident response lifecycles).*

## The Software Development Lifecycle (SDLC)
For organizations developing internal applications, policies must heavily regulate the code creation process through the **SDLC**.
*   **The Goal:** To methodically control the entire lifecycle from initial conception, through rigorous security testing, and finally to secure deployment.
*   **Waterfall:** A highly rigid, linear, sequential methodology. You never proceed to the next technical phase until the previous phase is absolutely complete and formally signed off.
*   **Agile:** A significantly faster, iterative approach allowing continuous minor updates, rapid development cycles, and constant feedback loops.

## Change Management
Uncontrolled changes are the primary cause of massive, self-inflicted network outages.
*   **The Danger:** An administrator informally updating a core router configuration on a Friday afternoon can accidentally blackhole the entire organization.
*   **The Policy:** **Change Management** dictates that *no* technical changes can occur without strict, formal oversight.
*   **The Process:** 
    1.  Define the exact scope and extreme risk level of the change.
    2.  Write a meticulous, step-by-step implementation plan.
    3.  Create a mandatory **Fallback Procedure** (how to instantly revert the change if it causes the server to crash).
    4.  Submit the plan to the formal **Change Control Board (CCB)** for final approval and scheduling before any code is altered.
