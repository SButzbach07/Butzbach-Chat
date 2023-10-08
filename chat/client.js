/*
	Butzbach Chat
	A web communication application using Socket.IO
	Client-side handling (client.js)

	Copyright (C) 2022 Scot Butzbach
	Licensed under the MIT License
	See LICENSE for terms
*/

const socket = io();

const chat = document.getElementById("chat");
const chatFilterLabel = document.getElementById("chatFilterLabel");
const chatModal = document.getElementById("chatModal");
const chatRoom = document.getElementById("chatRoom");
const connected = document.getElementById("connected");
const disableAudio = document.getElementById("disableAudio");
const roomCodeLabel = document.getElementById("roomCodeLabel");
const roomNameLabel = document.getElementById("roomNameLabel");
const settingsModal = document.getElementById("settingsModal");
const userCounter = document.getElementById("userCounter");
const userName = document.getElementById("userName");
const userNameLabel = document.getElementById("userNameLabel");
const usersInRoom = document.getElementById("usersInRoom");
let isConnected = false;
let announcementInterval;

function send() {
	const messageInput = document.getElementById("message");
	if (messageInput.value.length != 0) {
		if (isConnected) {
			socket.emit("send", messageInput.value);
		} else {
			receive("Error: You are not connected to a chat room.", 349);
		}
		
		messageInput.value = "";
	}
}

function addMessage(message) {
	const messageP = document.createElement("p");
	messageP.style.overflowWrap = "break-word";
	messageP.textContent = message;
	chat.appendChild(messageP);
	chat.scrollTop = chat.scrollHeight;
}

function addUser(user) {
	const userP = document.createElement("p");
	userP.style.overflowWrap = "break-word";
	userP.textContent = user;
	usersInRoom.appendChild(userP);
	usersInRoom.scrollTop = usersInRoom.scrollHeight;
}

function clearChat() {
	while (chat.childElementCount > 0) {
		chat.removeChild(chat.lastElementChild);
	}
}

function clearUserList() {
	while (usersInRoom.firstChild) {
		usersInRoom.removeChild(usersInRoom.firstChild);
	}
}

function receive(message, frequency) {
	addMessage(message);
	if (disableAudio.checked == false) {
		setTimeout(() => {
			playSound(frequency, 50, 0.1);
		}, 100);
	}
}

function openModal(modal) {
	document.getElementById(modal).style.display = "block";
}

function closeModal(modal) {
	document.getElementById(modal).style.display = "none";
}

function createRoom(name, room) {
	if (window.navigator.onLine == false) {
		receive("Error: You are not online. Please reconnect to create a chat room.", 349);
	} else {
		if (chatModal.style.display = "block") {
			closeModal("chatModal");
		}

		if (name.length == 0) {
			receive("Error: User name must be entered.", 349);
		} else if (name.length > 40) {
			receive("Error: User name exceeded the 40 character limit.", 349);
		} else if (/\s/g.test(name)) {
			receive("Error: User name contains whitespace.", 349);
		} else if (room.length == 0) {
			receive("Error: Room name must be entered.", 349);
		} else if (room.length > 40) {
			receive("Error: Room name exceeded the 40 character limit.", 349);
		} else {
			if (isConnected) {
				clearInterval(announcementInterval);
				clearUserList();
				socket.emit("leave");
				isConnected = false;
			}
			
			clearChat();
			socket.emit("create", name, room, (room.toLowerCase().endsWith("_nofilter")) ? false : true);
			userName.value = "";
			chatRoom.value = "";
		}
	}
}

function joinRoom(name, code) {
	if (window.navigator.onLine == false) {
		receive("Error: You are not currently online. Please reconnect to join a chat room.", 349);
	} else {
		if (chatModal.style.display = "block") {
			closeModal("chatModal");
		}

		if (name.length == 0) {
			receive("Error: User name must be entered.", 349);
		} else if (name.length > 40) {
			receive("Error: User name exceeded the 40 character limit.", 349);
		} else if (/\s/g.test(name)) {
			receive("Error: User name contains whitespace.", 349);
		} else if (code.length == 0) {
			receive("Error: Room code must be entered.", 349);
		} else if (code.length != 8) {
			receive("Error: Room code must be 8 characters.", 349);
		} else if (/^[a-z0-9]+$/i.test(code) == false) {
			receive("Error: Room code contains non-alphanumeric characters.", 349);
		} else {
			if (isConnected) {
				clearInterval(announcementInterval);
				clearUserList();
				socket.emit("leave");
				isConnected = false;
			}
			
			clearChat();
			socket.emit("join", name, code);
			userName.value = "";
			chatRoom.value = "";
		}
	}
}

function leaveRoom() {
	if (chatModal.style.display = "block") {
		closeModal("chatModal");
	}

	if (isConnected == false) {
		receive("Error: You are not currently connected to a chat room.", 349);
	} else {
		socket.emit("leave");
		clearInterval(announcementInterval);
		clearUserList();
		isConnected = false;
		userNameLabel.textContent = "";
		roomNameLabel.textContent = "";
		roomCodeLabel.textContent = "";
		chatFilterLabel.textContent = "";
		userCounter.textContent = "";
		connected.textContent = "Not Connected";
		document.title = "Not Connected - Butzbach Chat";
	}
}

socket.on("join", (name, room, code, filter) => {
	connected.textContent = "Connected";
	userNameLabel.textContent = name;
	roomNameLabel.textContent = room;
	roomCodeLabel.textContent = code;
	chatFilterLabel.textContent = filter;
	isConnected = true;
	document.title = "Connected - Butzbach Chat";
	announcementInterval = setInterval(() => {
		socket.emit("announcement");
	}, 300000);
});

socket.on("receive", (type, message) => {
	switch (type) {
		case "announcement":
			receive(message, 494);
			break;
		case "error":
			receive(message, 349);
			break;
		case "message":
			receive(message, 440);
			break;
		case "nonotification":
			addMessage(message);
			break;
		case "sound":
			if (disableAudio.checked == false) {
				new Audio(message).play();
			}
			break;
	}
});

socket.on("repeat", (command, commandArgs) => {
	if (commandArgs == undefined) {
		socket.emit("send", command);
	} else {
		socket.emit("send", `${command} ${commandArgs}`);
	}
});

socket.on("roomUpdate", (userCount, userList) => {
	clearUserList();
	userCounter.textContent = userCount;
	for (let user of userList) {
		addUser(user);
	}
});

socket.on("disconnect", (reason) => {
	switch (reason) {
		case "ping timeout":
			receive("Client: Your session has timed out due to inactive use.", 349);
			break;
		case "transport close":
			receive("Client: You have been disconnected from the server.", 349);
			break;
		case "transport error":
			receive("Client: An error occurred when connecting to the server.", 349);
			break;
		default:
			receive(`Client: Your session has been interrupted. Reason: ${reason}`, 349);
			break;
	}

	clearInterval(announcementInterval);
	clearUserList();
	isConnected = false;
	userNameLabel.textContent = "";
	roomNameLabel.textContent = "";
	roomCodeLabel.textContent = "";
	chatFilterLabel.textContent = "";
	userCounter.textContent = "";
	connected.textContent = "Not Connected";
	document.title = "Not Connected - Butzbach Chat";
});

document.addEventListener("keypress", (event) => {
	if (event.code === "Enter" || event.code === "NumpadEnter") {
		send();
	}
});

window.onload = () => {
	receive("Welcome to Butzbach Chat. If you see this message, then there is a connection established with the server. To join a chat room, press the Chat Room button at the top of your screen. Create a chat room by providing a user name and a room name, or join a chat room by providing a user name and a room code. The side bar will provide information about the connected chat room. Use room code \"butzbach\" for the default chat room.", 440);
	document.title = "Not Connected - Butzbach Chat";
}

window.onclick = (event) => {
	if (event.target == chatModal) {
		closeModal("chatModal");
	} else if (event.target == settingsModal) {
		closeModal("settingsModal");
	}
}
