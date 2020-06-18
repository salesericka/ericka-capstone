import React from 'react';
import './UserPage.scss';
import axios from 'axios';
import FaveCard from '../../components/FaveCard/FaveCard';
import userVid from '../../assets/vid.mp4';
import firebase from 'firebase';
const API_URL = process.env.REACT_APP_API_URL;

class UserPage extends React.Component{
   state={
      userList:[],
      listSection:false
   }
   componentDidMount(){
      this.fetchList();
   }

   fetchList=()=>{
      const userId = firebase.auth().currentUser.uid
      axios.get(`${API_URL}/userBucketList/user/${userId}`)
      .then(response=>{
         console.log('User List',response.data)
            if(response.data.length !== 0){
               this.setState({
               userList:response.data.list,
               listSection:true
            })
         }
      })
      .catch(err=>{
         console.log(err);
      })
   }

   callDelete=(id)=>{
      const userId = firebase.auth().currentUser.uid
      axios
         .delete(`${API_URL}/userBucketList/user/${userId}/${id}`)
         .then(response=>{
            this.setState({
               userList:response.data
            })
         })
         .catch(err=>{
            console.log(err)
         })
   }

   showList=()=>{
      const userListData = this.state.userList.map(picked=>{
         return (
            <FaveCard
               key={picked.id}
               name={picked.name}
               image={picked.image}
               description={picked.description}
               id={picked.id}
               province={picked.province}
               statusVisit={picked.statusVisit}
               country={picked.country}
               callDelete={this.callDelete}
            />
         )
      })
      return userListData;
   }

   render(){
      return(
         <main className="user-page">
            <div className="user-page__video-container">
               <video className="user-page__video" autoPlay={true} loop={true}>
                  <source src={userVid}/>
               </video>
               <h1 className="user-page__title">
               Explore
               </h1>
               <div className="user-page__overlay"></div>
            </div>
            {this.state.listSection ? (

               <>
               <section className="user-page__section">
                  <h3 className="user-page__section-label"> LIST</h3>
                  <ul className="user-page__bucket-list">
                     {this.showList()}
                  </ul>
               </section>
               
               </>

            ):(

               <>
               <section className="user-page__section">
                  <h1>Empty List fool, add something</h1>
               </section>
               </>

               ) 
            }
         </main>
      );
   }
}

export default UserPage;
export {API_URL};