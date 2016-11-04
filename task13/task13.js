/**
 * Created by 辛珀 on 2016/11/2.
 */

window.onload=function() {
    var button = document.getElementById("button");
    var aqiDisplay = document.getElementById("aqi-display");

    button.onclick = function () {
        var aqiInput = document.getElementById("aqi-input");
        var quality = parseInt(aqiInput.value);
        console.log(aqiInput.value);
        console.log(quality);
        if (isNaN(quality) || quality < 0 || quality > 1000) {
            alert("请输入一个大于0并且小于1000的数字哦");
            aqiInput.value = "";
        }
        else {
            aqiDisplay.innerHTML = quality;
        }
    }
}