# Lesson: DNS Attacks
**Module:** 2.4

## Introduction to DNS Attacks
The **Domain Name System (DNS)** is fundamentally the phonebook of the internet. It converts human-readable domain names (like `google.com`) into their corresponding network IP addresses. Because it is a foundational network protocol, attackers actively target DNS to maliciously redirect network traffic. 

If an attacker successfully compromises DNS resolution, they can seamlessly redirect a user attempting to visit a legitimate website to an attacker-controlled server without the user ever realizing it.

## Local Host File Modification
Before a computer queries an external DNS server, it typically checks a localized text file (the `hosts` file) on its own hard drive first.
*   **The Mechanism:** This file contains static mappings of domain names to IP addresses. If a mapping exists in the local hosts file, the operating system uses it and completely ignores the external DNS server.
*   **The Exploit:** If an attacker gains administrative access to a victim's machine, they can maliciously edit the local `hosts` file. They can add a line explicitly mapping `www.bank.com` to the attacker's server IP.
*   **The Result:** The next time the user types `www.bank.com` into their browser, their own computer immediately redirects them to the malicious server.

## DNS Poisoning and Spoofing
**DNS Poisoning** (or DNS Spoofing) occurs when an attacker sits "on-path" (in the middle of the network) and intercepts outgoing DNS queries. 
*   **The Interception:** When a user queries the network for the IP of a legitimate site, the attacker intercepts the request before it reaches the legitimate DNS server.
*   **The Forgery:** The attacker racing against the legitimate server sends a forged DNS response back to the user, containing the IP address of the attacker's server.
*   **The Poisoned Cache:** The victim's computer receives the forged response, stores the malicious IP locally in its DNS cache, and seamlessly connects to the attacker's server. Because the local cache retains this data, any subsequent requests to that domain will also be maliciously redirected until the cache expires.

## Domain Hijacking
**Domain Hijacking** is a significantly more devastating attack because it compromises the domain registration itself.
*   **Registration Compromise:** Attackers target the root domain registration accounts (e.g., at GoDaddy or Namecheap) using password spraying, social engineering, or credential stuffing.
*   **Total Redirection:** Once logged into the domain control panel, the attacker officially reconfigures the global DNS records for the domain, pointing the entire internet to their malicious servers.
*   **The Impact:** This effectively steals the entire website's traffic on a global scale. In 2016, a major Brazilian bank suffered a domain hijacking attack, allowing attackers to transparently intercept all online banking logins for six hours.

## URL Hijacking (Typosquatting)
**URL Hijacking**, frequently called **Typosquatting**, relies entirely on user error rather than technical exploitation of the DNS protocol.
*   **The Premise:** Users frequently make spelling errors when manually typing domain names into the address bar (e.g., typing `google.com` as `gogle.com`).
*   **The Exploit:** Attackers intentionally purchase and register domain names that are highly probable typographical errors of massive legitimate websites. 
*   **The Payload:** When a user accidentally misspells the URL, they are instantly directed to the typosquatted domain. These fake domains often mimic the visual aesthetic of the legitimate site to steal login credentials, or immediately serve drive-by malware payloads.
