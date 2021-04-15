export default function audioProcessor(audioStream) {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(audioStream);
  const analyser = context.createAnalyser();
  const processor = context.createScriptProcessor(2048, 1, 1);

  analyser.fftSize = 1024;
  analyser.minDecibels = -60;
  analyser.smoothingTimeConstant = 0.9;

  source.connect(analyser);
  analyser.connect(processor);
  processor.connect(context.destination);

  return { processor, analyser };
}
