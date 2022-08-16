import '../sass/abol-alert-style.scss'

export default class Alert{
    title
    description
    mode
    boxElement
    tempElement

    constructor(title, description, mode='ok', boxElement=document.body){
        this.title = title
        this.description = description
        this.mode = mode
        this.boxElement = boxElement
    }

    make(){
        this.tempElement = document.createElement('div')
        this.boxElement.appendChild( this.tempElement )
        this.tempElement.classList.add('abol-alert-box'+'-'+this.mode)

        return this
    }

    show(){
        this.tempElement.style.display = 'static'

        return this
    }
    
    hide(){
        this.tempElement.style.display = 'none'

        return this
    }

    remove(){
        this.tempElement.remove()

        return this
    }
}