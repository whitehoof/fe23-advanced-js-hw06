const findByIp = async() => {
	try {
		document.querySelector('.lds-ripple').style.display = 'block';
		const SR = document.querySelector('#search-result');
		SR.innerHTML = '';
		
		const data1 = await fetch('https://api.ipify.org/?format=json')
			.then(myIp => myIp.json());
		const data2 = await fetch(`http://ip-api.com/json/${data1.ip}?fields=status,message,continent,country,regionName,city,district`)
			.then(data => data.json());
		console.log(data2);
		const {continent, country, regionName, city, district} = data2;
		
		SR.innerHTML = `
<table>
<tr><td>continent:</td><td><span>${continent.length ? continent : "?"}</span></td></tr>
<tr><td>country:</td><td><span>${country.length ? country : "?"}</span></td></tr>
<tr><td>region:</td><td><span>${regionName.length ? regionName : "?"}</span></td></tr>
<tr><td>city:</td><td><span>${city.length ? city : "?"}</span></td></tr>
<tr><td>district:</td><td><span>${district.length ? district : "?"}</span></td></tr>
</table>`;
		
		document.querySelector('.lds-ripple').style.display = 'none';
		
	} catch (err) {
		console.warn(err);
	}
}



document.querySelector('#find').addEventListener('click', findByIp);
