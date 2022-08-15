export default class PresentTime{
    static presentTimes = []

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
        PresentTime.presentTimes.push(this)
    }

    static getPresentTimes(){
        return presentTimes
    }

    getEnterTime(){
        return this.enterTime
    }
    setEnterTime(value){
        this.enterTime = value
        this.enterElement.innerText = this.enterTime
    }
    
    getExitTime(){
        return this.exitTime
    }
    setExitTime(value){
        this.exitTime = value
        this.exitElement.innerText = this.exitTime
    }

    
    getSubmitTime(){
        return this.submitTime
    }
    setSubmitTime(value){
        this.submitTime = value
        this.submitElement.innerText = this.submitTime
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
        this.submitElement.innerText = this.submitDate.getFullYear()+'/'+this.submitDate.getMonth()+'/'+this.submitDate.getDate()

        //Pass children on the template element
        this.tempElement.appendChild( this.enterElement )
        this.tempElement.appendChild( this.exitElement )
        this.tempElement.appendChild( this.submitElement )

        //Append the create <li> to the given <ul>
        ulElement.appendChild( this.tempElement )
    }

    getTempElement(){
        return this.tempElement
    }

}