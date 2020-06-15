import React from "react";
import { ComposableMap, Geographies, Geography,ZoomableGroup, Marker } from "react-simple-maps";
import './MapChart.scss';
import Canada from '../../canada_provinces.json';
import axios from 'axios';
import LocationItem from '../../components/LocationItem/LocationItem';

const API_URL = process.env.REACT_APP_API_URL;

const api_key="apikey=5ae2e3f221c38a28845f05b64e8e68287f5f1fa674ffcd6265b510f1"
class MapChart extends React.Component{
   state={
      position:{
         coordinates:[-90.347015,61],
         zoom:4
      },
      places:[],
      toolTip:"",
      default:true,
      province:"Northwest Territories"
    }

   handleMoveEnd=(position)=>{
      this.setState({
         position:position
      })
   }

   callPlaces=(data)=>{
      let newData = data.replace(/ +/g, '')
      axios
         .get(API_URL + "/" + newData)
         .then(response=>{
            this.setState({
               places:response.data,
               default:false,
               province:data
            })
         })
   }

   componentDidMount=()=>{
      this.callDefault();
   }

   callDefault=()=>{
      axios
      .get(`${API_URL}/NorthwestTerritories`)
      .then(response=>{
         this.setState({
            places:response.data
         })
      })
   }
   
   render(){
      
      return(
         <main className="map">
             <h1 className="map__country">
                  Canada
               </h1>
            <section className="map__container">
               <ComposableMap projectionConfig={{
                  rotate: [20, 0, 20],
                  scale: 215,
                  center: [-79.347015,50.651070]
                  }} 
                  className="map__content"
                  data-tip=""
                  >
                  <ZoomableGroup 
                     zoom={this.state.position.zoom} 
                     center={this.state.position.coordinates} 
                     onMoveEnd={()=>this.handleMoveEnd}
                  >
                     <Geographies geography={Canada}>
                        {({ geographies }) =>
                           geographies.map(geo => <Geography 
                              key={geo.rsmKey} 
                              geography={geo} 
                              onClick={()=>this.callPlaces(geo.properties.name)}
                              onMouseEnter={()=>this.props.setToolTip(geo.properties.name)}
                              onMouseLeave={()=>this.props.resetToolTip()}
                              className="map__item-province"
                           />)
                        }
                     </Geographies>
                  </ZoomableGroup>
               </ComposableMap>
            </section>
            <aside className="map__information">
               <h2 className="map__label-province">
                  {this.state.province}
               </h2>
               {this.state.places.map(place=>{
                  return <LocationItem
                     key={place.id}
                     name={place.name}
                     description={place.description}
                     image={place.image}
                     id={place.id}
                     province={place.province}
                     country={place.country}                     
                  />
               })}
            </aside>
       </main>
      )
   }
}

export default MapChart;
export {API_URL};