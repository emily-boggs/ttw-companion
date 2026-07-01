/**
 * Returns test reliability info based on DPO.
 */
export function getTestReliability(dpo) {
  if (dpo <= 7) {
    return {
      tier: 'too-early',
      color: 'text-text-muted',
      bgColor: 'bg-surface',
      icon: '⏳',
      message: "Too early — a test won't show anything yet. Hang in there.",
    };
  }
  if (dpo <= 9) {
    return {
      tier: 'early',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      icon: '🌅',
      message: "Still early — most tests won't pick this up yet.",
    };
  }
  if (dpo <= 11) {
    return {
      tier: 'possible',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🤞',
      message: "Some people get a positive now, but a negative doesn't mean much yet.",
    };
  }
  return {
    tier: 'reliable',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    icon: '✅',
    message: "This is a good time to test — results are more reliable now.",
  };
}
