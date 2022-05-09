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
			// Calling fetchApi function
			fetchApi(found[1]);
		} catch(exeption){ }
	}
);

// fetch data from haveibeenpwned api
function fetchApi(query){
	try{
		// calling haveibeenpwned api
			return fetch('https://haveibeenpwned.com/api/v3/breach/'+query)
				.then(response => {
					const satus = response.status;
					if(satus == 200){
						return response.json();
					} else {
						return false;
					}
			}).then(data => {
				try{
					// Pown data
					let elementOne = document.getElementById("sub-para1");
					elementOne.innerHTML = data.BreachDate;
					// Pown Count
					let elementSecond = document.getElementById("sub-para2");
					elementSecond.innerHTML = data.PwnCount;
					// Description
					let expretion = /<(.*?)>/g;
					description = data.Description;
					let desc = description.replace(expretion, "");
					let elementThird = document.getElementById("sub-para3");
					elementThird.innerHTML = desc;
					// leaked data
					let elementFour = document.getElementById("sub-para4");
					elementFour.innerHTML = data.DataClasses;
				} catch(exeption){ }	
		})
	} catch(exeption){ }
}