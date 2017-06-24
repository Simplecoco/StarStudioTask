/**
 * Created by 辛珀 on 2016/12/6.
 */

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

var textData={};  //graTimeAndCityChange选择出的文本数据，需要再经过initAqiChartData处理成图表需要的数据

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity:"",
    nowGraTime: "",
    oldGraTime:"",
    oldSelectCity:""
};

var randomColor={
    "#FFFF00":"#FFFF00",
    "#FF7F00":"#FF7F00",
    "#FF4500":"#FF4500",
    "#E0FFFF":"#E0FFFF",
    "#C0FF3E":"#C0FF3E",
    "#C5C1AA":"#C5C1AA",
    "#98FB98":"#98FB98",
    "#5CACEE":"#5CACEE",
    "#00FF00":"#00FF00",
    "#FFC125":"#FFC125",
    "#FF6347":"#FF6347",
    "#B0E2FF":"#B0E2FF"
};

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var weekDaysOrder=[];
    var weekDaysNumber=[];
    var date=[];
    var dataArray=[];
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 0; i < 91; i++) {
        datStr = getDateStr(dat);
        returnData[datStr]= Math.ceil(Math.random() * seed);
        dataArray[i]=returnData[datStr]; //记录数据到数组
        weekDaysOrder[i]=dat.getDay();  //记录星期序列，后面用于统计
        date[i]=datStr;                 //记录日期到数组
        dat.setDate(dat.getDate() + 1);
    }

    weekDaysNumber[0]=weekDaysOrder.indexOf(0)+1;                    //这里统计出每周有几天
    var t=Math.floor((weekDaysOrder.length-weekDaysNumber[0])/7);
    for(i=0;i<t;i++){
        weekDaysNumber[i+1]=7;
    }
    weekDaysNumber.push(weekDaysOrder.length-weekDaysOrder.lastIndexOf(1));

    returnData["weekDaysNumber"]=weekDaysNumber;
    returnData["dataArray"]=dataArray;
    returnData["date"]=date;

    Object.defineProperties(returnData,{        //设置不可枚举
        "weekDaysNumber":{enumerable:false},
        "dataArray":{enumerable:false},
        "date":{enumerable:false}
    });

    return returnData;
}


/**
 * 渲染图表
 */
function renderChart() {
    var fragment=document.createDocumentFragment();
    var boxWrap=document.getElementsByClassName("boxWrap")[0];
    var title=document.getElementsByClassName("title")[0];
    var someColor=Object.keys(randomColor);

    for(var i=0;i<chartData.boxHeight.length;i++) {
        var box = document.createElement("div");
        var hint=document.createElement("span");

        box.style.height = chartData.boxHeight[i] + "px";
        box.style.width =chartData.boxWidth + "px";
        box.style.marginLeft=chartData.boxMargin + "px";
        box.style.marginRight=chartData.boxMargin + "px";
        box.style.background=someColor[Math.round(Math.random()*(someColor.length-1))]; //随机取色
        hint.innerText=chartData["date"][i]+" : "+Math.round(textData[i]);

        switch(pageState.nowGraTime){
            case "day": title.innerText=pageState.nowSelectCity+" 1~3月 每日空气质量指数";
                break;
            case "week": title.innerText=pageState.nowSelectCity+" 1~3月 每周空气质量指数";
                break;
            case "month":  title.innerText=pageState.nowSelectCity+" 1~3月 每月空气质量指数";
        }

        if(Math.round(textData[i])>200){      //设置提示的字体颜色
            hint.style.color="#ee0000";
            hint.style.fontWeight="bolder";
        }

        box.appendChild(hint);
        fragment.appendChild(box);
    }

    boxWrap.innerHTML="";             //添加前清除（替换）
    boxWrap.appendChild(fragment);

    var fakeBox=boxWrap.getElementsByTagName("div");

    setTimeout(heightChange,0);             //css3的transtion可能需要通过事件触发，于是做了一个假的定时器，以及之前高度为0的假盒子
    function heightChange() {
        for (var j = 0; j < fakeBox.length; j++) {
            fakeBox[j].style.transform = "scale(1,1)";
        }
    }

    boxWrap.onmouseover=function(event){
        if(event.target.firstChild.nodeName=="SPAN") {
            //event.target.firstChild.style.display = "block";
            event.target.firstChild.style.transform="scale(1)";
        }
    };
    boxWrap.onmouseout=function(event){
        if(event.target.firstChild.nodeName=="SPAN") {
            event.target.firstChild.style.transform="scale(0)";
            //event.target.firstChild.style.display="none";
        }
    };
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeAndCityChange() {               // 确定是否选项发生了变化

    if(pageState.nowGraTime!==pageState.oldGraTime || pageState.nowSelectCity!==pageState.oldSelectCity){
        var dayData=aqiSourceData[pageState.nowSelectCity];//调出的这个属性值已经直接执行了函数,不用再加()
        chartData["date"]=dayData["date"];   //先把这个日期名字保存到渲染数据中，以便后面制作hint时使用
        switch (pageState.nowGraTime){
            case "day":
                textData=dayData["dataArray"];
            break;

            case "week":
                var averageData=[];
                var i=0, j, t=0;
                for(j=0;j<dayData["weekDaysNumber"].length;j++) {       //这个循环有点不好
                    var total = 0;

                    for (i; i < t+dayData["weekDaysNumber"][j]; i++) {
                        total += dayData["dataArray"][i];
                    }
                    t=i;
                    averageData[j]=total/dayData["weekDaysNumber"][j];
                }
                textData=averageData;
                break;

            case "month":
                var firstMonthDaysNumber=0;
                var secondMonthDaysNumber=0;
                var thirdMonthDaysNumber=0;
                for(var dataStr in dayData){

                   switch (dataStr.charAt(6)){      //统计每月有几天
                       case "1":
                           firstMonthDaysNumber++;
                           break;
                       case "2":
                           secondMonthDaysNumber++;
                           break;
                       case "3":
                           thirdMonthDaysNumber++;
                   }
                }
                var firstMonthDays=dayData["dataArray"].slice(0,firstMonthDaysNumber); //结束点是结束元素的后一个序号
                var secondMonthDays=dayData["dataArray"].slice(firstMonthDaysNumber,firstMonthDaysNumber+secondMonthDaysNumber);
                var thirdMonthDays=dayData["dataArray"].slice(firstMonthDaysNumber+secondMonthDaysNumber,firstMonthDaysNumber+secondMonthDaysNumber+thirdMonthDaysNumber);

            //    firstMonthDays.prototype.monthAverage=monthAverage();         //这个方法不行吗，可能还没领会this的意思
            //function monthAverage(){
            //       return (this.reduce(function(x,y){return x+y}))/this.length;
            //    }

                var firstMonthAverage=firstMonthDays.reduce(function(x,y){return x+y;})/firstMonthDays.length;
                var secondMonthAverage=secondMonthDays.reduce(function(x,y){return x+y;})/secondMonthDays.length;
                var thirdMonthAverage=thirdMonthDays.reduce(function(x,y){return x+y;})/thirdMonthDays.length;
                textData=[firstMonthAverage,secondMonthAverage,thirdMonthAverage];
                break;
        }
    }

        pageState.oldGraTime=pageState.nowGraTime;
        pageState.oldSelectCity=pageState.nowSelectCity;

        initAqiChartData();//得到文本数据后开始处理成图形数据,从这里传一个日期的字符串过去，后面制作hint时需要使用


}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeAndCityChange
 */
function initGraTimeForm(checkedTime) {
    var formGraTime=document.getElementById("form-gra-time");
    var inputs=formGraTime.getElementsByTagName("input");
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].nextSibling.innerText===checkedTime){                            //将默认的时间添加到状态中
            inputs[i].checked="checked";
            pageState.nowGraTime=checkedTime;
        }
    }

    formGraTime.onclick=function(event){
        if(event.target.nodeName==="LABEL"){       //这里就别写event.target.nodeName==="INPUT"了,下面console检测时触发了两次
            var e=event.target;
            pageState.nowGraTime= e.innerText;
            graTimeAndCityChange();
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector(selectedCity) {
    var citySelect=document.getElementById("city-select");
    var fragment=document.createDocumentFragment();

    for(var city in aqiSourceData){
        var cityOption=document.createElement("option");
        cityOption.innerText=city;

        if(city===selectedCity){
            cityOption.selected="selected";
        }
        fragment.appendChild(cityOption);

    }// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    citySelect.appendChild(fragment);
    pageState.nowSelectCity=citySelect.value;//添加默认城市状态
    citySelect.addEventListener("change",cityChange,false);

    function cityChange() {
            if(citySelect.value == pageState.nowSelectCity){
                return false;
            }
            else{
                pageState.nowSelectCity=citySelect.value;
            }
        graTimeAndCityChange();
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var aqiChartFigure=document.getElementsByClassName("aqi-chart-figure")[0];
    var boxWidth=Math.floor((aqiChartFigure.offsetWidth/textData.length)*0.8);
    var boxMargin=Math.floor((aqiChartFigure.offsetWidth/textData.length-boxWidth)/2);
    var boxHeight=textData.map(function(data){return Math.floor((data/510)*aqiChartFigure.offsetHeight)});

    chartData["boxWidth"]=boxWidth;
    chartData["boxHeight"]=boxHeight;
    chartData["boxMargin"]=boxMargin;

    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    renderChart();
}

/**
 * 初始化函数
 */
window.onload=function(){
    initGraTimeForm("day");//initGraTimeForm(默认时间)
    initCitySelector("成都"); //initCitySelector(默认城市)
    graTimeAndCityChange();
};
