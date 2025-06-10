var statesnotcounting = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
var statescounting = [];
var statescounted = [];

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
    document.getElementById("time").innerHTML = globaltime + " minutes";
}

function increaseTime5() {
    increaseTime();
    increaseTime();
    increaseTime();
    increaseTime();
    increaseTime();
}
