import PresentTime from './PresentTime'

const presentTimeUlEl = document.querySelector('main .present-time-container .present-time-ul')
const inputEnterTimeEl = document.querySelector('form #enter_time')
const inputExitTimeEl = document.querySelector('form #exit_time')
const submitButton = document.querySelector('form #submit_present_time')

submitButton.addEventListener('click', submitPresentTime)

function submitPresentTime(){
    let presentTime = new PresentTime(
        inputEnterTimeEl.value,
        inputExitTimeEl.value
    )

    presentTime.makeElement(presentTimeUlEl)

    console.log(presentTime)
}