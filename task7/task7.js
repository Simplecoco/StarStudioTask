/**
 * Created by ÐÁçê on 2016/10/22.
 */

    function appear(event) {
        var box=event.target.nextSibling.nextSibling;
        console.log(box);
        box.style.display="block";

    }
    function disappear(event) {
        var address_item = document.getElementsByClassName("address_item");
        if(!event.target.className){
            for(var i=0;i<address_item.length;i++) {
                address_item[i].style.display="none";
            }
        }
    }
function select(event){
    var box=event.target;
    console.log(box.innerHTML);
    var t=event.target.parentNode;
    var content=t.parentNode.childNodes[1];
    console.log(content);
    content.value=box.innerHTML;
}
