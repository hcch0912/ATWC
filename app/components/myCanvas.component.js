import React from 'react';
import ClassNames from 'classnames';

import TaskNode from '../components/taskNode.component';


import jsplumb from 'jsplumb'

class MyCanvas extends React.Component {
  constructor(props) {
    super(props);    
  }

  onTaskClick(chosenTask){
  	this.props.onTaskClick(chosenTask.props.thisTask);
  } 
  openChangeUrlModal(that){
    $('.small.modal.url')
    .modal( {
        onApprove : function() {
             var url = document.getElementById('url_input').value;
              that.props.onStartNodeSaveChange(url);
        }
    })
    .modal('show');
  }
  componentDidMount(){
      $.contextMenu({
          selector: '#myCanvas',
          zIndex: 30, 
          callback: function(key, options) {
              if(key == 'paste'){
                onPasteClick();
              }
              if(key == 'clearResult'){
                onClearResultClick();
              }
          },
          items: {
              "paste": {name: "Paste", icon: "paste"},
              "clearResult" : {name:"Clear Result", icon:"delete"}      
          }
      });    
      var onPasteClick=function(){
        this.props.onPasteClickMain();
      }.bind(this);
      var onClearResultClick=function(){
        this.props.onClearResult();
      }.bind(this)
  }
  render(){
  	var tasks=this.props.taskList._children;
    var taskListView = tasks.map((task,index) => {
      let idx = index
    var props = {
       onTaskNodeClick: this.onTaskClick.bind(this), 
       thisTask: task,
       thisList:this.props.taskList,
       resultList:this.props.resultList,
       onClickDeleteMenu:this.props.onDeleteNode.bind(this),
       onClickCopyMenu:this.props.onCopyNode.bind(this)
     }
     return (<TaskNode key={"node"+this.props.taskList._id+"."+task._id}  index={idx} ref={"node"} {...props} />)
   }, this);
  	var startNodeStyle={
    	marginLeft: '77px'
  	}
    return(
      <div  className="myCanvasClass" id="myCanvas" key={"canvas"+this.props.taskList._id} >
            <div className  =  "ui small modal url">
              <div className =  "header">Url</div>
              <div className = "content">
                <div className = "ui labeled input">
                  <a className = "ui red ribbon label">
                    Title:   
                  </a>
                  <input id = "url_input" type = "text" placeholder = "url"/>
                </div>
              </div>
              <div className = "actions">
                <div className = "ui cancel button" >Cancel</div>
                <div className = "ui approve button" >OK</div>
              </div>
            </div>
    		<div onDoubleClick={this.openChangeUrlModal.bind(this,this)} key={"startNode"+this.props.taskList._id} className="ui label massive teal squareNode"  data-tooltip={this.props.taskList._url}>
    		  <i className="pointing right icon" ></i>
    		 {this.props.taskList._listTitle}
         
    			<div className="endpoint endpoint_right" style={startNodeStyle} ></div>
    		</div>
		    

    	{taskListView }
      </div>

    )
  }

}

export default MyCanvas
