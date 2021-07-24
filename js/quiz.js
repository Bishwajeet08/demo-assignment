var questions  = [];
var question = [];
var currentIndex  = 0;
var userselData = [];
var quesCount = 0;
let quiz = {
    template:"quiz_box",    
    loadData:function(url){
        that  = this;
        $.ajax({
            url:url,
            type:"GET",
            success:function(response){
                    questions = JSON.parse(response).survey;                  
                    quesCount = questions.length;
                    that.setData(questions[currentIndex]);
                    $("#loader").fadeOut();
            }
        })
    },
    goto:function (type){ /*We can reuse this if there is  a skip functionality */
        switch(type){
            case 'next':
            currentIndex++;
            break;
            case 'prev':
            currentIndex--;
            break;
            default:
            currentIndex = type;
            break;
        }
        this.setData(questions[currentIndex]);      
    },
    setData:function(data){
            $(".prev, .next").show();
            let str ="";
            if (currentIndex<quesCount){
                str+= "<h3>"+data.ID+". "+data.Name+"</h3>";
                str+="<ul class='quiz_option'>";
                for (i in data.questions){
                    let className = "";
                    if(data.questions[i].userSelection==true){
                        className ="selected";
                    }                    
                    str+="<li class='"+className+"'><a href='#' data-value='"+data.questions[i].Name+"' data-id='"+data.questions[i].qid+"'>"+data.questions[i].Name+"</a></li>"
                }
                str+="</ul>";
            }else{
                $(".buttons, .track, .flag_man").hide();
                str="<div class='quiz_result'><h2>You are almost there</h2>";
                str+="<h4>Results</h4>";
                str+="<ul class='list'>"
                for (k in userselData){
                    str+="<li>"+userselData[k].Qno+". "+userselData[k].Name+" <strong>(" + userselData[k].Selected+")</strong></li>"
                }
                str+="</ul>";
                str+="<div class='text-center'><a href='index.html' class='btn btn-primary'>Restart</a></div>";
                str+="</div>";
                
            }
            if (currentIndex<1){
                $(".prev").hide();
            }
            guyMove(".guy", currentIndex);
            document.getElementById(this.template).innerHTML =str;
    },
    selUpdate:function(qid){
        let question = questions[currentIndex];
        for (j in question.questions){
            question.questions[j].userSelection = false;
            if (question.questions[j].qid==qid){
                question.questions[j].userSelection = true;
            }
        }
        //console.log(questions[currentIndex]);
    }
   
}

quiz.loadData("quiz.txt");
$(document).on("click", "div.quiz_box li a", function(){
    $("div.quiz_box li").removeClass("selected");
    $(this).parent("li").addClass("selected")
    return false;
})
$(document).on("click", ".next", function(){
       if ($("div.quiz_box").find("li.selected").length<1){           
            $(".message").html("Please select atleast one").addClass("show");
            setTimeout(function(){$(".message").removeClass("show")}, 3000)
        }else{
            let selId = $("div.quiz_box").find("li.selected a").attr("data-id");
            let selVal = $("div.quiz_box").find("li.selected a").attr("data-value");
            /*Updating question object to store previous data selection */
            quiz.selUpdate(selId);                      
            /*Storing data in variable as Object*/
            let uData = {Qno:(currentIndex+1),Name:questions[currentIndex].Name, Selected:selVal, SelectedID:parseInt(selId)}
            if (userselData.length==currentIndex){
                userselData.push(uData);    
            }else{
                userselData[currentIndex] = uData;
            }
            /*We can store user selected data on client localstorage if we want to start the survey where user has left from*/            
            localStorage.setItem("userData", JSON.stringify(userselData));
            quiz.goto('next');
            console.log(uData.Selected);
            console.log(userselData);
        }
        return false;        
})
$(document).on("click", ".prev", function(){
    if (currentIndex>0){
        quiz.goto('prev');
    }
    return false;
})

function guyMove(obj, index){
    let percent = ((index/quesCount)*100);
    if (percent<=100){
        $(obj).animate({left:percent+"%"}, 100);
    }
}






