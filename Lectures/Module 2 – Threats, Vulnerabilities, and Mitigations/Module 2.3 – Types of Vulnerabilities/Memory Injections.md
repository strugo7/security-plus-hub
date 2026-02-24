# Lesson: Memory Injections
**Module:** 2.3

## Introduction
Software runs entirely inside of random access memory (RAM). Nothing executes on your computer unless it is loaded from disk, runs inside of memory, and is processed by your CPU. Attackers use this architecture to manipulate memory and gain elevated access.

There are many different running processes found inside of memory simultaneously: 
*   **DLLs (Dynamic-Link Libraries)** in Windows.
*   Threads, buffers, memory management functions, and more.

## How Malware Executes in Memory
Malware has a number of choices for how it can run on your computer:
1.  **Independent Process:** It can run as its own unassociated malicious process in memory.
2.  **Injection:** It can find an existing legitimate process and inject itself directly into the middle of that running application.

### The Injection Process
Every running process has a starting address and an ending address in memory. To successfully inject malware:
*   The attacker inserts their malicious code somewhere between the legitimate start and end addresses of a target process.
*   **Evasion:** This allows the malware to avoid detection by anti-malware software that searches exclusively for independent malicious executable processes.
*   **Privilege Escalation:** By injecting itself into a target process, the malware inherits the security rights and permissions of the host application. If injected into an application with administrative rights, the malware immediately attains unauthorized privilege escalation.

## DLL Injection
One of the most common forms of memory injection is **DLL Injection**. A DLL (Dynamic-Link Library) is a type of executable or shared code resource in Windows used by many different programs. 

### The DLL Injection Attack Lifecycle
1.  **Placement:** The attacker installs the malicious DLL onto a storage drive the victim's system can access.
2.  **Referencing:** The attacker embeds a path (or a link to the path) that points to the malicious DLL inside the memory execution of the target host program.
3.  **Execution:** As the host program executes normally, it reaches the point where it references the injected DLL path. It goes out to disk, pulls in the malicious DLL, and loads it directly into memory. The malware is now seamlessly running on the system with the host program's privileges.
