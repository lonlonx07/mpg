let board_arr = {}
let players_arr = {}
let score_arr = {}

function check_board(ind, sign){
	let res = 0;
	
	if(board_arr[ind]['1_1'] == sign && board_arr[ind]['1_2'] == sign && board_arr[ind]['1_3'] == sign){
		res = "1_1*1_2*1_3";
	}
	else if(board_arr[ind]['2_1'] == sign && board_arr[ind]['2_2'] == sign && board_arr[ind]['2_3'] == sign){
		res = "2_1*2_2*2_3";
	}
	else if(board_arr[ind]['3_1'] == sign && board_arr[ind]['3_2'] == sign && board_arr[ind]['3_3'] == sign){
		res = "3_1*3_2*3_3";
	}
	else if(board_arr[ind]['1_1'] == sign && board_arr[ind]['2_1'] == sign && board_arr[ind]['3_1'] == sign){
		res = "1_1*2_1*3_1";
	}
	else if(board_arr[ind]['1_2'] == sign && board_arr[ind]['2_2'] == sign && board_arr[ind]['3_2'] == sign){
		res = "1_2*2_2*3_2";
	}
	else if(board_arr[ind]['1_3'] == sign && board_arr[ind]['2_3'] == sign && board_arr[ind]['3_3'] == sign){
		res = "1_3*2_3*3_3";
	}
	else if(board_arr[ind]['1_1'] == sign && board_arr[ind]['2_2'] == sign && board_arr[ind]['3_3'] == sign){
		res = "1_1*2_2*3_3";
	}
	else if(board_arr[ind]['1_3'] == sign && board_arr[ind]['2_2'] == sign && board_arr[ind]['3_1'] == sign){
		res = "1_3*2_2*3_1";
	}
	
	return res;
}

function set_board(ind, grid_id, sign){
	if(board_arr[ind] == undefined){
		board_arr[ind] = {}
	}
	
	if(score_arr[ind] == undefined){
		score_arr[ind] = {}
		score_arr[ind]['x'] = 0;
		score_arr[ind]['o'] = 0;
	}
	
	board_arr[ind][grid_id] = sign;
	let res = check_board(ind, sign);
	if(res != 0){
		score_arr[ind][sign]++;
	}
	
	return res;
}

function get_board(ind){
	return board_arr[ind];
}

function get_scores(ind){
	try{
		return "x-"+score_arr[ind]['x']+"-o-"+score_arr[ind]['o'];
	}catch(e){
		return "x-0-o-0";
	}
}

function clear_board(ind){
	board_arr = {}
}

module.exports.check_tictactoe_board = check_board;
module.exports.set_tictactoe_board = set_board;
module.exports.clear_tictactoe_board = clear_board;
module.exports.get_tictactoe_board = get_board;
module.exports.get_tictactoe_score = get_scores;
module.exports.board_arr = board_arr;