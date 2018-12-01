
var qIds = ["screen1", "screen2", "screen3", "screen4", "screen5"];
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

function yesOrNoBtn(elem, screen) {
    //exit current question element
    var qCurIndex = getqCurIndex();

    let yes = 'yes-' + screen + '-q1'
    let no = 'no-' + screen + '-q1'
    let q2 = screen + '-q2'
    let card1 = 'card-' + screen + '-q1'
    let card2 = 'card-' + screen + '-q2'

    //console.log(elem.id == "yes-q1-screen1");
    if (elem.id == yes) {
        console.log("hello")
        elem.style.opacity = 1;
        document.getElementById(no).style.opacity = 0.2;
        fadeOut(document.getElementById(card1))
        fadeIn(document.getElementById(q2))

        //draw new card
        fadeIn(document.getElementById(card2))
        google.charts.load('current', {'packages':['corechart']});
        if(screen == 'screen2'){
            google.charts.setOnLoadCallback(drawGraphScreen2Q2);
        }
        else if (screen == 'screen3'){
            google.charts.setOnLoadCallback(drawGraphScreen3Q2);
        }
        

    }
    else if (elem.id == no) {

        document.getElementById(yes).style.opacity = 0.2;
        document.getElementById(no).style.opacity = 1;
        fadeOut(document.getElementById(q2))
        fadeOut(document.getElementById(card2))

        fadeIn(document.getElementById(card1))
        google.charts.load('current', {'packages':['corechart']});
        if(screen == 'screen2'){
            google.charts.setOnLoadCallback(drawGraphScreen2Q1);
        }
        else if (screen == 'screen3'){
            google.charts.setOnLoadCallback(drawGraphScreen3Q1);
        }
        
    }
    // console.log("hello")
    // var input = getYesNoInputUnderQ(qCurIndex)
    // console.log(input)

}

function threeChoicesBtn(elem) {
    var qCurIndex = getqCurIndex();
    if (qIds[qCurIndex] == "screen2") {
        //age question
        //console.log(elem.id == "yes-q1-screen1");
        if (elem.id == "spouse-screen2-q2") {
            console.log(document.getElementById("no-screen2-q1").style)
            elem.style.opacity = 1;
            document.getElementById("descendants-screen2-q2").style.opacity = 0.2;
            document.getElementById("other-screen2-q2").style.opacity = 0.2;

            //fadeIn(document.getElementById("screen2-q2"))
            fadeOut(document.getElementById("screen2-q3"))


        }
        else if (elem.id == "descendants-screen2-q2") {
            elem.style.opacity = 1;
            document.getElementById("spouse-screen2-q2").style.opacity = 0.2;
            document.getElementById("other-screen2-q2").style.opacity = 0.2;
            //fadeOut(document.getElementById("screen2-q2"))
            fadeOut(document.getElementById("screen2-q3"))
        }
        else if (elem.id == "other-screen2-q2") {
            elem.style.opacity = 1;
            document.getElementById("descendants-screen2-q2").style.opacity = 0.2;
            document.getElementById("spouse-screen2-q2").style.opacity = 0.2;

            fadeIn(document.getElementById("screen2-q3"))
        }
        // console.log("hello")
        // var input = getYesNoInputUnderQ(qCurIndex)
        // console.log(input)
    }
    if (qIds[qCurIndex] == "screen3") {
        //age question
        //console.log(elem.id == "yes-q1-screen1");
        if (elem.id == "spouse-screen3-q2") {
            console.log(document.getElementById("no-screen3-q1").style)
            elem.style.opacity = 1;
            document.getElementById("descendants-screen3-q2").style.opacity = 0.2;
            document.getElementById("other-screen3-q2").style.opacity = 0.2;

            //fadeIn(document.getElementById("screen3-q2"))
            fadeOut(document.getElementById("screen3-q3"))


        }
        else if (elem.id == "descendants-screen3-q2") {
            elem.style.opacity = 1;
            document.getElementById("spouse-screen3-q2").style.opacity = 0.2;
            document.getElementById("other-screen3-q2").style.opacity = 0.2;
            //fadeOut(document.getElementById("screen3-q2"))
            fadeOut(document.getElementById("screen3-q3"))
        }
        else if (elem.id == "other-screen3-q2") {
            elem.style.opacity = 1;
            document.getElementById("descendants-screen3-q2").style.opacity = 0.2;
            document.getElementById("spouse-screen3-q2").style.opacity = 0.2;

            fadeIn(document.getElementById("screen3-q3"))
        }
        // console.log("hello")
        // var input = getYesNoInputUnderQ(qCurIndex)
        // console.log(input)
    }
}

function nextBtn(elem) {
    //exit current question element
    var qCurIndex = getqCurIndex();
    exitQ(qCurIndex);
    var qNextIndex = parseInt(qCurIndex) + 1;

    if (qNextIndex >= qIds.length) {
        //reached last question, switch to results
        location.href = 'decision_result.html';
        return;
    }
    //enter next question element
    enterQ(qNextIndex);
    sessionStorage.setItem('qCurIndex', qNextIndex);
}

function getYesNoInputUnderQ(qCurIndex) {
    var qId = qIds[qCurIndex];
    var inputForm = document.getElementById(qId).getElementsByTagName('input').item(0);
    var inputNum = parseInt(inputForm.value, 10);
    return inputNum;
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

}
function enterQ(qCurIndex) {
    //render in a question
    var qId = qIds[qCurIndex];
    console.log(qId)
    
    fadeIn(document.getElementById(qId));
    if(qId == 'screen2'){
        fadeIn(document.getElementById('card-screen2-q1'))
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawGraphScreen2Q1);
    }
    else if (qId == 'screen3'){
        fadeIn(document.getElementById('card-screen3-q1'))
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawGraphScreen3Q1);
    }
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




///draw functions
function drawGraphScreen2Q1() {
    
    var data = google.visualization.arrayToDataTable([
    ['category', 'proportion'],
    ['residence in living trust', 0.5],
    ['other', 0.5],
  ]);
  
    // Optional; add a title and set the width and height of the chart
    var options = {'title':'', 'height':300, legend: { position: "none" },};
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('graph-screen2-q1'));
    chart.draw(data, options);
    
}
function drawGraphScreen2Q2(){
    var data = google.visualization.arrayToDataTable([
        ['Type', "Proportion",  { role: 'style' }],
        ['of people in first marriages chose Spouse', 0.9, '#b87333'],            // RGB value
        ['of re-married customers chose My Descendents', 0.9, 'silver'],            // English color name
        ['of customers do something different', 0.25, 'gold'], // CSS-style declaration
    ]);
    
    var chart = new google.visualization.BarChart(document.getElementById('graph-screen2-q2'));
    var options = {
        height:400,
        legend: { position: "none" },
    }
    chart.draw(data, options);

}

function drawGraphScreen3Q1() {
    
    var data = google.visualization.arrayToDataTable([
    ['category', 'proportion'],
    ['wills that include one of more of these', 0.85],
    ['other', 0.15],
  ]);
  
    // Optional; add a title and set the width and height of the chart
    var options = {'title':'', 'height':300, legend: { position: "none" },};
  
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('graph-screen3-q1'));
    chart.draw(data, options);
    
}