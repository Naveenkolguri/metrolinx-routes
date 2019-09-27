const FETCH_ROUTES = 'FETCH_ROUTES' // action types
const FETCH_DIRECTIONS = 'FETCH_DIRECTIONS' // action types
const FILTER_STOPS_FROM_DIRECTIONS = 'FILTER_STOPS_FROM_DIRECTIONS' // action types
const FETCH_NEXT_BUS_TIME = 'FETCH_NEXT_BUS_TIME' // action types

export  const fetchRoutes = () => {
    return async function(dispatch){
        return await fetch('http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc').then( 
                    resp => resp.json()
                ).then(data => dispatch({
                    type : FETCH_ROUTES,
                    routes : data.route
            }));
    }
}


export  const fetchDirections = (routeNo) => {
    return async function(dispatch){
        let dirUrl = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=';
        return await fetch(dirUrl.concat(routeNo)).then( 
                    resp => resp.json()
                ).then(data => dispatch({
                    type : FETCH_DIRECTIONS,
                    directions : data.route.direction
            }));
    }
}

export const getNextBusArrivalTime = (routeId=0, stopId=0) =>{
    return async function(dispatch){
        let timeUrl = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r='+routeId+"&s="+stopId;
        return await fetch(timeUrl).then( 
                    resp => resp.json()
                ).then(data => dispatch({
                    type : FETCH_NEXT_BUS_TIME,
                    data
            }));
    }
}
export  const filterStopsForTheDirection = (dirId) => {
    return function(dispatch){
        dispatch({
            type: FILTER_STOPS_FROM_DIRECTIONS,
            dirId
        })
    }
}