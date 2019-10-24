class Carousel {

    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            navigation: true,
            pagination: false
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0

        // Modification du DOM
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel_container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel_item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.moveCallbacks.forEach(cb => cb(0))
        if (this.options.navigation) {
            this.createNavigation()
        }      
        if (this.options.pagination) {
            this.createPagination()
        }
      
        // Défilement automatique toutes les 5 secondes
        setInterval(() => {
            this.slideIndex = this.currentItem + 1;
            this.next(this.slideIndex);
        }, 5000);

        // Utilisation des flèches gauche et droite du clavier
        $(document).on('keydown',e => {
            if (e.which === 37){
                this.prev();
            }
            else if (e.which === 39){
                this.next();
            }
        });
       
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
    }

    // Création des flèches de navigation
    createNavigation () {
        let nextButton = this.createDivWithClass('carousel_next')
        let prevButton = this.createDivWithClass('carousel_prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next () {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }

    // Création des boutons de la pagination
    createPagination () {
        let pagination = this.createDivWithClass("carousel-pagination")
        let buttons = []
        this.root.appendChild(pagination)
        for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll) {
            let button = this.createDivWithClass("carousel-pagination-button")
            button.addEventListener("click", () => this.gotoItem(i))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let activeButton = buttons[Math.floor(index / this.options.slidesToScroll)]
            if (activeButton) {
                buttons.forEach(button => button.classList.remove("carousel-pagination-button-active"))
                activeButton.classList.add("carousel-pagination-button-active")
            }
        })
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     */
    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible 
        } else if (index >= this.items.length) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d('+ translateX +'%, 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    onMove (cb) {
        this.moveCallbacks.push(cb)
    }

    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

}

document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 1,
        slidesToScroll: 1,
        pagination: true
    })
});