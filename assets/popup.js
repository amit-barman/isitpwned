// isitpwned v0.1
// By Amit Barman
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
	function(tabs){
		try{
			const paragraph = (tabs[0].url);
			const regtodomain = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
			const domain = paragraph.match(regtodomain);
			const regex = /\.([^.]+)\./;
			const found = domain[0].match(regex);
			let elementTwo = document.getElementById("sub-para2");
			elementTwo.innerHTML = found[1];

			let elementThree = document.getElementById("sub-para3");
			elementThree.innerHTML = domain[0];

			fetchApi(found[1]);
		} catch(except){ }
	}
);

// fetch data from haveibeenpwned api
function fetchApi(query){
	try{
		// calling haveibeenpwned api
		fetch('https://haveibeenpwned.com/api/v3/breach/'+query)
			.then(response => {
				const satus = response.status;
				if(satus == 200){
					let isPwnelm = document.getElementById("sub-para4");
					isPwnelm.innerHTML = "😨 Oops Pwned Found";
					document.getElementById("sub-para4").style.color = "red";
					return response.json();
				} else {
					let isPwnelm = document.getElementById("sub-para4");
					isPwnelm.innerHTML = "😊 No Pwned Found";
					document.getElementById("sub-para4").style.color = "green";
					return false;
				}
		}).then(data => {
			// console.log(data);
		})	
	} catch(except){ }
}

// fetch IP address using ip api
function fetchIpaddress(){
	try{
		fetch('http://ip-api.com/json')
			.then(response => {
				const satus = response.status;
				if(satus == 200){
					return response.json();
				} else {
					return false;
				}
		}).then(data => {
			let elementOne = document.getElementById("sub-para1");
			elementOne.innerHTML = data.query;
		})	
	} catch(except){ }
}
fetchIpaddress();