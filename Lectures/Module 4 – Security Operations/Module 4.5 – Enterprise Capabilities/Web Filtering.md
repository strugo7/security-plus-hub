# Lesson: Web Filtering
**Module:** 4.5

## Introduction: Controlling Information Beyond the Firewall
Many organizations use a Firewall to allow or block access to certain applications. But what happens when we want to filter the information located inside the web pages themselves? This is where content filtering tools come into play. Sometimes they are referred to as URL Filters or website category filtering. These tools are designed to control the information entering and leaving the organization, which is especially critical when the organization deals with sensitive data. In this lesson, we will learn about the different filtering methods: from address lists, through endpoint agents, to proxy servers and DNS filtering.

## 1. Content and URL Filters
**A. Definition and Purpose**
Content filters limit the type of information that can be seen in the user's browser.
• *Household analogy:* At home, we refer to this as Parental Controls, as we filter what others in the house can see.
• *Blocking maliciousness:* These filters are designed to block access to sites known as "Known-bad sites", which contain viruses, Malware, and other malicious code.

**B. Allow and Block Lists**
The filtering is usually done based on a URL (Uniform Resource Locator) or URI (Uniform Resource Identifier).
• If we want to allow access to a specific site, we will add it to the Allow List.
• If we want to block a site, we will add it to the Block List.

**C. Management by Categories**
Managing lists of Fully Qualified Domain Names (FQDN) individually is very difficult to do. Therefore, many filtering technologies group similar addresses into Categories.
• *Examples of categories:* Auctions, Hacking, Malware, Travel, Recreation, etc.
• Most filters include over 50 different categories (such as gambling, government, home and garden), which allows for very granular control.

**D. Response Policy**
Different rules can be defined for each category:
• *Allowed:* Educational sites might be allowed.
• *Log/Alert:* "Home and garden" sites might be allowed, but an alert will be sent to the log when they are visited.
• *Blocked:* Gambling sites will be completely blocked.

## 2. Implementation Methods: Firewall vs. Agent
How do we actually apply these rules in practice?

**A. Network-based filtering (Next-Generation Firewalls)**
In the past, there was a large market for standalone URL filters. Today, this capability is built into Next-generation firewalls (NGFW).
• *The Advantage:* A single device manages the firewall rules, the IPS (Intrusion Prevention System), and the URL filtering.
• *The Disadvantage:* The underlying assumption is that users are located where the firewall manages the traffic. In modern networks, where users are mobile and work from home, this solution is not always sufficient.

**B. Agent-based filtering**
The solution for mobility is installing an Agent on the user's desktop computer or device.
• *How it works:* The agent is managed through a central console, but the decision-making process takes place directly on the user's device.
• *The Advantage:* The user can travel and connect to any network they want, and the filtering will continue to work independently of the organizational firewall.
• *The Challenge:* You must ensure that the agents are Constantly updated with the latest category lists.

## 3. Proxies
Another solution for managing traffic and filtering is the use of a Proxy. This is a component that sits between the users and an external network and manages the flow of traffic.

**A. Mechanism of Action ("The Man in the Middle")**
Unlike a traditional firewall where the user communicates directly with the site, the proxy sits in the middle of the conversation:
1. The user requests a web page from the proxy.
2. The proxy requests the page from the site on the internet.
3. The site responds to the proxy.
4. The proxy checks the response (Is it safe? Is there malware?), and only if everything is okay – passes it on to the user.

**B. Additional Proxy Capabilities**
• *Caching:* The proxy can keep a local copy of the information. If another user requests the same page, the proxy will provide it from the cache without needing another request to the internet.
• *Access Control:* Restricting devices that can access the internet based on a username and password or an IP address.

**C. Types of Proxies**
• *Explicit Proxy:* The user's application must be explicitly configured to use this proxy.
• *Transparent Proxy:* Works without the end user's knowledge and without special configuration on the client side.
• *Forward Proxy (Internal Proxy):* Installed on the internal network to allow users access to the internet. The organization controls its configuration.

## 4. Website Reputation
Some content filters check more than just the domain name; they evaluate the Reputation of the site and the risk involved.

**A. Risk Levels**
Sites can be classified by reputation levels such as: Trustworthy, low risk, medium risk, Suspicious, or high risk.
• *Policy:* An automatic block can be set for any site defined as "high risk," allowing access only to sites clearly marked as "trustworthy."

**B. Automated vs. Manual**
Since there are millions of sites, every site cannot be checked manually. The process is usually Automated: a scan checks the site, evaluates the information, and determines the reputation. However, you can Manually assign a reputation if you disagree with the automatic determination.

## 5. DNS Filtering
Another way to filter content, without the need for a next-generation firewall or proxy, is using DNS Filtering.

**A. The Principle**
Every connection to a site requires converting the domain name to an IP address using a DNS server. If the domain is known to be malicious, we can configure the DNS so that it does not provide the user with the site's IP address.

**B. The Result for the User**
When a user tries to access www.malicioussite.org, they will receive a default IP address or no address at all, and the connection simply will not take place.

**C. Real-time Intelligence**
The information in the DNS servers is updated automatically using Real-time threat intelligence, based on commercial or public lists.

**D. Major Advantage: Blocking Malware (C2)**
DNS filtering works beyond just web pages. If malicious software is installed on a computer and tries to communicate with a Command and Control (C2) server, it will try to make a DNS query to find the server's address. The DNS filtering will fail the request, thereby limiting the malware's capabilities.

## Executive Summary
Web Filtering allows an organization to control incoming and outgoing information, beyond basic port blocking. This can be implemented using Firewalls (NGFW), Agents on endpoints for remote workers, or Proxy servers that perform security checks and Caching. Filtering is based on Categories (such as gambling or malware) and website Reputation ratings. Another highly effective tool is DNS filtering, which prevents access to malicious sites right at the address resolution stage, and can actively block communication from malware to Command and Control (C2) servers.
