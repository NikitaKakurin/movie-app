class Card{
    constructor(selector){
        this.selector = selector,
        this.cardWrapper = document.querySelector(selector);
        this.cardContainer = this.cardWrapper.querySelector('.movie-main__container-card'),
        this.videoContainer = this.cardWrapper.querySelector('.movie-main__container-card-container-video'),
        // this.poster = this.cardWrapper.querySelector('.movie-main__container-card-poster'),
        this.title = this.cardWrapper.querySelector('.movie-main__container-card-title'),
        this.date = this.cardWrapper.querySelector('.movie-main__container-card-date'),
        this.genres = this.cardWrapper.querySelector('.movie-main__container-card-genres'),
        this.time = this.cardWrapper.querySelector('.movie-main__container-card-time'),
        this.rating = this.cardWrapper.querySelector('.movie-main__container-card-rating'),
        this.tagline = this.cardWrapper.querySelector('.movie-main__container-card-tagline'),
        this.overview = this.cardWrapper.querySelector('.movie-main__container-card-overview'),
        this.video = this.cardWrapper.querySelector('.movie-main__container-card-video')
    }

    render(dataCard){
        this.cardContainer.style.backgroundImage =`url(https://image.tmdb.org/t/p/w1280${dataCard.backdrop_path})`
        this.title.innerText = dataCard.original_title;
        // this.poster.alt = dataCard.original_title;
        this.date.innerText = dataCard.release_date;
        this.genres.innerText = getList(dataCard.genres);
        this.time.innerText = fixTime();
        this.rating.innerText =  dataCard.vote_average;
        this.tagline.innerText = dataCard.tagline;
        this.overview.innerText = dataCard.overview;

        function fixTime(){
            return `${Math.floor(dataCard.runtime/60)}:${(dataCard.runtime%60)}h`;
        }

        function getList(arr){
            return arr.map(el => el.name).join(', ')
        }
    }

    show(){
        this.cardWrapper.style.display = "flex";
        let timeout = setTimeout(()=>{
            this.cardWrapper.style.opacity = 1;
        },100)
    }

    hide(){
        const setDisplayNone = (event) => {
            this.cardWrapper.style.display = "none";
            this.cardWrapper.removeEventListener('transitionend', setDisplayNone)
        }
        this.cardWrapper.addEventListener('transitionend', setDisplayNone)
        this.cardWrapper.style.opacity = 0;
    }
}

export default Card;