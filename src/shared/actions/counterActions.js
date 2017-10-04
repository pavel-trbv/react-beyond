export function increment(count) {
  return {
    payload: {
      count
    },
    type: 'COUNTER_INCREMENT'
  }
}

export function decrement(count) {
  return {
    payload: {
      count
    },
    type: 'COUNTER_DECREMENT'
  }
}