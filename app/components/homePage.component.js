import React from 'react';
import ClassNames from 'classnames';
import ReactDom from 'react-dom';

import TaskLists from '../components/taskLists.component';
 import MainPageContainer from '../containers/mainPage.container';

import jsplumb from 'jsplumb'
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists:[{
        _id:0,
        _listTitle:"",
        _url:"http://",
        _children:[],
        _connects:[{sourceNodeId:0,targetNodeId:0}]
      }]
      ,chosenOne:{
        _id:0,
        _listTitle:"",
        _url:"http://",
        _children:[{
             _id:0,
             _taskTitle:"",
             _taskContent:[{
                      _action:"",
                      _tartget:""
                      }],
             _position:{top:0,left:0}
             }
          ]
        // _connects:[{sourceNodeId:0,targetNodeId:0}]
      }
      
    }
  }
  componentDidMount(){
    db.find({}, function (err, lists) {
            if(err){
              console.log(err);
            }
            if(lists.length!= 0){
               this.setState({lists:lists});
             }
        }.bind(this));
  }

  addTaskListModa(that){
    $('.small.modal.addTask')
    .modal( {
        onApprove : function() {
             var title = document.getElementById('task_title_input').value;
             addTaskListDB(title,that);
        }
    })
    .modal('show');
  }
  onTaskListsClicked(ChosenOne){
     $('#myCanvas').empty();
      this.setState({chosenOne:ChosenOne});
      // this.forceUpdate();
  }
  handleAddNewNode(){
    var count  =  this.state.chosenOne._children.length;
    var idCount=0;
    if(count != 0) {
      idCount=this.state.chosenOne._children[count-1]._id;
    }
    var newNode  =  {
      _id : idCount + 1,   
      _taskTitle : "",
     _taskContent : [{
                _action:"",
                _tartget:""
                }],
      _position : {top:0,left:0}
    }
    var oldChosenOne  =  this.state.chosenOne;
    oldChosenOne._children.push(newNode);
    this.setState({chosenOne:oldChosenOne});
  }
  handleSaveStatus(){
    
    var newListWithPos  =  updateCurrentListWithPosAndConn(this.state.chosenOne);
    this.setState({chosenOne:newListWithPos});

    // $('#myCanvas').remove('svg');
    
  }
  handleSave(){

    var newListWithPos  =  updateCurrentListWithPosAndConn(this.state.chosenOne);
    this.setState({chosenOne:newListWithPos});
    var currentList  =  this.state.chosenOne;
    db.update({_id:currentList._id},{$set:{_children:currentList._children,_url:currentList._url}},function(err,numReplaced){
      if(err){
        console.log(err);
      }
      console.log(numReplaced + " results updated");
    });
  }
  handleSettingSave(task){
    var id  =  task._id;
    var oldChosen  =  this.state.chosenOne;
    oldChosen._children[id - 1]  =  task;
    this.setState({chosenOne:oldChosen});
    $('.sideBarClass').toggle('fade left');
    $('#targetInput').val("");
    $('#valueInput').val("");

  }
  handleChangeURL(newURL){
    var oldChosen  =  this.state.chosenOne;
    oldChosen._url=newURL;
    this.setState({chosenOne:oldChosen});
  }
  handleDeleteNode(taskId){

    jsplumb.detachAllConnections($('#'+taskId).find('.endpoint_right')[0]);
    jsplumb.detachAllConnections($('#'+taskId).find('.endpoint_left')[0]);
   
    var oldChosenOne=this.state.chosenOne;
    var i=0;
    for(;i < oldChosenOne._children.length;i++){
      if(oldChosenOne._children[i]._id == taskId){
        oldChosenOne._children.splice(i,1);
        this.setState({chosenOne:oldChosenOne});
       break;
      }
    }
  // $('#'+taskId).remove();
    // var conntections=this.state.chosenOne._connects;
    // var thischosenOne=this.state.chosenOne;
    // var i=0;
    // for(;i<thischosenOne._connects.length;i++){
    //   if(thischosenOne._connects[i].sourceNodeId == taskId || thischosenOne._connects.targetNodeId == taskId){
    //        thischosenOne._connects.splice(i,1);
    //        this.setState({chosenOne:thischosenOne});
         
    //   }
    // }
  }
  handleCopyNode(taskId){
    var copiedNode="";
    var i=0;
    for(;i < this.state.chosenOne._children.length;i++){
      if(this.state.chosenOne._children[i]._id == taskId){
        copiedNode=this.state.chosenOne._children[i]
        break;
      }
    }
    clipboard.writeText(JSON.stringify(copiedNode));
   
  }
  handlePasteNode(){
    var copiedNode=JSON.parse(clipboard.readText());
    var count=this.state.chosenOne._children.length;
    var newNode={
      _id:count + 1,
      _taskTitle:copiedNode._taskTitle,
      _taskContent:copiedNode._taskContent,
      _position:{
        top:copiedNode._position.top+30,
        left:copiedNode._position.left+30
      }
    }
    var oldChosenOne=this.state.chosenOne;
    oldChosenOne._children.push(newNode);
    this.setState({chosenOne:oldChosenOne});

  }
  handleRemoveList(listId){
      var oldlist=this.state.lists;
      var i=0;
      for(;i<oldlist.length;i++){
        if(oldlist[i]._id == listId){
          oldlist.splice(i,1);
          this.setState({lists:oldlist});
          removeList(listId);
          break;
        }
      }
  }
  render(){
    if(this.state.lists){
     var props  =  {
        lists:this.state.lists,
        onTaskListsClicked:this.onTaskListsClicked.bind(this),
        onRemoveList:this.handleRemoveList.bind(this)
      }
    }
    var propsForMainPage  =  {
      tasklist:this.state.chosenOne,
      onAddNewNode:this.handleAddNewNode.bind(this),
      onSave:this.handleSave.bind(this),
      onSettingSave:this.handleSettingSave.bind(this),
      onStatusSave:this.handleSaveStatus.bind(this),
      onChangeURL:this.handleChangeURL.bind(this),
      onDeleteNodeHome:this.handleDeleteNode.bind(this),
      onCopyNodeHome:this.handleCopyNode.bind(this),
      onPasteNodeHome:this.handlePasteNode.bind(this)
    }
    return(
      <div>
        <div  className  =  "homePageClass">
          <div className  =  "homePageMenu">
            <div className  =  "ui small modal addTask">
              <div className =  "header">Add Task</div>
              <div className = "content">
                <div className = "ui labeled input">
                  <a className = "ui red ribbon label">
                    Title:   
                  </a>
                  <input id = "task_title_input" type = "text" placeholder = "Task Title"/>
                </div>
              </div>
              <div className = "actions">
                <div className = "ui cancel button" >Cancel</div>
                <div className = "ui approve button" >OK</div>
              </div>
            </div>
            <button className = "ui green basic circular add icon button" onClick = {this.addTaskListModa.bind(this,this)} >
              <i className = "add icon"></i>
              <a> Add Task </a>
            </button>
          </div>
          <div className = "homePageCenter" >
            <TaskLists  {...props} />
          </div>
        </div>
       <MainPageContainer {...propsForMainPage}  />
      </div>
    )

  }

}

export default HomePage
