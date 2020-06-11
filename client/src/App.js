import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import LocationPage from './pages/LocationPage/LocationPage';
import MapBox from './pages/LocationPage/MapBox';
class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/location" component={LocationPage}/>
          {/* <Route path="/location" component={MapBox}/> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;