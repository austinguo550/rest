
var qIds = ["q-age", "q-state", "q-money-on-estate-planning", "q-assets-list", "q-marital-status", "q-if-include-kids",
    "q-if-kids-have-disabilities", "q-assets-net-worth", "q-concerns-list"];
//list of all question elements' ids

window.onload = function () {
    initializeQs();
};
function getqCurIndex() {
    var qCurIndex = sessionStorage.getItem("qCurIndex");
    if (qCurIndex == null) {
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


    if (qIds[qCurIndex] == "q-age") {
        //age question
        var age = getNumberInputUnderQ(qCurIndex);
        sessionStorage.setItem('age', age);
    }
    else if (qIds[qCurIndex] == "q-state") {
        //state question
        var state = getSelectInputUnderQ(qCurIndex);
        sessionStorage.setItem('state', state);
    }
    else if (qIds[qCurIndex] == "q-money-on-estate-planning") {
        //money on estate planning question
        var moneyOnEstatePlanning = getNumberInputUnderQ(qCurIndex);
        sessionStorage.setItem('money-on-estate-planning', moneyOnEstatePlanning);
    }
    else if (qIds[qCurIndex] == 'q-assets-list') {
        //assets list question
        var assetsList = getCheckedListInputUnderQ(qCurIndex);

        //retrieve list, store as JSON
        sessionStorage.setItem("assets-list", JSON.stringify(assetsList));
    }
    else if (qIds[qCurIndex] == 'q-marital-status') {
        //assets list question
        var maritalStatus = getSelectInputUnderQ(qCurIndex);
        sessionStorage.setItem('marital-status', maritalStatus);
        if (maritalStatus == 'engaged' || maritalStatus == 'single') {
            //if engaged or single, skip over two questions
            qNextIndex = parseInt(qCurIndex, 10) + 3;
        }
    }
    else if (qIds[qCurIndex] == "q-if-include-kids") {
        var ifIncludeKids = getRadioButtonInputUnderQ(qCurIndex);
        sessionStorage.setItem('if-include-kids', ifIncludeKids);

    }
    else if (qIds[qCurIndex] == "q-if-kids-have-disabilities") {
        var ifKidsHaveDisabilities = getRadioButtonInputUnderQ(qCurIndex);
        sessionStorage.setItem('if-kids-have-disabilities', ifKidsHaveDisabilities);

    }
    else if (qIds[qCurIndex] == 'q-assets-net-worth') {
        var assetsNetWorth = getRadioButtonInputUnderQ(qCurIndex);
        sessionStorage.setItem('assets-net-worth', assetsNetWorth);

    }
    else if (qIds[qCurIndex] == 'q-concerns-list') {
        //assets list question
        var concernsList = getCheckedListInputUnderQ(qCurIndex);

        //retrieve list, store as JSON
        sessionStorage.setItem("concerns-list", JSON.stringify(concernsList));

    }
    if (qNextIndex >= qIds.length) {
        //reached last question, switch to results
        location.href = 'decision_result.html';
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