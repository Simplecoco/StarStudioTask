/**
 * Created by 辛珀 on 2017/2/14.
 */

//待解决，自动填充，点击注册时再次验证

    
var rule= {
    userName: {
        id: "userName",
        description: "用户名",
        regexp: /^(?!^_+$)(?!^\d+$)([\u4E00-\u9FA5\uF900-\uFA2D\w_]){1,18}$/,
        tip: "用户名只能为数字，字母，下划线的组合，还不能有空格哦。",
        index:1,
        dom: defineAndBind
    },

    password: {
        id: "password",
        description: "密码",
        regexp: /^(?!^\d+$)(?!^[a-zA-Z]+$)(\S{6,22})$/,
        //regexp:"(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}",
        tip: "密码须为字母，数字，字符的组合，且不能只为单独一种类型哦",
        index:2,
        dom: defineAndBind
    },

    confirmPassword: {
        id: "confirmPassword",
        description: "确认密码",
        regexp: /^(?!^\d+$)(?!^[a-zA-Z]+$)(.{6,22})$/,
        //regexp:"(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}",
        tip: "密码格式错误。",
        tip_b: "两次密码不一样哦。",
        index:3,
        dom: defineAndBind
    },


    mobile: {
        id: "mobile",
        description: "手机号码",
        regexp: /^1((3[0-9])|(4[57])|(5[0-35-9])|(7[36-8])|(8[0-9]))[0-9]{8}$/,
        tip: "请输入正确的11位号码哦",
        index:4,
        dom: defineAndBind
    },

    email: {
        id: "email",
        description: "邮箱",
        regexp: /^(?!^_+$)(?!^\d+$)([\w_]){1,18}@\w{1,10}\.com$/,
        tip: "请输入正确的邮箱地址xxx@xxx.com",
        index:5,
        dom: defineAndBind
    },


    bingoValueGroup:{}

};

var emailAutoFillData=["@163.com","@126.com","@qq.com","@outlook.com","@gmail.com"];

//userName.defineAndBind();
//defineAndBind(userName);
//defineAndBind(password);
//defineAndBind(confirmPassword);
//console.log(userName.bingoValue);

function defineAndBind() {
    var that=this;                                                  //这里可以问两个问题，引用类型的深浅复制，以及this的指向
    var dom = document.getElementById(this.id);
    //console.log(this);
    //Object.defineProperties(dom,object);
    //dom.description = object.description;
    //console.log(this);
    //dom.regexp=object.regexp;
    //dom.tip=object.tip;
    //console.log(Object.getOwnPropertyNames(dom));
        if (this.id !== "email") {
            //dom.onblur = test;
            dom.addEventListener("blur",test);
        }
        else {
            //setTimeout(function () {
            //    console.log(this);
            dom.onkeypress=function() {
                //dom.onblur =test;
                //dom.onkeyup = emailAutoFill;
                dom.addEventListener("keyup", emailAutoFill);
                //if(dom.nextSibling.nextSibling.innerHTML==="") {
                dom.addEventListener("blur", test);
                //dom.nextSibling.nextSibling.addEventListener("click",test);
                //}
            };
        }

    function test() {
        var index=Object.keys(rule.bingoValueGroup).length;
        var value = this.value;
        var tip = this.nextSibling.nextSibling;
        var validTip = tip.nextSibling.nextSibling;
        var regexp = that.regexp;
        //console.log(index);
        //console.log(that.index);
        if (parseInt(that.index) - 1 <= index && !rule.email.mark) {
            validTip.style.transition = "transform 0.2s";
            validTip.style.transform = "scale(0)";
            tip.style.transition = "transform 0.2s 0.2s";
            tip.style.transform = "rotateX(0)";
            delete rule.bingoValueGroup[that.id];
            //console.log(userName);
            //var regexp=new RegExp(that.regexp);
            //var regexp=/this.regexp/;
            //console.log(regexp);
            //console.log(userName);
            //console.log(tip);
            //console.log(!regexp.test(value));
            //tip.style.display="block";
            //tip.style.transform="rotateX(-90deg)";
            //tip.style.transform = "rotateX(0deg)";
            if (value == "") {
                console.log(this);
                //tip.style.transition="transform 0.2s, border-radius 0.2s 0.2s";
                //tip.style.display="block";
                //tip.style.padding="0.3em 1em";
                //tip.style.margin="0.2em 0 0";
                //tip.style.color="white";
                //tip.style.fontWeight="normal";
                //tip.style.width="100%";
                //tip.style.lineHeight="1em";
                //tip.style.borderRadius="5px";
                //tip.style.background="rgba(238,44,44,0.4)";
                //tip.style.opacity="0.7";
                tip.innerText = that.description + "不能为空哦。";
                //validTip.style.transition = "transform 0.2s";
                //validTip.style.transform = "scale(0)";
                //tip.style.transition = "transform 0.2s 0.2s";
                //tip.style.transform = "rotateX(0)";
                //delete rule.bingoValueGroup[that.id];
                return false;
            }
            else if (!(regexp.test(value)) && that.id !== "confirmPassword") {
                //console.log(tip);
                //tip.style.transition="width 0.2s 0.2s, transform 0.2s, border-radius 0.2s";
                //tip.style.padding="0.3em 1em";
                //tip.style.margin="0.2em 0 0";
                //tip.style.color="white";
                //tip.style.fontWeight="normal";
                //tip.style.width="100%";
                //tip.style.lineHeight="1em";
                //tip.style.borderRadius="5px";
                //tip.style.background="rgba(238,44,44,0.4)";
                //tip.style.opacity="0.7";
                //tip.style.transform="rotateX(0)";

                tip.innerText = that.tip;
                //validTip.style.transition = "transform 0.2s";
                //validTip.style.transform = "scale(0)";
                //tip.style.transition = "transform 0.2s 0.2s";
                //tip.style.transform = "rotateX(0)";
                //delete rule.bingoValueGroup[that.id];
                return false;
            }
            else if (value !== rule.password.bingoValue && that.id === "confirmPassword" && value !== document.getElementById("password").value) {
                //
                //tip.style.transition="width 0.2s 0.2s, transform 0.2s 0.2s, border-radius 0.2s";
                //tip.style.padding="0";
                //tip.style.margin="0.2em 0 0";
                //tip.style.color="white";
                //tip.style.fontWeight="normal";
                //tip.style.width="100%";
                //tip.style.lineHeight="1em";
                //tip.style.borderRadius="5px";
                //tip.style.background="rgba(238,44,44,0.4)";
                //tip.style.opacity="0.7";
                //tip.style.transform="rotateX(0)";

                tip.innerText = that.tip_b;
                //validTip.style.transition = "transform 0.2s";
                //validTip.style.transform = "scale(0)";
                //tip.style.transition = "transform 0.2s 0.2s";
                //tip.style.transform = "rotateX(0)";
                //delete rule.bingoValueGroup[that.id];
                return false;
            }
            else {
                that.bingoValue = this.value;
                rule.bingoValueGroup[that.id] = that.bingoValue;

                //tip.style.transform="rotateX(0deg)";
                //tip.style.display="inline-block";
                //tip.style.padding="0";
                //tip.style.margin="0 0.5em 0 0";
                //tip.style.color="white";
                //tip.style.fontWeight="bold";
                //tip.style.width="1.5em";
                //tip.style.lineHeight="1.5em";
                //tip.style.borderRadius="50%";
                //tip.style.background="rgba(118,238,0,0.5)";
                //tip.style.opacity="0.7";
                tip.style.transform = "rotateX(-90deg)";
                validTip.style.transition = "transform 0.2s 0.2s";
                validTip.style.transform = "scale(1)";
                //tip.style.right="0";
                //tip.className="valid-tip";

                //tip.innerText="√";
                //tip.style.top="-1em";
                //tip.style.right="0";
                //console.log((this.id).toString().tip);
                //(this.id).to.bingoValue=value;
                //console.log((this.id).toString().bingoValue);
            }
            signIn();
        }
    }

    function emailAutoFill() {
        var tip = this.nextSibling.nextSibling;
        var validTip = tip.nextSibling.nextSibling;
        var inputBox=this;
        var fragment = document.createDocumentFragment();
        var regexp = /^.+@(.*)$/;
        if (regexp.test(this.value)) {
            console.log(this);
            this.removeEventListener("keyup",emailAutoFill);
            tip.style.transform="rotateX(-90deg)";
            delete rule.email.mark;                     //标记
            inputBox.addEventListener("blur",function(){
                if (that.regexp.test(inputBox.value)){
                    that.bingoValue = inputBox.value;
                    rule.bingoValueGroup[that.id] = that.bingoValue;
                    validTip.style.transition = "transform 0.2s 0.2s";
                    validTip.style.transform = "scale(1)";
                }
            });
            dom.removeEventListener("keyup",emailAutoFill);
            return false;
        }
        else if(this.value===""){
            console.log(this);
            //dom.removeEventListener("keyup",emailAutoFill);
            tip.style.transform="rotateX(-90deg)";
            return false;
        }
        else{
            for (var i = 0; i < emailAutoFillData.length; i++) {
                console.log(fragment);
                var li = document.createElement("li");
                var liText = document.createTextNode(this.value + emailAutoFillData[i]);
                //li.style.background="rgba(10,110,255,0.9)";
                li.appendChild(liText);
                fragment.appendChild(li);
            }
            tip.innerHTML="";
            tip.appendChild(fragment);
            //tip.style.background="rgba(30,144,255,0.7)";
            tip.style.transition = "transform 0.2s 0.2s";
            tip.style.transform = "rotateX(0)";
            console.log(tip);
            rule.email.mark="no blur";                  //标记
            //this.removeEventListener("blur",test);
            tip.addEventListener("click",select);
            //signIn();
        }
        function select(event){
            console.log(inputBox);
            console.log(event);
            if(event.target.nodeName==="LI") {
                var e = event.target;
                inputBox.value = e.innerText;
                that.bingoValue = inputBox.value;
                rule.bingoValueGroup[that.id] = that.bingoValue;
                tip.style.transition = "transform 0.2s";
                tip.style.transform = "rotateX(-90deg)";
                validTip.style.transition = "transform 0.2s 0.2s";
                validTip.style.transform = "scale(1)";
                dom.removeEventListener("keyup",emailAutoFill);
                //dom.focus();
                delete rule.email.mark;                    //标记
                signIn();
                //tip.addEventListener("blur",test);
            }
        }
    }
    //dom.addEventListener("blur", test);
    return {dom:dom,test:test};
}



function bindDom() {
    rule.userName.dom();
    rule.password.dom();
    rule.confirmPassword.dom();
    rule.mobile.dom();
    rule.email.dom();
}

function signIn(){
    //for(var element in rule){
    //    console.log(element);
    //    if(!element.bingoValue){
    //        return false;
    //    }
    //}
    console.log(rule.bingoValueGroup);
    console.log(Object.keys(rule.bingoValueGroup).length);
    console.log(Object.keys(rule).length);
    if(Object.keys(rule.bingoValueGroup).length == Object.keys(rule).length-1) {
        var signIn = document.getElementById("signIn");
        signIn.className = "validBt";
        signIn.disabled = false;
        //signIn.focus();
        signIn.addEventListener("click",finalVerify);
    }
    //var signIn=document.getElementById("signIn");
    //var test=userName.dom();
    //console.log(test);
    //
    //signIn.onmouseover=test.test.call(test.dom);
    //console.log(test);
    //signIn.onclick=bindDom.test();
    //signIn.addEventListener("mouseover",test.test);

    function finalVerify(){
        signIn.innerText="Sign in";
        Object.defineProperty(rule,"bingoValueGroup",{enumerable:false});
        for(var i=0;i<Object.keys(rule).length;i++){
            var o=rule[Object.keys(rule)[i]].dom();
            console.log(Object.keys(rule));
            console.log(o);
            o.dom.addEventListener("blur", o.test);
            o.dom.blur();
            console.log(this);
        }
        if(Object.keys(rule.bingoValueGroup).length===Object.keys(rule).length){
            signIn.innerText="Loading...";
            signIn.disabled="disabled";
            var form=document.getElementsByClassName("register")[0];
            form.submit();
        }
        //signIn.preventDefault(event);
        //return false;


        //var test=defineAndBind();
        //console.log(test);
    }
}


bindDom();
//signIn();
//defineAndBind();