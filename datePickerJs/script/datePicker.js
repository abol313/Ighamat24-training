alert("hello!")
const datepickers = []
// every datepicker known as one object literal
// {
//     element: //the element of date picker (abol-date-picker)
//     date: //the date of that
// }


//render for every element that has passed to its class `abol-date-picker`
function renderDatepicker(element){
    datepickers.push({
        element: element,
        date: new Date()
    })

    
}

function getTemplate(itemsNo){
    // <div class="abol-date-picker">
    //     <div class="tabs">
    //         <div class="tab year">
    //             <p>Year</p>
    //         </div>
    //         <div class="tab month">
    //             <p>Month</p>
    //         </div>
    //         <div class="tab day">
    //             <p>Day</p>
    //         </div>
    //     </div>

    //     <div class="items">
    //         <div class="item"></div>*n
    //     </div>
    // </div>
    return `
        <div class="tabs">
            <div class="tab year">
                <p>Year</p>
            </div>
            <div class="tab month">
                <p>Month</p>
            </div>
            <div class="tab day">
                <p>Day</p>
            </div>
        </div>

        <div class="items">
            ${ '<div class="item"></div>'.repeat(itemsNo) }
        </div>
    `;
}


//return the number of days of now month
function getDaysNo(date, datepicker){

}

function chooseDay(day, datepicker){

}

function chooseMonth(month, datepicker){

}


function chooseYearTab(datepicker){

}

function chooseMonthTab(datepicker){

}    

function chooseDayTab(datepicker){

}

