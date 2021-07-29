<div align="center"><ins>

![logo](https://user-images.githubusercontent.com/5076458/127045719-82259cd9-6016-4432-98d4-fedd59900ab4.jpg)

[Русский](/README_RU.md)

</ins></div>

Goals:
- a framework that will allow you to run web applications with a large amount of resources, with their pre-installation in the browser's IndexedDB storage (by analogy with ordinary PC applications)
- if the application does not require the Internet after its installation, the ability to run it offline.

Implemented and in the testing process:

1. Loading all application resources into IndexedDB and then auto-updating them. During subsequent connections, only the basic framework is loaded from the network.
2. For applications that do not require the Internet for their operation, it is possible to install Service Worker. In this case, after the first download of the application and resources, the application has the opportunity to start and work in the complete absence of the Internet.
3. Added the manifest file for PWA.

The code is mostly documented. A more detailed guide to the framework will be written later.
