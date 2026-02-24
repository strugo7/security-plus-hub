# Lesson: Deception and Disruption
**Module:** 1.2

## Introduction: Using an Offensive Strategy for Defense
As IT Security Professionals, we spend a lot of time trying to prevent attackers from gaining access to our systems. However, defense is not just about blocking. We can use our knowledge and security techniques to create Deception and Disruption for those attackers. In this lesson, we will learn how to deceive attackers and cause them to reveal important information about their methods and techniques, thereby protecting the organizational network more smartly.

## 1. The Practical Context of Deception
Instead of simply keeping attackers out, we can draw them into controlled areas.
• *The Practical Context:* Deceiving the attacker prevents them from reaching the real assets and provides the SOC (Security Operations Center) team with valuable information about the current attack patterns occurring on the network.
• By using tools like *Honeypots*, we draw attackers and automated systems into isolated virtual environments to study their methods and waste their time.

## 2. The Race for Authenticity and Honeynets
The use of deception creates a sort of "arms race" between the defender and the attacker.
• *The Challenge:* We create virtual worlds that are not real production systems, while the attackers try to discern whether they are dealing with a real system or if they are trapped inside a Honeypot.
• *The Response:* As attackers get better at identifying honeypots, we must increase the complexity and intelligence of the traps to make them much more realistic, often expanding them into entire *Honeynets*.

## 3. Honeyfiles
We can also drop down to a lower resolution and create deception at the level of a single file, known as a *Honeyfile*.
• *The Core Concept:* These are files containing fake information, or files that look very important and seemingly contain sensitive data.
• *Classic Example:* A file named `passwords.txt`. Naturally, this file does not actually contain the passwords to your systems, but the attacker does not know that. They will find the file very attractive and will waste a lot of time analyzing the information inside it.
• *Alerting System:* On a normal production network, no legitimate user should ever access these files. Therefore, if someone gains access to the file, opens it, or views the information, the system can be configured to send *Alerts* or alarms to the management station. This alert instantly signals to us that someone is "poking around" in a place where they shouldn't be.

## 4. Honeytokens
Similar to files, we can also plant specific pieces of trackable data, known as *Honeytokens*.
• *Types of Data:* These can be any type of falsified data planted for an attacker to find, such as fake API credentials, database records, browser cookies, tracking pixels on a webpage, or fictitious email addresses.
• *The Goal:* If an attacker steals this data, we can track it. If that specific honeytoken suddenly appears somewhere else on the internet or is used in an attempted login, it allows us to track the leaked information and identify the source of the attack.

## Executive Summary
The strategy of Deception and Disruption allows the organization to turn the tables on the attackers. Through the use of Honeypots and Honeynets, we draw attackers and automated systems into isolated virtual environments to learn about their operational methods and waste their time. On a more focused level, the use of Honeyfiles (such as fake password files) allows us to generate immediate alerts upon intrusion, while the use of Honeytokens (such as fake API credentials, database records, or fictitious email addresses) allows us to track leaked information and identify the source of the attack if it is posted elsewhere on the internet.
