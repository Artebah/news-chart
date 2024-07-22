function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let closestIndex = -1;
  let minDiff = Infinity;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const diff = Math.abs(arr[mid] - target);

    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = mid;
    }

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return closestIndex;
}

export { binarySearch };
