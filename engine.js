const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 10001;
app.use(express.static(__dirname+'/public'));

const mod_tictactoe = require('./assist_modules/tictactoe');
//mod_tictactoe.check_tictactoe_board("check board");

let pvp_arr = {}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/home.html');
});

app.get('/tic-tac-toe/', (req, res) => {
	res.sendFile(__dirname + '/tic-tac-toe/index.html');
});

app.get('/othello/', (req, res) => {
	res.sendFile(__dirname + '/othello/index.html');
});

app.get('/chess/', (req, res) => {
	res.sendFile(__dirname + '/chess/index.html');
});

app.get('/snake-and-ladder/', (req, res) => {
	res.sendFile(__dirname + '/snake-and-ladder/index.html');
});

app.get('/tetris-battle/', (req, res) => {
	res.sendFile(__dirname + '/tetris-battle/index.html');
});

io.on('connection', (socket) => {
	socket.on('check_room', id => {
		if(pvp_arr[id] == undefined){
			io.emit(id+'_room_res', 0);
		}
		else{
			io.emit(id+'_room_res', 1);
		}
	});
	
	socket.on('set_score', id => {
		io.emit(id+'_tictactoe_progress', mod_tictactoe.get_tictactoe_score(id)+"-"+pvp_arr[id]['winner']+"-"+pvp_arr[id]['turn']);
	});
	
	socket.on('command', room_id => {
		socket.on(room_id+'get_board', id => {
			io.emit(id+'_resume_board', mod_tictactoe.get_tictactoe_board(id));
		});
		
		socket.on(room_id+'_send_active_status', id => {
			let t_stamp = parseInt(Date.now()/1000)
			let str_arr = (pvp_arr[room_id]['timestamp']).split("-");
			let ts_p1 = "online";
			let ts_p2 = "online";
			if(id == "player_1"){
				if(t_stamp-parseInt(str_arr[1]) > 5){
					ts_p2 = "offline";
				}
				str_arr[0] = t_stamp;
			}
			else if(id == "player_2"){
				if(t_stamp-parseInt(str_arr[0]) > 5){
					ts_p1 = "offline";
				}
				str_arr[1] = t_stamp;
			}
			
			pvp_arr[room_id]['timestamp'] = str_arr[0]+"-"+str_arr[1];
			io.emit(room_id+'_player_status', "player_1-"+ts_p1+"-player_2-"+ts_p2);
		});
		
		socket.on(room_id+'_reset_board', id => {
			pvp_arr[room_id]['winner'] = "";
			mod_tictactoe.clear_tictactoe_board(id);
			io.emit(room_id+'_clear_board', id);
		});
		
		socket.on(room_id+'_move_check', id => {
			let str_arr = id.split("-");
			let move_valid = false;
			if(str_arr[1] == "x" && pvp_arr[room_id]['turn'] == "x"){
				pvp_arr[room_id]['turn'] = "o";
				move_valid = true;
			}
			else if(str_arr[1] == "o" && pvp_arr[room_id]['turn'] == "o"){
				pvp_arr[room_id]['turn'] = "x";
				move_valid = true;
			}
			
			if(move_valid){
				let board_res = mod_tictactoe.set_tictactoe_board(room_id, str_arr[0], str_arr[1]);
				if(board_res != 0)
					pvp_arr[room_id]['winner'] = str_arr[1];
				io.emit(room_id+'_move', id+"-"+board_res);
			}
			
		});
	  
		socket.on(room_id+'_set', data => {
			//name, room_id
			let str_arr = data.split("-");
			
			if(pvp_arr[str_arr[1]] == undefined){
				pvp_arr[str_arr[1]] = {}
				pvp_arr[str_arr[1]]['turn'] = str_arr[3];
				pvp_arr[str_arr[1]]['timestamp'] = "0-0";
				pvp_arr[str_arr[1]]['winner'] = "";
			}
			
			pvp_arr[str_arr[1]][str_arr[2]] = str_arr[0];
			
			let p1 = "";
			let p2 = "";
			
			p1 = pvp_arr[str_arr[1]]['player_1'];
			p2 = pvp_arr[str_arr[1]]['player_2'];
			//pvp_arr[str_arr[1]]['score_p1'] = 0;
			//pvp_arr[str_arr[1]]['score_p2'] = 0;
			
			io.emit(room_id+'_setup', p1+"-"+p2+"-"+pvp_arr[str_arr[1]]['turn']);
		});
		
		socket.emit("start", room_id);
	});
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});