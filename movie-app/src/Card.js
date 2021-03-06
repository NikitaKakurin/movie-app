import {fixColorRating} from './index.js';
class Card{
    constructor(selector){
        this.selector = selector,
        this.cardWrapper = document.querySelector(selector);
        this.cardContainer = this.cardWrapper.querySelector('.movie-main__container-card'),
        this.videoContainer = this.cardWrapper.querySelector('.movie-main__container-card-container-video'),
        this.title = this.cardWrapper.querySelector('.movie-main__container-card-title'),
        this.date = this.cardWrapper.querySelector('.movie-main__container-card-date'),
        this.genres = this.cardWrapper.querySelector('.movie-main__container-card-genres'),
        this.time = this.cardWrapper.querySelector('.movie-main__container-card-time'),
        this.rating = this.cardWrapper.querySelector('.movie-main__container-card-rating'),
        this.tagline = this.cardWrapper.querySelector('.movie-main__container-card-tagline'),
        this.overview = this.cardWrapper.querySelector('.movie-main__container-card-overview'),
        this.video = this.cardWrapper.querySelector('.movie-main__container-card-video'),
        this.voteCount = this.cardWrapper.querySelector('.movie-main__container-card-vote-count'),
        this.popularity = this.cardWrapper.querySelector('.movie-main__container-card-popularity'),
        this.budget = this.cardWrapper.querySelector('.movie-main__container-card-budget'),
        this.revenue = this.cardWrapper.querySelector('.movie-main__container-card-revenue'),
        this.language = this.cardWrapper.querySelector('.movie-main__container-card-language'),
        this.readMoreBtn = this.cardWrapper.querySelector('.movie-main__read-more-btn'),
        this.readMoreContainer = this.cardWrapper.querySelector('.movie-main__container-read-more')
        this.isReadMoreShow = false;
    }

    render(dataCard){
        if(dataCard.backdrop_path){
            this.cardContainer.style.backgroundImage =`url(https://image.tmdb.org/t/p/w1280${dataCard.backdrop_path})`
        }
        this.title.innerText = dataCard.original_title;
        this.date.innerText = dataCard.release_date;
        this.genres.innerText = getList(dataCard.genres);
        this.time.innerText = fixTime();
        this.rating.innerText =  dataCard.vote_average;
        this.tagline.innerText = dataCard.tagline;
        this.overview.innerText = dataCard.overview;

        this.voteCount.innerText = dataCard.vote_count;
        this.popularity.innerText = dataCard.popularity;
        this.budget.innerText = dataCard.budget + '$';
        this.revenue.innerText = dataCard.revenue + '$';
        this.language.innerText = dataCard.original_language;
        this.revenue.style.color=(dataCard.revenue>dataCard.budget)?'green':'red';
        this.getSrcVideo(dataCard.id);
        fixColorRating(this.rating, dataCard.vote_average)
        function fixTime(){
            return `${Math.floor(dataCard.runtime/60)}:${(dataCard.runtime%60)}h`;
        }
        function getList(arr){
            return arr.map(el => el.name).join(', ')
        }


    }

    getSrcVideo(id){
        let src;
        let videosUrl =  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b66e39cd8df804db7c43212613fe5719`;
        const getSrc = (data)=>{
            if(data.results.length===0){return};
            for(let video of data.results){
                if(video.type==="Teaser"||video.type==="Trailer"){
                    this.video.src = "https://www.youtube.com/embed/"+ video.key;
                    return;
                }
            }
            this.video.src = "https://www.youtube.com/embed/"+ data.results[0].key
        }
        fetch(videosUrl)
            .then((response)=>response.json())
            .then((data)=>{

                getSrc(data)
            })
        
    }

    show(){
        this.cardWrapper.style.display = "flex";
        let timeout = setTimeout(()=>{
            this.cardWrapper.style.opacity = 1;
        },100)
        document.documentElement.style.overflow = 'hidden';
    }

    hide(){
        const setDisplayNone = (event) => {
            this.cardWrapper.style.display = "none";
            this.video.src = "";
            this.cardWrapper.removeEventListener('transitionend', setDisplayNone)
        }
        this.cardWrapper.addEventListener('transitionend', setDisplayNone)
        this.cardWrapper.style.opacity = 0;
        document.documentElement.style.overflow = '';
    }

    showOrHideReadMore(){
        if(this.isReadMoreShow){
            this.readMoreContainer.style.maxHeight = '0px';
            this.readMoreBtn.innerText = 'Read more';
            this.isReadMoreShow=false;
            return;
        }
        this.readMoreContainer.style.maxHeight = '300px';
        this.readMoreBtn.innerText = 'Hide';
        this.isReadMoreShow=true;
    }
}

export default Card;