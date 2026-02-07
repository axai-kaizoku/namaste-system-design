import { createServer } from "node:http";
import path from "node:path";
import express from "express";
import { Server } from "socket.io";

const PORT = 4043;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (_req, res) => {
	res.sendFile(path.join(import.meta.dirname, "index.html"));
});

io.on("connection", (socket) => {
	console.log("Connection established");

	socket.on("chat message", (msg) => {
		console.log("message: ", msg);
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
