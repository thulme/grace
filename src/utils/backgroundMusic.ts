export class BackgroundMusic {
  private static audioContext: AudioContext | null = null;
  private static oscillators: OscillatorNode[] = [];
  private static gainNodes: GainNode[] = [];
  private static isPlaying = false;

  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  static playArcadeMusic() {
    if (this.isPlaying) return;
    
    const ctx = this.getAudioContext();
    this.isPlaying = true;

    // Define the melody notes (pentatonic scale for happy arcade sound)
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5
    
    notes.forEach((frequency, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime); // Lower volume
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Create a repeating pattern
      setInterval(() => {
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime + 0.1);
      }, 500 * (i + 1)); // Different interval for each note
      
      osc.start();
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });
  }

  static stop() {
    this.oscillators.forEach((osc, i) => {
      osc.stop();
      this.gainNodes[i].disconnect();
    });
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }
}