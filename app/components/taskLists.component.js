import React from 'react';
import ClassNames from 'classnames';


class TaskListItem extends React.Component{
    constructor(props) {
        super(props);
    }
    intoApp(chosenOne){
    $('.homePageClass').toggle('fade left');
    	 this.props.onClickThis(chosenOne);
    }
    removeListBtnClick(){
      console.log(this.props.task._id);
      this.props.onRemoveListClick(this.props.task._id);
    }

    render(){
      
      var title = this.props.task._listTitle;
      var grandparent=this.props.grandparent;
        return (
          <div className="item" >
            <button className="ui avatar image list-item-icon" ></button>
            <div className="list-item-content" onClick={this.intoApp.bind(this,this)}>
              <a className="header">{title}</a>
            </div>
            <div className='listsMenu' > 
              <i className='remove icon' onClick={this.removeListBtnClick.bind(this)} />
            </div>
          </div>
        );
    }
}

class TaskLists extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          chosenOne:{
            _id:0,
            _listTitle:"",
            _url:"",
            _children:[]
          }
        }
    }
    handleTaskClick(ChosenOne){
      
        this.props.onTaskListsClicked(ChosenOne.props.task);
    }
    render(){
          var taskListsView = this.props.lists.map(function(task) {
              var props = {
                onClickThis: this.handleTaskClick.bind(this), 
                onRemoveListClick: this.props.onRemoveList.bind(this),
                task: task
              }
              return <TaskListItem  key={"list"+task._id} {...props} />
            }, this);

      return (
          <div className="ui middle aligned divided list">
              {taskListsView}
          </div>
        );
    }

}

export default TaskLists
