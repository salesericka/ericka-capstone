import React from 'react';
import './UserPage.scss';
import axios from 'axios';
import FaveCard from '../../components/FaveCard/FaveCard';


const API_URL = process.env.REACT_APP_API_URL;

class UserPage extends React.Component{
   state={
      userList:[],
   }
   componentDidMount(){
      this.fetchList();
   }

   fetchList=()=>{
      axios.get(`${API_URL}/userBucketList`)
      .then(response=>{
         console.log(response.data)
         this.setState({
            userList:response.data
         })
      })
      .catch(err=>{
         console.log(err);
      })
   }

   callDelete=(id)=>{
      axios
         .delete(`${API_URL}/userBucketList/${id}`)
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
         <main className="user-page" >
            
            <ul className="user-page__bucket-list">
               {this.showList()}
            </ul>
            <ul className="user-page__visited-list">
               
            </ul>
         </main>
      );
   }
}

export default UserPage;
export {API_URL};