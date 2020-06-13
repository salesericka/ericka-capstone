import React from 'react';
import './LocationPage.scss';
import ReactTooltip from 'react-tooltip';
import MapChart from '../MapChart/MapChart';


class LocationPage extends React.Component {
  state={
    toolTipContent:""
  }
  setToolTip=(data)=>{
    this.setState({
      toolTipContent:data
    })
  }
  resetToolTip=()=>{
    this.setState({
      toolTipContent:""
    })
  }
  render(){
    return (
      <>
        <MapChart toolTipContent={this.state.toolTipContent}
          setToolTip={this.setToolTip}
          resetToolTip={this.resetToolTip}
        />
        <ReactTooltip>{this.state.toolTipContent}</ReactTooltip>
      </>
    );
  }
}

export default LocationPage;