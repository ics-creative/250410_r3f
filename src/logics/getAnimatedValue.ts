interface AnimateScaleOptions {
  // アニメーション開始スケール
  from: number;
  // アニメーション最終スケール
  to: number;
  // アニメーションの合計時間（ミリ秒）
  durationMs: number;
  // イージング関数（省略すると線形補間を使用）
  easing?: (t: number) => number;
}

/**
 * アニメーション経過時間（ms）に応じて値を求める関数
 * @param currentTime 現在の時刻（ms）
 * @param startTime アニメーション開始時刻（ms）
 * @param options アニメーション設定
 * @returns 現在の値
 */
export const getAnimatedValue = (
  currentTime: number,
  startTime: number,
  options: AnimateScaleOptions,
): number => {
  const { from, to, durationMs, easing } = options;

  // 経過時間を計算
  const elapsed = currentTime - startTime;
  // 0～1の範囲で進捗度を求める
  const progress = Math.min(Math.max(elapsed / durationMs, 0), 1);

  // イージング関数があれば適用、なければリニア
  const easeFunc = easing ?? ((t: number) => t);
  const easedProgress = easeFunc(progress);

  // from から to へ補間
  return from + (to - from) * easedProgress;
};
