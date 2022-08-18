import PresentTime from './PresentTime.js'
import Alert from './Alert.js'

const presentTimeTableEl = document.querySelector('main .present-time-container .present-time-table')
const inputEnterTimeEl = document.querySelector('form #enter_time')
const inputExitTimeEl = document.querySelector('form #exit_time')
const submitButton = document.querySelector('form #submit_present_time')
const clearButton = document.querySelector('form #clear_present_times')

submitButton.addEventListener('click', submitPresentTime)
clearButton.addEventListener('click', clearPresentTimes)

storagePreparePresentTimes()

// clearPresentTimes()
// makeNRandomlyPresentTimes(1000)

function submitPresentTime(){
    let enterTime = inputEnterTimeEl.value
    let exitTime = inputExitTimeEl.value

    let presentTime = new PresentTime(
        enterTime,
        exitTime
    )

    if(!presentTime.validateTimes((success, msg)=>{
        new Alert(
            msg.title,
            msg.description,
            'Ok',
            success? 'success':'danger'
        ).make().show();
    })) return ;

    presentTime.makeElement(presentTimeTableEl)

    storagePushPresentTime(presentTime)
    console.log(presentTime)
}

function clearPresentTimes(){
    window.localStorage.clear()
    window.location.reload()
}

function storagePreparePresentTimes(){
    // debugger
    let presentTimes = window.localStorage.getItem('presentTimes')
    if(!presentTimes)return false

    presentTimes = JSON.parse(presentTimes)

    for(let presentTime of presentTimes)
        new PresentTime(presentTime.enterTime, presentTime.exitTime)
            .makeElement(presentTimeTableEl)
            .setSubmitDate(new Date(presentTime.submitDate))
}

function storagePushPresentTime(presentTime){
    let presentTimes = window.localStorage.getItem('presentTimes')
    presentTimes = presentTimes ? JSON.parse(presentTimes) : []
    presentTimes.push(presentTime)
    window.localStorage.setItem('presentTimes', JSON.stringify(presentTimes))
}

function makeNRandomlyPresentTimes(number){
    for(let i=0; i<number; i++){
        const entryTime = makeRandomlyDate().toLocaleDateString('en-ZA')
        const exitTime = makeRandomlyDate().toLocaleDateString('en-ZA')

        let presentTime = new PresentTime(entryTime, exitTime)
        presentTime.makeElement(presentTimeTableEl)

        storagePushPresentTime(presentTime)
    } 
}

function makeRandomlyDate(){
    return new Date(parseInt(Math.random()*1000+1970), parseInt(Math.random()*12), parseInt(Math.random()*29))
}

// new Alert('The Danger Region', 'be sure bee sure besure!!!!!', 'Got it !', 'warning').make().show()