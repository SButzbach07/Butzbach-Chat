# Butzbach Chat
__License: MIT__

A web communication application using Socket.IO.

## Overview
This is a solo web project that runs on Node.js and uses 3 modules:

* HTTP (Built-in)
* [Express](https://expressjs.com)
* [Socket.IO](https://socket.io)

Source code can be found by browsing this repository. It can also be found in Replit.
[Butzbach Chat Source Code on Replit](https://replit.com/@SButzbach07/Butzbach-Chat)

You can use the chat app on Replit.
[Use Butzbach Chat on Replit](https://butzbach-chat.sbutzbach07.repl.co)

You can also use the chat app on Render (See _Changes to app hosting_ for more info).
[Use Butzbach Chat on Render](https://butzbach-chat.onrender.com)

You can also use the chat app on my website.
[Use Butzbach Chat on scot.butzbach.net](https://scot.butzbach.net/chat.php)

The developmental version of the app can be found below on Replit, along with the source code.

[Butzbach Chat (Development) Source Code on Replit](https://replit.com/@SButzbach07/Butzbach-Chat-Development)

[Use Butzbach Chat (Development) on Replit](https://butzbach-chat-development.sbutzbach07.repl.co)

## Features
This project has many features available to everyone.
* Command System: Use `/help` to list all available commands, or use `/help [command_name]` to see the command format, what the command does, and the number of arguments it takes. These commands are argument-sensitive.
* Chat Room Menu: Click the Chatroom button at the top of your screen to enter a user name and room code to join a room, or a room name to create a room. You can also use it to leave a room.
* Room Creation: Rooms have a unique room name and room code. A random code is generated when a room is created. The chat filter will be enabled or disabled depending on the room name.
* Room Status: This will replace the User Counter feature. It displays your user name, the room name you're connected to, the room code, the user count, and the users in the room.
* Input Validation: The chat app checks user names and room codes before allowing a user to join. If the room code is empty, the user name is empty, or the user name has spaces in between characters, it will not allow you to join a room, as the third scenario conflicts with `/privatemessage` and `/privatesound`.
* Message Requirement: You can't spam the Send button or \*both\* Enter/Return keys to send messages without any content in the textbox. You must type something in the textbox before you can send it.
* Word Breaking: If a message has extremely long words, they're broken to prevent horizontal scrolling.
* Private Messenger: If you want to send a message to a specific person and not to everyone in the room, use the `/privatemessage` command to send a private message to someone. Use `/help /privatemessage` to see the proper syntax. You can also play a sound to a specific user using the `/privatesound` command.
* Built-in Sound Board: The chat app has various sounds from memes that can be played. More information can be found in the Sound Phrases section of this page.
* Audio Disabler: If you find someone who spams sounds annoying, use the Disable Audio checkbox in the Settings menu to prevent any sounds from being played. However, this does not stop any sounds currently playing. Alternatively, you can mute the tab and prevent any sounds, currently playing or not, to not being played at all. However, you will need to enable it if you want to hear any sound, even the notification beeps.
* Chat Filter: Any profane words found in a message will be censored and replaced with asterisks. There will be an option in the Settings menu to disable this, but I HIGHLY SUGGEST you keep the filter on. The chat filter uses the _censorjs_ NPM package.

Some computers don't have a number pad, which includes an Enter key.

## Upcoming

These features are being worked on, but are not available yet on the app. Visit the developmental version of Butzbach Chat using the link above to see upcoming feature implementations.

__There are no upcoming features.__

## Sound Phrases
This list contains every phrase that plays sounds instead of sending messages. If you noticed they're all nine letter long and has no whitespace anywhere. You can also use the `/listsounds` command to list the sounds while in the chat app.

__Note:__ I do not own any of these sounds. They belong to their creators. I use them intentionally for others to entertain themselves while using this app.

* amogusjob
* amogusmix
* amogusrep
* auuuuuugh
* ballerbmm
* beeperror
* bobeatbox
* boomvines
* brokentab
* cicecream
* cocacolae
* dasideeye
* emodamage
* evictroom
* goooofyah
* hehehehaa
* mccaveamb
* metalpipe
* ohhnoobro
* olderinet
* rickrolll
* sheeeeesh
* skibisong
* stickykey
* stoooopid
* vsaucehey
* xpearrape
* yellgoofy
* zzzzsnore

## Changes to app hosting
On September 28, 2023, a notice was published on Replit concerning hosting changes. Their _Deployment_ feature will be the only way to host things on Replit as they are deprecating their _Always On_ hosting feature, which will be removed on January 1, 2024. Deployments are available on Pro and Hacker plans, along with monthly Cycle billing, meaning access to my chat app on Replit will no longer be available since I have a Free plan.

I made the decision to host my app on [Render](https://render.com) for free, with a similar system environment to Replit. Butzbach Chat on scot.butzbach.net will be utilizing the chat app on Render instead of the app on Replit. The Replit host for Butzbach Chat will still be available until January 1, 2024, when _Always On_ is removed from Replit.

## Deno Implementation
I started looking at [Deno](https://deno.com) as an alternative to Node.js for Butzbach Chat. However, there is an issue with Socket.IO when it comes to Deno as there is no client implementation for TypeScript yet. When the client implementation is released, I will consider moving Butzbach Chat to Deno as it seems like a better option compared to Node.js. Also, I can use Deno Deploy to host Butzbach Chat when it uses Deno. More information will be posted here when client implementation is released.
