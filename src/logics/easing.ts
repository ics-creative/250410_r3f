// イージング関数
export const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

export const easeOutExpo = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
