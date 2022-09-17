console.log("Run many times")
console.log(hasRunSetup)
//const hasRunSetup = localStorage.getItem("hasRunSetup")
if(hasRunSetup != true) {
  console.log("Run Once")
  //create an array to hold our cc values and init to a normalized value
  controlChange=Array(128).fill(0.5)
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
  
  m = []
  let knobId = 0
  for(i = 0; i < 4; i++) {
    const page = []
    for(o = 0; o < 4; o++) {
      const row = []
      for(u = 0; u < 4; u++) {
        row.push(knobID) // cc(i*16+u+4*o, 0)
        knobID++
      }
      page.push(row)
    }
    m.push(page)
  }
  hasRunSetup = true
}

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

getMIDIMessage = function(midiMessage) {
  var arr = midiMessage.data    
  var index = arr[1]
  console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
  var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
  controlChange[index]=val
  console.log('Midi: ' + controlChange[index])    // uncomment to monitor incoming Midi
}
/*
cc(val) {
  console.log("CC: " + val)
  return () => controlChange[val]
}
*/
/*
if (typeof _ === 'undefined') {
	_ = new P5({mode: 'WEBGL'})
}
*/
