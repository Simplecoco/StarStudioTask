/**
 * Created by 辛珀 on 2016/11/8.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

window.onload=function(){
    var addBtn=document.getElementById("add-btn");
    addBtn.onclick=addBtnHandle;
    var aqitable=document.getElementById("aqi-table");
    aqitable.onclick=delBtnHandle;
};

function addAqiData() {
    var aqiCityInput=document.getElementById("aqi-city-input").value;
    var aqiValueInput=document.getElementById("aqi-value-input").value;
    if(!aqiCityInput.match(/^[a-zA-Z\u4E00-\u9FA5\s]+$/)){     //匹配字符串开头，接着匹配中间的中英文字符，"[]"代表其中任意一个字符，"+"表示这种字符可以1至任意多个,\s匹配空格(下面trim对两边空格进行删除，中间则可以保留)，最后匹配字符串结尾
        alert("宝贝，城市名称只能为中英文字符哦");
        document.getElementById("aqi-city-input").value=null;
        return false;
    }
    if((!aqiValueInput.match(/^\d+$/)) || parseInt(aqiValueInput)>1000){  //同理只能匹配0~9这种字符1至任意多个，且匹配开头结尾，可以避免空格
        alert("宝贝，指数只能为小于1000的整数哦(估计大于1000咱们都死了吧。。。)");
        document.getElementById("aqi-value-input").value=null;
        return false;
    }
    else{
        console.log(aqiCityInput.length);
        aqiCityInput=aqiCityInput.trim();
        aqiValueInput=aqiValueInput.trim();
        console.log(aqiCityInput.length);
        aqiData[aqiCityInput]=aqiValueInput;  //使用对象代替二维数组的好处在于可以避免去重操作，因为对象里属性为一
        console.log(aqiData);
    }
    renderAqiList(aqiData);  //使用这个函数时记得带参数。。。
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList(aqiData) {
    var aqiTable=document.getElementById("aqi-table");
    var newTable=document.createElement("table");
    var thTr=document.createElement("tr");
    thTr.innerHTML="<th>城市</th>"+"<th>空气质量</th>"+"<th>操作</th>";
    newTable.appendChild(thTr);
    //}
    for(var aqiCity in aqiData){        //遍历属性，其中要注意零时创建的元素或者文本元素，创建好后一定要先保存起来或者添加到某个地方，
                                        //也就是说每个元素的创建添加最一步完成，不要先创建好所有同类型的元素，再一起加到父元素里，这是之前bug，不便描述，自己记录下而已。。。
        var tr=document.createElement("tr");
        var city=document.createElement("td");
        var cityValue=document.createTextNode(aqiCity);
        city.appendChild(cityValue);
        tr.appendChild(city);

        var data=document.createElement("td");
        var dataValue=document.createTextNode(aqiData[aqiCity]);
        data.appendChild(dataValue);
        tr.appendChild(data);

        var button=document.createElement("button");
        var buttonValue=document.createTextNode("删除");
        var td=document.createElement("td");
        button.appendChild(buttonValue);
        td.appendChild(button);
        tr.appendChild(td);

        newTable.appendChild(tr);
    }
    aqiTable.innerHTML=newTable.innerHTML;   //先保存到一个创建的新table里，再赋值过去，可以避免多次刷新(是吗。。。？)

}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();              //渲染函数在addAqiData合理之后才执行，所以放到它里面
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {          //给删除按钮的父元素table绑定了点击事件，点击删除按钮时，点击按钮事件冒泡到它的父元素上，委托父元素代它执行
    if(event.target.nodeName=="BUTTON"){   //必须判断点击的元素类型，否则table的子元素都会执行这个点击事件
        var city=event.target.parentNode.parentNode.firstChild.innerText;
        delete aqiData[city];    //delete如果是删除数组，可能会使数组变成稀疏数组，好处是元素对应的键值没变，被删除的那个位置会变为undefined,但对这种数组进行搜索时速度不变。
                                 //不过是删除对象，不用考虑这个问题
          renderAqiList(aqiData);
    }
}


//下面是一个调用之前任务的附加功能。。。还未启用

//var aqiArr=[];

//function addToArr(aqiData){            //将属性和属性值加入一个二维数组中，方便调用之前的排序功能，实际之前的排序功能上可以修改，这里先暂时调用一下。。。
//    for(var aqiCity in aqiData){
//        aqiArr[aqiArr.length]=[];    //创建第二个维度的数组
//        console.log(aqiArr);
//        aqiArr[aqiArr.length-1][0]=aqiCity;
//        aqiArr[aqiArr.length-1][1]=aqiData[aqiCity];
//        console.log(aqiArr[aqiArr.length-1][0]);
//    }
//}
