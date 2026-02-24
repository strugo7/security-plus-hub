# Lesson: Zero Trust
**Module:** 1.2

## Introduction: Changing the Security Paradigm
In many traditional networks, the prevailing approach was that if you managed to get past the perimeter Firewall, the inside of the network was considered relatively "open". In this situation, people could move from system to system without additional checks or balances. The lack of internal security controls allowed not only authorized users to move freely, but also unauthorized entities and Malicious Software. The Zero Trust strategy fundamentally changes this concept: nothing is presumed "trusted" by default, and everything is subject to security checks. In this lesson, we will learn about the principles of the method, the planes of operation (Data vs. Control Planes), and the policy enforcement architecture.

## 1. Core Principles of Zero Trust
**A. "Never trust, always verify"**
The meaning of "zero trust" is that you must Authenticate or prove your identity every time you want to access a specific resource.
• *Scope:* This rule applies to every device on the network, every Process that runs, and every user.
• *Technical Implementation:* In such an environment, you might use Multi-factor Authentication during login, encrypt data at rest (Data at Rest) and in transit (Data in Transit), and install additional firewalls and strict system permissions.

## 2. Planes of Operation
One way to implement Zero Trust is to break down the security devices into smaller components, called "functional planes of operation". This division is relevant to physical devices (such as a switch), virtual devices, or cloud security processes.

**A. Data Plane**
• *Role:* The part of the device that actually performs the security process in real time.
• *Actions:* Processing Frames, Packets, and network data. This plane handles data Forwarding, Network Address Translation (NAT), and routing.
• *Simply put:* This is the engine that moves the information from place to place.

**B. Control Plane**
• *Role:* The part that manages and controls the actions occurring in the data plane.
• *Actions:* Defining Policies or rules, determining routing configuration, understanding how to handle NAT, and making changes to how data is forwarded (e.g., Trunking).
• *Simply put:* This is the brain that determines the rules by which the information will move.

## 3. Adaptive Identity
In the Zero Trust model, we need to be smarter about how we evaluate security controls. It is not enough to rely on what the user tells us (username and password); we must use an Adaptive Identity.

**A. Context Analysis**
The system examines additional information surrounding the authentication process:
• *Source of the request:* Is a user requesting data located in the US coming from an IP address in China?
• *Relationship to the organization:* Is the user a company employee, a Contractor, a full-time, or part-time worker?
• *Additional parameters:* Physical location, connection type, and IP addresses.

**B. Dynamic Response**
After examining all these variables, the system can automatically generate a requirement for stronger authentication (e.g., MFA) if the circumstances warrant it.

## 4. Security Zones & Access Control
**A. Limiting Entry Points**
Another way to control trust is to limit the locations from which one can enter the network (e.g., access is only permitted from inside the building or via VPN).

**B. Creating Security Zones**
Instead of just looking at the "one-to-one" connection (user vs. server), we examine the entire conversation path using Security Zones:
• *Types of zones:* Untrusted network, Trusted network, internal/external network, or separate departmental groups.
• *Zone-based policy:* A rule can be set that automatically denies access if the source is an untrusted zone and the destination is a trusted zone.

**C. Implicit Trust**
Zones allow for the creation of controlled "implicit trust".
• *Example:* A user in a "trusted zone" (company offices) accesses a database server in an "internal zone" (Data Center). A policy can be created defining that this communication is implicitly trusted.

## 5. Policy Enforcement Architecture
To implement these rules, we need a structured enforcement mechanism. The model consists of several logical components working together:

**1. Policy Enforcement Point (PEP)**
• *Role:* The "Gatekeeper".
• *Action:* All network traffic must pass through this point. The PEP does not make the decisions; rather, it gathers the information and passes it on for a decision to be made.

**2. Policy Decision Point / Policy Engine**
• *Role:* The decision maker.
• *Action:* Examines the authentication request, compares it to the predefined security policy, and decides: whether to Grant, Deny, or Revoke access.

**3. Policy Administrator**
• *Role:* The executing mediator.
• *Action:* Takes the decision from the policy engine and passes it to the PEP. It may generate Access Tokens or Credentials as a result of the decision, and send them to the PEP to actually allow access.

*The Complete Process Flow:* The subject/system (from an untrusted zone) -> communicates through the PEP -> the PEP forwards to the Administrator -> forwards to the Policy Engine for a decision -> the decision returns to the Administrator -> an approval is sent to the PEP -> access to the organizational resource is opened.

## Executive Summary
The Zero Trust model replaces the traditional perimeter defense with a "zero trust" approach: every user, device, and process must undergo continuous authentication for every resource. Implementation is carried out by separating the Data Plane (the actual traffic) from the Control Plane (rule management), and using an Adaptive Identity that examines context (location, role). The architecture is based on an Enforcement Point (PEP) acting as a gate, and a Policy Engine making real-time decisions to grant or block access between different Security Zones.
