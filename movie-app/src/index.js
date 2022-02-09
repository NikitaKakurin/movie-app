import './style/normalize.css';
import './style/style.scss';
import noPoster from './assets/img/noPoster.png'
import './assets/svg/tmbd-logo.svg';


const searchInput = document.querySelector('.movie-header__form-search');
const searchResetButton = document.querySelector('.movie-header__form-search-reset-btn');
const form = document.querySelector('.movie-header__form');
const containerMovies =  document.querySelector('.movie-main__container');
form.addEventListener('submit', handleSubmitForm)


function handleSubmitForm(event){
    event.preventDefault()
    let url;
    const query = form.elements.search.value;
    if(query==""){
        url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b66e39cd8df804db7c43212613fe5719`;

    }else{
        url = `https://api.themoviedb.org/3/search/movie?api_key=b66e39cd8df804db7c43212613fe5719&query=${query}&page=1`;
    }
    pasteMovies(url)
};

function pasteMovies(url){
    containerMovies.innerHTML="";
    console.log(url)
    async function getData(){
        const res = await fetch(url);
        const data = await res.json();
        containerMovies.append(createMovies(data));
    }
    getData();
}

function createMovies(data){
    let fragment = document.createDocumentFragment();
    data.results.forEach(movie=>{
        fragment.append(createMovie(movie));
    })
    return fragment
};

function createMovie(dataMovie){
    const containerMovie = createOneElement('div','movie-main__data-container');
    const poster = createOneElement('img', 'movie-main__data-poster');
    const info = createOneElement('div', 'movie-main__data-info');
    const infoName = createOneElement('h3', 'movie-main__data-name');
    const infoRating = createOneElement('span', 'movie-main__data-rating');
    const overview = createOneElement('div', 'movie-main__data-overview');
    const overviewTitle = createOneElement('h3', 'movie-main__data-title');
    const overviewText = createOneElement('p', 'movie-main__data-text');
    
    containerMovie.append(poster);
    containerMovie.append(info);
    containerMovie.append(overview);
    info.append(infoName);
    info.append(infoRating);
    overview.append(overviewTitle);
    overview.append(overviewText);

    let posterSrc =`https://image.tmdb.org/t/p/w300${dataMovie.poster_path}` 
    fetch(posterSrc)
          .then(response=>poster.src = posterSrc)
          .catch(err => poster.src = noPoster)
    // let loadPosterPromise = (src)=>{
    //     return new Promise((resolve,reject)=>{
    //         loadPoster(src,(error, img)=>{
    //             if(error){
    //                 reject(error);
    //             }else{
    //                 resolve(img)
    //             }
    //         })
    //     })
    // }


//     try{
//         poster.src =`https://image.tmdb.org/t/p/w300${dataMovie.poster_path}`;
//     }
//     catch(e){
// debugger
//         poster.src =`../assets/img/noPoster.png`;
//     }
console.log(poster.src); 
    poster.alt = dataMovie.title;

    infoName.innerText = dataMovie.title;
    infoRating.innerText = dataMovie.vote_average;
    fixColorRating();
    overviewTitle.innerText = "Overview";
    overviewText.innerText = dataMovie.overview;

    return containerMovie;
    function fixColorRating(){
        if(dataMovie.vote_average<5){
            infoRating.style.color = "red"
        }else if(dataMovie.vote_average<8){
            infoRating.style.color = "orange"
        }else{
            infoRating.style.color = "green"
        }
    }

    function createOneElement(tag, className){
        const elem = document.createElement(tag);
        elem.classList.add(className);
        return elem;
    }
}

