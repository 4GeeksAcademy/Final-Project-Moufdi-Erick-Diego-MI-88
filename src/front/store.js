export const initialStore=()=>{
  return{
    message: null,
    businesses: []
  }
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'set_businesses':

      return {
        ...store,
        businesses:  action.payload,
      };
    default:
      throw Error('Unknown action.');
  }    
}
