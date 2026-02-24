Lesson: Cross-site Scripting (XSS)

Based on Module 2.3 - CompTIA Security+ SY0-701Introduction: When the Browser Works Against Us

Attackers often use our browsers as a weapon against us. In this lesson, we will learn about a browser vulnerability that allows an attacker to gain access to a third-party website on our behalf. This vulnerability exploits the trust the browser places in various websites. Although creating the initial exploit can be challenging, once it exists, the ways to use it are numerous and varied.1. Definition and Terminology: Why XSS?

The term Cross-site Scripting describes a situation where information from one site is shared with another site in an unauthorized manner due to a browser vulnerability.
The Common Abbreviation: The attack is commonly abbreviated as XSS.
Why not CSS? Naturally, we might expect the abbreviation CSS, but this abbreviation is already "taken" by Cascading Style Sheets, which are used for website design. Therefore, to distinguish between the technologies, the industry adopted XSS.
The Scripting Language: Most XSS attacks are based on JavaScript. This is a very popular language that runs by default in almost every browser, making it a convenient attack vector.
2. Attack Mechanics (High Level Overview)

To understand how the attack works, let's look at the three main players: The Victim, The Trusted Website, and The Attacker.
The Bait: The attacker sends the victim a link that contains a Malicious Script within it. The link can arrive via email, text message (SMS), or any other means.
The Action: The victim clicks on the link. The link leads to a legitimate, trusted website that the victim is familiar with.
The Exploit: Because the attacker provided the link, additional information—the malicious script—is attached to the connection. The script runs "Behind the scenes" without the victim seeing anything.
Information Theft: The script sends private information directly to the attacker. This information often includes:
Cookies.
Session Details/IDs.
Other sensitive information from the trusted website.
3. Type One: Non-persistent / Reflected XSS

This is one of the most common types of XSS attacks.
The Principle: A third-party site is configured in a way that allows scripts to be run within user input blocks, such as a search box.
**The Attack Process:**
The attacker identifies a site (e.g., a search engine) that does not block the execution of JavaScript in the input box.
The attacker sends the victim an email with a link that exploits this vulnerability.
When the user clicks the link, the script is "Reflected" from the site and runs in the user's browser.
The script sends the Session ID to the attacker.
The Implication: The attacker now has the same session ID as the victim, granting them access to the trusted site as if they were the legitimate user.
Practical Example - Shopping Cart: The lesson presents an example of a shopping cart website where the "credit card number" field does not perform input validation.
Instead of entering a credit card number, the attacker inserts a simple line of JavaScript code.
In the example, the code pops up an Alert Message with the Session ID.
In a real attack, the message would not pop up for the user but would be silently sent to the attacker the moment the user clicks the "Purchase" button.
4. Type Two: Persistent / Stored XSS

In this attack, the attacker does not need to send a link directly to a specific victim.
The Principle: The attacker posts a message on a site that stores information, such as a Social Media Site or a forum.
The Storage: The message contains the Malicious Payload/JavaScript, and it is Stored on the site's servers.
Mass Infection: Anyone who visits the page and views the message automatically has the malicious script run by their browser.
Virality: Since this is a social network, the attacker can include code that causes users to share the message on their Feed without their knowledge. This way, the attack is repeatedly spread to more users.
5. Case Study: The Subaru Hack (June 2017)

Security researcher Aaron Guzman found an interesting XSS vulnerability on Subaru's vehicle management website.

Problems Identified in the System:
Poor Token Management: Upon login, the system issued a Token that never expired (No expiration). This goes against Best Practices which require a limited validity period (e.g., 24 hours).
Excessive Permissions: The token allowed any service request to be executed on the vehicle.
Account Takeover: The token allowed the attacker's email to be added to the victim's account, giving the attacker full access to manage the vehicle in the future as well.
The Role of XSS in the Attack: There was an XSS vulnerability on the Subaru website.
An attacker could send a link with malicious code.
When the victim clicked it, their token was sent to the attacker.
Since the token never expired, the attacker gained full and permanent access to the victim's vehicle and any other vehicle registered on the site, as long as the vulnerability was not fixed. (Subaru fixed the vulnerabilities after the report).
6. Protection and Prevention (Mitigation)

How does one defend against XSS? Protection is divided into the user side and the developer side.A. User Best Practices:
Caution with Links: Do not click on links from unknown sources (emails, messages).
Direct Typing: Open a separate browser and manually type the trusted domain name.
JavaScript Management: One can consider disabling JavaScript or using extensions that restrict it, but this may harm the browsing experience and the functionality of many sites.
Updates: Keep the browser and applications updated to the latest version. Manufacturers release security patches that block known XSS vulnerabilities.
B. Developer Best Practices:
Input Validation: This is the most critical defense. Developers must ensure that all input entering the system (Input Fields) is checked and filtered, so that a user cannot insert and run their own scripts within the application fields.
Executive Summary

Cross-site Scripting (XSS) is a common vulnerability that exploits the trust the browser has in websites, and is often executed using JavaScript. There are two main types: Non-persistent (Reflected) which arrives via a malicious link, and Persistent (Stored) which is stored on the server (such as on social networks) and attacks every visitor to the site. As demonstrated in the Subaru case, an XSS vulnerability can lead to the theft of Session Tokens and a full takeover of accounts and property. The best defense for organizations is strict adherence to Input Validation in the code and routine software updates.