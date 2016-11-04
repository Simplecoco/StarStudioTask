/**
 * Created by 辛珀 on 2016/11/4.
 */
var sortBtn=document.getElementById("sort-btn");
var aqiList = document.getElementById("resort");
var source=document.getElementById("source");
var sourceData=source.getElementsByTagName("li");
var aqiData=[];
for(var i=0;i<sourceData.length;i++){   //创建二维数组，将名称和数字分别存入
    aqiData[i]=[];
    aqiData[i]=sourceData[i].innerText.split("：");  //innerText可以将<b>标签去除
}
console.log(aqiData);

sortBtn.onclick=function() {
        var orderData = orderAndFilter(aqiData, 60);
        print(orderData, aqiList);
        sortBtn.disabled=true;
        console.log(orderData);

    function orderAndFilter(usualData, min) {           //过滤小于60的数据，并用其数据排序
        console.log(usualData);
        var eligibleData = [];
        var orderData = [];
        for (var i = 1; i < usualData.length; i++) {
            if (usualData[i][1] > min) {
                eligibleData[eligibleData.length] = usualData[i];
            }
        }
        console.log(eligibleData);
        orderData = eligibleData.sort(function (a, b) {
            return b[1] - a[1];
        });
        console.log(orderData);
        return orderData;
    }

    function print(printData, list) {     //利用DocumentFragment()一次性添加到文档中，减少回流和重绘
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < printData.length; i++) {
            var spanNode = document.createElement("li");
            spanNode.style.listStyle = "none";
            spanNode.innerHTML = "第" + (i + 1) + "名:" + orderData[i][0] + ": " + "<b>"+orderData[i][1]+"</b>";
            console.log(spanNode);
            fragment.appendChild(spanNode);
        }
        console.log(fragment);
        list.appendChild(fragment);
    }
}
