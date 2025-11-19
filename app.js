const day = Array.from(document.querySelector(".day").children);
const month = Array.from(document.querySelector(".month").children);
const year = Array.from(document.querySelector(".year").children);

const error = Array.from(document.querySelector(".error").children);

const button = document.querySelector(".btn button");

const result = Array.from(document.querySelector(".result").children);

var DD = null;
var MM = null;
var YY = null;

function removeErrClass(ele,errField) {
    ele[0].classList.remove('errColor');
    ele[1].classList.remove('errBorder'); 

    errField.textContent = '';
}

// Day input func(){}
day[1].addEventListener("input",()=>{
    DD = parseInt(day[1].value);
    removeErrClass(day,error[0]);
    
    if(day[1].value === '' || day[1].value === 'e'){
        day[1].value = '';
    }
    if(DD === 0){
        day[1].value = '';
    }
    if(DD > 0 && DD <= 9){
        day[1].value = "0"+DD;
    }
    if(DD >= 10){
        day[1].value = DD;
    }
    if(DD > 99){
        day[1].value = ""+parseInt(DD/10);
    }
})

// Month input func(){}
month[1].addEventListener("input",()=>{
    MM = parseInt(month[1].value);
    removeErrClass(month,error[1]);
    
    if(month[1].value === '' || month[1].value === 'e'){
        month[1].value = '';
    }
    if(MM === 0){
        month[1].value = '';
    }
    if(MM > 0 && MM <= 9){
        month[1].value = "0"+MM;
    }
    if(MM >= 10){
        month[1].value = MM;
    }
    if(MM > 99){
        month[1].value = ""+parseInt(MM/10);
    }
})

// Year input func(){}
year[1].addEventListener("input",()=>{
    YY = parseInt(year[1].value);
    removeErrClass(year,error[2]);
    
    if(year[1].value === '' || year[1].value === 'e'){
        year[1].value = '';
    }
    if(YY === 0){
        year[1].value = '';
    }
    if(YY > 0 && YY <= 9){
        year[1].value = "000"+YY;
    }
    if(YY >= 10 && YY <= 99){
        year[1].value = "00"+YY;
    }
    if(YY >= 100 && YY <= 999){
        year[1].value = "0"+YY;
    }
    if(YY > 999){
        year[1].value = YY;
    }
    if(YY > 9999){
        year[1].value = ""+parseInt(YY/10);
    }
})


function invaildInput(ele) {
    ele[0].classList.add('errColor');
    ele[1].classList.add('errBorder');

    //reseting result;
    result[2].children[0].textContent = '--';
    result[1].children[0].textContent = '--';
    result[0].children[0].textContent = '--';
}

button.addEventListener("click",async()=>{
    DD = parseInt(day[1].value);
    MM = parseInt(month[1].value);
    YY = parseInt(year[1].value);

    const date = new Date();
    let curDD = date.getDate();
    let curMM = date.getMonth()+1;
    let curYY = date.getFullYear();

    let validDate = true;

    // Empty field...
    if(day[1].value === ''){
        error[0].textContent = "This field is required";
        invaildInput(day);
        validDate = false;
    }
    
    if(month[1].value === ''){
        error[1].textContent = "This field is required";
        invaildInput(month);
        validDate = false;
    }
    
    if(year[1].value === ''){
        error[2].textContent = "This field is required";
        invaildInput(year);
        validDate = false;
    }
    
    //Date Out of Range.......
    const enteredDate = new Date(YY, MM - 1, DD);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (enteredDate > today) {
        error[0].textContent = "";
        error[1].textContent = "";
        error[2].textContent = "Must be in the past";
        invaildInput(day);
        invaildInput(month);
        invaildInput(year);
        validDate = false;
    }

    //Not a valid date.....
    if (!isValidDate(DD, MM, YY)) {
        error[0].textContent = "Must be a valid date";
        error[1].textContent = "";
        error[2].textContent = "";
        invaildInput(day);
        invaildInput(month);
        invaildInput(year);
        validDate = false;
    }
    
    console.log(validDate);

    if(validDate){
        let years = curYY - YY;
        let months = curMM - MM;
        let days = curDD - DD;

        if (days < 0) {
            months--;
            const prevMonth = new Date(curYY, curMM - 1, 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        for (let i = 0; i <= years; i++) {
            result[0].children[0].textContent = i;
            await sleep();
        }
        for (let i = 0; i <= months; i++) {
            result[1].children[0].textContent = i;
            await sleep();
        }
        for (let i = 0; i <= days; i++) {
            result[2].children[0].textContent = i;
            await sleep();
        }
    }
})

function isValidDate(d, m, y) {
    if (isNaN(d) || isNaN(m) || isNaN(y)) {
        return false;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) {
        daysInMonth[1] = 29;
    }
    return m >= 1 && m <= 12 && d >= 1 && d <= daysInMonth[m - 1];
}

async function sleep(){
    return new Promise((resolve) => setTimeout(resolve,5));
}