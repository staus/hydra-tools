// register WebMIDI

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)

function onMIDISuccess(midiAccess) {
  console.log("Success");
  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;
  for (var input of midiAccess.inputs.values()){
    input.onmidimessage = getMIDIMessage;
  }
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}

//create an array to hold our cc values and init to a normalized value
var controlChange=Array(128).fill(0.5)

getMIDIMessage = function(midiMessage) {
  var arr = midiMessage.data    
  var index = arr[1]
  console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
  var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
  controlChange[index]=val
}

function cc(val) {
  return () => controlChange[val]
}

/*
if (typeof _ === 'undefined') {
	_ = new P5({mode: 'WEBGL'})
}
*/
