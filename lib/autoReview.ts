let autoReviewEnabled = false;

export function getAutoReview() {
  return autoReviewEnabled;
}

export function setAutoReview(val: boolean) {
  autoReviewEnabled = val;
}
