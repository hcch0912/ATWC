//React libraries
import React from 'react';
import ReactDOM from 'react-dom';

//Import Container component

import HomePageContainer from './containers/HomePage.container'



class App extends React.Component {
  render () {
    return (
      <div className="ParentContainer">
        <HomePageContainer />
      
      </div>
    );
  }
}
class HomePage extends React.Component{
	render(){
		return(
		<HomePageContainer />
		);
	}
}

// Render to index.html
ReactDOM.render(
  <App />,
  document.getElementById('myBody')
);
