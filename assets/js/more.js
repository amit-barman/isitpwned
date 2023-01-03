// // isitpwned v0.2
// // By Amit Barman

const urlData = document.location.toString();		// real data location
const keys = ['breachdate', 'pwncount', 'desc', 'dataclass'];	// pre defined url parameters

// extract data from url parameters
function findMatch(url, param) {
	let res = url.match(`(?:^|[?&])${param}=([^&]*)`);
	return res[1];
}

// show all data to the user
(function showData(){
	if(findMatch(urlData, 'status') == '200'){		// check if api status code 200
		for(let i = 0; i < keys.length; i++){
			let data = findMatch(urlData, keys[i]);
			document.querySelector(`.${keys[i]}`).innerText = decodeURIComponent(data);
		}
	}
})();