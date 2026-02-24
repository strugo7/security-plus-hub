# Lesson: Resiliency
**Module:** 3.4

## High Availability (HA)
Information security mandates maintaining the uptime and availability of systems. **High Availability (HA)** goes beyond simply buying spare parts; it engineers the infrastructure so that everything is continuously running, always turned on, and instantly available.
*   **The Active Setup:** If one critical server fails, another identical server is already running simultaneously right beside it. This secondary system instantly absorbs the load, ensuring zero downtime for end-users. 
*   **The Cost:** HA requires purchasing double the hardware, upgrading data center power/cooling, and licensing multiple instances of enterprise software, making it incredibly expensive.

## Server Clustering and Load Balancing
Rather than relying on massive, solitary mainframes, modern resiliency utilizes distributed scaling.
*   **Server Clustering:** Multiple independent servers are logically configured to operate as one massive, overarching "super-server." They continually sync their state, typically utilizing a highly resilient shared storage backend (SAN). If one node in the cluster crashes, the surviving nodes seamlessly continue processing.
*   **Load Balancing:** A dedicated appliance sits in front of a server farm. Unlike clustered servers communicating with *each other*, the load balancer acts as an intelligent traffic cop. It accepts thousands of inbound internet requests and methodically distributes them across 50 independent backend web servers. If Server #12 fails health checks, the load balancer violently drops it from rotation and directs all new traffic to the remaining 49 servers.

## Site Resiliency (Disaster Recovery Facilities)
When a localized catastrophe (fire, flood, earthquake) destroys the primary data center, an organization must failover to an entirely separate geographic facility.
*   **Geographic Dispersion:** A recovery site located down the street from HQ shares the exact same hurricane risk. A resilient architecture mandates locating the recovery site hundreds of miles away, on a different power grid and utilizing different internet service providers.

### Recovery Site Tiers
1.  **Cold Site:** An empty, leased building with active power, HVAC, and raised floors. There is zero computing hardware and zero data. IT staff must frantically procure and ship physical servers, rack them, install the OS, and restore tapes from offsite storage. Recovery time is measured in weeks.
2.  **Warm Site:** A middle ground. The facility contains physical server racks and networking gear, but the hardware may be older, and the data is not actively replicated in real-time. It requires days to boot systems and restore recent backups.
3.  **Hot Site:** An exact, 100% duplicate of the primary data center. All hardware is racked, powered on, and waiting. Crucially, all corporate data is synchronously replicated across fiber links in real-time. In a disaster, DNS is simply updated, and operations resume at the Hot Site within minutes or hours.

## Platform and Cloud Diversity
*   **Platform Diversity:** Relying entirely on a monoculture (e.g., 100% Windows Server infrastructure) means a single severe zero-day vulnerability could compromise the entire company simultaneously. Implementing platform diversity (mixing Linux servers and Windows clients) acts as a firebreak against widespread malware propagation.
*   **Multi-Cloud Architecture:** Outsourcing everything to AWS is convenient but risky. What if Amazon suffers a massive, global routing failure? Highly resilient organizations deploy applications redundantly across both AWS and Microsoft Azure simultaneously, ensuring continuous uptime even if one mega-corp fails.

## Continuity Of Operations Planning (COOP)
Technology invariably breaks. **COOP** mandates establishing non-technical, manual failback procedures to keep the business operational when all computers are offline.
*   **The Reality:** If the automated point-of-sale systems crash, employees must have pre-established protocols to process transactions on paper receipts and physically utilize carbon-copy credit card imprinters to securely capture payment data until the network is restored.
