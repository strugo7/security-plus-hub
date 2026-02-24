# Lesson: Other Infrastructure Concepts
**Module:** 3.1

## Virtualization and Containerization
Modern data centers rely heavily on efficiently managing computing resources.
*   **Virtualization:** A physical server runs a **hypervisor**, which allows multiple, completely distinct guest Operating Systems (Windows, Linux) to run simultaneously on the same hardware. However, this is resource-intensive because each virtual machine requires its own dedicated OS kernel.
*   **Containerization:** To solve virtualization inefficiencies, developers use containers (like Docker). Instead of booting an entire OS for every application, a container isolates only the application code and its required dependencies. Dozens of isolated containers share the underlying host OS kernel, allowing for massive scalability, rapid startup times, and extreme efficiency.

## Internet of Things (IoT)
**IoT** encompasses the massive proliferation of non-traditional, network-connected devices: smart thermostats, video doorbells, automated lighting, and biometric medical sensors.
*   **The Security Risk:** Manufacturers prioritize low cost and rapid deployment over security. IoT devices are notorious for shipping with easily guessable default passwords, lacking encryption, and rarely receiving security firmware updates. A single compromised IoT thermostat can provide an attacker with a foothold into a secure corporate network.

## Industrial Control Systems (ICS) / SCADA
A **Supervisory Control and Data Acquisition (SCADA)** system manages large-scale physical, industrial infrastructure like oil refineries, nuclear power plants, and automated manufacturing floors.
*   **The Architecture:** SCADA networks allow a centralized control room to remotely monitor and alter physical sensors and valves miles away.
*   **Security Posture:** Because a compromise here could result in physical destruction or loss of life, SCADA networks are traditionally entirely segmented from the standard corporate IT network and the internet, often utilizing strict physical air gaps.

## Embedded and Real-Time Systems
*   **Real-Time Operating System (RTOS):** A highly specialized, deterministic OS completely dedicated to processing data with zero latency. If a driver slams on an automobile's anti-lock brakes, the RTOS guarantees immediate execution without waiting for background CPU tasks.
*   **Embedded Systems:** Highly consolidated hardware/software combinations designed to execute one specific, singular task eternally (e.g., controlling a traffic light, operating a digital watch, or managing a hospital heart monitor). They do not run a standard OS and cannot install third-party applications.

## High Availability 
To ensure continuous network operations during a hardware failure, infrastructure is engineered for **High Availability (HA)**. 
*   **Active-Passive:** Two identical firewalls. The primary firewall handles 100% of the traffic. The secondary firewall simply waits. If the primary crashes, the secondary instantly takes over.
*   **Active-Active:** Both firewalls are actively processing traffic simultaneously. If one fails, the other absorbs the entirety of the load. This provides superior performance but requires substantially more complex engineering.
