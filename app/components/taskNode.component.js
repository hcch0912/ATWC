import React from 'react';
import ClassNames from 'classnames';


import jsplumb from 'jsplumb'


class TaskNode extends React.Component {

	constructor(props) {
	    super(props);
	}
	handlePassResult(){
		this.setState({pass:true});
	}
	handleFailResult(){
		this.setState({fail:true});
	}
  	componentDidMount(){
 	
	var endpointOptions = {
	    isSource:true, 
	    connector : ["Flowchart",{stub:5}],
	    isTarget:true,
	     anchors:[ [0,0.5,-1,0],[0.5,0,0,-1] ],
	     endpointStyle:{ fillStyle:"#5cd6d6", outlineColor:"white", outlineWidth:2 }


	}; 
	jsPlumb.bind("connection", function(info) {
   		
	});
    jsPlumb.importDefaults({
	    Container:"myCanvas", 
		    PaintStyle : {
			    lineWidth:6,
			    strokeStyle: 'grey'
		}
    });

  	var nodes=jsplumb.getSelector(".squareNode");
  	var startNodes=jsplumb.getSelector(".endpoint_right:not(.jsplumb-droppable)");
  	var endNodes=jsplumb.getSelector(".endpoint_left:not(.jsplumb-droppable)");
  	  jsplumb.draggable(nodes,{ filter:".endpoint" });
  	  jsplumb.makeSource(startNodes,endpointOptions);
  	  jsplumb.makeTarget(endNodes,endpointOptions);
 	

  	
 	    var connects=this.props.thisList._connects;
		    var i = 0;
		    if(connects){
		      for(;i<connects.length;i++){
		        var startPoint=$('#'+connects[i].sourceNodeId).find('.endpoint_right')[0];
		        
		        var endPoint=$('#'+connects[i].targetNodeId).find('.endpoint_left')[0];
		        if(startPoint && endPoint){
		        	jsplumb.connect({
			          source:startPoint.id,
			          target:endPoint.id
			        });
		        }
		        
		      }
		}

		$.contextMenu({
	        selector: '.squareNode', 
	        zIndex: 30,
	        callback: function(key, options) {
	        	if(key == 'delete'){
	        		thisOnClickDeleteMenu(this.context.id);
	        	}
	        	if(key == 'copy'){
	        		console.log(this.context.id);
	        		thisOnClickCopyMenu(this.context.id);
	        	}
	        },
	        items: {
	            "copy": {name: "Copy", icon: "copy"},
	            "delete": {name: "Delete", icon: "delete"}            
	        }
	    });
	  	var thisOnClickDeleteMenu=function(taskId){
	  		
	  		this.props.onClickDeleteMenu(taskId);
	  	}.bind(this);

		var thisOnClickCopyMenu=function(taskId){
			this.props.onClickCopyMenu(taskId);
		}.bind(this);


  	}
  	
	render(){
		var taskTitle=this.props.thisTask._taskTitle
			,taskContent=this.props.thisTask._content
			,id=this.props.thisTask._id
			,position=this.props.thisTask._position
            ,x=0
            ,y=0
            ,NodeStyle={'left':0,'top':0};
        if(position.top==0&&position.left==0){
        	y=Math.floor(id/5);
			x=id%5;
			NodeStyle = {
			'left':50+x*180+"px",
			'top':50+180*y+"px"
		};
        }else{
        	x=position.left;
        	y=position.top;
        	NodeStyle = {
        	'left':x+"px",
			'top':y+"px"
        	}
        }

		var passResult
		,	failResult
		,	failReason;
		if(this.props.resultList[id-1]||this.props.resultList[id-1]!= null){
			passResult=this.props.resultList[id-1].pass;
		}else{
			passResult=false;
		}
		if(this.props.resultList[id-1]||this.props.resultList[id-1]!=null){
			failResult=this.props.resultList[id-1].fail;
		}else{
			failResult=false;
		}
		if(this.props.resultList[id-1]||this.props.resultList[id-1]!=null){
			failReason=this.props.resultList[id-1].failReason;
		}else{
			failReason="Can't define the reason";
		}
		
		return(
			<div id={id} key={"node"+this.props.thisListId+"."+id} className="squareNode" onClick={this.props.onTaskNodeClick.bind(this,this)} style={NodeStyle}>
				<div className="endpoint endpoint_left" ></div>
				<p className="NodeAttr">{id}</p>
				<p className="NodeAttr">{taskTitle}</p>
			
				<div className="endpoint endpoint_right" ></div>
				{passResult ? <div className="floating ui green label">PASS</div>:null }
				{failResult ? 
					<div className="floating ui red label" data-tooltip={failReason} >
					FAIL
					</div>:null }

			</div>
			)
		
	}
}



export default TaskNode;



