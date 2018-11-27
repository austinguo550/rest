window.onload = function() {
    makeRecommendation();
};
function makeRecommendation() {
    var recommendation = 'will'; // defaults to will
    var talkToLawyer = false;
    //read data from sessionStorage
    var assetsNetWorth = sessionStorage.getItem('assets-net-worth');
    var maritalStatus = sessionStorage.getItem('marital-status');
    var assetsList = JSON.parse(sessionStorage.getItem('assets-list'));
    var ifIncludeKids = sessionStorage.getItem('if-include-kids');
    var concernsList = JSON.parse(sessionStorage.getItem('concerns-list'));

    //parse data if necessary
    var hasProperty = assetsList.includes('property'); //if property is in assets list
    ifIncludeKids = ifIncludeKids == "yes";

    if (ifIncludeKids || hasProperty) {
        //In any case with kids or property, recommend a trust.
        recommendation = 'trust';
    }
    else if (maritalStatus == 'single' && assetsNetWorth == '0-250000') {
        //If single with less than $250,000 assets, and no property, recommend a will 
        recommendation = 'will';
    }
    else if (maritalStatus == 'single' || maritalStatus == 'married' || maritalStatus == 'divorced' || maritalStatus == 'remarried') {
        //If single, married, divorced, or remarried 
        if (ifIncludeKids === false && hasProperty === false && assetsNetWorth == '250000-500000') {
            //NO KIDS, and NO PROPERTY, and with $250,000 - $500,000 in assets
            if (concernsList.length > 0) {
                //If they checked any of the concerns, say a trust might be best for their situation but recommend talking to a lawyer for more information.
                recommendation = 'trust';
                talkToLawyer = true;
            }
            else {  
                //If not, recommend a will but also recommend talking with a lawyer for more information.
                recommendation = 'will';
                talkToLawyer = true;
            }
        }
  
    }


    //get text for rendering
    var resultHeaderText = 'You should create a ' + recommendation + '.';
    var resultExplanationText = makeResultExplanation(recommendation, talkToLawyer);
    var callToActionBtnText = "Create my " + recommendation;

    //get the components by id
    var resultExplanation = document.getElementById("result-explanation");
    var resultHeader = document.getElementById("result-header");
    var resultIcon = document.getElementById("result-icon");
    var callToActionBtn = document.getElementById("call-to-action-btn");
    
    //render the components with text
    resultHeader.textContent = resultHeaderText;
    resultExplanation.innerText = resultExplanationText;
    callToActionBtn.innerText = callToActionBtnText;
    resultIcon.innerText = recommendation;

    //set call to action links
    if(recommendation == 'trust'){
        callToActionBtn.href = 'trust.html';
    }
    else if (recommendation == 'will'){
        callToActionBtn.href = '#'; //page to will creation flow
    }
}

function makeResultExplanation(recommendation, talkToLawyer) {
    var msg = '';
    if (recommendation == 'will' && talkToLawyer == false) {
        msg = 'A will will help your loved ones. Not only can a will legally protect your spouse, children, and assets, it can also spell out exactly how you would like things handled after you have passed on.'
    }
    else if (recommendation == 'will' && talkToLawyer == true) {
        msg = 'Based on your situation, a will will most likely help. Please also consult a lawyer for more info.'
    }
    else if (recommendation == 'trust' && talkToLawyer == false){
        msg = 'A trust will help your loved ones. Trusts can help you manage your property and assets, make sure they are distributed after your death according to your wishes, and save your family money, time and paperwork.'
    }
    else if (recommendation == 'trust' && talkToLawyer == true){
        msg = 'Based on your situation, a trust will most likely help. Please also consult a lawyer for more info.'
    }
    return msg;
}