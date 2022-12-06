const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const axios = require("axios");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: "*" },
});

let key = "";

users = {
	"1":{
		senderKey: "123",
		receiverKey: "456",
		receiverId: "2"
	}	
}


// function startTimer() {
// 	timer = setInterval(function () {
// 		axios.get("http://localhost:4444/encrypt").then((res) => {
// 			key = res.data;
// 			console.log(key);
// 		}).catch((err) => {
// 			console.log(err);
// 		});
// 	}, 300000);
// }
// startTimer();


io.on("connection", (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);
	console.log(`${id} connected`);


	socket.on("share-key", (data) => {
		socket.to(id).emit("share-key", key);
	});

	socket.on("send-message", (data) => {
		console.log(data);
		let text = data.text;
		data.recipients.forEach((recipient) => {
			const newRecipients = data.recipients.filter((r) => r !== recipient);
			newRecipients.push(id);
			socket.broadcast.to(recipient).emit("recive-message", {
				recipients: newRecipients,
				sender: id,
				text: text,
			});
		});
	});
});

server.listen(process.env.PORT || 5000, () => {
	console.log("server up and running ");
});
