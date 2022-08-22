import './abol-alert-style.scss'

export default class Alert{
    title
    description
    cancel
    mode

    groundElement
    boxElement
    tempElement
    titleElement
    descriptionElement
    cancelElement

    constructor(title, description, cancel, mode='ok', boxElement=document.body){
        this.title = title
        this.description = description
        this.cancel = cancel
        this.mode = mode
        this.boxElement = boxElement
    }

    setTitle(title){
        this.title = title

        let iconEls = {
            success: '<i class="icon fa-solid fa-circle-info"></i>',
            warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
            danger: '<i class="fa-solid fa-circle-exclamation"></i>',
        };
        
        this.titleElement.innerHTML = iconEls[this.mode];
        this.titleElement.innerHTML += this.title
        return this
    }

    setDescription(description){
        this.description = description
        this.descriptionElement.innerText = this.description
        return this
    }

    setCancel(cancel){
        this.cancel = this.cancel
        this.cancelElement.innerText = this.cancel
        return this
    }


    make(){
        this.groundElement = document.createElement('div')
        this.tempElement = document.createElement('div')
        this.titleElement = document.createElement('p')
        this.descriptionElement = document.createElement('p')
        this.cancelElement = document.createElement('p')
        this.cancelElement.addEventListener('click',()=>{
            this.remove();
        },{once:true})
        this.groundElement.addEventListener('click',()=>{
            this.remove();
        },{once:true})


        this.groundElement.classList.add('abol-alert-ground')
        this.tempElement.classList.add('abol-alert-box'+'-'+this.mode)
        this.titleElement.classList.add('title')
        this.descriptionElement.classList.add('description')
        this.cancelElement.classList.add('cancel')


        this.setTitle(this.title)
        this.setDescription(this.description)
        this.setCancel(this.cancel)

        this.boxElement.appendChild( this.groundElement )
        this.groundElement.appendChild( this.tempElement )
        this.tempElement.appendChild( this.titleElement )
        this.tempElement.appendChild( this.descriptionElement )
        this.tempElement.appendChild( this.cancelElement )

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
        this.groundElement.remove()
        return this
    }
}