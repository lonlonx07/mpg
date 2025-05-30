const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname+'/public'));

let turn = "x";
let pvp_arr = {}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.get('/xox/', (req, res) => {
	res.sendFile(__dirname + '/xox/index.html');
});

app.get('/othello/', (req, res) => {
	res.sendFile(__dirname + '/othello/index.html');
});

app.get('/chess/', (req, res) => {
	res.sendFile(__dirname + '/chess/index.html');
});

app.get('/tetris-battle/', (req, res) => {
	res.sendFile(__dirname + '/tetris-battle/index.html');
});

io.on('connection', (socket) => {
  socket.on('player move', id => {
	let str_arr = id.split("-");
	let move_valid = false;
	if(str_arr[1] == "x" && turn == "x"){
		turn = "o";
		move_valid = true;
	}
	else if(str_arr[1] == "o" && turn == "o"){
		turn = "x";
		move_valid = true;
	}
	
	if(move_valid)
		io.emit('player move', id);
	
  });
  
	socket.on('set pvp', data => {
		//name, room_id
		let str_arr = data.split("-");
		pvp_arr[str_arr[1]] = {}
		pvp_arr[str_arr[1]]['name'] = str_arr[0];
		pvp_arr[str_arr[1]]['symbol'] = "";
	});
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});