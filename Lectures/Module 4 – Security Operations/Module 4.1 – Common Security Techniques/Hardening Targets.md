# Lesson: Hardening Targets
**Module:** 4.1

## Operating System Hardening
An operating system (Windows, Linux, macOS) installed "next-next-finish" out-of-the-box is inherently vulnerable. **Hardening** is the deliberate process of securing a system by reducing its ultimate surface of vulnerability.
*   **Patch Management:** The foundational element of hardening. Operating systems receive monthly updates addressing critical bug fixes and security vulnerabilities. These patches must be ruthlessly tested and instantly deployed centrally.
*   **Reducing the Attack Surface:** Every piece of software installed is a potential vulnerability vector. A core hardening principle is to aggressively uninstall any application, service, or feature that is not strictly required for the device to perform its primary business function.

## Hardening Mobile Devices
Smartphones represent a unique threat because they contain massive amounts of corporate data but physically leave the security of the enterprise perimeter daily.
*   **Data Segmentation (Containerization):** Modern organizational policies utilize a Mobile Device Manager (MDM) to mathematically partition the physical phone. One encrypted partition handles personal data (photos, games) while a completely separate, heavily fortified partition handles corporate email and files. If an attacker breaches the personal side, they cannot cross the partition into the corporate data.
*   **Remote Management:** MDMs actively push down hardening policies forcing complex PINs, automatically locking the screen after 30 seconds, and providing the crucial ability to remotely wipe the entire device instantly if it is reported stolen.

## Hardening Network Infrastructure
Switches, routers, and firewalls generally run highly specialized, embedded operating systems rather than standard Windows or Linux.
*   **Default Credentials:** The single biggest vulnerability on infrastructure gear is failing to change the manufacturer's default administration password.
*   **Patching:** While firmware updates for routers are much rarer than monthly Windows patches, they are significantly more critical when released. Infrastructure runs the entire enterprise; an unpatched router vulnerability compromises the entire network.

## Hardening Cloud Central Management
The Cloud Management Console (the portal used to configure AWS or Azure) holds the absolute "keys to the kingdom."
*   **Securing the Console:** The workstation used by cloud administrators must be the most hardened device in the enterprise. It mandates extreme Least Privilege access, aggressive Endpoint Detection and Response (EDR) software, and unbreakable Multi-Factor Authentication.

## Hardening Specialized and Embedded Systems
### SCADA / Industrial Control Systems (ICS)
These systems run massive physical infrastructures (power grids, manufacturing plants).
*   **The Hardening Approach:** Because installing standard antivirus is often impossible, these systems are hardened through brutal network isolation. They are frequently placed on entirely segmented networks, often protected by a physical **Air-Gap** with absolutely zero theoretical connection to the internet.

### Embedded Systems & IoT
*   **Embedded Devices:** Purpose-built appliances (smart TVs, digital watches) that rarely receive manufacturer security patches.
*   **Internet of Things (IoT):** Connected thermostats and smart lighting. Manufacturers prioritize cheap, rapid deployment over robust security.
*   **The Hardening Approach:** Because the devices themselves fundamentally cannot be patched or secured natively, network architects must compensate by forcefully segmenting all IoT devices onto an isolated VLAN, strictly preventing them from communicating with the secure internal corporate network.

### Real-Time Operating Systems (RTOS)
Found in military hardware and automobile braking systems, an RTOS guarantees execution within a mathematically precise, deterministic timeframe. They must be aggressively hardened by ruthlessly limiting any external network access and stripping the OS down to the absolute bare minimum of required services to prevent an attacker from interrupting the critical real-time processing loop.
