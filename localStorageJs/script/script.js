import PresentTime from './PresentTime'

const presentTimeTableEl = document.querySelector('main .present-time-container .present-time-table')
const inputEnterTimeEl = document.querySelector('form #enter_time')
const inputExitTimeEl = document.querySelector('form #exit_time')
const submitButton = document.querySelector('form #submit_present_time')

submitButton.addEventListener('click', submitPresentTime)

storagePreparePresentTimes()

function submitPresentTime(){
    let presentTime = new PresentTime(
        inputEnterTimeEl.value,
        inputExitTimeEl.value
    )

    presentTime.makeElement(presentTimeTableEl)

    storagePushPresentTime(presentTime)
    console.log(presentTime)
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