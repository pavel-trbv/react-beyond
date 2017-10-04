const initialState = {
  count: 0
}

export function counter(state = initialState, { type, payload}) {
  switch(type) {
    case 'COUNTER_INCREMENT': 
      return { ...state, count: state.count + payload.count }
      break;
     
    case 'COUNTER_DECREMENT': 
      return { ...state, count: state.count - payload.count }
      break;
  
    default:  
     return { ...state } 
  }
}