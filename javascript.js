const display = document.querySelector('.textBox')

const numPad = ['num1','num2','num3','num4','num5','num6','num7','num8','num9','num0'];
const operatorArr = ['add', 'subtract', 'divide', 'multiply', 'clear', 'enter']
const valueMod = ['numDec', 'numNeg']
const decCheckOne = [];
const decCheckTwo = [];

const numObj = {
    numOne: [],
    numTwo: [],
    opPick: [],
    numStatus: ['first'],
    chainOp: [],
    decCheck: [],
    answer: [],
    negCheck: []
}

valueMod.forEach(modCheck);
numPad.forEach(numListen);
operatorArr.forEach(opListen);

function opListen(){
    for (let i = 0; i < operatorArr.length; i++){
    const opChoice = document.querySelector(`#${operatorArr[i]}`);
    opChoice.addEventListener('click', opSelect);
    }
}

function numListen(){
    for(let i = 0; i < numPad.length; i++){
        const currentNum = document.querySelector(`.${numPad[i]}`);
        currentNum.addEventListener('click',logNum)
    }
}

function modCheck(){
    for(let i = 0; i < valueMod.length; i++){
        const mod = document.querySelector(`#${valueMod[i]}`);
        mod.addEventListener('click', logNum)
    }
}

function logNum(){
    let numSelect = this.innerHTML;
    if (numObj.numStatus == 'first' && numObj.numOne[0] == undefined && numSelect != '.' && numSelect != '(-)'){
        console.log(numObj.numOne[0])
        console.log('huh2')
        numObj.numOne[0] = numSelect;
        display.innerHTML = numObj.numOne;
        return
    }

    else if (numObj.numStatus == 'first' && numObj.numOne[0] != undefined 
    && numObj.numOne.length < 13 && numSelect != '.' && numSelect != '(-)'
    ){
        console.log('huh3')
        let currentNum = numObj.numOne[0]
        numObj.numOne[0] = (`${currentNum}` + numSelect)
        display.innerHTML = numObj.numOne;
        return 
    }

    else if (numObj.numStatus == 'second' && numObj.numTwo[0] == undefined 
    && numSelect != '.' && numSelect != '(-)'){
        console.log('huh4')
        numObj.numTwo[0] = numSelect
        display.innerHTML = numObj.numTwo;
        return 
    }

    else if (numObj.numStatus == 'second' && numObj.numTwo[0] != undefined 
    && numObj.numTwo.length < 13 && numSelect != '.' && numSelect != '(-)'
    ){
        console.log('huh5')
        let currentNum = numObj.numTwo[0]
        numObj.numTwo[0] = (`${currentNum}` + numSelect)
        display.innerHTML = numObj.numTwo;
        return 
    }

    else if (numObj.numStatus == 'first' && numSelect == '.' 
    && numObj.decCheck != 'true' && numObj.numOne.length != 0
    ){
        console.log('huh6')
        let currentNum = numObj.numOne[0]
        numObj.numOne[0] = (`${currentNum}` + numSelect)
        display.innerHTML = numObj.numOne;
        numObj.decCheck[0] = 'true'
        return 
    }

    else if (numObj.numStatus == 'second' && numSelect == '.' 
    && numObj.decCheck != 'true' && numObj.numTwo.length != 0
    ){
        console.log('huh7')
        let currentNum = numObj.numTwo[0]
        numObj.numTwo[0] = (`${currentNum}` + numSelect)
        display.innerHTML = numObj.numTwo;
        numObj.decCheck[0] = 'true'
        return
    }

    else if (numObj.numStatus == 'first' && numSelect == '(-)' 
    && numObj.negCheck != 'true' && numObj.numOne.length != 0
    ){
        console.log('huh8')
        let currentNum = numObj.numOne[0]
        numObj.numOne[0] = ('-' + `${currentNum}`)
        display.innerHTML = numObj.numOne;
        numObj.negCheck[0] = 'true'
        return 
    }

    else if (numObj.numStatus == 'second' && numSelect == '(-)' 
    && numObj.negCheck != 'true' && numObj.numTwo.length != 0
    ){
        console.log('huh9')
        let currentNum = numObj.numTwo[0]
        numObj.numTwo[0] = ('-' + `${currentNum}`)
        display.innerHTML = numObj.numTwo;
        numObj.negCheck[0] = 'true'
        return
    }
    
}

function decCheck1(){
let numCombo1 = numObj.numOne[0]
if (numCombo1 == undefined){
    return
}
    for (let i = 0; i < numCombo1.length; i++){
        decCheckOne.push(numCombo1.charAt(i))
    }
}

function decCheck2(){
    let numCombo2 = numObj.numTwo[0]
    if (numCombo2 == undefined){
        return
    }
    else
        for (let i = 0; i < numCombo2.length; i++){
            decCheckTwo.push(numCombo2.charAt(i))
        }
    }

function opSelect(){
    decCheck1()
    decCheck2()
    let decOne = (decCheckOne.length - 1)
    let decTwo = (decCheckTwo.length - 1)
    let opPicks = this.innerHTML;
    if (opPicks == 'C'){
        clearButton()
        display.innerHTML = ''
        return
    }
    else if(decCheckOne[decOne] == '.' || decCheckTwo[decTwo] == '.'){
        return console.log('error')
    }
    else if(numObj.numOne.length < 1){
        return display.innerHTML = 'Empty!'
    }

    if(numObj.numOne.length > 0 && numObj.numTwo.length < 1 && numObj.numStatus == 'second'){
        return console.log('Empty!')
    }

    else if(numObj.numStatus == 'second' && numObj.numTwo.length > 0 && opPicks != '='){
        console.log('switch1st')
        numObj.chainOp[0] = 'true'
        numObj.opPick[0] = opPicks
        numObj.numStatus[0] = 'first'
        numObj.decCheck = 'false'
        numObj.negCheck = 'false'
        console.log(numObj.numOne, numObj.numTwo)
        runOperation()
        return 
    }

    else if(numObj.numStatus == 'first' && numObj.numOne.length > 0 && numObj.chainOp != 'true' && opPicks != '='){
        console.log('switch2nd')
        numObj.opPick[0] = opPicks
        numObj.numStatus[0] = 'second'
        numObj.decCheck = 'false'
        numObj.negCheck = 'false'
        return
    }
    else if(numObj.numStatus == 'first' && numObj.numOne.length > 0 & numObj.chainOp == 'true' && opPicks != '='){
        console.log('switch2nd')
        numObj.opPick[0] = opPicks;
        numObj.numStatus[0] = 'second'
        numObj.decCheck = 'false'
        numObj.negCheck = 'false'
        return
    }
    else if(numObj.numStatus == 'second' && numObj.numTwo.length > 0 && opPicks == '='){
        console.log('enter')
        runOperation()
    }
}

function clearButton(){
    numObj.numOne[0] = undefined;
    numObj.numTwo[0] =  undefined;
    numObj.opPick[0] = [];
    numObj.decCheck[0] = 'false';
    numObj.negCheck[0] = 'false';
    numObj.numStatus[0] = 'first';
}

function clearSecond(){
    return numObj.numTwo[0] = undefined;
}

function runOperation(){
    const first = parseFloat(numObj.numOne[0]);
    const second = parseFloat(numObj.numTwo[0]);
    const op = numObj.opPick[0];
    console.log(first, second, op)

    if (op == '+'){
        let answer = (first + second)
        console.log(answer)
        display.innerHTML = answer
        numObj.numStatus[0] = 'second'
        clearSecond()
        return numObj.numOne[0] = answer
    }
    else if (op == '-'){
        let answer = (first - second)
        console.log(answer)
        display.innerHTML = answer
        numObj.numStatus[0] = 'second'
        clearSecond()
        return numObj.numOne[0] = answer
    }
    else if (op == '×'){
        let answer = (first * second)
        console.log(answer)
        display.innerHTML = answer
        numObj.numStatus[0] = 'second'
        clearSecond()
        return numObj.numOne[0] = answer
    }
    else if (op == '÷'){
        let answer = (first / second)
        console.log(answer)
        display.innerHTML = answer
        numObj.numStatus[0] = 'second'
        clearSecond()
        return numObj.numOne[0] = answer
    }
}

