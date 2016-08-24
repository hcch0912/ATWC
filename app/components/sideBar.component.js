import React from 'react';
import classNames from 'classnames';

class sideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      title:this.props.thisTask._taskTitle,
      content:[]
    }

  }

  onClickOKBtn(){
    var newTitle=$('#titleInput').val();
    var newContent=[];
    var contents=$(".ui.right.labeled.input");
    var i=0;
    for(;i<contents.length;i++){
      var action=contents[i].firstChild.value;
      var target=contents[i].lastChild.value;
      newContent.push({_action:action,_target:target});
    }
    var taskNode={
            _id:this.props.thisTask._id,
            _taskTitle:newTitle,
            _taskContent:newContent,
            _position:this.props.thisTask._position
    };
    this.props.onSave(taskNode);
  }
  onTitleInput(){
    var newTitle=$('#titleInput').val();
    var taskNode={
            _id:this.props.thisTask._id,
            _taskTitle:newTitle,
            _taskContent:this.props.thisTask._taskContent,
            _position:this.props.thisTask._position
    };
    this.props.onInputChange(taskNode);
  }
  onSelectChange(){
   
    var newContent=[];
    var contents=$(".ui.right.labeled.input");
    var i=0;
    for(;i<contents.length;i++){
      var action=contents[i].firstChild.value;
      var target=contents[i].lastChild.value;
      newContent.push({_action:action,_target:target});
    }
    var taskNode={
            _id:this.props.thisTask._id,
            _taskTitle:this.props.thisTask._taskTitle,
            _taskContent:newContent,
            _position:this.props.thisTask._position
    };
     this.props.onInputChange(taskNode);
  }
  onClickCancelBtn(){
    $('.sideBarClass').toggle('Fade Left');
  }
  onClickAddBtn(){
    var actionTemp=
            "<div class='ui right labeled input' name='oneContent'>"
               +"<select class='ui compact selection dropdown'>"
                +"<option selected='' value='click'>click</option>"
                +"<option  value='setValue'>set value</option>"
                +"<option value='assert'>assert</option>"
               +"</select>"
               +"<input type='text' placeholder='Target' />"
            +"</div>"
    $('.sideBarTasklist').append(actionTemp);
  }
  
  render(){
    var contentList=this.props.thisTask._taskContent.map(function(oneContent){
         return (
           <div className='ui right labeled input' name='oneContent' key={"sidebarContent:"+this.props.thisTask._taskContent.indexOf(oneContent)} >
               <select className='ui compact selection dropdown' value={oneContent._action} onChange={this.onSelectChange.bind(this)}>
                <option  value='click'>click</option>
                <option  value='setValue'>set value</option>
                <option  value='assert'>assert</option>
               </select>
               <input type='text' value={oneContent._target} onChange={this.onSelectChange.bind(this)}/>
            </div>

          );
    },this);
  
    return(
 
      <div className="sideBarClass" key={"sideBar"+this.props.thisTask._id}  style={{display:'none'}}>
        <h5 className="ui icon header">
          <i className="write icon"></i>
          <div className="content">
            Task Settings
          </div>
        </h5>
        <div className="ui labeled input">
              <a className="ui red ribbon label">
                Title: 
              </a>
              <input id='titleInput' type="text"  value={this.props.thisTask._taskTitle} onInput={this.onTitleInput.bind(this)}/>
        </div>
        <div className="sideBarTasklist" key={"sideBarContent"+this.props.thisTask._id}  >
            {contentList}
       
        </div>
        <button className="ui orage basic button addActionBtn" onClick={this.onClickAddBtn.bind(this)}>
        Add 
        </button>
        <button className="ui teal basic button settingOkBtn" onClick={this.onClickOKBtn.bind(this)} >
              OK
        </button>
        <button className="ui red basic button settingCancelBtn" onClick={this.onClickCancelBtn.bind(this)}>
              Cancel
        </button>
      </div>
    )
  }

}

export default sideBar
