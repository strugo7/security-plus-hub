Cloud Infrastructures (Cloud Infrastructures)

Based on Module 3.1 - CompTIA Security+ SY0-701Introduction: The Cloud Security Challenge

Today, it is likely that every organization runs one or more applications in the cloud, whether as IaaS, PaaS, or SaaS. The shift to the cloud brings tremendous flexibility, but leaves a critical, open question: Who is responsible for the security of these systems? In this lesson, we will learn about the division of responsibility, multi-cloud management, and advanced cloud technologies like Infrastructure as Code (IaC), Serverless Architecture, and Microservices.1. The Responsibility Matrix

One of the first questions when using a public cloud is the division of roles. Fortunately, cloud providers supply a Responsibility Matrix.
Matrix Structure: It is usually presented as a table defining who is responsible for what. It is common to use colors (e.g., blue for the customer and yellow for the provider).
Comparison by Service Model:
Operating System (OS):
In SaaS (Software as a Service) and PaaS (Platform as a Service): The responsibility lies with the Cloud Provider.
In IaaS (Infrastructure as a Service) and On-prem (On-premises): The responsibility lies with the Customer.
Accounts and Identities:
This is a critical security topic. In the absolute majority of cases, the Customer is always responsible for managing their accounts and identities, regardless of the service model.
Shared Responsibility: There are areas where responsibility overlaps, requiring cooperation between the customer and the provider.
Important Note: Your specific contract with the provider may change the default matrix to fit business needs.
Implication for the Organization: Understanding the matrix is crucial to preventing security "holes" that occur because each party assumed the other was handling the issue.2. Hybrid Cloud and Management Complexity

Many organizations are not satisfied with a single cloud and operate in a Hybrid Cloud environment (multiple providers simultaneously). This adds flexibility, but also complexity.

Key Challenges:
Lack of Direct Communication: Different cloud providers do not naturally "talk" to each other, and their systems operate in different ways.
Manual Configuration:
Authentication: Setting authentication separately for each provider can create a Mismatch.
Server and Firewall Settings: Rules must be verified as identical across all clouds, which creates an opening for human error.
Logging: Every provider writes logs in different formats and terminology, making it difficult to create a unified picture.
Data in Transit: When information moves between Provider A's cloud and Provider B's cloud, it passes through the Public Internet. All security settings must protect the information during transit.
3. Third-Party Risk Management

Even within the cloud, we use third-party products (e.g., a Checkpoint Firewall installed within AWS).
Vendor Risk Management Policy: This is a necessary Best Practice for managing and maintaining the security of these products.
Incident Response: Our IR process must include these vendors. It is impossible to rely only on internal processes or the main cloud provider; the third party must be a partner in the process.
Monitoring: The availability and security of these third-party systems must be regularly monitored.
4. Infrastructure as Code (IaC)

Modern cloud infrastructures almost always require the use of Infrastructure as Code.
The Principle: We define the application or infrastructure using code, instead of defining physical hardware.
What is Defined? The code defines which Hosts to build, the types of Web servers, database servers, and more.
Advantages:
Easily build out: Rapid deployment of an entire infrastructure.
Modify: Changing the configuration in the code itself ensures that the next time the code runs, all changes are automatically applied.
Perfect Duplication: Once a perfect version of the application has been created, the code can be used to rebuild it at any time and on any cloud provider.
5. Serverless Architecture

The next step in evolution is building applications without defined servers.
How it Works: Instead of accessing one large application, we access Individual Functions. Each function handles a small part of the application.
OS Simplification: In Serverless, there is much less emphasis on the OS. Each function can run on a different operating system that suits it at that moment. The developer focuses on dividing the application into small functions and deploying them.
Efficiency and Savings:
The functions ("Compute Containers") are created in real-time in the cloud only when they are needed.
As soon as use ends, the function is removed.
The result: significant savings in money and time.
Security: Most of the security work in this architecture is performed in the cloud itself (by the provider), as the infrastructure is managed there completely.
6. Microservices and APIs

To understand the cloud revolution, it must be compared to the traditional method.

The Traditional Approach: Monolithic Application
One large application installed on the hard disk.
All business logic, user interface, and screens run in a single Executable file on the local computer (Client).
Disadvantage in Updates: Every change requires a Change Control process, sending the update to the device, re-installation, etc.
The Modern Approach: Microservices
Use of APIs (Application Programming Interfaces) to programmatically control the application.
Instead of one executable file, the application is split into separate services running in the cloud.
API Gateway: The Client communicates with the Gateway, and it directs the request to the appropriate microservice.
Advantages:
Scalability: If a particular part of the application is busy, only that specific microservice can be duplicated to meet the load.
Resilience: If one microservice fails, the rest of the application continues to function.
Focused Security: Specific security can be applied to each service (e.g., strict security procedures for the service handling authentication, and different procedures for the service writing to the database).
Executive Summary

Cloud infrastructures require a deep understanding of the Responsibility Matrix (especially that accounts are always the customer's responsibility). The use of Hybrid Cloud necessitates careful synchronization of security settings and protection of data in transit. Modern technologies like Infrastructure as Code (IaC) allow for rapid deployment and precise reconstruction, while Serverless and Microservices architectures (reliant on APIs) offer greater efficiency, scalability, and resilience compared to traditional monolithic applications.