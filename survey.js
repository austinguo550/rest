
var qIds = ["q-name", "q-age", "q-state"];
let surveyCompleted = "surveyCompleted";
//list of all question elements' ids

window.onload = function () {
    if (sessionStorage.getItem("survey") !== null) {
        surveyCompletedRedirect();
    }
    else {
        initializeQs();
    }
};

function surveyCompletedRedirect() {
    fadeIn(document.getElementById(surveyCompleted));
}

function getqCurIndex() {
    var qCurIndex = sessionStorage.getItem("qCurIndex");
    if (qCurIndex === null) {
        //first time starting the page
        qCurIndex = 0;
    }
    return qCurIndex;
}
function initializeQs() {
    //only render the current element
    enterQ(getqCurIndex());
}
function nextBtn(elem) {
    //exit current question element
    var qCurIndex = getqCurIndex();
    exitQ(qCurIndex);
    var qNextIndex = parseInt(qCurIndex) + 1;

    if (qIds[qCurIndex] == "q-name") {
        //name question
        // fetch survey object
        let survey = JSON.parse(sessionStorage.getItem('survey'));
        console.log(survey);
        if (survey === null) {
            survey = new Object();
        }
        if (survey[qIds[qCurIndex]] === undefined) {
            var name = document.getElementById('q-name-input').value;
            console.log(name);
            // set value
            survey['q-name'] = name;
            sessionStorage.setItem('survey', JSON.stringify(survey));
        }
        
    }
    else if (qIds[qCurIndex] == "q-age") {
        //age question
        let survey = JSON.parse(sessionStorage.getItem('survey'));
        console.log(survey);
        if (survey === null) {
            survey = new Object();
        }
        if (survey[qIds[qCurIndex]] === undefined) {
            var age = getNumberInputUnderQ(qCurIndex);
            // set value
            survey['q-age'] = age;
            sessionStorage.setItem('survey', JSON.stringify(survey));
        }
        
    }
    else if (qIds[qCurIndex] == "q-state") {
        //state question
        let survey = JSON.parse(sessionStorage.getItem('survey'));
        console.log(survey);
        if (survey === null) {
            survey = new Object();
        }
        if (survey[qIds[qCurIndex]] === undefined) {
            var state = getSelectInputUnderQ(qCurIndex);
            // set value
            survey['q-state'] = state;
            sessionStorage.setItem('survey', JSON.stringify(survey));
        }
        
    }
    if (qNextIndex >= qIds.length) {
        //reached last question, switch to results
        location.href = 'action_selection.html';
        return;
    }
    
    //enter next question element
    enterQ(qNextIndex);
    sessionStorage.setItem('qCurIndex', qNextIndex);
}


function getNumberInputUnderQ(qCurIndex) {
    //find the 1st element of <input> tag under the question div and return its value as a number
    var qId = qIds[qCurIndex];
    var inputForm = document.getElementById(qId).getElementsByTagName('input').item(0);
    var inputNum = parseInt(inputForm.value, 10);
    return inputNum;
}
function getSelectInputUnderQ(qCurIndex) {
    //find the 1st element of <select> tag under the question div and return its value as a string
    var qId = qIds[qCurIndex];
    var inputForm = document.getElementById(qId).getElementsByTagName('select').item(0);
    var inputStr = inputForm.options[inputForm.selectedIndex].value;
    return inputStr;
}
function getCheckedListInputUnderQ(qCurIndex) {
    //find all the checkbox inputs under teh question div and return the checked elements' ids as a list of strings
    var qId = qIds[qCurIndex];
    var inputForms = document.querySelectorAll('#' + qId + ' input:checked');
    var inputStrs = Array.prototype.map.call(inputForms, function (el, i) {
        return el.id;
    });
    return inputStrs;
}
function getRadioButtonInputUnderQ(qCurIndex) {
    //find all the radio inputs under the question div and return the radio element's id that was checked
    var qId = qIds[qCurIndex];
    var radioForms = document.getElementById(qId).getElementsByClassName('active');
    return radioForms[0].children[0].value;
    for (var i = 0, length = radioForms.length; i < length; i++) {
        if (radioForms[i].checked) {
            return radioForms[i].value;
        }
    }
    return "";
}
function enterQ(qCurIndex) {
    //render in a question
    var qId = qIds[qCurIndex];
    fadeIn(document.getElementById(qId));
    // document.getElementById(qId).style.display = "block";
}
function exitQ(qCurIndex) {
    //render out a question
    var qId = qIds[qCurIndex];
    document.getElementById(qId).style.display = "none";
    // fadeOut(document.getElementById(qId));
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}
function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
}