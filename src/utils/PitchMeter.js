import ml5 from "ml5";

function PitchMeter() {
  this.createAudioContext({ audio: true, video: false });
}

PitchMeter.prototype.createAudioContext = async function (constraints) {
  try {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 12000 });
    this.stream = await navigator.mediaDevices.getUserMedia(constraints);

    this.startPitchDetection(this.audioContext, this.stream);
  } catch (err) {
    console.log(err);
  }
};

PitchMeter.prototype.startPitchDetection = function (audioContext, stream) {
  this.pitch = ml5.pitchDetection("/model/", audioContext , stream, this.modelLoaded.bind(this));
};

PitchMeter.prototype.modelLoaded = function () {
  console.log("Loaded");
  this.showPitch();
};

PitchMeter.prototype.showPitch = function () {
  requestAnimationFrame(this.showPitch.bind(this));

  if (this.pitch) {
    this.pitch.getPitch((err, frequnecy) => {
      if (err) {
        console.log(err);
      } else {
        if (frequnecy) {
          console.log(frequnecy);
        } else {
          console.log(0);
        }
      }
    });
  }
};

export default PitchMeter;
