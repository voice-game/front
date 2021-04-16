function VolumeMeter(stream) {
  this.volume = 0;
  this.stream = stream;
  this.analyser = null;
  this.processor = null;
}

VolumeMeter.prototype.audioProcessor = function audioProcessor() {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(this.stream);
  const analyser = context.createAnalyser();
  const processor = context.createScriptProcessor(2048, 1, 1);

  analyser.fftSize = 1024;
  analyser.minDecibels = -60;
  analyser.smoothingTimeConstant = 0.9;

  source.connect(analyser);
  analyser.connect(processor);
  processor.connect(context.destination);

  this.analyser = analyser;
  this.processor = processor;
};

VolumeMeter.prototype.getVolume = function getVolume() {
  const data = new Uint8Array(this.analyser.frequencyBinCount);
  this.analyser.getByteFrequencyData(data);
  const average = data.reduce((acc, item) => acc + item) / data.length;
  this.volume = average;

  return this.volume;
};

export default VolumeMeter;
