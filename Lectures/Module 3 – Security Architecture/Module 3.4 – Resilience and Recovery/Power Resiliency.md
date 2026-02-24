# Lesson: Power Resiliency
**Module:** 3.4

## The Foundation of IT
The single point of failure that connects every complex, highly engineered enterprise network component is the power grid. Every router, multi-million dollar storage array, and advanced firewall relies entirely on the continuous physical flow of electricity. A data center architect must assume the municipal power grid will eventually, and catastrophically, fail.

## Uninterruptible Power Supply (UPS)
A **UPS** provides immediate, short-term battery backup power the millisecond the main electrical grid drops. It protects equipment against absolute blackouts, violent voltage spikes (surges), and extended dips in voltage (brownouts).

### Types of UPS Systems
1.  **Offline / Standby UPS:** The cheapest and most basic option. It constantly passes municipal AC power directly to the server. If it detects a total power loss, a physical switch violently clicks over to the battery backup. There is a microscopic, split-second loss of power during the switchover.
2.  **Line-Interactive UPS:** Contains an automatic voltage regulator. It can dynamically and continuously "smooth out" fluctuating municipal power, gracefully raising voltage during a brownout without natively engaging the finite battery reserves until an absolute blackout occurs.
3.  **Online / Double-Conversion UPS:** The enterprise gold standard. The server is *never* directly connected to the municipal wall power. The wall power charges the battery, and the server runs 100% of the time directly off the battery output. This guarantees completely pure, flawless sine-wave power and ensures absolutely zero transition time when the grid fails.

### UPS Features
*   **Capacity:** UPS batteries are strictly finite (providing minutes, not hours, of power). 
*   **Automated Shutdown:** Advanced UPS units actively communicate with servers via USB or network protocols. When the battery plummets to 10%, the UPS commands the server OS to execute a highly graceful, automated shutdown sequence, saving all databases cleanly before the battery completely dies.

## Long-Term Generators
If an organization requires operations to continue during a hurricane creating a week-long blackout, a UPS is useless. They must deploy a massive diesel or natural gas **Generator**.
*   **Continuous Operation:** A generator is an actual combustion engine mechanically creating electricity locally. As long as it is continuously supplied with physical fuel, the data center will remain online indefinitely.

## The Engineered Transition
A resilient power architecture natively relies on combining both technologies to cover each other's weaknesses.
1.  The municipal city grid fails.
2.  **The Gap:** A massive diesel generator cannot start instantly; it takes roughly 30 to 60 seconds for the massive engine to physically crank over, spin up to speed, and stabilize its voltage output.
3.  **The UPS Bridge:** During this terrifying 60-second window, the UPS batteries instantly assume 100% of the data center load, preventing the servers from violently crashing.
4.  Once the generator is running smoothly at full capacity, the Automatic Transfer Switch (ATS) seamlessly moves the data center load off the depleted UPS batteries and onto the roaring generator power.
