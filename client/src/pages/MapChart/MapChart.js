import React from "react";
import { ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import './MapChart.scss';
import Canada from '../../canada_provinces.json';
import axios from 'axios';
import LocationItem from '../../components/LocationItem/LocationItem';
import userVid from '../../assets/vid.mp4';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import arrow from '../../assets/arrow.svg';

const API_URL = process.env.REACT_APP_API_URL;

class MapChart extends React.Component{
   state={
      places:[],
      toolTip:"",
      default:true,
      province:"Northwest Territories",
      userLat:"",
      userLong:""
   }

   callPlaces=(data)=>{
      let newData = data.replace(/ +/g, '')
      window.scrollTo(0,document.querySelector(".map__information").scrollHeight)
      axios
         .get(API_URL + "/" + newData)
         .then(response=>{
            this.setState({
               places:response.data,
               default:false,
               province:data,
            })
         })
   }

   componentDidMount=()=>{
      this.callDefault();
      if (navigator.geolocation) {
         navigator.geolocation.watchPosition((position)=>{
           this.setState({
              userLat:position.coords.latitude,
              userLong:position.coords.longitude
           })          
         });
       }
   }

   callDefault=()=>{
      axios
      .get(`${API_URL}/NorthwestTerritories`)
      .then(response=>{
         this.setState({
            places:response.data,
         })
      })
   }
   scrollToPage=()=>{
      window.scrollTo(0,document.querySelector(".map__information").scrollHeight)
   }
   render(){
      
      return(
         <main className="map">
            <div className="map__video-container">
               <video className="map__video" autoPlay={true} loop={true}>
                  <source src={userVid}/>
               </video>
               <img className="map__icon-down" src={arrow} alt="arrow" onClick={()=>this.scrollToPage(this)}/>
            <div className="map__video-overlay"></div>

               <section className="map__container">
               <ComposableMap projectionConfig={{
                  rotate: [20, 0, 20],
                  scale:850,
                  center: [-79.347015,41.651070]
                  }} 
                  className="map__content"
                  data-tip=""
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
                     <Marker coordinates={[this.state.userLong, this.state.userLat]}>
                        <circle r={5} fill="#9a5e2a" />
                     </Marker>
               </ComposableMap>
            </section>




            </div>

            <aside className="map__information">
               <h2 className="map__label-province">
                  {this.state.province}
               </h2>
                  <Carousel className="map__carousel" showThumbs={false}>

                     {this.state.places.map(place=>{
                        return<LocationItem
                           key={place.id}
                           name={place.name}
                           description={place.description}
                           image={place.image}
                           id={place.id}
                           province={place.province}
                           country={place.country}
                           comments={place.comments}
                           long={place.longitude}
                           lat={place.latitude}
                        />
                     })}
                     
                  </Carousel>
            </aside>
       </main>
      )
   }
}

export default MapChart;
export {API_URL};