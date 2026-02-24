# Lesson: Watering Hole Attacks
**Module:** 2.2

## Introduction: When Perimeter Defense is Too Strong
In previous lessons, we discussed direct attack methods, such as leaving USB drives in a parking lot hoping an employee connects them to the network, or sending Phishing emails. But what happens when the organization invests in employee training? Employees are well-trained not to connect external devices and not to click on suspicious links in emails. In such a situation, when the attacker cannot penetrate the network from the outside, they change tactics: instead of trying to break in, they wait for the victim to step out. This is the essence of a Watering Hole Attack – setting an ambush on a legitimate website that the victim is expected to visit.

## 1. Concept and Operating Mechanism
**A. The Evasion Strategy:** Instead of directly attacking the secured target network, the attacker tries to gain access to a Third Party system that the organization uses or visits regularly. The term is borrowed from nature: the predator "poisons" the water source and patiently waits for the prey to arrive to drink.

**B. The Reconnaissance Phase:** This attack requires preliminary research by the attacker. They need to understand which external websites are in daily use by the organization's employees.
• *Example:* Company employees regularly order lunch through the website of a local cafe or sandwich shop.

**C. Executing the Infection (Exploitation):** The attacker attempts to penetrate the Web server of that third party (the sandwich shop).
1. They might exploit a Vulnerability existing on the third-party website.
2. Alternatively, they might send an infected email (with an attachment) to the sandwich shop itself, hoping they will click on it, granting access to their network, and from there to their web server. Once access is gained, the attacker "poisons" the website so that anyone who visits it – especially the target organization – gets infected.

## 2. Case Study: The Financial Sector (January 2017)
To understand the level of sophistication of these attacks, let's analyze a real event that occurred in 2017.

**A. The Targets:** The attackers managed to poison the websites of major financial institutions:
• The Polish Financial Supervision Authority.
• The National Banking and Securities Commission of Mexico.
• The State Bank in Uruguay.

**B. The Technique: Targeted Malicious Code:** The attackers implanted malicious JavaScript files on the servers of these websites. However, the sophistication was evident in filtering the victims:
• *Filtering by IP addresses:* The attackers did not poison the "water" for everyone. They configured the malicious code to run only when the visitor to the site arrived from an IP address associated with specific financial organizations (specific target banks).
• *User experience:* Any other person visiting these sites saw the normal and perfectly intact website, without any malicious code. Only the selected targets were attacked.

**C. The Results:** Although the full results of the attack were never released to the public (so we do not know for sure if the attackers obtained the final information they sought), it is known that a large number of websites were infected as a result.

## 3. Defense: Defense in Depth
There is no single "Silver Bullet" solution to prevent Watering Hole attacks, as they exploit legitimate websites. The only solution is to use a Defense in Depth strategy – multiple layers of security.

**A. Required Security Layers:** The organization must implement several security technologies in parallel, assuming that if one layer fails, another will detect the threat:
1. *Firewall:* May allow legitimate traffic (browsing to the sandwich shop site) to pass.
2. *Intrusion Prevention System (IPS):* Even if the firewall allowed the traffic, the IPS scans the content of the traffic and may identify it as malicious and block it.
3. *Antivirus:* The endpoint security layer.

**B. Real-World Demonstration:** In the case of the attack on the Polish Financial Authority (mentioned above), the Antivirus layer proved its effectiveness.
• Users who were protected by Symantec's Antivirus software and visited the infected site received an immediate alert that the software detected malicious code.
• The software prevented the code from Executing on the personal computer, thereby stopping the infection chain.

## Executive Summary
A Watering Hole Attack is an evasion technique where the attacker targets a legitimate third party frequently visited by the organization (such as external vendors or local services), instead of attacking the organization directly. The attacker injects malicious code (such as JavaScript) into the third-party site, sometimes using IP address filtering to target only the intended organization (as happened in the financial attack in 2017). Defending against this threat requires Defense in Depth, which includes a combination of firewalls, IPS systems, and updated Antivirus software, to ensure that if one layer is breached, the other layers will detect and block the malicious activity.
