# Lesson: Data Roles and Responsibilities
**Module:** 5.1

## The Hierarchy of Data Management
Data within an enterprise does not simply exist; it must be fiercely protected, properly utilized, and legally managed. This massive responsibility cannot fall entirely on the generic IT department. An organization must formalize explicit roles dictating precisely who is responsible for different facets of the data lifecycle.

## The Data Owner
The Data Owner possesses the ultimate, supreme organizational responsibility for a specific subset of data.
*   **The Profile:** This is rarely an IT technician; it is Almost exclusively a high-level executive or Senior Vice President.
*   **The Function:** The VP of Sales is the Data Owner for the massive Customer Relationship Management (CRM) database. The Chief Financial Officer (CFO) is the Data Owner for the core financial ledgers. 
*   **The Authority:** They are broadly responsible for deciding exactly how their data should be classified (e.g., "Top Secret" vs. "Internal") and they bear the ultimate foundational responsibility and legal liability if their data is catastrophically breached.

## The Data Controller vs. Data Processor
These two distinct roles often dictate the relationship between the organization collecting the data and the third-party heavily processing it (a concept explicitly codified in massive privacy laws like the GDPR).

*   **The Data Controller:** The entity that ultimately determines exactly *why* and *how* the data will be aggressively used. 
    *   *Example:* The internal HR Department collects massive amounts of employee banking data. They dictate that this data must strictly be used to execute the weekly payroll. They are the Controller.
*   **The Data Processor:** The entity that actually performs the physical or logical heavy lifting of processing the data, acting strictly on the unyielding instructions of the Controller.
    *   *Example:* The HR department hires a massive external third-party corporation (like ADP) to actually cut the digital checks. The external payroll company essentially acts as the Data Processor. They possess the data, but they can only legally use it precisely as the Controller commands.

## The Data Custodian / Data Steward
While the high-level Data Owner dictates the policy, the **Data Custodian (or Steward)** actually performs the deeply technical implementation of that security policy.
*   **The Function:** They are the guardians of the data. They are responsible for fiercely ensuring the data is accurately backed up, heavily encrypted at rest, and highly available when requested.
*   **Access Control Implementation:** If the Data Owner decides a document should be classified as "Highly Confidential," the Data Custodian is the individual who actually logs into Active Directory and violently applies the correct Access Control Lists to structurally enforce that classification. They ensure the organization remains in strict compliance with the overarching policies established by the Owner.
