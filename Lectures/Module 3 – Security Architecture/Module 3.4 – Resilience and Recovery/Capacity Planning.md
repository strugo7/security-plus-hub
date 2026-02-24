Lesson: Capacity Planning

Based on Module 3.4 - CompTIA Security+ SY0-701

This lesson provides a deep understanding of Capacity Planning, structured for both exam preparation and practical application.Introduction: The Constant Challenge of Supply and Demand

In the world of IT, we face a continuous challenge: the ability to predict how many resources will be needed for a specific service. The essence of Capacity Planning is matching the Supply of network resources to the actual Demand.

The goal is to reach the precise balance point ("Just the right amount"). Deviation in either direction incurs a heavy cost:
Resource Shortage: Leads to application slowdowns and even outages.
Resource Overload: Leads to significant budgetary waste on unnecessary infrastructure.
1. The Three Pillars of Capacity Planning: People, Technology, and Infrastructure

To accurately assess the required capacity, we must examine three different vectors. Although the course focuses on technology, the human element is equally critical.A. The Human Element (People)

The human resource is one of the most difficult to manage in the context of "Ramp up" (increase in activity) or "Ramp down" (reduction in activity).
Practical Example - Call Center: Even with the best applications and services, we need people to answer phones and enter data into the system.
The Challenge of Expansion: If there are too few employees, new ones must be recruited and trained. This is an expensive and time-consuming process.
The Challenge of Contraction: Employees are a large business expense. If there are too many employees relative to demand, the organization is forced to transfer them to other departments or carry out downsizing, which creates organizational complexity.
B. The Technological Element (Technology)

When planning the system, we must choose technology that can Scale up and down according to demand. Not all technology allows for such flexibility.
Using Servers and Load Balancers: In a web server implementation, we want an architecture that includes a Load Balancer and multiple servers behind it.
Under High Load: Additional servers can be added "behind the scenes," invisibly to the user.
Under Low Load: Servers can be easily removed from the Load Balancer to match supply to the reduced demand.
Database Servers (SQL Servers): When the demand for database services increases, additional SQL servers can be brought online. In some cases, databases can be split into smaller parts and distributed across multiple servers to optimize performance.
C. The Infrastructure Element: Cloud vs. On-Premise

Capacity Planning has changed dramatically with the shift from on-premise to cloud services.

The Traditional Model - Physical Data Center: When building an application in a local data center, the process of increasing capacity is long and complex:
Hardware Acquisition.
Shipping the equipment to the site.
Unboxing.
Rack installation.
Configuration, Testing, and finally Production deployment.
The Modern Model - Cloud Services: The cloud has changed the way we deploy Application Instances.
Availability: Cloud providers have a "seemingly unlimited" amount of resources.
Deployment Speed: No hardware purchasing is required. With a click of a button in the Console, a new server or application can be created.
Rightsizing: The cloud allows us to perform a quick "Ramp up" when demand increases, and an immediate "Ramp down" when demand decreases, so the infrastructure always matches the exact needs.
Economic Model: It is important to remember – the more resources used in the cloud, the more you pay.
Executive Summary

Capacity Planning is a critical process of balancing supply and demand to prevent outages or financial waste. Planning must include consideration for the Human Resource (recruiting versus downsizing), selecting Scalable Technology (such as using Load Balancers), and managing Infrastructure. The transition to Cloud Services has significantly simplified the deployment and rightsizing process, allowing resources to be added and removed with a single click, compared to the slow process of purchasing and installing physical hardware.