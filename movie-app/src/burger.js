export class BurgerButton{
    constructor(selector){
        this.burgerButton = document.querySelector(selector);
        this.burgerButtonLines = document.querySelectorAll('.burger-button__line');
    }

    showCross(){
        this.changeBurgerButton({isToOpen:true})
    }

    showButton(){
        this.changeBurgerButton({isToOpen:false})
    }


    changeBurgerButton({isToOpen}) {
        debugger
        let fun;
        if(isToOpen){
            fun = "add";
        } else{
            fun = "remove";
        }
        this.burgerButtonLines.forEach((elem, index)=>{
            switch (index){
                case 0:
                    elem.classList[fun]("burger-button__line-first");
                    break;
                case 1:
                    elem.classList[fun]("burger-button__line-second");
                    break;
                case 2:
                    elem.classList[fun]("burger-button__line-third");
                    break;
            }
        });
    }
}


export class BurgerMenu{
    constructor(selector){
       this.BurgerMenu = document.querySelector('.movie-header__form');
       this.width = this.BurgerMenu.clientWidth;
    }

    
    openMenu(){       
        this.BurgerMenu.style.right = "0px";
    }

    closeMenu(){
        this.BurgerMenu.style.right = (-this.width)+'px';
    }
}