// alert("hello!")

const datepickers = []

document.querySelectorAll('.abol-date-picker')
    .forEach(e => {
        bootDatepicker(e)
    })


// every datepicker known as one object literal
// {
    // inputElement: inputElement,
    // tempElement: tempElement,
    // yearElement: tempElement.querySelector('.tabs .year'),
    // monthElement: tempElement.querySelector('.tabs .month'),
    // dayElement: tempElement.querySelector('.tabs .day'),
    // contentElement: tempElement.querySelector('.items'),
    // mode: 'year',
    // date: new Date()
// }


//render for every element [input] that has passed to its class `abol-date-picker`
function bootDatepicker(inputElement, index = null){
    const tempElement = getTemplateElement()
    inputElement.before(tempElement)
    const datepicker = {
        inputElement: inputElement,
        tempElement: tempElement,
        yearElement: tempElement.querySelector('.tabs .year'),
        monthElement: tempElement.querySelector('.tabs .month'),
        dayElement: tempElement.querySelector('.tabs .day'),
        contentElement: tempElement.querySelector('.items'),
        mode: 'year',
        date: new Date()
    }

    index = index || datepickers.push(datepicker)

    datepicker.yearElement.addEventListener('click', ()=>chooseYearTab(datepicker))
    datepicker.monthElement.addEventListener('click', ()=>chooseMonthTab(datepicker))
    datepicker.dayElement.addEventListener('click', ()=>chooseDayTab(datepicker))

    datepicker.contentElement.addEventListener('click', e => chooseItem(e.target.innerText ,datepicker))
    renderContent(datepicker)
}

function renderContent(datepicker, items = null){
    datepicker.contentElement.innerHTML = ""
    if(!items){
        switch(datepicker.mode){
            case 'year':
                items = [];
                for(let i=2000; i<=2040; i++)
                    items.push(i)
                break;
                
            case 'month':
                items = [1,2,3,4,5,6,7,8,9,10,11,12];
                break;
                
            case 'day':
                items = [];
                for(let i=1; i<=31; i++)
                    items.push(i)

                break;
                
        }
    }


    console.log(datepicker)

    passDateOnInput(datepicker.inputElement, datepicker.date)

    return datepicker.contentElement.innerHTML = items.map(v => getItemTemp(v)).join('')

}

function passDateOnInput(input, date){
    input.value = `${date.getUTCFullYear()} / ${date.getUTCMonth()} / ${date.getUTCDate()}`
}

function getItemTemp(innerText){
    return `<div class="item">${innerText}</div>`
}

function getTemplateElement(itemsNo){
    // <div class="abol-date-picker-temp">
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

    let itemsTemp = ''
    for(let i=0; i<itemsNo; i++)
        itemsTemp += getItemTemp(i)

    const temp = document.createElement('div')
    temp.classList.add('abol-date-picker-temp')
    temp.innerHTML = `
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
            ${ itemsTemp }
        </div>
    `;

    return temp;
}


//return the number of days of now month
function getDaysNo(date, datepicker){

}

function chooseYear(year, datepicker){
    datepicker.date.setYear(year)
}

function chooseMonth(month, datepicker){
    datepicker.date.setMonth(month)
}

function chooseDay(day, datepicker){
    datepicker.date.setDate(day)
}


function chooseYearTab(datepicker){
    datepicker.mode = 'year'
    renderContent(datepicker)
}

function chooseMonthTab(datepicker){
    datepicker.mode = 'month'
    renderContent(datepicker)
}    

function chooseDayTab(datepicker){
    datepicker.mode = 'day'
    renderContent(datepicker)
}

function chooseItem(item, datepicker){
    const choose = {
        year: chooseYear,
        month: chooseMonth,
        day: chooseDay,
    }

    // debugger
    choose[datepicker.mode](item, datepicker)
    renderContent(datepicker)
}