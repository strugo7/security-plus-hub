# Lesson: Port Security
**Module:** 3.2

## Introduction to Port Security
**Port Security** ensures that physical access to a network switch or a wireless access point does not automatically guarantee logical access to the network resources. If a visitor plugs their laptop into an active ethernet jack in a conference room without port security, they instantly gain a corporate IP address. 

With advanced port security deployed, the switch port remains completely disabled until the user successfully authenticates.

## The Extensible Authentication Protocol (EAP)
**EAP** is fundamentally an authentication framework, not a specific protocol itself.
*   **The Framework:** It provides a standardized method for transmitting authentication material over network access technologies. EAP dictates *how* the authentication conversation happens, allowing wireless manufacturers and wired switch vendors to build interoperable security mechanisms.
*   **Flexibility:** EAP can encapsulate many different types of inner authentication methods, including passwords, digital certificates, or smart cards.

## IEEE 802.1X (Network Access Control)
The most common enterprise implementation of EAP is **IEEE 802.1X**. This is the strict standard governing Port-Based Network Access Control (PNAC). 
*   **The Mechanism:** When a device physically connects to a switch port or an access point configured for 802.1X, the port is mathematically placed into an "unauthorized" state. The only traffic legally permitted to cross that port is EAP authentication data. Absolutely zero standard network traffic (DHCP, HTTP) can pass.

## The Three Components of 802.1X
An 802.1X authentication natively utilizes three distinct network components:

### 1. The Supplicant
*   **The Role:** This is the client device (a laptop, a smartphone) attempting to gain access to the network. The term also refers to the specific software agent running on the OS that knows how to speak the 802.1X protocol.

### 2. The Authenticator
*   **The Role:** This is the network device the Supplicant physically or wirelessly connects to (the corporate Ethernet Switch or the Wireless Access Point). 
*   **Function:** The Authenticator acts purely as a middleman. It cannot verify the passwords itself. It intercepts the Supplicant's login credentials and securely forwards them to the backend server for verification.

### 3. The Authentication Server
*   **The Role:** The authoritative backend database containing the actual user credentials, strictly isolated deep inside the secure network (e.g., a RADIUS server connected to Microsoft Active Directory).
*   **The Verdict:** The Authentication server receives the forwarded credentials from the Authenticator, mathematically verifies them against the database, and sends a "Success" or "Failure" message back to the Authenticator.

## The Authentication Execution
1.  The Supplicant plugs into the switch. EAP begins.
2.  The Authenticator (the switch) asks the Supplicant, *"Who are you?"*
3.  The Supplicant provides its EAP Response (username/password).
4.  The Authenticator blindly forwards this response to the RADIUS Authentication Server.
5.  If the credentials are valid, RADIUS tells the switch, *"Allow Access."*
6.  The switch dynamically unlocks the physical port, transitioning it to an "authorized" state, and the laptop successfully joins the corporate network.
