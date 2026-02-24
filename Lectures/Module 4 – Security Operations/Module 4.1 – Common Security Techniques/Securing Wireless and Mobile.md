# Lesson: Securing Wireless and Mobile
**Module:** 4.1

## Wireless Site Surveys
Before deploying a secure wireless network, or when troubleshooting an existing one, engineers must comprehensively understand the physical radio frequency environment.
*   **The Purpose:** A **Site Survey** meticulously maps the physical coverage area. It identifies all existing access points (both corporate-owned and rogue external routers), detailing their specific channels, frequencies, and signal strengths to prevent interference.
*   **Tools:** Engineers utilize dedicated spectrum analyzers to physically see non-802.11 interference (like microwaves or rogue bluetooth devices) and generate detailed **Heat Maps**. Heat maps provide a powerful visual representation, highlighting strong signal areas in red/yellow and weak "dead zones" in blue, proving exactly how the signal propagates through specific building materials.

## The Mobile Device Manager (MDM)
An enterprise cannot manually configure 5,000 corporate iPhones. They utilize a **Mobile Device Manager (MDM)**.
*   **The Capability:** The MDM is a centralized command-and-control server. Once a phone is enrolled, the MDM administrator has absolute control over the device.
*   **Security Enforcement:** The MDM unilaterally pushes down mandatory security policies: enforcing extreme password complexity, mandating full-device encryption, actively blocking the installation of specific unapproved apps, and even dynamically disabling the physical camera when GPS detects the phone has physically entered a classified corporate facility.

## Mobile Deployment Models
Organizations dictate exactly who owns the hardware and who controls the data.

### 1. Bring Your Own Device (BYOD)
*   **The Concept:** The employee purchases and owns the physical smartphone, but utilizes it for corporate work.
*   **The Challenge:** Establishing control. The company MDM must heavily encrypt and logically segment the corporate data into a restricted partition, ensuring the company can instantly remotely wipe the business emails without touching the employee's personal family photos.

### 2. Corporate Owned, Personally Enabled (COPE)
*   **The Concept:** The corporation purchases the physical asset and maintains absolute legal ownership of the device. However, as an employee perk, they explicitly permit the employee to utilize the phone for personal calls, gaming, and social media.
*   **The Control:** Because the corporation owns the hardware, the MDM commands total authority, allowing for aggressive security lockdowns that would be legally problematic on a BYOD device.

### 3. Choose Your Own Device (CYOD)
*   **The Concept:** A hybrid approach. The corporation owns the device and pays the bill, but rather than issuing everyone a standardized, identical appliance, they present the employee with an approved catalog (e.g., "Choose an iPhone 14, a Samsung Galaxy, or a Google Pixel"). This maintains strict MDM security while increasing employee satisfaction.

## Wireless Attack Vectors
Because mobile devices transmit data through the open air, they are uniquely vulnerable to interception.
*   **Open Networks:** Connecting a mobile device to an unencrypted public coffee shop Wi-Fi broadcasts all data in raw plaintext, making it trivial for an attacker sitting nearby to capture passwords via packet sniffing. Users must utilize an encrypted VPN tunnel.
*   **On-Path Attacks:** An attacker in the same geographical area can seamlessly impersonate a legitimate corporate access point, tricking the mobile device into routing all traffic through the attacker's laptop before it hits the internet, maliciously reading and modifying the encrypted data streams in real-time.
*   **Bluetooth Vulnerabilities:** Bluetooth establishes an ad-hoc Personal Area Network (PAN). Connecting to untrusted Bluetooth devices can allow an attacker to silently siphon contact lists or hijack the audio stream. Devices should never be configured to automatically pair with unknown sources.
