import type { RunwayData } from '@/types/database.types';

interface FundraiseTimeline {
  startRaiseBy: Date;
  daysUntilRaise: number;
  roundTimeline: number; // months
  buffer: number; // months
  urgency: 'critical' | 'warning' | 'normal';
  targetRound: string;
  targetRange: string;
}

/**
 * Round timelines by stage (months to close + buffer).
 */
const ROUND_TIMELINES: Record<string, { timeline: number; buffer: number; round: string; range: string }> = {
  funded: { timeline: 4, buffer: 2, round: 'Seed', range: '$2M–$4M' },
  bootstrapped: { timeline: 3, buffer: 1, round: 'Pre-Seed', range: '$500K–$1.5M' },
};

/**
 * Calculate when to start fundraising based on runway.
 */
export function calcFundraiseTimeline(
  runwayData: RunwayData,
  stage: string = 'funded'
): FundraiseTimeline {
  const config = ROUND_TIMELINES[stage] || ROUND_TIMELINES.funded;
  const totalMonthsNeeded = config.timeline + config.buffer;

  // Cash-out date from base scenario
  const cashOutDate = runwayData.base.date;

  // Start raising = cash-out date minus months needed
  const startRaiseBy = new Date(cashOutDate);
  startRaiseBy.setMonth(startRaiseBy.getMonth() - totalMonthsNeeded);

  const now = new Date();
  const daysUntilRaise = Math.floor(
    (startRaiseBy.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  let urgency: 'critical' | 'warning' | 'normal' = 'normal';
  if (daysUntilRaise < 30) urgency = 'critical';
  else if (daysUntilRaise < 60) urgency = 'warning';

  return {
    startRaiseBy,
    daysUntilRaise,
    roundTimeline: config.timeline,
    buffer: config.buffer,
    urgency,
    targetRound: config.round,
    targetRange: config.range,
  };
}
