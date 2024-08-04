// TimerStore.ts
import { writable } from "svelte/store";

export enum Status {
  idle = "idle",
  waiting = "waiting",
  ready = "ready",
  timing = "timing",
  completed = "completed"
}

export class BaseTimerStore {
  time = writable(0);
  timing = writable(false);
  public status = writable(Status.idle);
  formattedTime = writable("0.00");
  private timerInterval: NodeJS.Timeout | undefined;

  public async handleDown() {
    this.status.update(currentStatus => {
        if (currentStatus === Status.idle) {
            return Status.waiting;
        } else if (currentStatus === Status.timing) {
            return Status.completed;
        } else {
            return currentStatus;
        }
    });
  }

  public async handleUp() {
    this.status.update(currentStatus => {
        if (currentStatus === Status.ready) {
            return Status.timing;
        } else if (currentStatus === Status.waiting) {
            return Status.timing;
        } else if (currentStatus === Status.completed) {
            return Status.idle;
        } else {
            return currentStatus;
        }
    });
  }

  public startTimer() {
    this.timing.set(true);
    const startTime = Date.now(); 
    this.timerInterval = setInterval(() => {
      this.time.set(Date.now() - startTime);
    }, 10);
  }

  public stopTimer() {
    this.timing.set(false);
    clearInterval(this.timerInterval);
  }

  public updateFormattedTime() {
    this.time.subscribe(currentTime => {
      const hours = Math.floor(currentTime / 3600000);
      const minutes = Math.floor((currentTime % 3600000) / 60000);
      const seconds = Math.floor((currentTime % 60000) / 1000);
      const milliseconds = Math.floor((currentTime % 1000) / 10); // Convert to 10 milliseconds accuracy

      let formattedSeconds = seconds.toString();
      let formattedMilliseconds = milliseconds.toString().padStart(2, '0');

      let newFormattedTime = "";
      if (currentTime < 10000) {
        newFormattedTime = `${formattedSeconds}.${formattedMilliseconds}`;
      } else if (currentTime < 60000) {
        newFormattedTime = `${formattedSeconds.padStart(2, '0')}.${formattedMilliseconds}`;
      } else {
        const minutesStr = minutes > 0 || hours > 0 ? `${minutes.toString().padStart(2, '0')}:` : '';
        const secondsStr = seconds.toString().padStart(2, '0');
        newFormattedTime = `${minutesStr}${secondsStr}.${formattedMilliseconds}`;
      }

      this.formattedTime.set(newFormattedTime);
    });
  }
}

export let mainTimerStore = new BaseTimerStore();
export class MainTimerStore extends BaseTimerStore {
  constructor() {
    super();
  }
}