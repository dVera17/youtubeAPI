let btnSearch = document.querySelector('#btnSearch');
let inputBusqueda = document.querySelector('#inputBusqueda')
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();    
    getData(inputBusqueda.value);
    showTitle(inputBusqueda.value);
    showVideo(inputBusqueda.value);
})

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5e7b92d578msh47625999d326376p19cd89jsn8c1dfc04acbc',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

const getData = async(nameVideo) => {
    let url = `https://youtube138.p.rapidapi.com/search/?q=${nameVideo}&hl=en&gl=US`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}

const showTitle = async (nameVideo) => {
    let titleVideo = document.querySelector('#titleVideo');
    const dataVideo = await getData(nameVideo);
    let title = dataVideo.contents[0].video.title
    titleVideo.textContent = title
}

const showVideo = async (nameVideo) => {
    let videoSearched = document.querySelector('#videoSearched');
    const dataVideo = await getData(nameVideo);
    console.log(dataVideo.contents[0].video.videoId);
    videoSearched.src = `https://www.youtube.com/embed/${dataVideo.contents[0].video.videoId}`
}
