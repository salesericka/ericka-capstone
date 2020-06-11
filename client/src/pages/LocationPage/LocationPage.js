import React from 'react';
import './LocationPage.scss';
import Map from '../Map/Map';
import ReactTooltip from 'react-tooltip';
import WorldPage from '../WorldPage/WorldPage';
import MapBox from './MapBox';
import MapChart from '../MapChart/MapChart';


class LocationPage extends React.Component {
  render(){
    return (
      <>
        {/* <Map/> */}
        {/* <MapBox/> */}
        {/* <WorldPage/> */}
        <MapChart/>
      </>
    );
  }
}

export default LocationPage;