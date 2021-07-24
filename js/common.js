
var dataArray = [
  {mobile:9049246994, email:'sample@gmail.com', name:'Sample', accno:123123123, homelimit:100000, nonhomelimit:300000, avgmonthly:500000},
  {mobile:1234567890, email:'12345@gmail.com', name:'Sample', accno:1234567890, homelimit:100000, nonhomelimit:300000, avgmonthly:500000},
  {mobile:98765543210, email:'98765@gmail.com', name:'Sample', accno:9876543210, homelimit:100000, nonhomelimit:300000, avgmonthly:500000},
  {mobile:1111111111, email:'1@gmail.com', name:'Sample', accno:1111111111, homelimit:100000, nonhomelimit:300000, avgmonthly:500000}
]; 


$( function() {
 
});

// ionRangeSlider start
function RangeSlider(sliderName, minVal, maxVal, fromVal, gridNum, dream_cost, step) {
    $("#" + dream_cost).val(fromVal);
    $("#" + sliderName).ionRangeSlider({
        skin: 'big',
        min: minVal,
		step:step,
        max: maxVal,
        from: fromVal,
        grid: true, // default false (enable grid)
        grid_num: gridNum, // default 4 (set number of grid cells)
        grid_snap: false,
        onStart: function(data) {
            var obj = $(data.slider[0]);
            setDigit(obj)
        },
        onUpdate: function(data) {
            var obj = $(data.slider[0]);
            setDigit(obj)
        },
        onChange: function(data) {
            var $inp = $(data);
            var v = $inp.prop("from");
            $("#" + dream_cost).val(v);
			       calculate();
        }
    });
    $(document).on('change keyup', "#" + dream_cost, function() {
        var getVal = $(this).val();
        var d5_instance = $("#" + sliderName).data("ionRangeSlider");
        d5_instance.update({
            from: getVal
        });
    });
}

function setDigit(obj) {
    obj.find(".irs-grid-text").each(function(index, element) {
        // console.log($(element).text());
        var val = parseInt($(element).text().trim().replace(/ /g, ""));
        var str = numDifferentiation(val)
        $(element).html(str);
    })
}

function numDifferentiation(val) {
    if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr';
    else if (val >= 100000) val = (val / 100000).toFixed(2) + ' L';
    else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K';
    return val;
}
// ionRangeSlider end


var calculate = {
    login:function(){
      var uname = $("#uname").val();
      //var acc  = $("#acc").val();
      if (uname ==""){
        alert("Enter mobile no / Email ID");
        return false;
      }else{
        var bool = false;
        for (i in dataArray){
          if (uname == dataArray[i].mobile){
              bool = true;
          }
        }
        if (bool == false){
          alert("Not a valid user");
        }else{
          $('#otp_modal').modal('show');
        }
      }
    },
    checkOtp:function(otp){
      if (otp==""){
        alert("Enter otp")
      }else if(otp!="123"){
        alert("Valid OTP")
      }else{
        localStorage.setItem("uname", $("#uname").val())
        location.href = "home.html";
      }
    },
    setData:function(){
      var obj = {};
      var uname = Number(localStorage.getItem("uname"));
      for (i in dataArray){
          if (uname==dataArray[i].mobile){
            obj = dataArray[i];
          }
      }

      if (obj){
        $("#homelimit").text(obj.homelimit);
        $("#nonhomelimit").text(obj.nonhomelimit);
        $("#avgmonthly").text(obj.avgmonthly);
        

      }
    }
}

 function addCommas(nStr) {
                nStr += '';
                x = nStr.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                var z = 0;
                var len = String(x1).length;
                var num = parseInt((len/2)-1);
            
                while (rgx.test(x1)) {
                    if(z > 0)
                    {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    else
                    {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                        rgx = /(\d+)(\d{2})/;
                    }
                    z++;
                    num--;
                    if(num == 0)
                    {
                        break;
                    }
                }
                return x1 + x2;
            }
            // Slider End
