export class GameAudio {
  private static audioContext: AudioContext | null = null;
  private static isPlaying = false;

  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  static async playHeartCollectSound(): Promise<void> {
    const ctx = this.getAudioContext();
    
    // Create a soft "pling" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Use a sine wave for a softer sound
    osc.type = 'sine';
    
    // Start at a higher frequency and slide down
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1); // A4
    
    // Very quiet volume
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  static async playFireworkSound(): Promise<void> {
    if (this.isPlaying) return;
    
    const ctx = this.getAudioContext();
    this.isPlaying = true;
    
    // Create multiple firework bursts
    const burstCount = 5;
    
    for (let burst = 0; burst < burstCount; burst++) {
      setTimeout(() => {
        // Create multiple oscillators for each burst
        const oscillators = Array(4).fill(null).map(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          const baseFreq = 150 + Math.random() * 600;
          osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(
            baseFreq * 0.5,
            ctx.currentTime + 2
          );
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          return osc;
        });
        
        oscillators.forEach(osc => {
          osc.start();
          osc.stop(ctx.currentTime + 2);
        });
      }, burst * 400);
    }
    
    setTimeout(() => {
      this.isPlaying = false;
    }, burstCount * 400 + 2000);
  }
}