
function trim_string(str){
	return (str).replace(/^\s+|\s+$/g,'');
}

function random_string(len){
	let string_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let rnd = "";
	
	for(let i=0; i<len; i++){
		rnd += Math.floor(Math.random() * string_set.length);
	}
	
	return rnd;
}

function compare_string(str1, str2){
	if(str1 == str2){
		return true;
	}
	else{
		return false;
	}
}

function convert_case_string(str, cnd){
	if(cnd == "upper"){
		return str.toUpperCase();
	}
	else if(cnd == "lower"){
		return str.toLowerCase();
	}
	else if(cnd == "first"){
		
	}
}

module.export.random_string = random_string;