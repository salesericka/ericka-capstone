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
      longitude:-79.347015,
      latitude:43.651070,
      position:{
         coordinates:[-79.347015,43.651070],
         zoom:3
      },
      places:[]
    }

   handleMoveEnd=(position)=>{
      this.setState({
         position:position
      })
   }

   callClick=(data)=>{
      console.log("GEO DATA",data)
      let newData = data.replace(/ +/g, '')
      axios
         .get(API_URL + "/" + newData)
         .then(response=>{
            console.log("RESPONSE DATA", response.data)
            this.setState({
               places:response.data
            })
         })
   }

   render(){
      return(
         <main className="map">
            <div className="map__container">
               <ComposableMap>
                  <ZoomableGroup zoom={this.state.position.zoom} center={this.state.position.coordinates} onMoveEnd={()=>this.handleMoveEnd}>
                     <Geographies geography={Canada}>
                        {({ geographies }) =>
                           geographies.map(geo => <Geography 
                              key={geo.rsmKey} 
                              geography={geo} 
                              onClick={()=>this.callClick(geo.properties.name)}
                              style={
                                 {
                                    default:{
                                       fill:"#3c4245"
                                    },
                                    hover:{
                                       fill:"#5F6769"
                                    }
                                 }
                              }
                           />)
                        }
                     </Geographies>
                     
                     <Marker coordinates={[this.state.longitude,this.state.latitude]}>
                        <circle r={2} fill="#DFCDC3" />
                     </Marker>

                     {this.state.places.map(mark=>{
                        return <Marker coordinates={[mark.longitude,mark.latitude]} key={mark.id}>
                           <circle r={1} fill="#black" />
                        </Marker>
                     })}
                  </ZoomableGroup>
               </ComposableMap>
            </div>
            <aside className="map__information">
               <h1>
                  Places To Visit
               </h1>
               {this.state.places.map(place=>{
                  return <LocationItem
                     key={place.id}
                     name={place.name}
                     description={place.description}
                     image={place.image}
                     id={place.id}
                  />
               })}
            </aside>
       </main>
      )
   }
}

export default MapChart;
export {API_URL};