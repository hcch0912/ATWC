//React library
import React from 'react';
//Sound component

//Axios for Ajax
import Axios from 'axios';
//Custom components
//import Details from '../components/details.component';
import SideBar from '../components/sideBar.component';
import MyCanvas from '../components/myCanvas.component';
//import Search from '../components/search.component';
//import Footer from '../components/footer.component';
import MenuBar from '../components/menuBar.component';

class MainPageContainer extends React.Component {

  constructor(props) {
     super(props);
     this.state={

      ChosenTaskNode:{
               _id:0,
               _taskTitle:"",
               _taskContent:[{
                            _action:"",
                            _tartget:""
                            }],
               _position:{top:0,left:0}
      } 
    ,resultList:[{
        id:0,
        pass:false,
        fail:false,
        failReason:""
      }]
    }
   }
  handleTaskClick(task){
   
    this.setState({ChosenTaskNode:task});
    $('.sideBarClass').removeAttr("style");
    //$('.sideBarClass').show();
    
  }
  onAddBtnClick(){
      this.props.onAddNewNode();
  }
  onSaveBtnClick(){
      this.props.onSave();
  }
  onReportBtnClick(){
      generateReport(this.state.resultList);
  }
  handleSettingSave(task){
      this.props.onSettingSave(task);
  }
  handleStartNodeChange(newUrl){
      this.props.onChangeURL(newUrl);
  }
  handlePlayBtnClick(){
      var resultListLength=this.props.tasklist._children.length;
      var i=0;
      var resultList1=[];
      for(;i<resultListLength;i++){
        resultList1.push({id:i,pass:false,fail:false,failReason:""});
      }
      this.setState({resultList:resultList1});
      test(this.props.tasklist,this);
  }
  handleChange(task){
    this.setState({ChosenTaskNode:task});
    
  }
  handleClearResult(){
    this.setState({resultList:[{
        id:0,
        pass:false,
        fail:false,
        failReason:""
      }]});
  }
  render () {
    const scotchStyle = {
      width: '1000px',
      height: '700px'
    }
    var props={
      taskList:this.props.tasklist,
      onTaskClick:this.handleTaskClick.bind(this),
      onStartNodeSaveChange:this.handleStartNodeChange.bind(this),
      resultList:this.state.resultList,
      onDeleteNode:this.props.onDeleteNodeHome.bind(this),
      onCopyNode:this.props.onCopyNodeHome.bind(this),
      onPasteClickMain:this.props.onPasteNodeHome.bind(this),
      onClearResult:this.handleClearResult.bind(this)

    }

    var sideBarProps = {
      onSave : this.handleSettingSave.bind(this),
      thisTask : this.state.ChosenTaskNode,
      onInputChange : this.handleChange.bind(this)
    }
    var propsForMenuBar = {
      onBackToHome:this.props.onStatusSave,
      thisList:this.props.tasklist,
      onPlayBtnClick:this.handlePlayBtnClick.bind(this)
      
    }
    return (
      <div className="appPage" style={scotchStyle}>
        <MenuBar {...propsForMenuBar} />
        <MyCanvas {...props} ref={"list"} />
        <SideBar  {...sideBarProps}  />
        <div  id="addNodeBtn" className="circular red ui icon button addBtn" onClick={this.onAddBtnClick.bind(this)}>
          <i className="icon add"></i>
        </div>
        <div  id="saveBtn" className="circular green ui icon button saveBtn" onClick={this.onSaveBtnClick.bind(this)}>
          <i className="icon save"></i>
        </div>
        <div  id="reportBtn" className="circular yellow ui icon button reportBtn" onClick={this.onReportBtnClick.bind(this)}>
          <i className="file text outline icon"></i>
        </div>
         
      </div>
    );
  }
}

export default MainPageContainer
