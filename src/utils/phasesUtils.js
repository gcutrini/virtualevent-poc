import MarketingSite from '../content/marketing-site.json';

export const PHASES = {
  BEFORE: -1,
  DURING: 0,
  AFTER: 1,
};

export const getSummitPhase = function (summit, now) {
  if (!summit) return null;

  const { start_date, end_date } = summit;

  const deltaSummit = MarketingSite.summit_delta_start_time ? MarketingSite.summit_delta_start_time : 0;

  return start_date - deltaSummit < now && end_date > now ? PHASES.DURING
      :
      start_date - deltaSummit > now ? PHASES.BEFORE
        :
        end_date < now ? PHASES.AFTER : null;

};

export const getEventPhase = function (event, now) {
  let { start_date, end_date } = event;

  return start_date < now && end_date > now ? PHASES.DURING
      :
      start_date > now ? PHASES.BEFORE
        :
        end_date < now ? PHASES.AFTER : null;
};