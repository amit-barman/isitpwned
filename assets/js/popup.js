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
		let satus = 0;
		// calling haveibeenpwned api
		fetch('https://haveibeenpwned.com/api/v3/breach/'+query)
			.then(response => {
				satus = response.status;
				if(satus == 200){
					let isPwnelm = document.getElementById("sub-para4");
					isPwnelm.innerText = "😨 Oops Pwned Found";
					document.getElementById("sub-para4").style.color = "red";
					return response.json();
				} else {
					let isPwnelm = document.getElementById("sub-para4");
					isPwnelm.innerText = "😊 No Pwned Found";
					document.getElementById("sub-para4").style.color = "green";
					return false;
				}
		}).then(data => {
			// console.log(data);
			let breachdData = data.BreachDate;
			// Pwn Count
			let pwnCount = data.PwnCount;
			// Description
			const expretion = /<(.*?)>/g;	// expretion to remove html tags
			let description = data.Description;
			description = description.replace(expretion, "");
			// leaked data
			let dataClass = data.DataClasses;
			// get link href data
			let link = document.querySelector(".next-btn").href;
			link = link.replace("notfound", satus).replace("inpbreachdate", breachdData).replace("inppwncount", pwnCount).replace("inpdesc", description).replace("inpdataclass", dataClass);
			document.querySelector(".next-btn").href = link;
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
			elementOne.innerText = data.query;
		})	
	} catch(except){ }
}
fetchIpaddress();