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
		keys.forEach(function(value){
			let data = findMatch(urlData, value);
			document.querySelector(`.${value}`).innerText = decodeURIComponent(data);
		})
	}
})();