import './style/normalize.css';
import './style/style.scss';
import './style/containerCard.scss'
import noPoster from './assets/img/noPoster.png';

import './assets/svg/tmbd-logo.svg';
import Card from './Card.js';


const searchInput = document.querySelector('.movie-header__form-search');
const searchResetButton = document.querySelector('.movie-header__form-search-reset-btn');
const form = document.querySelector('.movie-header__form');
const containerMovies =  document.querySelector('.movie-main__container');
const resetButton = document.querySelector('.movie-header__form-search-reset-btn')
const paginations= document.querySelectorAll(".movie-main__pagination");

let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b66e39cd8df804db7c43212613fe5719&page=1`;
let page;
let card;
searchInput.focus();
pasteMovies(url);
form.addEventListener('submit', handleSubmitForm)
document.addEventListener('click', handleClick)

function handleClick(event){
    const target = event.target;
    if(target.classList.contains('movie-header__form-search-reset-btn')){
        searchInput.value = "";
        searchInput.focus();
    }
    if(target.classList.contains('movie-main__pagination-btn')){
        page=target.value;
        url = url.replace(/page=[\d]+/,`page=${page}`)
        pasteMovies(url);
    }
    if(target.classList.contains('movie-main__data-container')||
         target.closest('.movie-main__data-container')){
        let id = target.closest('.movie-main__data-container').dataset.id;
        getMovieCardData(id);
    }

    if(target.classList.contains('movie-main__container-card-close')){
        card.hide();
    }
}

function getMovieCardData(id){
    let movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=b66e39cd8df804db7c43212613fe5719`;
    fetch(movieUrl)
        .then(response=>response.json())
        .then((data)=>{
            console.log(data);
            displayMovieCardData(data)
        })
        .catch(err => console.log(err))
}

function displayMovieCardData(MovieCardData){
    card = new Card(".movie-main__wrapper-container-card")
    card.render(MovieCardData);
    card.show();
}

function handleSubmitForm(event){
    event.preventDefault()
    const query = form.elements.search.value;
    if(query==""){
        //sort_by=release_date.desc&
        // vote_average.desc&
        url = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=b66e39cd8df804db7c43212613fe5719&page=1`;

    }else{
        url = `https://api.themoviedb.org/3/search/movie?api_key=b66e39cd8df804db7c43212613fe5719&query=${query}&page=1`;
    }
    pasteMovies(url)
};

function pasteMovies(url){
    console.log(url)
    fetch(url)
        .then((res)=>{
            if(res.ok){
                return res;
            }
            alert('Ошибка http: ' + res.status);
        })
        .then(res=> res.json())
        .then(data=>{
            containerMovies.innerHTML="";
            addFragmentToPaginations();
            containerMovies.append(createMovies(data));
            displayTitle(data);
            renderPagination(data)
        })
        .catch(err => alert("Ошибка Http: " + response.status))

}

function renderPagination(data){
    if ( data.total_pages == 0){
        addFragmentToPaginations()
        return;
    } 
    let fragment = document.createElement('div');
    
    if(data.total_pages <=5){
        let start = 1
        createPaginationBtn(start, data.total_pages+1);
        addFragmentToPaginations(fragment);
        return;
    }

    if(data.total_pages>data.page+2){
        let start = (data.page - 2 > 0)? data.page - 2 : 1;
        let limit = start+5;       
        createPaginationBtn(start, limit)
        addFragmentToPaginations(fragment);
        return;
    }

     if(data.total_pages<=data.page+2){
         debugger
         let start = data.total_pages - 4;
         let limit = data.total_pages + 1;       
         createPaginationBtn(start, limit)
         addFragmentToPaginations(fragment);
         return;
    }




    function addLastPage(){
        let span = createOneElement('span', 'movie-main__pagination-span');
        span.innerText = ' ... '
        let lastPage = createOneElement('button', 'movie-main__pagination-btn');
        lastPage.value = data.total_pages;
        lastPage.innerText = data.total_pages;
        fragment.append(span);
        fragment.append(lastPage);
    }

    function createPaginationBtn(begin, limit){
        let i = begin;
        if (i>1){
            addFirstPage()
        }
        for( i ; i < limit; i++){
            let btn = createOneElement('button', 'movie-main__pagination-btn');
            if(i===data.page){
                btn.classList.add('movie-main__pagination-btn-current')
            }
            btn.value = i;
            btn.innerText = i;
            fragment.append(btn)
        }
        if (data.total_pages>limit-1){
            addLastPage()
        }
    }

    function addFirstPage(){
        let span = createOneElement('span', 'movie-main__pagination-span');
        span.innerText = ' ... '
        let firstPage = createOneElement('button', 'movie-main__pagination-btn');
        firstPage.value = 1;
        firstPage.innerText = 1;
        fragment.append(firstPage);
        fragment.append(span);
    }
}

function addFragmentToPaginations(fragment){

    let frag = (fragment) ? fragment.innerHTML : "";
    paginations.forEach((elem)=>{
        elem.innerHTML = frag;
    });
}

function displayTitle(data){
    let text =`Найдено ${data.total_results} результатов по вашему запросу на ${data.total_pages} страницах`
    document.querySelector('.movie-main__title').innerHTML = text;
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

    if(dataMovie.poster_path){
        let posterSrc =`https://image.tmdb.org/t/p/w300${dataMovie.poster_path}` 
        fetch(posterSrc)
              .then(response=>poster.src = posterSrc)
              .catch(err => poster.src = noPoster)
    }else{
        poster.src = noPoster;
    }


    poster.alt = dataMovie.title;

    infoName.innerText = dataMovie.title;
    infoRating.innerText = dataMovie.vote_average;
    fixColorRating(infoRating, dataMovie.vote_average);
    overviewTitle.innerText = "Overview";
    overviewText.innerText = dataMovie.overview;

    containerMovie.dataset.id=dataMovie.id

    return containerMovie;


}
export function fixColorRating(elem,rating){
    if(rating<5){
        elem.style.color = "red"
    }else if(rating<8){
        elem.style.color = "orange"
    }else{
        elem.style.color = "green"
    }
}
function createOneElement(tag, className){
    const elem = document.createElement(tag);
    elem.classList.add(className);
    return elem;
}