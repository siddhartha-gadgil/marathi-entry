var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'mr-IN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// var diagnostic = document.querySelector('.output');
var str = document.querySelector('#string');
var loc = document.querySelector('#location');
var targ = document.querySelector('#targ');
var trans = document.querySelector('#trans');
var logs = document.querySelector('#log')

var data = {};
var cursor = 0;


function showData(n){
  var ob = data[n];
  str.textContent = ob['string'];
  loc.textContent = ob['location'];
  targ.textContent = ob['target'];
  trans.textContent = ""
}

function setRandom(){
  cursor = Math.floor(Math.random() * Math.floor(data.length));
  showData(cursor);
}

fetch("data/qgis.json")
.then(function(response) {
  return response.json();
})
.then(function(myJson){
  console.log(myJson);
  data = myJson;
  setRandom();
  })

function start() {
  recognition.start();
  console.log('Ready to translate.');
  logs.textContent="listening..."
}

function copy() {
  trans.value = targ.textContent;
}

function save(){
  data[cursor]["translation"] = trans.value;
  setRandom();
}

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to translate.');
// }

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var spoken = event.results[last][0].transcript;

  // diagnostic.textContent = spoken;
  trans.value = spoken;
  console.log('Confidence: ' + event.results[0][0].confidence);
  logs.textContent='';
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
