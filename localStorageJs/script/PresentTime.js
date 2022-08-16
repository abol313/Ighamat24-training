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
        return this
    }
    
    getExitTime(){
        return this.exitTime
    }
    setExitTime(value){
        this.exitTime = value
        this.exitElement.innerText = this.exitTime
        return this
    }

    
    getSubmitDate(){
        return this.submitTime
    }
    setSubmitDate(date){
        this.submitDate = date
        this.submitElement.innerText = this.submitDate.getFullYear()+'/'+this.submitDate.getMonth()+'/'+this.submitDate.getDate()+' '+this.submitDate.getHours()+':'+this.submitDate.getMinutes()+':'+this.submitDate.getSeconds()
        return this
    }


    makeElement(tableElement){
        // <tr class="present-time">
        //     <td id="enter-time"></td>
        //     <td id="exit-time"></td>
        //     <td id="submit-time"></td>
        // </tr>

        //Create elements
        this.tempElement = document.createElement('tr')
        this.enterElement = document.createElement('td')
        this.exitElement = document.createElement('td')
        this.submitElement = document.createElement('td')

        //Name styles the elements
        this.tempElement.classList.add('present-time')
        this.enterElement.classList.add('enter-time')
        this.exitElement.classList.add('exit-time')
        this.submitElement.classList.add('submit-time')

        //Fill the time elements
        this.setEnterTime(this.enterTime)
        this.setExitTime(this.exitTime)
        this.setSubmitDate(this.submitDate)

        //Pass children on the template element
        this.tempElement.appendChild( this.enterElement )
        this.tempElement.appendChild( this.exitElement )
        this.tempElement.appendChild( this.submitElement )

        //Append the create <li> to the given <ul>
        let firstPresentTimeEl = tableElement.querySelector('.present-time')
        firstPresentTimeEl? firstPresentTimeEl.before( this.tempElement ) : tableElement.appendChild( this.tempElement )

        return this
    }

    getTempElement(){
        return this.tempElement
    }

}