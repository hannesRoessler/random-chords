var beat = 0;
var timer = null;
let audio = new Audio("blip.wav");
let tempo = 0;
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
  {
    name: "maj<sup>7</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Major"
  },
  {
    name: "△<sup>7</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Major"
  },
  {
    name: "MA<sup>7</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Major"
  },
  {
    name: "-<sup>7</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Minor"
  },
  {
    name: "min<sup>7</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Minor"
  },
  {
    name: "m<sup>7b5</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Half-dimished"
  },
  {
    name: "<sup>⍉</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Half-dimished"
  },
  {
    name: "<sup>7</sup>",
    checked: true,
    mainCat: "chordType",
    subCat: "Half-dimished"
  },
  {
    name: "sus<sup>4</sup>",
    checked: false,
    mainCat: "chordType",
    subCat: "Suspended"
  }
  // TODO: define subcategories and structure content better
];
const chordName = chordObj.name;
console.log(chordName);
console.log(chordObj);
function showChordSymbol() {
  var meter = document.getElementById("meter-input").value;
  var chordKey = chordObj.filter(chordObj => {
    return chordObj.checked === true && chordObj.mainCat == "chordKey";
  });
  var chordType = chordObj.filter(chordObj => {
    return chordObj.checked === true && chordObj.mainCat == "chordType";
  });
  var chordSymbol =
    chordKey[Math.floor(Math.random() * chordKey.length + 0)].name +
    chordType[Math.floor(Math.random() * chordType.length + 0)].name;
  if (beat == meter) {
    document.getElementById("chord-symbol").innerHTML = chordSymbol;
    beat = 0;
  }
}
function calcTempo() {
  var beats = document.getElementById("bpm-input").value;
  var minute = 60000;
  tempo = minute / beats;
  return tempo;
}
function metronome() {
  disableControls(true);
  timer = setInterval(param => {
    audio.play();
    showChordSymbol();
    beat++;
  }, calcTempo());
}
function reset() {
  clearInterval(timer);
  disableControls(false);
}
function disableControls(param) {
  let controlIDs = ["start-button", "meter-input", "bpm-input"]; // IDs of elements to disable while metronome is running
  controlIDs.map(id => {
    document.getElementById(id).disabled = param;
  });
}
function generateCheckboxes() {
  chordObj.map(chordObj => {
    let checkBox = `<div
                    id="${chordObj.name}"
                    class="checkbox ${chordObj.checked ?  "cb-checked" : "cb-unchecked"}"
                    onClick="changeColor(this); addSelectionToObject('${chordObj.name}')"
                    > ${chordObj.name}
                    </div>` 
    document.getElementById(chordObj.mainCat).innerHTML += checkBox;
  });
}
function addSelectionToObject(id) {
  chordObj.map(chord => {
    if (chord.name == id) {
      chord.checked
        ? (chord.checked = false)
        : (chord.checked = true);
    }
  });
}
 function changeColor(elem) {
        elem.className == "checkbox cb-checked"
          ? (elem.className = "checkbox cb-unchecked") && (elem.id = "cb-unchecked")
          : (elem.className = "checkbox cb-checked") && (elem.id = "cb-checked");
      }
function modal() {
  var modal = document.getElementById("modal");
  var btn = document.getElementById("settings");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
