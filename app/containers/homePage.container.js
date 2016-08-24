//React library
import React from 'react';


//Axios for Ajax
import Axios from 'axios';
//Custom components
import HomePage from '../components/homePage.component';
// import AppContainer from './containers/app.container';
//import TaskListItem from '../components/taskLists.component';
//import MyCanvas from '../components/myCanvas.component';
//import Search from '../components/search.component';
//import Footer from '../components/footer.component';
//import MenuBar from '../components/menuBar.component';

class HomePageContainer extends React.Component {

  constructor(props) {
    super(props);
   }

  render () {
    const scotchStyle = {
      width: '1000px',
      height: '700px'
     
    }
    return (
      <div >
       <HomePage />

     
      </div>
    );
  }
}

export default HomePageContainer
