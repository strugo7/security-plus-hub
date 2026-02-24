# Lesson: Digital Forensics
**Module:** 4.8

## The Forensic Standard
**Digital Forensics** is the meticulous, scientifically rigorous process of collecting, preserving, and analyzing digital evidence. The paramount objective is that the evidence collected today must be utterly unassailable and legally admissible in a court of law that may occur years in the future. (Formal guidelines are detailed in RFC 3227).

If data is acquired haphazardly, defense attorneys will effortlessly invalidate the evidence, claiming it was contaminated or maliciously altered by the IT staff during the investigation.

## Legal Hold
When litigation is imminent, legal counsel will issue a **Legal Hold**.
*   **The Process:** This serves as a formal, legally binding directive commanding the IT department to instantly halt all routine data deletion policies (e.g., "delete emails after 90 days") and aggressively preserve all Electronically Stored Information (ESI) related to the case.
*   **The Repository:** Custodians must meticulously extract the requested data (emails, database records, chat logs) and secure it in a strictly isolated, immutable repository, ensuring it cannot be altered or destroyed during the lengthy legal proceedings.

## Preservation and Chain of Custody
The absolute foundational principle of digital forensics is that the original data source must remain completely pristine and unaltered.
*   **The Copy:** A forensic investigator never, ever analyzes the original hard drive. They mathematically create a perfect, bit-for-bit clone (an image) of the drive and conduct all analysis exclusively on the copy.
*   **The Hash:** To prove the image is identical, they run a cryptographic hashing algorithm (like SHA-256) on both the original drive and the image. If the hashes match perfectly, it provides mathematical, indisputable proof in court that the copy is a perfect replica and the data was not tampered with.
*   **Chain of Custody:** Every single time the physical evidence (the hard drive or the USB key containing the image) changes hands, it must be rigidly documented on a Chain of Custody log. Who possessed it, at what exact time, and what was their purpose? If there is an unexplained gap in the chain of custody, the evidence is legally compromised.

## Data Acquisition
Gathering digital evidence is profoundly complex because critical data is fiercely volatile (meaning it instantly vanishes the moment the computer loses power).
*   **Order of Volatility:** Investigators must acquire evidence strictly starting with the most volatile components:
    1.  CPU Cache and CPU Registers.
    2.  Routing Tables, ARP Cache, Process Tables, Kernel Statistics.
    3.  System Memory (RAM). *If you pull the power cord on the server, all evidence stored in RAM is permanently obliterated.*
    4.  Temporary File Systems / Swap Space.
    5.  Data on physical hard disks.
    6.  Remotely logged data / Backups.

## The Analysis and Report
After the data is securely acquired and cloned, the meticulous analysis begins.
*   **The Search:** Analysts comb through unallocated space for deleted files, examine the Windows Registry for USB insertion records, and analyze browser histories to reconstruct the timeline of the attack or the data exfiltration.
*   **The Report:** The final output is an obsessively detailed, factual report documenting the exact processes used, the integrity checks (hashes) performed, the structure of the data discovered, and the analyst's definitive conclusions regarding the event.

## E-Discovery (Electronic Discovery)
**E-Discovery** is a specialized sub-component often utilized during the initial phases of litigation.
*   **The Scope:** It is strictly the logistical process of identifying, collecting, and producing the vast amounts of electronic documents requested by the opposing legal counsel. 
*   **The Difference:** E-Discovery teams are not typically performing deep-level forensic analysis (like recovering deleted files off a hard drive). Their mandate is heavily focused on searching millions of corporate emails to find specific keywords requested in a subpoena and producing those emails securely to the legal teams.
