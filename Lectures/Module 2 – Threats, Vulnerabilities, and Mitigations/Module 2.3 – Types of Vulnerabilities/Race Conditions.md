# Lesson: Race Conditions
**Module:** 2.3

## Introduction
Most applications perform multiple transactions and processes at the exact same time. A **race condition** occurs when two events happen simultaneously within an application, and the application’s logic fails to account for them operating at the exact same time. This results in an unexpected, unintended, and exploitable outcome.

## TOCTOU (Time-Of-Check to Time-Of-Use)
A common type of race condition is a **TOCTOU** attack. 
*   **Mechanism:** The application checks the system to retrieve some stored information (the Check). After retrieving it, the application performs a function using that value (the Use).
*   **The Flaw:** If another process alters the underlying variable *behind the scenes* during the exact fraction of a second between the "Check" and the "Use", the application acts on invalid data, creating a race condition.

### Practical Example: The Bank Ledger
Consider two bank accounts (Account A and Account B), both starting with $100.
1.  **User 1** requests to transfer $50 from A to B. The app checks balances (A=$100, B=$100).
2.  **User 2** simultaneously checks the balances (A=$100, B=$100).
3.  **User 1** adds $50 to B. The application immediately updates the ledger to reflect B=$150.
4.  **User 2** adds $50 to B. The application updates the ledger to reflect B=$200.
5.  **User 1** removes $50 from A. From User 1's perspective, A=$50, B=$200.
6.  **User 2** performs the same removal. However, because the withdrawal wasn't centrally locked or updated instantly across active sessions, User 2 operates under the assumption A started with $100 and finishes the transaction with A=$50 and B=$200. 

In reality, $100 was removed from A (it should have $0), but the race condition resulted in newly minted money (A=$50, B=$200) because the concurrent events tripped over each other's execution logic.

## Real-World Examples
### Mars Rover Spirit (2004)
A major race condition occurred with the file system on the Mars Rover Spirit. The rover was programmed to reboot itself upon recognizing a fatal file system error. However, upon rebooting, it checked the file system before it could clear the error flag, registered the identical error instantly, and triggered another reboot. This resulted in an infinite reboot loop millions of miles from Earth.

### Tesla Model 3 (Pwn2Own 2023)
Cybersecurity researchers executing a TOCTOU attack bypassed the security of a Tesla Model 3 infotainment system via Bluetooth. They exploited the race condition to elevate privileges, attain root access over the vehicle's infotainment backend, and won a $100,000 prize.
