var beat = 0;
var timer = null;
// TODO: convert to JSON file and import
var chordObj = [
    { name: "C", checked: true, mainCat: "chordKey" },
    { name: "C#", checked: true, mainCat: "chordKey" },
    { name: "Db", checked: true, mainCat: "chordKey" },
    { name: "D", checked: true, mainCat: "chordKey" },
    { name: "D#", checked: true, mainCat: "chordKey" },
    { name: "Eb", checked: true, mainCat: "chordKey" },
    { name: "E", checked: true, mainCat: "chordKey" },
    { name: "E#", checked: false, mainCat: "chordKey" },
    { name: "Fb", checked: false, mainCat: "chordKey" },
    { name: "F", checked: true, mainCat: "chordKey" },
    { name: "F#", checked: true, mainCat: "chordKey" },
    { name: "Gb", checked: true, mainCat: "chordKey" },
    { name: "G", checked: true, mainCat: "chordKey" },
    { name: "G#", checked: true, mainCat: "chordKey" },
    { name: "Ab", checked: true, mainCat: "chordKey" },
    { name: "A", checked: true, mainCat: "chordKey" },
    { name: "A#", checked: false, mainCat: "chordKey" },
    { name: "Bb", checked: true, mainCat: "chordKey" },
    { name: "B", checked: true, mainCat: "chordKey" },
    { name: "H", checked: false, mainCat: "chordKey" },
    { name: "Cb", checked: false, mainCat: "chordKey" },
    { name: "maj<sup>7</sup>", checked: true, mainCat: "chordType", subCat: "Major" },
    { name: "△<sup>7</sup>", checked: true, mainCat: "chordType", subCat: "Major" },
    { name: "MA<sup>7</sup>", checked: true, mainCat: "chordType", subCat: "Major" },
    { name: "-<sup>7</sup>", checked: true, mainCat: "chordType", subCat: "Minor"},
    { name: "min<sup>7</sup>", checked: true, mainCat: "chordType", subCat: "Minor"},
    { name: "m<sup>7b5</sup>", checked: true, mainCat: "chordType", subCat: "Half-dimished" },
    { name: " <sup>⍉</sup>", checked: true, mainCat: "chordType", subCat: "Half-dimished" },
    { name: "<sup>7</sup>", checked: true, mainCat: "chordType", subCat: "Half-dimished" },
    { name: "sus<sup>4</sup>", checked: false, mainCat: "chordType", subCat: "Suspended" },
    // TODO: define subcategories and structure content better
];
const chordName = chordObj.name;
console.log(chordName);
console.log(chordObj)
function showChordSymbol() {
    var meter = document.getElementById("meter-input").value;
    var chordKey = chordObj.filter(chordObj => {
        return chordObj.checked === true && chordObj.mainCat == "chordKey";
    })
    var chordType = chordObj.filter(chordObj => {
        return chordObj.checked === true && chordObj.mainCat == "chordType";
    })
    console.log(chordType);
    var chordSymbol = chordKey[Math.floor((Math.random() * chordKey.length) + 0)].name + chordType[Math.floor((Math.random() * chordType.length) + 0)].name;
    if (beat == meter) {
        document.getElementById("chord-symbol").innerHTML = chordSymbol;
        beat = 0;
    }
};
function tempo() {
    var beats = document.getElementById("bpm-input").value;
    var minute = 60000;
    tempo = minute / beats;
    return tempo;
}
function metronome() {
    disableControls();
    const timer = setInterval(function () {
        var audio = new Audio("blip.wav");
        audio.play();
        showChordSymbol();
        beat++;
    }, tempo());
};
function disableControls() {
    let controlIDs = ["start-button", "meter-input", "bpm-input"] // IDs of elements to disable while metronome is running
    controlIDs.map(id => {document.getElementById(id).disabled = true;})
}
function generateCheckboxes() {
    chordObj.map(chordObj => {
        let checkBox = `<input type="checkbox" id="${chordObj.name}" onclick="addSelectionToObject('${chordObj.name}')" ${chordObj.checked ? "checked" : ""}>
                        <label for="${chordObj.name}">${chordObj.name}</label>`
        document.getElementById(chordObj.mainCat + "-fieldset").innerHTML += checkBox
    })
}
function addSelectionToObject(id) {
    chordObj.map(chord => {
        if (chord.name == id) {
            (chord.checked) ? chord.checked = false : chord.checked = true        
        }
    })
};
function modal() {
    // Get the modal
    var modal = document.getElementById('modal');

    // Get the button that opens the modal
    var btn = document.getElementById("settings");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}