
import React, {Component} from 'react';

class Dropdown extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedItem : ""
        }
    }

    render(){
        let {defaultText = "Please Select", tag = "tag", title="title", onSelect  } = this.props;
        let data = this.props.data;
        
        return (
            <div className="form-group">
                <select className="custom-select" required value={this.state.selectedItem} onChange={(event) => { 
                        this.setState({selectedItem:event.target.value}, () => {
                            this.props.onSelect(this.state.selectedItem)
                        })
                    }} >
                    <option key="--" value="">{defaultText}</option>
                    {
                        data && data.map(route => {
                            return <option value={route['tag']} >{route[title] ? route[title]  : route['tag']}</option>
                        })
                    }
                </select>
                <div className="invalid-feedback">{""}</div>
            </div>
        );
    }
}
export default Dropdown;