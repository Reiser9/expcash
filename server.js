const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
	    origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	    allowedHeaders: ["my-custom-header"],
	    credentials: true
	}
});

let online = 0;
io.on('connection', (socket) => {
	online++;
	socket.broadcast.emit('online', online);
	console.log("Пользователь подключился", socket.id, online);

	socket.on('getOnline', () => {
	    io.emit('online', online);
	});

	socket.on('disconnect', function(){
		online--;
		socket.broadcast.emit('online', online);
		console.log("Пользователь отключился", online);
	})
});

server.listen(9999, (err) => {
	if(err){
		throw Error(err);
	}
	console.log('Сервер работает');
});