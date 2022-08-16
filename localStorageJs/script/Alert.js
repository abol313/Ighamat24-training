import '../sass/abol-alert-style.scss'

export default class Alert{
    title
    description
    mode
    boxElement
    tempElement
    titleElement
    descriptionElement

    constructor(title, description, mode='ok', boxElement=document.body){
        this.title = title
        this.description = description
        this.mode = mode
        this.boxElement = boxElement
    }

    setTitle(title){
        this.title = title
        this.titleElement.innerTEXT = this.title
        return this
    }

    setDescription(decription){
        this.description = this.description
        this.descriptionElement.innerTEXT = this.description
        return this
    }

    make(){
        this.tempElement = document.createElement('div')
        this.titleElement = document.createElement('h2')
        this.descriptionElement = document.createElement('p')

        this.tempElement.classList.add('abol-alert-box'+'-'+this.mode)
        this.titleElement.classList.add('title')
        this.descriptionElement.classList.add('description')

        this.setTitle(this.title)
        this.setDescription(this.description)

        this.boxElement.appendChild( this.tempElement )
        this.tempElement.appendChild( this.titleElement )
        this.descriptionElement.appendChild( this.descriptionElement )

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