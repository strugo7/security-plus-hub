# Lesson: Access Controls
**Module:** 4.6

## Guide to Models and Principles in Resource Access Control
Here is the lesson summary on the topic of Access Controls from Professor Messer's Security+ course:
The lesson focuses on the stage that comes after the user has performed identification (Authentication). Access control is the process that determines which resources, files, or data the user is permitted to see or modify.
Below are the main points and the different models that were learned:

## 1. The Principle of Least Privilege
This is a foundational principle in information security that applies to all models. The idea is to grant the user only the permissions necessary for them to perform their job, and nothing beyond that. This way, if the user accidentally runs malicious software, the damage it can cause will be limited strictly to their restricted permissions.

## 2. Access Control Models
The lesson reviews several approaches to managing permissions:
• *MAC (Mandatory Access Control):* Mandatory access control. This is common in highly secure environments. The system attaches a classification label (such as "Secret" or "Top Secret") to every resource. Only the system administrator sets the permissions, and users have no ability to change this. Access is determined by the user's classification level versus the information's classification level.
• *DAC (Discretionary Access Control):* Discretionary access control. In this model, the creator of the information (the owner) is the one who decides who will have access to it. An example of this is creating a spreadsheet and sharing it with specific people. This is a very flexible model, but it is considered less secure because it relies heavily on the discretion of each individual user.
• *RBAC (Role-Based Access Control):* Role-based access control. Permissions are given according to the user's role in the organization (for example: manager, team leader, or shipping employee). The administrator creates groups, assigns permissions to the group, and associates users with these groups. The user receives the permissions implicitly by virtue of being in the group, which makes central management much easier.
• *Rule-Based Access Control:* Rule-based access control. The system administrator sets rules that are enforced by the system. For example, a rule that states a certain form can only be filled out using the Chrome browser. The user has no control over these rules.
• *ABAC (Attribute-Based Access Control):* Attribute-based access control. This is the "next generation" of access control. The system examines many different parameters (Attributes) to decide whether to approve access. The parameters can include: IP address, time of day, the type of action requested, and the user's relationship to the information. This is a model that allows for the creation of complex and smart rules.
