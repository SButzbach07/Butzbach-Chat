/*
	Butzbach Chat
	A web communication application using Socket.IO
	Server-side handling (index.js)

	Copyright (C) 2022 Scot Butzbach
	Licensed under the MIT License
	See LICENSE for terms
*/

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { clean } = require("censorjs");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: ["https://scot.butzbach.net"]
	}
});

app.use(express.static("chat", {
	index: "app.html"
}));

const announcements = [
	"Visit Scot\'s website at \'https://scot.butzbach.net\'.",
	"If you want to see the developmental version of Butzbach Chat, go to \'https://butzbach-chat-development.sbutzbach07.repl.co\'. There is no implementation of the developmental version on Scot\'s website.",
	"If you want to revisit the time of playing Flash games, head to Scot\'s website and go to the Games page. Yes, with help from some projects, Flash games can be playable again.",
	"Ever wondered how people play sounds in this app? Every sound has a nine-letter phrase. When sent, a sound plays to everyone, along with an announcement of who played what. The list of phrases can be found by using the /listsounds command or visiting the GitHub repository.",
	"Butzbach Chat features a command system. Use \"/help\" or \"/h\" to display all commands available to use.",
	"Butzbach Chat is licensed under the MIT License. Visit the repository on GitHub for terms.",
	"Butzbach Chat supports room creation. Create your own rooms to chat with your friends. A room code is automatically generated when a room is created.",
	"Butzbach Chat features a chat filter system using the \"censorjs\" package from NPM. Unfiltered chat rooms end with \"_nofilter\". Be responsible, be respectful, and stay safe online.",
	"Butzbach Chat has moved from Replit hosting to Render hosting due to Replit hosting changes. Visit the GitHub repository for more information."
];

const sounds = [
	"aaaaaaaaa",
	"ahogrider",
	"alrtsiren",
	"amogusjob",
	"amogusmix",
	"amogusrep",
	"auuuuuugh",
	"ballerbmm",
	"beeeeeeep",
	"beeperror",
	"boatsawed",
	"bobeatbox",
	"bonkdoooh",
	"branpizza",
	"brokentab",
	"chorusaah",
	"cicecream",
	"cocacolae",
	"continued",
	"damagelot",
	"dasideeye",
	"deadmario",
	"depotheme",
	"discorddm",
	"discordin",
	"discordrc",
	"distractd",
	"emodamage",
	"evictroom",
	"fartsound",
	"fnbattleb",
	"fnbattlep",
	"garbageee",
	"gcosndwch",
	"gdrviolin",
	"goatscrem",
	"goodnight",
	"goofyslip",
	"goofyhorn",
	"hehehehaa",
	"iamdaaone",
	"jesussend",
	"krabswalk",
	"maaaaaaaa",
	"mccaveamb",
	"metalpipe",
	"olderinet",
	"oooooooof",
	"pstwostrt",
	"rickrolll",
	"rightback",
	"rockbooom",
	"russmckid",
	"sanstheme",
	"sheeeeesh",
	"skibisong",
	"stickykey",
	"stoooopid",
	"tacobelll",
	"thxmtheme",
	"vadernooo",
	"vsaucehey",
	"wompwwomp",
	"xpcritbat",
	"xpcriterr",
	"xpearrape",
	"xperrsong",
	"xpspamerr",
	"yellgoofy",
	"yogotmail",
	"zzzzsnore"
];

const users = {};
const rooms = {};

rooms["butzbach"] = {
	name: "Butzbach Chat Default Room",
	code: "butzbach",
	userCount: 1,
	chatFilter: true
};

users["placeholder"] = {
	name: "Placeholder_User",
	room: "butzbach"
};

async function wait(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function generateRoomCode() {
	const roomCodeCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	let roomCode = "";

	for (let i = 0; i < 8; i++) {
		roomCode += roomCodeCharacters[Math.floor(Math.random() * roomCodeCharacters.length)];
	}

	return roomCode;
}

function checkUserNameExists(userName) {
	for (let id of Object.keys(users)) {
		if (users[id].name == userName) {
			return true;
		}
	}

	return false;
}

function checkRoomNameExists(roomName) {
	for (let code of Object.keys(rooms)) {
		if (rooms[code].name == roomName) {
			return true;
		}
	}

	return false;
}

function getUsersFromRoom(roomCode) {
	const usersInRoom = [];

	for (let id of Object.keys(users)) {
		if (users[id].room == roomCode) {
			usersInRoom.push(users[id].name);
		}
	}

	return usersInRoom;
}

io.on("connection", (socket) => {
	socket.on("create", (name, room, filter) => {
		if (checkRoomNameExists(room)) {
			socket.emit("receive", "error", "Error: Chat room already exists.");
		} else if (filter && clean(room) != room) {
			socket.emit("receive", "error", "Error: Room name contains profane content. All chat rooms are created with the chat filter enabled.");
		} else if (checkUserNameExists(name)) {
			socket.emit("receive", "error", "Error: User name already exists.");
		} else if (filter && clean(name) != name) {
			socket.emit("receive", "error", "Error: User name contains profane content. All chat rooms are created with the chat filter enabled.");
		} else {
			const code = generateRoomCode();
			rooms[code] = {
				name: room,
				code: code,
				userCount: 1,
				chatFilter: filter
			};

			users[socket.id] = {
				name: name,
				room: code
			};

			socket.join(code);
			io.in(code).emit("receive", "message", `Server: Welcome to the \"${room}\" chat room, ${name}.`);
			socket.emit("join", name, room, code, (rooms[code].chatFilter) ? "Enabled" : "Disabled");
			io.in(code).emit("roomUpdate", rooms[code].userCount, getUsersFromRoom(code));
		}
	});

	socket.on("join", async (name, code) => {
		if (checkUserNameExists(name)) {
			socket.emit("receive", "error", "Error: User name already exists.");
		} else if (rooms[code] == undefined) {
			socket.emit("receive", "error", "Error: Chat room does not exist.");
		} else if (rooms[code].chatFilter == true && clean(name) != name) {
			socket.emit("receive", "error", "Error: User name contains profane content. The chat room you are trying to join has the chat filter enabled.");
		} else {
			users[socket.id] = {
				name: name,
				room: code
			};

			rooms[code].userCount++;
			socket.join(code);
			socket.emit("receive", "message", `Server: Welcome to the \"${rooms[code].name}\" chat room, ${name}.`);
			socket.in(code).emit("receive", "message", `Server: Welcome, ${name}.`);
			socket.emit("join", name, rooms[code].name, code, (rooms[code].chatFilter) ? "Enabled" : "Disabled");
			io.in(code).emit("roomUpdate", rooms[code].userCount, getUsersFromRoom(code));
			if (code == "butzbach") {
				await wait(Math.floor(Math.random() * 750) + 750);
				socket.emit("receive", "message", "Placeholder_User: Hello, I'm a user programmed by Scot himself to keep this default chat room from getting deleted if everyone leaves. I can not interact with others, meaning I'm an NPC. :/ Anyways, this chat room is for anyone who doesn't want to create their own and worry about finding other ways to send chat room codes. You can have the same website open in two different tabs and be in two different chatrooms at the same time, including this one if you wanted to. Maybe three or more, I don't know. ...really, I don't actually know. The chat filter is enabled for this room. Nothing I can do about it. Scot doesn\'t like profanity. Need help using the command system? Just use \"/help\" to list your commands, then use \"/help [command_name]\" for command semantics. Glad to see you...ish. Butzbach, program me to use AI. No? Okay fine, I guess I'll just stay as a placeholder. I can't leave either way. ...you don't know how to program me to use AI? Come on, man! You created this app, shouldn't you know this stuff? Ugh, I can't stand this guy. Whatever. Enjoy chatting with others, I guess. :/");
			}
		}
	});

	socket.on("send", async (message) => {
		let messageArray = [];
		let privateMessage = "";

		if (/^\/[a-z0-9]+/i.test(message)) {
			messageArray = message.split(" ");
			switch (messageArray[0]) {
				case "/h":
				case "/help":
					if (messageArray.length == 1) {
						socket.emit("receive", "message", "Available commands: /h, /help, /ls, /listsounds, /pas, /playallsounds, /ps, /playsound, /pm, /privatemessage, /prs, /privatesound, /r, /repeat.");
					} else if (messageArray.length == 2) {
						switch (messageArray[1]) {
							case "h":
							case "/h":
								socket.emit("receive", "message", "Usage: /h [command_name]. Alias of /help. Displays all available commands or the usage of a single command. \"command_name\" is the name of the command, and the parameter is optional.");
								break;
							case "help":
							case "/help":
								socket.emit("receive", "message", "Usage: /help [command_name]. Displays all available commands or the usage of a single command. \"command_name\" is the name of the command, and the parameter is optional.");
								break;
							case "ls":
							case "/ls":
								socket.emit("receive", "message", "Usage: /ls. Alias of /listsounds. Lists every sound phrase available in the chat app. There are no parameters for this command.");
								break;
							case "listsounds":
							case "/listsounds":
								socket.emit("receive", "message", "Usage: /listsounds. Lists every sound phrase available in the chat app. There are no parameters for this command.");
								break;
							case "pas":
							case "/pas":
								socket.emit("receive", "message", "Usage: /pas. Alias of /playallsounds. Plays every sound in the chat app, except for \"rickrolll\" as it is too long to play. There are no parameters for this command.");
								break;
							case "playallsounds":
							case "/playallsounds":
								socket.emit("receive", "message", "Usage: /playallsounds. Plays every sound in the chat app, except for \"rickrolll\" as it is too long to play. There are no parameters for this command.");
								break;
							case "ps":
							case "/ps":
								socket.emit("receive", "message", "Usage: /ps [sound_phrase]. Alias of /playsound. Plays a sound to everyone in the chat room. \"sound_phrase\" is the name of the sound phrase. The full list of phrases can be found at the GitHub repository or by using /listsounds.");
								break;
							case "playsound":
							case "/playsound":
								socket.emit("receive", "message", "Usage: /playsound [sound_phrase]. Plays a sound to everyone in the chat room. \"sound_phrase\" is the name of the sound phrase. The full list of phrases can be found at the GitHub repository or by using /listsounds.");
								break;
							case "pm":
							case "/pm":
								socket.emit("receive", "message", "usage: /pm [recipient] [message]. Alias of /privatemessage. Sends a message to a specific user in the chat room. \"recipient\" is the name of the user in the chat room. \"message\" is the message sent to the recipient.");
								break;
							case "privatemessage":
							case "/privatemessage":
								socket.emit("receive", "message", "Usage: /privatemessage [recipient] [message]. Sends a message to a specific user in the chat room. \"recipient\" is the name of the user in the chat room. \"message\" is the message sent to the recipient.");
								break;
							case "prs":
							case "/prs":
								socket.emit("receive", "message", "Usage: /prs [recipient] [sound_phrase]. Alias of /privatesound. Plays a sound to a specific user in the chat room. \"recipient\" is the name of the user in the chat room. \"sound_phrase\" is the name of the sound phrase. The full list of phrases can be found at the GitHub repository or by using /listsounds.");
								break;
							case "privatesound":
							case "/privatesound":
								socket.emit("receive", "message", "Usage: /privatesound [recipient] [sound_phrase]. Plays a sound to a specific user in the chat room. \"recipient\" is the name of the user in the chat room. \"sound_phrase\" is the name of the sound phrase. The full list of phrases can be found at the GitHub repository or by using /listsounds.");
								break;
							case "r":
							case "/r":
								socket.emit("receive", "message", "Usage: /r [repeat_count] [interval] [command] [command_args]. Alias of /repeat. Repeats a command a specific number of times at a specific interval. \"repeat_count\" is the number of times to repeat the command. \"interval\" is the amount of time in seconds to delay each repetition for. 0 seconds mean no delay. \"command\" is the command to repeat. \"command_args\" are the arguments for the repeated command, and this parameter is optional.");
								break;
							case "repeat":
							case "/repeat":
								socket.emit("receive", "message", "Usage: /repeat [repeat_count] [interval] [command] [command_args]. Repeats a command a specific number of times at a specific interval. \"repeat_count\" is the number of times to repeat the command. \"interval\" is the amount of time in seconds to delay each repetition for. 0 seconds means no delay. \"command\" is the command to repeat. \"command_args\" are the arguments for the repeated command, and this parameter is optional.");
								break;
							default:
								socket.emit("receive", "error", `Error: ${messageArray[1]} is not a command.`);
						}
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes 0 or 1 arguments. You gave ${messageArray.length - 1}.`);
					}
					break;
				case "/ls":
				case "/listsounds":
					if (messageArray.length == 1) {
						socket.emit("receive", "message", `Available sound phrases: ${sounds.join(", ")}`);
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes 0 arguments. You gave ${messageArray.length - 1}.`);
					}
					
					break;
				case "/pas":
				case "/playallsounds":
					if (messageArray.length == 1) {
						io.in(users[socket.id].room).emit("receive", "nonotification", `Server: OH NO! ${users[socket.id].name} JUST USED THE "${messageArray[0]}" COMMAND! TURN DOWN YOUR VOLUME!`);
						await wait(500);
						let shuffledSounds = shuffle(sounds.slice());
						shuffledSounds.splice(shuffledSounds.findIndex((value) => {return value == "rickrolll";}), 1);
						for (let sound of shuffledSounds) {
							io.in(users[socket.id].room).emit("receive", "sound", `https://scot.butzbach.net/projects/butzbach_chat/sounds/${sound}.mp3`);
							await wait(Math.floor(Math.random() * 750) + 750);
						}
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes 0 arguments. You gave ${messageArray.length - 1}.`);
					}
					
					break;
				case "/ps":
				case "/playsound":
					if (messageArray.length == 2) {
						for (let sound of sounds) {
							if (messageArray[1] == sound) {
								if (messageArray[1] == "rickrolll") {
									io.in(users[socket.id].room).emit("receive", "nonotification", `Server: Enjoy these next three minutes and thirty seconds because ${users[socket.id].name} just rickrolled you all.`);
								} else {
									io.in(users[socket.id].room).emit("receive", "nonotification", `Server: ${users[socket.id].name} played "${sound}".`);
								}
								
								await wait(500);
								io.in(users[socket.id].room).emit("receive", "sound", `https://scot.butzbach.net/projects/butzbach_chat/sounds/${sound}.mp3`);
								return;
							}
						}

						socket.emit("receive", "error", `Error: ${messageArray[1]} is not a sound phrase.`);
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes 1 arguments. You gave ${messageArray.length - 1}.`);
					}
					
					break;
				case "/pm":
				case "/privatemessage":
					if (messageArray.length >= 3) {
						for (let id of Object.keys(users)) {
							if (messageArray[1] == users[id].name && users[id].room == users[socket.id].room) {
								if (messageArray[1] == users[socket.id].name) {
									socket.emit("receive", "error", "Error: You can not send yourself a private message.");
								} else {
									privateMessage = messageArray.slice(2).join(" ");
									if (rooms[users[id].room].chatFilter) {
										io.in(id).emit("receive", "message", `Private message from ${users[socket.id].name}: ${clean(privateMessage)}`);
										socket.emit("receive", "message", `Private message to ${users[id].name}: ${clean(privateMessage)}`);
									} else {
										io.in(id).emit("receive", "message", `Private message from ${users[socket.id].name}: ${privateMessage}`);
										socket.emit("receive", "message", `Private message to ${users[id].name}: ${privateMessage}`);
									}
								}
								
								return;
							}
						}

						socket.emit("receive", "error", `Error: ${messageArray[1]} is not in this chat room.`);
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes at least 2 arguments. You gave ${messageArray.length - 1}.`);
					}
					
					break;
				case "/prs":
				case "/privatesound":
					if (messageArray.length == 3) {
						for (let id of Object.keys(users)) {
							if (messageArray[1] == users[id].name && users[id].room == users[socket.id].room) {
								if (messageArray[1] == users[socket.id].name) {
									socket.emit("receive", "error", "Error: You can not play yourself a private sound.");
								} else {
									for (let sound of sounds) {
										if (messageArray[2] == sound) {
											if (messageArray[2] == "rickrolll") {
												io.in(id).emit("receive", "nonotification", `Enjoy these next three minutes and thirty seconds because ${users[socket.id].name} just rickrolled you privately.`);
												socket.emit("receive", "nonotification", `You just rickrolled ${users[id].name} privately. I hope you're happy.`);
											} else {
												io.in(id).emit("receive", "nonotification", `Private sound from ${users[socket.id].name}: \"${sound}\"`);
												socket.emit("receive", "nonotification", `Private sound to ${users[id].name}: \"${sound}"`);
											}
												
											await wait(500);
											io.in(id).emit("receive", "sound", `https://scot.butzbach.net/projects/butzbach_chat/sounds/${sound}.mp3`);
											socket.emit("receive", "sound", `https://scot.butzbach.net/projects/butzbach_chat/sounds/${sound}.mp3`);
											return;
										}
									}
	
									socket.emit("receive", "error", `Error: ${messageArray[2]} is not a sound phrase.`);
								}
								
								return;
							}
						}

						socket.emit("receive", "error", `Error: ${messageArray[1]} is not in the chat room.`);
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes 2 arguments. You gave ${messageArray.length - 1}.`);
					}
					
					break;
				case "/r":
				case "/repeat":
					if (messageArray.length >= 4) {
						if (parseInt(messageArray[1]) == NaN) {
							socket.emit("receive", "error", `Error: The first argument is not a number.`);
						} else if (parseInt(messageArray[2]) == NaN) {
							socket.emit("receive", "error", `Error: The second argument is not a number.`);
						} else {
							if (messageArray.length > 4) {
								const commandArgs = messageArray.slice(4).join(" ");

								for (let i = 0; i < parseInt(messageArray[1]); i++) {
									socket.emit("repeat", messageArray[3], commandArgs);
									await wait(parseInt(messageArray[2]) * 1000);
								}
							} else {
								for (let i = 0; i < parseInt(messageArray[1]); i++) {
									socket.emit("repeat", messageArray[3]);
									await wait(parseInt(messageArray[2]) * 1000);
								}
							}
						}
					} else {
						socket.emit("receive", "error", `Error: ${messageArray[0]} takes 4 arguments. You gave ${messageArray.length - 1}.`);
					}
					
					break;
				default:
					socket.emit("receive", "error", `Error: ${messageArray[0]} is not a command.`);
			}
		} else {
			if (rooms[users[socket.id].room].chatFilter) {
				io.in(users[socket.id].room).emit("receive", "message", `${users[socket.id].name}: ${clean(message)}`);
			} else {
				io.in(users[socket.id].room).emit("receive", "message", `${users[socket.id].name}: ${message}`);
			}
		}
	});

	socket.on("announcement", () => {
		socket.emit("receive", "announcement", `Announcement: ${announcements[Math.floor(Math.random() * announcements.length)]}`);
	});
	
	
	socket.on("leave", () => {
		const code = (users[socket.id] != undefined) ? users[socket.id].room : null;
		if (code != null) {
			io.in(code).emit("receive", "message", `Server: Goodbye, ${users[socket.id].name}.`);
			socket.leave(code);
			rooms[code].userCount--;
			if (rooms[code].userCount == 0) {
				delete rooms[code];
				delete users[socket.id];
			} else {
				delete users[socket.id];
				io.in(code).emit("roomUpdate", rooms[code].userCount, getUsersFromRoom(code));
			}
		}
	});

	socket.on("disconnecting", () => {
		const code = (users[socket.id] != undefined) ? users[socket.id].room : null;
		if (code != null) {
			io.in(code).emit("receive", "message", `Server: Goodbye, ${users[socket.id].name}.`);
			socket.leave(code);
			rooms[code].userCount--;
			if (rooms[code].userCount == 0) {
				delete rooms[code];
				delete users[socket.id];
			} else {
				delete users[socket.id];
				io.in(code).emit("roomUpdate", rooms[code].userCount, getUsersFromRoom(code));
			}
		}
	});
});

httpServer.listen(80);
