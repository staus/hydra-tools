
if(typeof hasRunSetup === 'undefined') {
  console.log("Run Once")
  //create an array to hold our cc values and init to a normalized value
  cc=Array(128).fill(0.5)
  
  getMIDIMessage = function(midiMessage) {
    var arr = midiMessage.data    
    var index = arr[1]
    console.log('Midi received on cc#' + index + ' value:' + arr[2] + 'channel:' + arr[0])    // uncomment to monitor incoming Midi
    var val = (arr[2])/127.0  // normalize CC values to 0.0 - 1.0
    cc[index]=val
  }
	
  // To be used in Hydra
  function c(id, from = 0, to = 1) {
    return () => { return cc[id] * (to - from) + from} 
  }
  // To be used inside p5 draw function:
  function _c(id, from = 0, to = 1) {
    return cc[id] * (to - from) + from
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
  
  m = []
  let knobID = 0
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
	
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)

  _ = new P5({mode: 'WEBGL'})

  hasRunSetup = true
}
