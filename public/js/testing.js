var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
const {clipboard} = require('electron');
const {dialog} = require('electron').remote;
var fs = require('fs');

function test(taskList,that){
  
    var tasks=taskList._children;
    var url=taskList._url;
    client
        .init()
        .url(url);
        var count1=0;
        listIteration(count1,tasks,that)
    client.on('error',function(e){
                            console.log(e.body.value.message);
     });
}

function listIteration(count1,tasks,that){
    var length1=tasks.length;
    if(count1 === undefined) count1 = 0;   
    if(count1>=length1){
        client.end();
        return
    }
    var content=tasks[count1]._taskContent;
    var count2=0;
    taskIteration(count2,content.length,content,tasks[count1]._id,count1,tasks,that);
   
}
function taskIteration(count2,length2,content,task_id,count1,tasks,that){
   
    if(count2 === undefined) count2 = 0;   
    if(count2>=length2){
        count1++;
        listIteration(count1,tasks,that);
        return
    }
                var action=content[count2]._action;
                var target=content[count2]._target;
                
                    if(action=="click"){
                        client.click("#"+target).then(function(){
                            console.log("click"+target);
                             count2++;
                             taskIteration(count2,length2,content,task_id,count1,tasks,that);
                        }).catch(function(err){
                            console.log("error"+err);
                            if( ! err.match('session')){
                             oldResult[count1].failReason=err;
                             oldResult[count1].fail=true;
                             that.setState({resultList:oldResult});
                         }
                        });
                        
                        
                    }
                    if(action=="setValue"){
                        var temp=target.split(';');
                        client.setValue("#"+temp[0],temp[1]).then(function(){
                             console.log("set"+target);
                             count2++;
                             taskIteration(count2,length2,content,task_id,count1,tasks,that);
                        }).catch(function(err){
                            console.log("error"+err);
                              var oldResult=that.state.resultList;
                              oldResult[count1].fail=true;
                              oldResult[count1].failReason=err;
                            that.setState({resultList:oldResult});
                        });
                       
                    }  
                    if(action== "assert"){
                        var temp=target.split(';');
                        client.getText("#"+temp[0]).then(function(value) {
                           console.log(value);
                           if(value != temp[1]){
                            console.log("not pass");
                            var oldResult=that.state.resultList;
                            oldResult[count1].fail=true;
                            oldResult[count1].failReason="Result value not match"
                            that.setState({resultList:oldResult});

                           }
                           else if(value == temp[1]){
                            console.log("pass");
                            var oldResult=that.state.resultList;
                            oldResult[count1].pass=true;
                            that.setState({resultList:oldResult});
                           }
                           count2++;
                           taskIteration(count2,length2,content,task_id,count1,tasks,that);
                        }).catch(function(err){
                            console.log("error"+err);
                              var oldResult=that.state.resultList;
                             oldResult.failReason=err;
                              oldResult.fail=true;
                            that.setState({resultList:oldResult});
                        });

                   }
   
}
function stopTest(){
    client.end();
}
function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = 'id | pass | fail |fail reason\r\n';

    for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') {
                    line += ' | '
                }
                line += array[i][index];
            }
             str += line + '\r\n';
     }

     return str;
}
function generateReport(resultList){


   dialog.showSaveDialog(function (fileName) {
    if (fileName === undefined) return;
    fs.writeFile(fileName,ConvertToCSV(resultList), function (err) { 
        if (err === undefined || err ===null) {
           dialog.showMessageBox({ message: "The file has been saved! :-)",
            buttons: ["OK"] });
         } else {
           dialog.showErrorBox("File Save Error", err.message);
         }  
    });
  });
}
