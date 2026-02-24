# Lesson: States of Data
**Module:** 3.3

## The Three States of Data
To effectively architect security controls, an administrator must accurately identify what the data is currently doing. Security protocols change dramatically based entirely on the state the data exists in.

### 1. Data at Rest
*   **Definition:** Data completely dormant, permanently sitting in a physical storage medium. It is saved in a massive backend SQL database, sitting idle on a local SSD, or archived on an offline tape backup.
*   **The Threat:** Physical theft of the server hardware or unauthorized local administrative access to the file system.
*   **The Mitigation:** Implement rigid Access Control Lists (ACLs) to mathematically restrict user permissions, and aggressively enforce **Full Disk Encryption (FDE)**.

### 2. Data in Transit (Data in Motion)
*   **Definition:** Data actively flowing across thousands of miles of public or private network cabling, moving from a source database to a destination web client.
*   **The Threat:** On-path interception, packet sniffing, or local ARP poisoning leading to man-in-the-middle data theft.
*   **The Mitigation:** Network traffic must be enveloped in robust end-to-end encryption protocols like **TLS (Transport Layer Security)** for web traffic or **IPsec** for VPN tunnels, guaranteeing data confidentiality even if it traverses a chaotic, hostile network.

### 3. Data in Use
*   **Definition:** Data actively loaded into the immediate, volatile silicon memory (RAM) and actively being mathematically processed by the CPU cores.
*   **The Vulnerability:** To actively perform computations on data, the CPU must be able to read it natively. Therefore, Data in Use is almost unconditionally unencrypted plaintext. 
*   **The Threat:** Attackers specifically target the volatility of system RAM. Advanced malware executes memory scraping processes to silently read the plaintext data before the CPU can save it back to an encrypted hard drive. The massive 2013 Target breach utilized this exact vector, silently scraping millions of plaintext credit cards directly out of the volatile RAM of the cash registers.

## Geolocation Data Parameters
The physical location of the data and the user requesting it radically dictate security enforcement.
*   **Context-Aware Access:** If a user consistently logs in from an IP address in Chicago, but suddenly attempts to authenticate 10 minutes later from a GPS coordinate in Beijing, geolocation analytics will trigger an immediate security alert and aggressively block access, recognizing the physical impossibility of the travel.
*   **Streaming Content Limitation:** Utilizing Geo-blocking technologies to explicitly deny an IP block originating in Eastern Europe from accessing an internal corporate application suite located in North America.

## Data Sovereignty
In modern cloud architectures, an American administrator might seamlessly store a multi-terabyte database in an AWS data center situated in Frankfurt, Germany.
*   **The Legal Reality:** **Data Sovereignty** explicitly dictates that data is irrevocably subject strictly to the local governmental laws, law enforcement subpoenas, and regulatory data retention requirements of the physical country where the severe hardware actually sits.
*   **Compliance Example:** The European Union's GDPR explicitly forces massive technological requirements upon global enterprises. It aggressively mandates that all detailed private data gathered regarding European citizens must legally be physically stored exclusively on servers sitting on sovereign European soil, fundamentally altering global cloud architecture designs.
