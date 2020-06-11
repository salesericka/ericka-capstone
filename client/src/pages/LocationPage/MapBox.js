import React from 'react';
import './LocationPage.scss';
import ReactMapGL from 'react-map-gl';

const MAP_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsZXNlcmlja2EiLCJhIjoiY2tiNzZvYnpsMDE2eDJ0bzFlbDY2cTdveSJ9.FABK7rO5P2upzO85lmYj-g';

// const map = new mapboxgl.Map({
// container: 'map-box',
// style: 'mapbox://styles/salesericka/ckb77eu8611uv1ijzq6bmzqjb'
// });

// map.on('load', function() {
//   map.addSource('states', {
//   'type': 'geojson',
//   'data':
//   'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
//   });


class MapBox extends React.Component{
state={
  viewport:{
    width:500,
    height:500,
    longitude:-79.347015,
    latitude:43.651070	,
    zoom: 3
  }
}
  render(){
    return(
      <div className="location-box" id="map-box">
        <ReactMapGL {...this.state.viewport} mapboxApiAccessToken={"pk.eyJ1Ijoic2FsZXNlcmlja2EiLCJhIjoiY2tiNzZvYnpsMDE2eDJ0bzFlbDY2cTdveSJ9.FABK7rO5P2upzO85lmYj-g"}
        onViewportChange={viewport=>{this.setState({viewport:viewport})}}
        mapStyle="mapbox://styles/salesericka/ckb77eu8611uv1ijzq6bmzqjb"
        >
        </ReactMapGL>
      </div>
    )
  }
}
export default MapBox;
export {MAP_TOKEN};



 