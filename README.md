# Butzbach Chat

License: MIT

A web communication application using Socket.IO.

## Overview

This is a solo web project that runs on Node.js and uses three modules:

* HTTP (Built-in)
* [Express](https://expressjs.com)
* [Socket.IO](https://socket.io)

Source code can be found by browsing this repository.

You can use the chat app on Render (See _[Changes to app hosting](#changes-to-app-hosting)_ for more info).
[Use Butzbach Chat on Render](https://butzbach-chat.onrender.com)

You can also use the chat app on my website.
[Use Butzbach Chat on scot.butzbach.net](https://scot.butzbach.net/chat.php)

The developmental version of the app can be found below on Replit, along with the source code.

[Butzbach Chat (Development) Source Code on Replit](https://replit.com/@SButzbach07/Butzbach-Chat-Development)

[Use Butzbach Chat (Development) on Replit](https://butzbach-chat-development.sbutzbach07.repl.co)

Give Render a minute to wake up the chat app before using it. You'll know when it's ready when you see the welcome message.

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
* Default Chat Room: This chat room will stay available for everyone who do not want to make their own chat rooms and deal with other ways to send codes around. A placeholder user will stay in this room to prevent it from getting deleted if everyone leaves the room. You are unable to interact with the user, and the user will "tell" you the same thing. Room code is "butzbach".
* Invite Links: Use /invitelink to display a room invite link so others can join the room by clicking the link. The room must exist and the room code must be valid, or the link will not work.

Some computers don't have a number pad, which includes an Enter key, hence the asterisks around "both" in the Message Requirement feature.

## Upcoming

These features are being worked on, but are not available yet on the app. Visit the developmental version of Butzbach Chat using the link above to see upcoming feature implementations.

__There are no upcoming features.__

## Commands

This list contains every command on the chat. Each commands has its syntax, what it does, and what parameters it has.

* `/help [command_name]`: Displays all available commands or the usage of a single command. `command_name` is the name of the command, and the parameter is optional. `/h` is an alias of this command.
* `/listsounds`: Lists every sound phrase available in the chat app. There are no parameters for this command. `/ls` is an alias of this command.
* `/playallsounds`: Plays every sound in the chat app, except for _rickroll_ as it is too long to play. There are no parameters for this command. `/pas` is an alias of this command.
* `/playsounds [sound_phrase]`: Plays a sounds to everyone in the chat room. `sound_phrase` is the name of the sound phrase. The full list of phrases can be found in the list below or by using `/listsounds`. `/ps` is an alias of this command.
* `/privatemessage [recipient] [message]`: Sends a message to a specific user in the chat room. `recipient`: is the name of the user in the chat room. `message` is the message sent to the recipient. `/pm` is an alias of this command.
* `/privatesound [recipient] [sound_phrase]`: Plays a sound to a specific user in the chat room. `recipient` is the name of the user in the chat room. `sound_phrase` is the name of the sound phrase. The full list of phrases can be found in the list below or by using `/listsounds`. `/prs` is an alias of this command.
* `/repeat [repeat_count] [interval] [command] [command_args]`: Repeats a command a specific number of times at a specific interval. `repeat_count` is the number of times to repeat the command. `interval` is the amount of time in seconds to delay each repetition for. 0 seconds means no delay. `command` is the command to repeat. `command_args` are the arguments for the repeated command, and this parameter is optional. `/r` is an alias of this command.

## Sound Phrases

This list contains every phrase that plays sounds instead of sending messages. If you noticed they're all nine letter long and has no whitespace anywhere. You can also use the `/listsounds` command to list the sounds while in the chat app.

__Note:__ I do not own any of these sounds. They belong to their creators. I use them intentionally for others to entertain themselves while using this app.

* aaa
alertsiren
amongusjobreveal
amongusjobrevealdistorted
amongusremix
amongusreport
baller
bingchilling
bombasticsideeye
bonk
branspizzapalace
brokenbones
brokentable
bruh
censored
clashroyalelaugh
cocacolaespuma
comedicslip
darthvadernoo
dialupsound
discordincomingcall
discordping
discordrareincomingcall
distractdance
emotionaldamage
errorglove
fart
firealarm
fortnitebattlebus
fortnitebattlepass
goatscreaming
goodnightgirl
goofycarhorn
goofyyell
gordonramsayviolin
grilledcheeseobamasandwich
grimreaper
heavenlychorus
helicopter
heyvsauce
hogrider
homedepottheme
iamdaone
implayingminecraft
itshighnoon
lotofdamage
loudsnoring
loudwhistlesnoring
maaascream
mariodeathsound
megalovania
metalpipe
michaeljacksonhehe
minecraftcaveambience
mrkrabswalk"
mynameisjeff
obamabeatbox
ohmahgod
ohnobro
openthenoor
pacertest
pstwoboot
rickroll
robloxoof
rockboom
runcensoredrun
sawboatinhalf
scoobydolaugh
screamingrussianminecraftkid
sendyoutojesus
sheeesh
skibisong
slap
stickykey
stillapieceofgarbage
stupid
tacobellbong
thxmovietheme
tobecontinued
trombonefail
vineboom
wantabreakfromtheads
wellberightback
xpcriticalbattery
xpcriticalerror
xperrorsong
xperrorspam
xpstartupearrape
yeet
yougotmail

## Changes to app hosting

Butzbach Chat has always been on Replit since January 2022. I created it in 9th grade when I was sick with COVID-19. I know, it's sad. What else was I supposed to in a room by myself aside from school work and making my chat app based on a Socket.IO chat template I found on Replit?

On September 28, 2023, a notice was published on Replit concerning hosting changes. Their _Deployment_ feature will be the only way to host things on Replit as they are deprecating their _Always On_ hosting feature, which will be removed on January 1, 2024. Deployments are available on Pro and Hacker plans, along with monthly Cycle billing, meaning access to my chat app on Replit will no longer be available since I have a Free plan.

I decided to host the chat app on [Render](https://render.com) for free, with a similar hosting environment as Replit. Butzbach Chat on my website will utilize Render instead of Replit as I removed the production version of Butzbach Chat from Replit since something screwed up the app execution involving packages.

## Deno Implementation

I started looking at [Deno](https://deno.com) as an alternative to Node.js for Butzbach Chat. However, there is an issue with Socket.IO when it comes to Deno as there is no client implementation for TypeScript yet. When the client implementation is released, I will consider moving Butzbach Chat to Deno as I can use Deno Deploy to host it. More information will be posted here when client implementation is released.
