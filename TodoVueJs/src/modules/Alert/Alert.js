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
            success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM296 336h-16V248C280 234.8 269.3 224 256 224H224C210.8 224 200 234.8 200 248S210.8 272 224 272h8v64h-16C202.8 336 192 346.8 192 360S202.8 384 216 384h80c13.25 0 24-10.75 24-24S309.3 336 296 336zM256 192c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32S224 142.3 224 160C224 177.7 238.3 192 256 192z"/></svg>',
            warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/></svg>',
            danger: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>',
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