# Lesson: Obfuscation
**Module:** 1.4

## Introduction: The Art of Hiding in Plain Sight
In information security, the goal is not always to encrypt information so that it is mathematically unreadable. Sometimes, the goal is to hide the information in unique ways so that it is there, but difficult to understand or locate. Obfuscation is a process where you take something that is normally very easy to understand and make it much more difficult to understand. The main idea is to hide information "under the nose" (in plain sight). The critical characteristic of obfuscation is that if the attacker knows how the obfuscation was done, they can reverse the process and gain access to the original data.

## 1. Steganography
One of the most popular forms of obfuscation is Steganography.
**A. Definition and Origin of the Term**
The origin of the word is from the Greek language and means "Concealed writing". It is a technique for hiding information within another media, such as an image.
**B. Security through Obscurity**
Steganography is often referred to as Security through Obscurity. The meaning is that the defense relies on the fact that the attacker does not know that the information is there or does not know the process used to hide it. If the process is known, it is very easy to recover the data. Therefore, in the industry, it is customary to say that "security through obscurity" is not really security.
**C. Covertext**
The document or file that contains the hidden information inside it is called Covertext. The attacker sees the image (the Covertext), but does not see the data hidden inside it.
**D. Media Types for Steganography**
Information can be hidden in a variety of ways:
1. *Images:* Using a third-party tool to embed information within an image file without changing its visual appearance.
2. *Network Traffic:* Embedding messages within TCP (Transmission Control Protocol) packets sent over the network. The data is sent a few bits at a time, and the receiving party (if they know how to read it) can reconstruct the message.
3. *Laser Printers:* Using Machine Identification Codes. These are tiny, almost invisible yellow dots printed on the page. If you know the format, you can use them to identify exactly which printer printed the page.
    ◦ *Practical Note:* It is difficult to see yellow dots on a white page, but if you invert the image colors so the page is black, the dots will appear in blue.
4. *Audio and Video:* Hiding information within audio files or video tracks.

## 2. Tokenization
A very popular form of obfuscation that we use every day is Tokenization.
**A. The Mechanism**
This is where we take sensitive data and replace it with a Token of that sensitive data.
**B. Practical Example**
We can take a Social Security number, which is relatively sensitive information, and change it into a completely different number. Behind the scenes, the system matches the two together to securely identify the record.

## 3. Data Masking
Another type of obfuscation is Data Masking, which takes some original data and then hides some of that data to help protect it.
**A. The Goal**
Normally, this is used to protect personally identifiable information or perhaps sensitive financial details from full exposure on screens or receipts.
**B. Masking Methods**
Masking does not have to be done only using asterisks. It can also be done by Rearranging the numbers or replacing certain digits with others, provided that this can be reconstructed later on.

## Executive Summary
Obfuscation is a security technique aimed at making information difficult to understand, usually by hiding it in plain sight. The main techniques include Steganography – hiding information within a Covertext such as images, network traffic, or printer codes; Tokenization – replacing sensitive information (like credit cards) with a one-time Token with no mathematical connection to the source, allowing secure transfer without encryption; and Data Masking – hiding part of the information (for example, using asterisks) to protect it from full exposure on receipts or service interfaces.
