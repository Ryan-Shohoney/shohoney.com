const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const unitsOfTime = {
    second,
    minute,
    hour,
    day,
};

export function timeUntil (thisDate: Date): string {
    const timeUntil = thisDate.getTime() - new Date().getTime();
    const days = Math.floor(timeUntil / unitsOfTime.day);
    const hours = Math.floor((timeUntil % unitsOfTime.day) / unitsOfTime.hour);
    const minutes = Math.floor(((timeUntil % unitsOfTime.day) % unitsOfTime.hour) / unitsOfTime.minute);
    const seconds = Math.floor((((timeUntil % unitsOfTime.day) % unitsOfTime.hour) % unitsOfTime.minute) / unitsOfTime.second);

    return `${days} Days ${hours} hours ${minutes} minutes ${seconds} seconds`
  }

export { unitsOfTime }