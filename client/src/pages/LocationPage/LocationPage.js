import React from 'react';
import './LocationPage.scss';
import ReactTooltip from 'react-tooltip';
import MapChart from '../MapChart/MapChart';


class LocationPage extends React.Component {
  render(){
    return (
      <>
        <MapChart/>
      </>
    );
  }
}

export default LocationPage;