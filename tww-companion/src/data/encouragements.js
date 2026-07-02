export const encouragements = [
  "You're doing amazing. One day at a time. 💛",
  "Whatever happens, you are strong and resilient.",
  "Breathe. You've got this. 🌸",
  "Your body is incredible — trust the process.",
  "It's okay to feel all the feelings right now.",
  "You're not alone in this wait. We're here with you.",
  "Be gentle with yourself today. You deserve it. 🌸",
  "Every day is one step closer to your answer. 💛",
  "Sending you warmth and hope today.",
  "No amount of googling will speed this up — but you already knew that. 😊",
  "You're stronger than this wait.",
  "One day closer. You're doing great. 🌷",
  "Whatever this cycle brings, you are enough.",
  "Take a deep breath. You are exactly where you need to be.",
];

export function getEncouragement(dpo) {
  // Use DPO as a seed for consistent daily message
  const index = (dpo || 0) % encouragements.length;
  return encouragements[index];
}
