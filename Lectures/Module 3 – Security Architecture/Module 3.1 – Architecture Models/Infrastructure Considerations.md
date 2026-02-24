# Lesson: Infrastructure Considerations
**Module:** 3.1

## Availability and Resilience
When an organization designs a network architecture, **Availability** is a paramount metric. It measures the percentage of time a system is fully operational and accessible to authorized users (often expressed as 99.999% uptime). 

However, hardware invariably fails. A mature security strategy must measure **Resilience**—how rapidly the organization can recover operations after that unavoidable failure occurs.
*   **Mean Time to Repair (MTTR):** A critical administrative metric dictating the average duration required to successfully replace a failed component, restore software, and return the system to full operational status.

## Scalability and Elasticity
*   **Scalability:** The static capacity of an application to be expanded to handle a larger permanent workload, often requiring manual intervention (e.g., buying a dramatically larger physical server).
*   **Elasticity:** The dynamic, automated capability characteristic of cloud environments. If a retail website suddenly experiences a viral spike in traffic at 3:00 AM, the cloud infrastructure automatically spawns 10 new web servers to handle the load instantly. When the traffic subsides, it automatically deletes those servers, saving the organization money.

## Infrastructure Costs
Security and infrastructure decisions are heavily driven by financial metrics. 
*   Administrators cannot simply buy the largest, most expensive firewall available "just in case." Budgetary constraints force architects to match the technical capability of the appliance precisely to the anticipated load.
*   **Risk Transfer:** The cost of an outage can be catastrophic. Organizations increasingly transfer this financial risk to a third party by purchasing **Cybersecurity Insurance**, which helps mitigate financial losses incurred during a ransomware attack or extended downtime.

## Process Automation
Rapid recovery necessitates automation. If a heavily utilized web server is infected with malware, a technician manually reinstalling the OS and configuring the application from scratch might take hours. Conversely, utilizing an automated imaging system or a cloud orchestration script (Infrastructure as Code) can completely rebuild the identical server securely in under 10 minutes.

## Patch Availability
The most robust infrastructure in the world is useless if the organization does not structurally maintain it.
*   **Standard IT:** Desktops and Windows Servers expect constant, monthly patch deployments addressing critical software vulnerabilities and executing feature upgrades.
*   **Embedded Challenges:** Industrial HVAC controllers or automated time clocks operate as purpose-built embedded systems without direct internet access. Manufacturers rarely release patches for these systems. Because the device inherently cannot be updated to fix security flaws, the network architect must compensate by isolating the vulnerable device behind an internal firewall or entirely segmenting its VLAN.

## Power Infrastructure
Every router, firewall, and server is entirely dependent on the physical availability of electricity. 
*   **Redundancy:** Data centers install massive diesel generators and Uninterruptible Power Supplies (UPS) leveraging massive battery arrays to ensure the network remains highly available even if the municipality suffers a catastrophic grid blackout.
