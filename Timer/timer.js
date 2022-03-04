class Timer {
  constructor(durationInput, startBtn, stopBtn, callbacks) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.startBtn.addEventListener("click", this.start);
    this.stopBtn.addEventListener("click", this.stop);
  }
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick(); //krece prvi tick da korisnik vidi odma da je tajmer poceo raditi
    this.interval = setInterval(this.tick, 30);
  };

  stop = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.stop();
      if (this.onComplete) this.onComplete();
    } else {
      this.timeRemaining = this.timeRemaining - 0.03; //setter = getter
      if (this.onTick) this.onTick(this.timeRemaining);
    }
  };

  //   getTime() {
  //     return parseFloat(this.durationInput.value);
  //   }
  //   setTime(time) {
  //     this.durationInput.value = time;
  //   }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
