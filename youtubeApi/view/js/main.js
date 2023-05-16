let btnSearch = document.querySelector('#btnSearch');
let inputBusqueda = document.querySelector('#inputBusqueda')
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();    
    getData(inputBusqueda.value);
    showTitle(inputBusqueda.value);
    showVideo(inputBusqueda.value);
    showDataChannel(inputBusqueda.value)
    showComments(inputBusqueda.value);
    showDescription(inputBusqueda.value);
    showRelatedVideo(inputBusqueda.value);
})

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd4c45a2ccemsh4c7f0da2d8647eap1d8471jsnbd7511e676db',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

const getData = async(nameVideo) => {
    let url = `https://youtube138.p.rapidapi.com/search/?q=${nameVideo}&hl=en&gl=US`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
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
    videoSearched.src = `https://www.youtube.com/embed/${dataVideo.contents[0].video.videoId}`
}

const showDataChannel = async (nameVideo) => {
    let logoCanal =document.querySelector('#logoCanal');
    let nombreCanal = document.querySelector('#nombreCanal');
    const dataVideo = await getData(nameVideo);
    logoCanal.src = dataVideo.contents[0].video.author.avatar[0].url;
    nombreCanal.textContent = dataVideo.contents[0].video.title;
}

const showComments = async (nameVideo) => {
    let caja = ''
    let comentarios = document.querySelector('#comments');
    let div = document.createElement('div');
    const dataVideo = await getComments(nameVideo);    
    for(let i=0; i<dataVideo.comments.length; i++){
        caja += `
        <div class="comentario-ind">
            <p>${dataVideo.comments[i].content}</p>
        </div>
        `;
        div.innerHTML = caja;
        comentarios.innerHTML = '';
        comentarios.appendChild(div);
    }
}

const getComments = async (nameVideo) => {
    const dataVideo = await getData(nameVideo);
    let id = dataVideo.contents[0].video.videoId;
    let url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

const showDescription = async (nameVideo) => {
    let descipcionVideo = document.querySelector('#descipcionVideo')
    const details = await getDetails(nameVideo);
    descipcionVideo.innerHTML = details.description;
}

const getDetails = async (nameVideo) => {
    const dataVideo = await getData(nameVideo);
    let url = `https://youtube138.p.rapidapi.com/video/details/?id=${dataVideo.contents[0].video.videoId}&hl=en&gl=US`
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

const showRelatedVideo = async (nameVideo) => {
    const relatedData = await getRelatedVideo(nameVideo);
    let containerRelated = document.querySelector('#containerRelated');
    let caja = `
    <div class="video-ind"><iframe src="https://www.youtube.com/embed/${relatedData.contents[1].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <div class="video-ind"><iframe src="https://www.youtube.com/embed/${relatedData.contents[2].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <div class="video-ind"><iframe src="https://www.youtube.com/embed/${relatedData.contents[3].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    `;
    containerRelated.innerHTML = caja;
}

const getRelatedVideo = async (nameVideo) => {
    const dataVideo = await getData(nameVideo);
    let url = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${dataVideo.contents[0].video.videoId}&hl=en&gl=US`
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
