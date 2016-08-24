
var update = require('react-addons-update');
var Datastore = require('nedb')
   , db = new Datastore({ filename: 'datafile', autoload: true });

db.ensureIndex({ fieldName: '_id', unique: true }, function (err) {
});

function addTaskListDB(title,that){
	var currentcount = 0;
		
	db.count({}, function (err, count) {
		if(err){
			console.log(err);
		}
  		currentcount = count + 1;
  		var	 taskList = {
				_id:currentcount,
				_listTitle:title,
                _url:"http://",
				_children:[],
				_connects:[]
		}
		db.insert(taskList, function (err, newDoc) {   
			if(err){
				console.log(err);
			}
			console.log("successful");
		  	    db.find({}, function (err, lists) {
	                  if(err){
	                    console.log(err);
	                  }
	                  if(lists.length!=0){
	                     that.setState({lists:lists});
	                   }
	       });
		});
	});
}


function updateCurrentListWithPosAndConn(thisList){

    var connects=getConnections(thisList);
    thisList._connects=connects;
    var nodesPosition=[];
        $("#myCanvas").find('.squareNode:not(label)').each(function(){
            nodesPosition.push({
                id:this.id,
                position:{left:this.offsetLeft,top:this.offsetTop}
            })
        });
    //save the connections data  in the db of this tasklist.
    db.update({_id:thisList._id},{$set:{_connects:connects}},function(err,numReplaced){
    	if(err){
    		console.log("err in update connects"+err);
    	}
    	console.log("update connects "+numReplaced);
    });
    

    var j = 0;
    for(;j<nodesPosition.length;j++){
    	if($.isNumeric(nodesPosition[j].id)){
            //TODO  when delete some nodes, can't be accessed by index 
            var q=0;
            for(;q<thisList._children.length;q++){
                if(thisList._children[q].id == nodesPosition[j].id){
                    thisList._children[q]._position = nodesPosition[j]._position;
                }
            }
    		//thisList._children[nodesPosition[j].id-1]._position = nodesPosition[j].position;
    	}
    }
   
    return thisList;
    //console.log(nodesPosition);
}

function getConnections(thisList){
    var shapesData = [];
    $("#myCanvas").find('.endpoint').each(function() {
    shapesData.push({
            id: this.id,
            targetConnection: jsPlumb.getConnections({target: this}),
            sourceConnection: jsPlumb.getConnections({source: this})
        });
    });
    var connects =[]
    var i=0;
    for(;i<shapesData.length;i++){

        if(shapesData[i].targetConnection.length!=0){
            var sourceID=shapesData[i].targetConnection[0].sourceId
            , sourceParent=$('#'+sourceID)[0].parentNode.id
            , targetParent=$('#'+shapesData[i].id)[0].parentNode.id;
            
            connects.push({
                sourceNodeId:sourceParent,
                targetNodeId:targetParent
            });
        }
    }
    return connects;
}


function removeList(listId){
    db.remove({_id:listId});
}
