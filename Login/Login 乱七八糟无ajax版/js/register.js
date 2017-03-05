/**
 * Created by 辛珀 on 2017/2/14.
 */

(function(){
    var rule = {
        userName: {
            id: "userName",
            description: "用户名",
            regexp: /^(?!^_+$)(?!^\d+$)([\u4E00-\u9FA5\uF900-\uFA2D\w_]){1,18}$/,  //不能纯数字，不能纯下划线
            tip: "用户名只能为数字，字母，下划线的组合，还不能有空格哦。",
            index: 1,                                            //可以改一下，自动获取位置，用get或set
            dom: defineAndBind
        },

        password: {
            id: "password",
            description: "密码",
            regexp: /^(?!^\d+$)(?!^[a-zA-Z]+$)(\S{6,22})$/,         //不能纯数字，纯字母，并且是没有空格的密码
            tip: "密码须为字母，数字，字符的组合，且不能只为单独一种类型哦",
            index: 2,
            dom: defineAndBind
        },

        confirmPassword: {
            id: "confirmPassword",
            description: "确认密码",
            regexp: /^(?!^\d+$)(?!^[a-zA-Z]+$)(.{6,22})$/,     //同理
            tip: "密码格式错误。",
            tip_b: "两次密码不一样哦。",
            index: 3,
            dom: defineAndBind
        },


        mobile: {
            id: "mobile",
            description: "手机号码",
            regexp: /^1((3[0-9])|(4[57])|(5[0-35-9])|(7[36-8])|(8[0-9]))[0-9]{8}$/,
            tip: "请输入正确的11位号码哦",
            index: 4,
            dom: defineAndBind
        },

        email: {
            id: "email",
            description: "邮箱",
            regexp: /^(?!^_+$)([\w_]){1,18}@\w{1,10}\.com$/,  //不能纯下划线
            tip: "请输入正确的邮箱地址xxx@xxx.com",
            index: 5,
            emailAutoFillData:["@163.com", "@126.com", "@qq.com", "@outlook.com", "@gmail.com"],
            dom: defineAndBind
        },

        bingoValueGroup: {}
    };

    function defineAndBind() {
        var that = this;                                                //这里可以问两个问题，引用类型的深浅复制，以及this的指向
        var dom = document.getElementById(this.id);

        if (this.id !== "email") {
            dom.addEventListener("blur", test);
        }
        else {
            dom.addEventListener("keyup", emailAutoFill);     //对于email，还要多绑一个keyup事件
            dom.addEventListener("blur", test);
        }

        function test() {
            var index = Object.keys(rule.bingoValueGroup).length;
            var value = this.value;
            var tip = this.nextSibling.nextSibling;
            var validTip = tip.nextSibling.nextSibling;
            var regexp = that.regexp;

            if (parseInt(that.index) - 1 <= index && !rule.email.mark) {           //有前后矛盾，所以加了一个标记
                validTip.style.transition = "transform 0.2s";
                validTip.style.transform = "scale(0)";
                tip.style.transition = "transform 0.2s 0.2s";
                tip.style.transform = "rotateX(0)";
                delete rule.bingoValueGroup[that.id];

                if (value == "") {
                    tip.innerText = that.description + "不能为空哦。";
                    return false;
                }
                else if (!(regexp.test(value)) && that.id !== "confirmPassword") {
                    tip.innerText = that.tip;
                    return false;
                }
                else if (value !== rule.password.bingoValue && that.id === "confirmPassword" && value !== document.getElementById("password").value) {
                    tip.innerText = that.tip_b;
                    return false;
                }
                else {
                    that.bingoValue = this.value;
                    rule.bingoValueGroup[that.id] = that.bingoValue;

                    tip.style.transform = "rotateX(-90deg)";
                    tip.style.background="rgba(238,44,44,0.6)";
                    validTip.style.transition = "transform 0.2s 0.2s";
                    validTip.style.transform = "scale(1)";
                }
                signIn();                 //每次测试完都验证一下
            }
        }

        function emailAutoFill() {
            var tip = this.nextSibling.nextSibling;
            var validTip = tip.nextSibling.nextSibling;
            var inputBox = this;
            var regexp = /^.+@(.*)$/;

            if (regexp.test(this.value)) {                                 //测试已经超出自动填充范围。。。然后就关闭填充框，这里待完善
                tip.style.transform = "rotateX(-90deg)";
                delete rule.email.mark;                     //标记

                inputBox.addEventListener("blur", function () {             //手动输入完以后还要验证下
                    if (that.regexp.test(inputBox.value)) {
                        that.bingoValue = inputBox.value;
                        rule.bingoValueGroup[that.id] = that.bingoValue;
                        validTip.style.transition = "transform 0.2s 0.2s";
                        validTip.style.transform = "scale(1)";
                    }
                });
                return false;
            }
            else if (this.value === "") {
                tip.style.transform = "rotateX(-90deg)";
                return false;
            }
            else {
                var fragment = document.createDocumentFragment();
                for (var i = 0; i < that.emailAutoFillData.length; i++) {                       //创造自动填充选项
                    var li = document.createElement("li");
                    var liText = document.createTextNode(this.value + that.emailAutoFillData[i]);
                    li.appendChild(liText);
                    fragment.appendChild(li);
                }
                tip.innerHTML = "";                 //每次添加前先清空
                tip.appendChild(fragment);
                tip.style.background="linear-gradient(130deg,rgba(10,110,255,0.8),rgba(8,10,255,0.8))";
                tip.style.transition = "transform 0.2s 0.2s";
                tip.style.transform = "rotateX(0)";
                rule.email.mark = "no blur";                  //标记
                tip.addEventListener("click", select);
            }

            function select(event) {
                if (event.target.nodeName === "LI") {
                    var e = event.target;
                    inputBox.value = e.innerText;
                    that.bingoValue = inputBox.value;
                    rule.bingoValueGroup[that.id] = that.bingoValue;
                    tip.style.transition = "transform 0.2s";
                    tip.style.transform = "rotateX(-90deg)";
                    tip.style.background="rgba(238,44,44,0.6)";
                    validTip.style.transition = "transform 0.2s 0.2s";
                    validTip.style.transform = "scale(1)";
                    dom.removeEventListener("keyup", emailAutoFill);
                    delete rule.email.mark;                    //标记
                    signIn();
                }
            }
        }
        return {dom: dom, test: test};     //return出去，以便点击注册按钮再次验证时调用
    }

    function signIn() {
        if (Object.keys(rule.bingoValueGroup).length == Object.keys(rule).length - 1) {
            var signIn = document.getElementById("signIn");
            signIn.className = "validBt";
            signIn.disabled = false;
            signIn.addEventListener("click", finalVerify);
        }

        function finalVerify() {
            signIn.innerText = "Sign in";
            Object.defineProperty(rule, "bingoValueGroup", {enumerable: false});   //之后调用keys不遍历出

            for (var i = 0; i < Object.keys(rule).length; i++) {
                var o = rule[Object.keys(rule)[i]].dom();
                o.dom.addEventListener("blur", o.test);
                o.dom.blur();                                        //模拟发生失焦事件
            }
            if (Object.keys(rule.bingoValueGroup).length === Object.keys(rule).length) {      //当正确值足够时提交
                signIn.innerText = "Loading...";
                signIn.disabled = "disabled";
                var form = document.getElementsByClassName("register")[0];
                form.submit();
            }
        }
    }

    function bindDom() {
        rule.userName.dom();
        rule.password.dom();
        rule.confirmPassword.dom();
        rule.mobile.dom();
        rule.email.dom();
    }

    bindDom();
})();
