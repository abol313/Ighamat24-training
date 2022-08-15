class PresentTime{
    
    enterTime
    exitTime
    submitDate
    
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


}