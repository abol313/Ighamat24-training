// alert("hello!")

const datepickers = []

const weekDays = [
    'Sat',
    'Sun',
    'Mon',
    'Tue',
    'Wen',
    'Thu',
    'Fri',
]

const months = [
    'January',
    'February',
    'March',
    
    'April',
    'May',
    'June',

    'July',
    'August',
    'Sepetember',

    'October',
    'November',
    'December',
]

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


    renderContent(datepicker)


    chooseDayTab(datepicker)
}

function renderContent(datepicker, items = null, refresh = true){
    if(refresh){
        datepicker.contentElement.innerHTML = ""
        if(!items){
            items = [];

            switch(datepicker.mode){
                case 'year':
                    for(let i=1300; i<=1500; i++)
                        items.push([i,i])
                    break;
                    
                case 'month':
                    for(let i=0; i<months.length; i++)
                        items.push([months[i], i])
                    break;
                    
                case 'day':
                    
                    for(let i = -getFirstWeekDayOfMonth(datepicker.date, datepicker)+1; i<=getDaysNo(datepicker.date, datepicker); i++)
                        items.push([i,i])

                    break;
                    
            }
        }

        datepicker.contentElement.classList.remove('items-year', 'items-month', 'items-day')
        datepicker.contentElement.classList.add('items-'+datepicker.mode)

        console.log(datepicker)

        datepicker.yearElement.classList.remove('selected')
        datepicker.monthElement.classList.remove('selected')
        datepicker.dayElement.classList.remove('selected')

        if(datepicker.mode === "day"){
            let weekDaysEl = document.createElement('div')
            weekDaysEl.classList.add('week-days')

            for(let weekDay of weekDays)
                weekDaysEl.innerHTML += `<div class="week-day">${weekDay}</div>`
            
            datepicker.contentElement.appendChild(weekDaysEl)
        }

        datepicker.contentElement.innerHTML += items.map(v => getItemTemp(v[0], v[1], false, datepicker)).join('')
        
        listenItemsToClick(datepicker)
        bootItem(datepicker)
    }
    passDateOnInput(datepicker.inputElement, datepicker.date)
    return datepicker.contentElement.innerHTML

}

function passDateOnInput(input, date){
    let m = moment(date)
    input.value = `${m.jYear()} / ${m.jMonth()+1} / ${m.jDate()}`
}

function getItemTemp(content, value, isSelected=false, datepicker = null){
    return `<div class="item ${isSelected?'selected':''} ${datepicker.mode=="day" && content<=0 ? 'invisible':''}" value="${value}">${content}</div>`
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
        itemsTemp += getItemTemp(i,i)

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
    let m = moment(date)
    console.log('days no:',moment.jDaysInMonth(m.jYear(), m.jMonth()))
    return moment.jDaysInMonth(m.jYear(), m.jMonth())
}

function getFirstWeekDayOfMonth(date, datepicker){
    // debugger
    let m = moment(date)
    m.locale('fa')
    return m.startOf('month').weekday()
}

function chooseYear(year, datepicker, isBasedOnJalali){
    if(isBasedOnJalali){
        // debugger

        let m = getDatepickerMoment(datepicker)
        m.locale('fa')
        m.year(+year)
        m.locale('en')
        datepicker.date.setYear(m.year())
        datepicker.date.setMonth(m.month())
        datepicker.date.setDate(m.date())
        return
    }
    datepicker.date.setYear(year)
    
}

function chooseMonth(month, datepicker, isBasedOnJalali){
    if(isBasedOnJalali){
        // debugger
        let m = getDatepickerMoment(datepicker)
        m.locale('fa')
        m.month(+month)
        m.locale('en')
        datepicker.date.setMonth(m.month())
        datepicker.date.setDate(m.date())
        return
    }
    datepicker.date.setMonth(month)
}

function chooseDay(day, datepicker, isBasedOnJalali){
    // debugger
    if(isBasedOnJalali){
        let m = getDatepickerMoment(datepicker)
        m.locale('fa')
        m.date(+day)
        m.locale('en')
        datepicker.date.setDate(m.date())
        return
    }
    datepicker.date.setDate(day)
}

function getDatepickerMoment(datepicker){
    let m = moment()
    m.year(datepicker.date.getFullYear())
    m.month(datepicker.date.getMonth())
    m.date(datepicker.date.getDate())
    return m
}

function chooseYearTab(datepicker){
    datepicker.mode = 'year'
    renderContent(datepicker)
    datepicker.yearElement.classList.add('selected')
}

function chooseMonthTab(datepicker){
    datepicker.mode = 'month'
    renderContent(datepicker)
    datepicker.monthElement.classList.add('selected')

}    

function chooseDayTab(datepicker){
    datepicker.mode = 'day'
    renderContent(datepicker)
    datepicker.dayElement.classList.add('selected')

}

function listenItemsToClick(datepicker){
    datepicker.contentElement.querySelectorAll('.item')
    .forEach(e=>{
        e.addEventListener('click',()=>{
            unselectItems(datepicker)
            chooseItem(e, datepicker, true)

        })
    })
}
function unselectItems(datepicker){
    datepicker.contentElement.querySelectorAll('.item')
        .forEach( e => e.classList.remove('selected'))
}

function bootItem(datepicker){
    let m = getDatepickerMoment(datepicker)
    m.locale('fa')
    const value = {
        year: m.year(),
        month: m.month(),
        day: m.date(),

    }
    datepicker.contentElement.querySelectorAll('.item')
        .forEach(e=>{
                if(e.getAttribute('value')==value[datepicker.mode])
                    chooseItem(e, datepicker, true)
            }
        )
}

function chooseItem(item, datepicker, isBaseOnJalali){
    const choose = {
        year: chooseYear,
        month: chooseMonth,
        day: chooseDay,
    }

    // debugger
    console.log(item)
    choose[datepicker.mode](item.getAttribute('value'), datepicker, isBaseOnJalali)
    renderContent(datepicker, null,false);
    item.classList.add('selected')
}