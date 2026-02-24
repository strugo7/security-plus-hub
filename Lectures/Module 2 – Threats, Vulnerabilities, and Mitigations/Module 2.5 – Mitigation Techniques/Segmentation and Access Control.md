# Lesson: Segmentation and Access Control
**Module:** 2.5

## Introduction: Limiting the Scope
In order to limit the scope of any type of security event, it may be useful to segment your network into smaller pieces. This might be through physical segmentation, where you are physically separating devices. It might be logical segmentation. We often see that in network switches with VLANs or virtual segmentation, which is very common in cloud-based or virtual machine architectures.

## 1. Reasons for Network Segmentation
• **Performance:** Sometimes, we separate these systems to get the best possible performance, especially if it’s a high bandwidth application. We might dedicate a single subnet just for this high bandwidth application so that it can run as efficiently as possible, and anything that’s done by any other user on the network would not have any effect on the throughput of this app.
• **Security Strategy:** Sometime, our segmentation is very strategic, especially from a security perspective. For example, you might have a rule that says users should not be communicating directly to a database server. Instead, they should be communicating to an application, and the application server should be communicating to the database server. In this situation, there might be a firewall or some type of control list that would limit who might have access to a particular server.
• **Compliance and Mandates:** Some segmentation is required perhaps due to a mandate or set of policies and procedures. For example, if you’re running PCI compliance, that’s the Payment Card Industry, which means you’re protecting credit card numbers, you might be required to keep the credit card information completely separate from any other part of your network.

## 2. Access Control Lists (ACLs)
It can be easy to implement this separation using an ACL, or Access Control List.
• **Filtering Criteria:** This provides a way to allow or disallow traffic through your network, operating systems, or other technologies. So you might have a grouping of different categories, like source IP address, destination IP address, port numbers, time of day, or any other detail that you can use to control traffic through a device.
• **Address and User-Based Access:** This access may be all based on IP address, where certain IP addresses can access other IP addresses and there may be blocks installed for other ranges of addresses. Or maybe it’s based on the user. If it’s a regular user, they might not have access. But if you are an administrator or a super user, you may have the proper access to that service.
• **Lockout Warning:** It’s also important when configuring these ACLs that you take all different connections into account. You don’t want to create an ACL that would effectively lock you out from building other ACLs in that system.
• **Practical Example:** Here’s an example of permissions that you might want to allow or disallow using an access control list:
    ◦ Bob can read files on a particular resource.
    ◦ Fred can access the network.
    ◦ James can access the network 192.168.1.0/24 using only the TCP ports 80, 443, and 8088. You can see this last control is relatively specific, which allows the administrator to create very granular controls for access.
• **Operating System ACLs:** ACLs are also found in our operating systems. If you’ve ever configured permissions to a particular folder or file that’s in an operating system, or you’ve created groups and added users to those groups, then you’ve configured an access control list.

## 3. Application Control: Allow and Deny Lists
Another form of segmentation is based on the applications you use themselves.
• **Application Allow and Deny Lists:** Many operating systems allow you to create an application allow list and deny list. Many organizations will use these lists to ensure that only legitimate applications can be used on those systems, and it will block the use of any other app. This would include blocking malicious software, such as Trojan horses, malware, viruses, and others. You would generally set a rule or a security policy that would allow or disallow a particular application to run in that operating system.
• **Application Identification Methods:**
    ◦ **Application Hash:** That means if something changes with the application, the hash will no longer match, and it will not apply to this particular rule.
    ◦ **Digital Signatures:** Some applications are digitally signed. So there’s a certificate you can reference on who signed this particular app. So if an application is from Microsoft, Adobe, Google, or any other organization with a signed app, you might set a rule that says if it’s digitally signed, it’s allowed. And if it’s not digitally signed, it won’t run on the system.
    ◦ **Path/Directory Location:** Windows also allows you to allow or disallow applications that are running from a very specific area of the drive. And if an application is running from a different directory on that system, you can configure a rule to prevent that application from running.
    ◦ **Network Zones:** And of course, Windows has the concept of network zones, where you might be on a private network or a public network. And you can set rules inside of Windows that would allow certain applications to work depending on what zone you happen to be located in at that time.
