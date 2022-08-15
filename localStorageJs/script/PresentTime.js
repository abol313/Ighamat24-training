class PresentTime{
    
    enterTime
    exitTime
    submitDate
    
    tempElement
    enterElement
    exitElement
    submitElement

    constructor(enterTime, exitTime){
        this.enterTime = enterTime
        this.exitTime = exitTime
        this.submitDate = new Date()
    }

    get enterTime(){
        return this.enterTime
    }
    
    get exitTime(){
        return this.exitTime
    }

    makeElement(ulElement){
        // <li class="present-time">
        //     <p id="enter-time"></p>
        //     <p id="exit-time"></p>
        //     <p id="submit-time"></p>
        // </li>


        //Create elements
        this.tempElement = document.createElement('li')
        this.enterElement = document.createElement('p')
        this.exitElement = document.createElement('p')
        this.submitElement = document.createElement('p')

        //Name styles the elements
        this.tempElement.classList.add('present-time')
        this.enterElement.classList.add('enter-time')
        this.exitElement.classList.add('exit-time')
        this.submitElement.classList.add('submit-time')

        //Fill the time elements
        this.enterElement.innerText = this.enterTime
        this.exitElement.innerText = this.exitTime
        this.submitElement.innerText = this.submitTime

        //Pass children on the template element
        this.tempElement.appendChild( this.enterElement )
        this.tempElement.appendChild( this.exitElement )
        this.tempElement.appendChild( this.submitElement )

        //Append the create <li> to the given <ul>
        ulElement.appendChild( this.tempElement )
    }

    get tempElement(){
        return this.tempElement
    }

    
}