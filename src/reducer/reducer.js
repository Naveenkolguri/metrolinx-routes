// import { FETCH_ROUTES } from "../actions/actions";

function routeDataReducer(state={routes: [], directions: [], stops: {}}, action){
    console.log('action', action, 'state', state)
    switch(action.type) {
        case 'FETCH_ROUTES':
          return Object.assign({}, state, 
              {
                routes: action.routes,
                directions: [],
                stops: {}
               }); 
        case 'FETCH_DIRECTIONS':
          return Object.assign({}, state, 
              {
                directions: action.directions,
                stops: {}
              }); 
        case 'FILTER_STOPS_FROM_DIRECTIONS':
          return Object.assign({}, state, 
              {
                stops: state.directions.find( (direction) => {
                    // console.log(direction.tag, action.dirId, direction.tag == action.dirId, direction)
                    return direction.tag == action.dirId;
                })
              }); 
         default: 
           return state;
     }     
}



export default routeDataReducer;