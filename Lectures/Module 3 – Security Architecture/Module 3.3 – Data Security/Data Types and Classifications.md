# Lesson: Data Types and Classifications
**Module:** 3.3

## The Concept of Data Classification
Data is the lifeblood of the modern enterprise. However, treating all data uniformly is logistically impossible and financially ruinous. **Data Classification** is the systematic, administrative process of categorizing data based strictly on its level of organizational sensitivity. A proper classification explicitly dictates who is legally authorized to access the data, how robustly it must be encrypted, and what procedures must be followed if it is breached.

## Core Data Typologies
### 1. Regulated Data
Data heavily governed by rigid, third-party legislative or industry mandates. Organizations face catastrophic financial penalties for failing to adequately secure this data.
*   **PCI-DSS:** The Payment Card Industry standard mandates exact parameters for securing, storing, and transmitting consumer credit card numerics.

### 2. Intellectual Property (IP) and Trade Secrets
*   **Intellectual Property:** Original organizational creations typically protected publicly via trademark or copyright law (e.g., source code, branding, marketing material). 
*   **Trade Secrets:** Proprietary, foundational business intelligence that remains strictly internal. The formula for Coca-Cola or Google's search algorithm are heavily guarded trade secrets. Total operational compromise occurs if this data leaks to competitors.

### 3. Personally Identifiable Information (PII)
*   Data that can explicitly be utilized to definitively identify, contact, or locate a specific, singular human being. 
*   Examples include full legal names, Social Security Numbers, biometric retina scans, driver's license numbers, and precise geolocation data.

### 4. Protected Health Information (PHI)
*   The most heavily regulated subdivision of personal data. Governed intricately by federal laws like HIPAA in the United States. 
*   It encompasses any data generated regarding a patient's physical/mental health condition, surgical records, or healthcare payment histories.

### 5. Legal and Financial Data
*   **Financial Data:** Internally, this covers unreleased quarterly earnings reports, mergers/acquisitions details, and corporate banking routing metrics. Externally, it applies to customer routing numbers or credit histories.
*   **Legal Data:** While portions of court proceedings are public record, sensitive attorney-client privilege communications, ongoing corporate litigations, or HR dispute files must remain heavily siloed.

## Standard Classification Tiers
Organizations develop hierarchical labels to explicitly categorize their data infrastructure.

1.  **Public / Unclassified:** Information deliberately engineered for completely open consumption. Marketing brochures on a public website. Zero damage occurs if it is accessed.
2.  **Private / Internal:** Data designed for use by standard employees, but strictly not for external release. Internal phone directories or standard procedural manuals. Accidental disclosure causes mild embarrassment.
3.  **Confidential:** Crucial operational data restricted exclusively to individuals requiring access to execute their duties. Financial blueprints or standard PII. Disclosure causes significant damage to reputation and potential legal liability.
4.  **Restricted / Secret:** The pinnacle of organizational security. Source code, executive merger documents, or advanced cryptographic keys. Access mandates highly restrictive non-disclosure agreements and absolute isolation architectures. Disclosure causes enterprise-destroying, catastrophic financial and operational collapse.
