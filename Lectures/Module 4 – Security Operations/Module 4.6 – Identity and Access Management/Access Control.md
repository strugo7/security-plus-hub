Access Controls: Models and Principles Guide

This lesson focuses on the stage that occurs after a user has performed Authentication. Access control is the process that determines which resources, files, or data a user is authorized to view or modify.

The main points and different models learned are as follows:1. Principle of Least Privilege

This is a fundamental principle in information security that applies to all models. The idea is to grant the user only the permissions necessary to perform their job, and nothing more. This way, if the user accidentally runs malicious software, the damage it can cause will be limited to their minimal permissions.2. Access Control Models

The lesson reviews several approaches to permission management:
MAC (Mandatory Access Control): Mandatory access control. Common in highly secure environments. The system attaches a classification label (such as "Secret," "Top Secret") to every resource. Only the system administrator determines the permissions, and users have no ability to change this. Access is determined by the user's security clearance level versus the data's classification level.
DAC (Discretionary Access Control): Discretionary access control. In this model, the creator of the information (the owner) is the one who decides who will have access to it. An example of this is creating a spreadsheet and sharing it with specific people. This is a very flexible model, but is considered less secure because it relies on the discretion of each individual user.
RBAC (Role-Based Access Control): Role-based access control. Permissions are granted based on the user's role within the organization (e.g., Manager, Team Lead, Delivery Worker). The administrator creates groups, assigns permissions to the group, and associates users with those groups. The user receives the permissions implicitly by being in the group, which simplifies central management.
Rule-Based Access Control: The system administrator defines rules that are enforced by the system. For example, a rule that dictates a specific form can only be filled out using the Chrome browser. The user has no control over these rules.
ABAC (Attribute-Based Access Control): Attribute-based access control. This is the "next generation" of access control. The system examines many different Attributes to decide whether to grant access. Parameters can include: IP address, time of day, type of requested action, and the user's relationship to the information. This model allows for the creation of complex and intelligent rules.
3. Time-of-Day Restrictions

This is a specific tool that can be integrated into the different models. The system administrator can define that certain resources will only be available during specific hours or days. In global organizations, these settings must also take into account the different time zones of the users.
