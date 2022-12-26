// // isitpwned v0.1
// // By Amit Barman

const urlData = document.location.toString();		// real data location
const keys = ['breachdate', 'pwncount', 'desc', 'dataclass'];

function findMatch(url, param) {
	let res = url.match(`(?:^|[?&])${param}=([^&]*)`);
	return res ? res[1] : null;
}

function deocdeData(data){
	return data.replaceAll('%20', ' ').replaceAll('%22', '"');
}

function showData(){
	if(findMatch(urlData, 'status') == '200'){
		for(let i = 0; i < keys.length; i++){
			let data = findMatch(urlData, keys[i]);
			document.querySelector(`.${keys[i]}`).innerText = deocdeData(data);
		}
	}
}

showData();