# Lesson: Cross-site Scripting (XSS)
**Module:** 2.3

## Introduction: When the Browser Works Against Us
Attackers often use our browsers as a weapon against us. In this lesson, we will learn about a browser vulnerability that allows an attacker to gain access to a third-party site on our behalf. This vulnerability exploits the trust the browser places in various sites, and despite the challenge in creating the initial exploit, once it exists, the ways to use it are many and varied.

## 1. Definition and Terminology: Why XSS?
The term Cross-site Scripting describes a situation where information from one site is shared with another site in an unauthorized manner due to a browser vulnerability.
• *The Accepted Abbreviation:* It is customary to abbreviate the attack as XSS.
• *Why not CSS?* Naturally, we would expect the abbreviation CSS, but this abbreviation is already "taken" by Cascading Style Sheets used for website design. Therefore, to differentiate between the technologies, the industry adopted XSS.
• *The Scripting Language:* Most XSS attacks are based on the JavaScript language. This is a very popular language that is enabled by default in almost every browser, making it a convenient attack vector.

## 2. Attack Mechanics (High Level Overview)
To understand how the attack works, we will look at the three main players: the Victim, the Trusted Website, and the Attacker.
1. *The Bait:* The attacker sends the victim a link containing a Malicious Script. The link can arrive via email, text message (SMS), or any other method.
2. *The Action:* The victim clicks on the link. The link leads to a legitimate and trusted site that the victim recognizes.
3. *The Exploit:* Because the attacker provided the link, additional information is attached to the connection - the malicious script. The script runs in the background ("Behind the scenes") without the victim seeing a thing.
4. *Information Theft:* The script sends private information directly to the attacker. This information usually includes:
    ◦ Cookies.
    ◦ Session Details/IDs.
    ◦ Other sensitive information from the trusted site.

## 3. Type 1: Non-persistent / Reflected XSS
This is one of the most common types of XSS attacks.
• *The Principle:* A third-party site is configured in a way that allows running scripts inside user input fields (User Input Blocks), such as a search box.
• *The Attack Process:*
    1. The attacker identifies a site (e.g., a search engine) that does not block the execution of JavaScript in the input box.
    2. The attacker sends the victim an email with a link that exploits this vulnerability.
    3. When the user clicks the link, the script is Reflected from the site and runs in the user's browser.
    4. The script sends the Session ID to the attacker.
• *The Implication:* The attacker now has the same session ID as the victim, giving them access to the trusted site as if they were the legitimate user.
*Practical Example - Shopping Cart:* The lesson presents an example of a site with a shopping cart, where the "credit card number" field does not perform input validation.
• Instead of entering a credit card number, the attacker enters a simple line of JavaScript code.
• In the example, the code pops up an Alert Message on the screen with the Session ID.
• In a real attack, the message will not pop up for the user, but will be sent silently to the attacker the moment the user clicks the "Purchase" button.

## 4. Type 2: Persistent / Stored XSS
In this attack, the attacker does not need to send a link directly to a specific victim.
• *The Principle:* The attacker publishes a message on a site that stores information, like a Social Media Site or a forum.
• *The Storage:* The message contains the malicious payload (Malicious Payload/JavaScript), and it is Stored on the site's servers.
• *Mass Infection:* For anyone who visits the page and views the message, their browser automatically runs the malicious script.
• *Virality:* Because it is a social network, the attacker can include code that causes users to share the message on their Feed without their knowledge. Thus, the attack is distributed to additional users over and over again.

## 5. Case Study: The Subaru Vulnerability
The Role of XSS in the Attack: There was an XSS vulnerability on the Subaru website.
• An attacker could send a link with malicious code.
• When the victim clicked on it, their token was sent to the attacker.
• Since the token never expired, the attacker gained full and permanent access to the victim's vehicle and any other vehicle registered on the site, as long as the vulnerability was not fixed. (Subaru fixed the vulnerabilities after it was reported).

## 6. Protection and Prevention (Mitigation)
How do we defend against XSS? The defense is divided into the user side and the developer side.
**A. The User Side (User Best Practices):**
• *Caution with Links:* Do not click on links from unknown sources (emails, messages).
• *Direct Typing:* Open a separate browser and type the trusted domain name manually.
• *JavaScript Management:* You can consider disabling JavaScript or using extensions that limit it, but this may harm the browsing experience and the functionality of many sites.
• *Updates:* Keep your browser and applications updated to the latest version. Manufacturers distribute security patches (Patches) that block known XSS vulnerabilities.
**B. The Developer Side (Developer Best Practices):**
• *Input Validation:* This is the most critical defense. Developers must ensure that all input arriving at the system (Input Fields) is checked and filtered, so that a user cannot enter and run their own scripts within the application's fields.

## Executive Summary
Cross-site Scripting (XSS) is a common vulnerability that exploits the trust the browser has in sites, and is mostly executed using JavaScript. There are two main types: Non-persistent (Reflected) which arrives via a malicious link, and Persistent (Stored) which is stored on the server (like in social networks) and attacks every visitor to the site. As demonstrated in the Subaru case, an XSS vulnerability can lead to the theft of Session Tokens and complete takeover of accounts and property. The best defense for organizations is strict adherence to Input Validation in code and regular software updates.
