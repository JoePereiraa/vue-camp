import { differenceInSeconds, parse } from 'date-fns';

const parseTime = (hhmm) => parse(hhmm, 'HH:mm', new Date());

export const computeSchedule = ({ totalMessages = 0, minDelaySec = 0, maxDelaySec = 0, timeSlots }) => {
  const avgDelay = (minDelaySec + maxDelaySec) / 2;
  const avgMessage = Math.round(totalMessages / timeSlots.length); 
  const details = [];
  let remaining = totalMessages;

  for (let i = 0; i < timeSlots.length - 1; i++) {
    const start = parseTime(timeSlots[i]);
    const end = parseTime(timeSlots[i + 1]);
    const intervalSec = differenceInSeconds(end, start);
    const capacity = Math.max(Math.round(intervalSec / avgDelay), 0);
    const send = Math.min(capacity, remaining);

    details.push({
      window: `${timeSlots[i]} → ${timeSlots[i + 1]}`,
      durationSec: intervalSec,
      capacity,
      messages: send,
    });

    remaining -= send;
    if (remaining <= 0) break;
  }

  return {
    totalMessages,
    avgMessage,
    avgDelaySec: avgDelay,
    intervals: details,
    overflow: Math.max(remaining, 0),
  };
};