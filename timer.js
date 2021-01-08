class Timer {
  constructor(
    durationInput,
    startButton,
    pauseButton,
    milliseconds,
    callbacks
  ) {
    // instance variables
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.milliseconds = milliseconds;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    // logic var
    this.inputChanged = true;

    // listeners
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("input", () => {
      this.inputChanged = true;
    });
  }

  start = () => {
    // clear former tick:
    this.pause();

    if (this.inputChanged) {
      // emit an event stating that the timer has started
      if (this.onStart) {
        this.onStart(this.timeRemaining);
      }
      this.inputChanged = false;
    }

    // start new tick:
    this.tick();
    this.interval = setInterval(this.tick, this.milliseconds);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - this.milliseconds / 1000;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(newTime) {
    this.durationInput.value = newTime.toFixed(2);
  }
}
