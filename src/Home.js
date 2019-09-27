import React from 'react';
import Dropdown  from "./components/Dropdown";
import { connect } from "react-redux";
import { fetchRoutes, fetchDirections, filterStopsForTheDirection , getNextBusArrivalTime }  from './actions/actions';

class Home extends React.Component {

    constructor(){
        super();

        this.state ={
            routes: [],
            selectedRoute: "",
            selectedDirection : "",
            selectedStop : "",
        }
    }

    componentDidMount(){
        this.props.fetchRoutes();
    }

    render(){
        // console.log("actual redux properties are ", this.props.routes)

        return(
            <form className="was-validated">
                <label>Route</label> 
                <Dropdown data={this.props.routes} onSelect={ (tag) => {
                        this.setState({selectedRoute:tag, selectedDirection:"", selectedStop: ""});

                        this.props.fetchDirections(tag);

                        console.log('selecged route', tag)
                    }} /> <br/>
                <label>Direction</label> 
                <Dropdown data={this.props.directions} onSelect={ (tag) => {
                        this.setState({selectedDirection:tag, selectedStop: ""});

                        this.props.filterStopsForTheDirection(tag)
                        
                        console.log('selecged direction', tag)
                }}/> <br/>
                <label>Stop</label> 
                <Dropdown data={this.props.stops.stop} onSelect={ (tag) => {
                        this.setState({selectedStop:tag});
                        this.props.getNextBusArrivalTime(this.state.selectedRoute, tag)
                        console.log('selecged direction', tag)
                }} /> <br/>
                {
                    this.state.selectedStop != "" &&
                    <div className="container-fluid" style={{width: 300}}>
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Next Bus Details</h5>
                            <p className="card-text">Arrives in </p>
                            <h5 className="card-title">25 minutes</h5>
                        </div>
                    </div>
                }
                
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
      routes        : state.routes,
      directions    : state.directions,
      stops         : state.stops,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        fetchRoutes                 :   () => dispatch(fetchRoutes()),
        fetchDirections             :   (routeId) => dispatch(fetchDirections(routeId)),
        filterStopsForTheDirection  :   (dirId) => dispatch(filterStopsForTheDirection(dirId),),
        getNextBusArrivalTime       :   (routeId, stopId) => dispatch(getNextBusArrivalTime(routeId, stopId))
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps  )(Home);