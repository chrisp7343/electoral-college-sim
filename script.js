var globaltime = -1;
var globalnumupdates = 0;


var globalshift = 0;
var globalnationalrvotes = 0;
var globalnationaldvotes = 0;
var revs = 0;
var devs = 0;

var nationalclicked = true;
var currentclickedstate = "";
var currentmapsetting = "calls";

var statesnotcounting = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
var statescounting = [];
var statescounted = [];
var calledfordems = [];
var calledforreps = [];

const stateFixedData = {
    "AL": {statename : "Alabama", electoralvotes: 9, expectedpopularvote: 2200000, expectedmargin: 30, starttime: 60, countingspeed: [1.1, 4]},
    "AK": {statename : "Alaska", electoralvotes: 3, expectedpopularvote: 400000, expectedmargin: 14, starttime: 360, countingspeed: [1, 1.5]},
    "AZ": {statename : "Arizona", electoralvotes: 11, expectedpopularvote: 3400000, expectedmargin: 3, starttime: 120, countingspeed: [1, 1.5]},
    "AR": {statename : "Arkansas", electoralvotes: 6, expectedpopularvote: 1200000, expectedmargin: 31, starttime: 90, countingspeed: [1.1, 4]},
    "CA": {statename : "California", electoralvotes: 54, expectedpopularvote: 15800000, expectedmargin: -21, starttime: 240, countingspeed: [1, 1.5]},
    "CO": {statename : "Colorado", electoralvotes: 10, expectedpopularvote: 3200000, expectedmargin: -11, starttime: 120, countingspeed: [1, 1.5]},
    "CT": {statename : "Connecticut", electoralvotes: 7, expectedpopularvote: 1800000, expectedmargin: -17, starttime: 60, countingspeed: [1.1, 3]},
    "DE": {statename : "Delaware", electoralvotes: 3, expectedpopularvote: 600000, expectedmargin: -16, starttime: 60, countingspeed: [1.1, 12]},
    "DC": {statename : "Washington DC", electoralvotes: 3, expectedpopularvote: 200000, expectedmargin: -82, starttime: 60, countingspeed: [1, 1.5]},
    "FL": {statename : "Florida", electoralvotes: 30, expectedpopularvote: 10800000, expectedmargin: 9, starttime: 60, countingspeed: [1.1, 12]},
    "GA": {statename : "Georgia", electoralvotes: 16, expectedpopularvote: 5200000, expectedmargin: 2, starttime: 0, countingspeed: [1.1, 3]},
    "HI": {statename : "Hawaii", electoralvotes: 4, expectedpopularvote: 600000, expectedmargin: -25, starttime: 300, countingspeed: [1, 2]},
    "ID": {statename : "Idaho", electoralvotes: 4, expectedpopularvote: 1000000, expectedmargin: 36, starttime: 240, countingspeed: [1.1, 3]},
    "IL": {statename : "Illinois", electoralvotes: 19, expectedpopularvote: 5600000, expectedmargin: -14, starttime: 60, countingspeed: [1, 2]},
    "IN": {statename : "Indiana", electoralvotes: 11, expectedpopularvote: 3000000, expectedmargin: 20, starttime: 0, countingspeed: [1, 2]},
    "IA": {statename : "Iowa", electoralvotes: 6, expectedpopularvote: 1600000, expectedmargin: 12, starttime: 120, countingspeed: [1.1, 6]},
    "KS": {statename : "Kansas", electoralvotes: 6, expectedpopularvote: 1400000, expectedmargin: 19, starttime: 120, countingspeed: [1.1, 4]},
    "KY": {statename : "Kentucky", electoralvotes: 8, expectedpopularvote: 2000000, expectedmargin: 31, starttime: 0, countingspeed: [1.1, 4]},
    "LA": {statename : "Louisiana", electoralvotes: 8, expectedpopularvote: 2000000, expectedmargin: 22, starttime: 120, countingspeed: [1.1, 4]},
    "ME": {statename : "Maine", electoralvotes: 4, expectedpopularvote: 800000, expectedmargin: -7, starttime: 60, countingspeed: [1, 2]},
    "MD": {statename : "Maryland", electoralvotes: 10, expectedpopularvote: 3000000, expectedmargin: -25, starttime: 60, countingspeed: [1, 1.5]},
    "MA": {statename : "Massachusetts", electoralvotes: 11, expectedpopularvote: 3400000, expectedmargin: -25, starttime: 60, countingspeed: [1, 2]},
    "MI": {statename : "Michigan", electoralvotes: 15, expectedpopularvote: 5600000, expectedmargin: -2, starttime: 120, countingspeed: [1, 2]},
    "MN": {statename : "Minnesota", electoralvotes: 10, expectedpopularvote: 3200000, expectedmargin: -7, starttime: 120, countingspeed: [1.1, 3]},
    "MS": {statename : "Mississippi", electoralvotes: 6, expectedpopularvote: 1200000, expectedmargin: 21, starttime: 60, countingspeed: [1, 2]},
    "MO": {statename : "Missouri", electoralvotes: 10, expectedpopularvote: 3000000, expectedmargin: 20, starttime: 60, countingspeed: [1.1, 4]},
    "MT": {statename : "Montana", electoralvotes: 4, expectedpopularvote: 600000, expectedmargin: 20, starttime: 180, countingspeed: [1, 2]},
    "NE": {statename : "Nebraska", electoralvotes: 5, expectedpopularvote: 1000000, expectedmargin: 24, starttime: 120, countingspeed: [1, 2]},
    "NV": {statename : "Nevada", electoralvotes: 6, expectedpopularvote: 1400000, expectedmargin: 0, starttime: 180, countingspeed: [1, 1.5]},
    "NH": {statename : "New Hampshire", electoralvotes: 4, expectedpopularvote: 800000, expectedmargin: -4, starttime: 60, countingspeed: [1, 2]},
    "NJ": {statename : "New Jersey", electoralvotes: 14, expectedpopularvote: 4200000, expectedmargin: -11, starttime: 60, countingspeed: [1, 1.5]},
    "NM": {statename : "New Mexico", electoralvotes: 5, expectedpopularvote: 1000000, expectedmargin: -9, starttime: 120, countingspeed: [1.1, 4]},
    "NY": {statename : "New York", electoralvotes: 28, expectedpopularvote: 8200000, expectedmargin: -17, starttime: 120, countingspeed: [1, 1.5]},
    "NC": {statename : "North Carolina", electoralvotes: 16, expectedpopularvote: 5600000, expectedmargin: 3, starttime: 30, countingspeed: [1.1, 6]},
    "ND": {statename : "North Dakota", electoralvotes: 3, expectedpopularvote: 400000, expectedmargin: 38, starttime: 120, countingspeed: [1.1, 6]},
    "OH": {statename : "Ohio", electoralvotes: 17, expectedpopularvote: 5700000, expectedmargin: 10, starttime: 30, countingspeed: [1.1, 4]},
    "OK": {statename : "Oklahoma", electoralvotes: 7, expectedpopularvote: 1600000, expectedmargin: 36, starttime: 60, countingspeed: [1.1, 6]},
    "OR": {statename : "Oregon", electoralvotes: 8, expectedpopularvote: 2200000, expectedmargin: -14, starttime: 240, countingspeed: [1, 1.5]},
    "PA": {statename : "Pennsylvania", electoralvotes: 19, expectedpopularvote: 7000000, expectedmargin: -1, starttime: 60, countingspeed: [1, 2]},
    "RI": {statename : "Rhode Island", electoralvotes: 4, expectedpopularvote: 600000, expectedmargin: -16, starttime: 60, countingspeed: [1.1, 12]},
    "SC": {statename : "South Carolina", electoralvotes: 9, expectedpopularvote: 2600000, expectedmargin: 16, starttime: 0, countingspeed: [1, 2]},
    "SD": {statename : "South Dakota", electoralvotes: 3, expectedpopularvote: 400000, expectedmargin: 31, starttime: 120, countingspeed: [1.1, 3]},
    "TN": {statename : "Tennessee", electoralvotes: 11, expectedpopularvote: 3000000, expectedmargin: 28, starttime: 60, countingspeed: [1.1, 6]},
    "TX": {statename : "Texas", electoralvotes: 40, expectedpopularvote: 11400000, expectedmargin: 11, starttime: 120, countingspeed: [1.1, 3]},
    "UT": {statename : "Utah", electoralvotes: 6, expectedpopularvote: 1400000, expectedmargin: 22, starttime: 180, countingspeed: [1, 1.5]},
    "VT": {statename : "Vermont", electoralvotes: 3, expectedpopularvote: 400000, expectedmargin: -29, starttime: 0, countingspeed: [1.1, 3]},
    "VA": {statename : "Virginia", electoralvotes: 13, expectedpopularvote: 4600000, expectedmargin: -7, starttime: 0, countingspeed: [1, 2]},
    "WA": {statename : "Washington", electoralvotes: 12, expectedpopularvote: 4000000, expectedmargin: -17, starttime: 240, countingspeed: [1, 1.5]},
    "WV": {statename : "West Virginia", electoralvotes: 4, expectedpopularvote: 800000, expectedmargin: 43, starttime: 30, countingspeed: [1.1, 4]},
    "WI": {statename : "Wisconsin", electoralvotes: 10, expectedpopularvote: 3400000, expectedmargin: -2, starttime: 120, countingspeed: [1.1, 3]},
    "WY": {statename : "Wyoming", electoralvotes: 3, expectedpopularvote: 200000, expectedmargin: 46, starttime: 120, countingspeed: [1.1, 4]}
}

var stateVarData = {
    "AL": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "AK": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "AZ": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "AR": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "CA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "CO": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "CT": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "DE": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "DC": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "FL": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "GA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "HI": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "ID": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "IL": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "IN": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "IA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "KS": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "KY": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "LA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "ME": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MD": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MI": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MN": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MS": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MO": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "MT": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NE": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NV": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NH": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NJ": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NM": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NY": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "NC": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "ND": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "OH": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "OK": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "OR": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "PA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "RI": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "SC": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "SD": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "TN": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "TX": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "UT": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "VT": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "VA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "WA": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "WV": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "WI": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"},
    "WY": {rvotes: 0, dvotes: 0, iterations: 0, status: "Not Started Counting"}
}

function increaseTime() {
    globaltime += 1;   
    for (let state of [...statesnotcounting]) {
        checkIfClosed(state);
    }
    for (let state of statescounting) {
        addVotes(state);
    }
    for (let state of statescounting) {
        if (stateVarData[state].status == "Polls Closed") {
            callState(state);  
        }
    }
    for (let state of [...statescounting]) {
        checkStateDoneCounting(state);
    }
    if (nationalclicked === true) {
        showNationalInfo();
    } else {
        showStateInfo();
    }

    document.getElementById("time").innerHTML = globaltime + " minutes";
}

function increaseTime5() {
    increaseTime();
    increaseTime();
    increaseTime();
    increaseTime();
    increaseTime();
}

function increaseTime15() {
    increaseTime5();
    increaseTime5();
    increaseTime5();
}

function increaseTime60() {
    increaseTime15();
    increaseTime15();
    increaseTime15();
    increaseTime15();
}

// State Name, # Electoral Votes, % Reported, D Total (%), R Total (%), Total Votes
function showStateInfo(state = currentclickedstate) {
    nationalclicked = false;
    currentclickedstate = state;

    document.getElementById("statebutton").innerHTML = stateFixedData[state].statename;
    let rrvotes = `Republican: ${stateVarData[state].rvotes}`;
    let rdvotes = `Democrat: ${stateVarData[state].dvotes}`;
    document.getElementById("reportingamount").innerHTML=`${stateVarData[state].iterations / 2}% Reporting`
    if (stateVarData[state].dvotes > stateVarData[state].rvotes) {
        document.getElementById("winningvotes").innerHTML = rdvotes;
        document.getElementById("winningvotes").style.color = "blue";
        document.getElementById("losingvotes").innerHTML = rrvotes;
        document.getElementById("losingvotes").style.color = "red";
    } else {
        document.getElementById("winningvotes").innerHTML = rrvotes;
        document.getElementById("winningvotes").style.color = "red";
        document.getElementById("losingvotes").innerHTML = rdvotes;
        document.getElementById("losingvotes").style.color = "blue";
    }
    document.getElementById("statestatus").innerHTML = stateVarData[state].status;
}

function showNationalInfo() {
    nationalclicked = true;

    let rrvotes = `Republican: ${globalnationalrvotes}`
    let rdvotes = `Democrat: ${globalnationaldvotes}`
    document.getElementById("reportingamount").innerHTML = `Republican: ${revs} - Democratic: ${devs}`;
    if (globalnationaldvotes > globalnationalrvotes) {
        document.getElementById("winningvotes").innerHTML = rdvotes;
        document.getElementById("winningvotes").style.color = "blue";
        document.getElementById("losingvotes").innerHTML = rrvotes;
        document.getElementById("losingvotes").style.color = "red";
    } else {
        document.getElementById("winningvotes").innerHTML = rrvotes;
        document.getElementById("winningvotes").style.color = "red";
        document.getElementById("losingvotes").innerHTML = rdvotes;
        document.getElementById("losingvotes").style.color = "blue";
    }
    document.getElementById("statestatus").innerHTML = ".";
}

function checkForUpdates () {

}

function addEvent(text, color, bold = false) {
    globalnumupdates += 1;
    const event = document.createElement("div");
    event.style.justifyContent = "space-between";
    event.style.display = "flex";
    event.style.flexWrap = "wrap";
    event.style.alignItems = "center";
    event.style.gap = "4px";

    const timestamp = document.createElement("span");
    timestamp.innerHTML = globaltime;
    timestamp.style.color = "gray";
    timestamp.style.fontSize = "0.9em";

    const eventText = document.createElement("span");
    eventText.innerHTML = text;
    eventText.style.color = color;
    eventText.style.flex = "1"; 
    eventText.style.minWidth = "0"; 
    if (bold == true) {
        eventText.style.fontWeight = "bold";
    }

    event.appendChild(timestamp);
    event.appendChild(eventText);

    if(globalnumupdates % 2 == 1) {
        event.style.backgroundColor = "lightblue";
    } else {
        event.style.backgroundColor = "lightgreen";
    }
    
    document.getElementById("feedbox").appendChild(event);
    document.getElementById("feedbox").scrollTop = document.getElementById("feedbox").scrollHeight;
}

function removeItem (list, item) {
    const index = list.indexOf(item);

    if (index !== -1) {
        list.splice(index, 1);
    }
}

function checkIfClosed(state) {
    if (stateFixedData[state].starttime == globaltime) {
        statescounting.push(state);
        removeItem(statesnotcounting, state);
        stateVarData[state].status = "Polls Closed";
        addEvent(`${stateFixedData[state].statename} has closed polls.`, "black");
    }
}

function addVotes(state) {
    let rand = Math.random();
    let numberofiterations = Math.floor(rand*((1 - stateVarData[state].iterations / 200) * (stateFixedData[state].countingspeed[1] - stateFixedData[state].countingspeed[0]) + stateFixedData[state].countingspeed[0]));
    
    if (numberofiterations !== 0) {
        for (let i = 0; i < numberofiterations; i++) {
            let rVotesToAdd = Math.floor(Math.random() * (stateFixedData[state].expectedpopularvote / 10000) * (50 + ((stateFixedData[state].expectedmargin + globalshift) / 2)));
            let dVotesToAdd = Math.floor(Math.random() * (stateFixedData[state].expectedpopularvote / 10000) * (50 - ((stateFixedData[state].expectedmargin + globalshift) / 2)));
            stateVarData[state].rvotes += rVotesToAdd;
            stateVarData[state].dvotes += dVotesToAdd;
            globalnationalrvotes += rVotesToAdd;
            globalnationaldvotes += dVotesToAdd;
            stateVarData[state].iterations += 1;
        }
        updateMargins(state);
        updatePReported(state);
    }
}

