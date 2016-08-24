import React from 'react';
import ClassNames from 'classnames';
import jsplumb from 'jsplumb';

//import electron from 'electron';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
  }
  /*Hide ,Show side bar ,for click Task Node*/
  toggleHide(){
    $('.sideBarClass')
  .transition('fade right');
  }
  toggleShow(){
    $('.sideBarClass').removeClass('hidden transition');
  }
  backHome(){
    $('.homePageClass').removeClass('hidden transition');
    $('.homePageClass').show();
    
    this.props.onBackToHome();

    //jsPlumb.deleteEveryEndpoint();
  }
  onPlayBtnClick(){
    
   this.props.onPlayBtnClick();
  }
  onStopBtnClick(){
    stopTest();
  }

  render(){
    
    return(

      // <div className="menuBarClass" id="menuBarId">
      <div className=" menuBarClass">
             <div className="menuBar-buttons">
                  <button className="ui toggle circular green icon button" id="playBtn" onClick={this.onPlayBtnClick.bind(this)}>
                        <i className="icon play"></i>
                  </button>

                  <button className="ui toggle circular red icon button" id="stopBtn"  onClick={this.onStopBtnClick.bind(this)}>
                        <i className="icon stop"></i>
                  </button>
            </div>
            
              <h3 className="right-floated-header" onClick={this.backHome.bind(this)}>
                Auto Test WorkFlow
              </h3>
            
      </div>
    )
  }

}

export default MenuBar
