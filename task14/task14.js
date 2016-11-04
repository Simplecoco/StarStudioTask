/**
 * Created by 辛珀 on 2016/11/4.
 */
var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];

var aqiList=document.getElementById("aqi-list");
var orderData=orderAndFilter(aqiData,60);
print(orderData,aqiList);
console.log(orderData);
//console.log(typeof aqiData[1][1]);

function orderAndFilter(usualData,min){           //过滤小于60的数据，并用其数据排序
    console.log(usualData);
    var eligibleData=new Array();
    var orderData=new Array();
    for(var i=1;i<usualData.length;i++){
        if(usualData[i][1]>min){
            eligibleData[eligibleData.length]=usualData[i];
        }
    }
    console.log(eligibleData);
    orderData=eligibleData.sort(function(a,b){
        var x=a[1];
        var y=b[1];
        console.log(a,b);
        console.log(x,y);
        return y-x;
    });
    console.log(orderData);
    return orderData;
}

function print(printData,list){     //利用DocumentFragment()一次性添加到文档中，减少回流和重绘
    var fragment=document.createDocumentFragment();
    for(var i=0;i<printData.length;i++){
        var spanNode=document.createElement("li");
        spanNode.style.listStyle="none";
        spanNode.innerHTML="第"+(i+1)+"名:"+orderData[i][0]+"&nbsp"+orderData[i][1];
        console.log(spanNode);
        fragment.appendChild(spanNode);
    }
    console.log(fragment);
    list.appendChild(fragment);
}



