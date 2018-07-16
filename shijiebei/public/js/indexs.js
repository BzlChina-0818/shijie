// api
var hostUrl = "http://fokexapi.winchainos.cn";
// var hostUrl = "http://47.104.87.91:8111";
//var hostUrl = "http://192.168.4.49:8111";

//验证手机号
var reg = /^1[34578]\d{9}$/;
$(".cell").blur(function() {
    if ($(".cell").val() == '') {
        $(".cell_val").html("*手机号不能为空");
    } else if (!reg.test($(".cell").val())) {
        $(".cell_val").html("*手机号格式不正确");
    } else {
        $(".cell_val").html("");
    }
})
$(".cells").blur(function() {
        if ($(".cells").val() == '') {
            $(".cells_val").html("*手机号不能为空");
        } else if (!reg.test($(".cells").val())) {
            $(".cells_val").html("*手机号格式不正确");
        } else {
            $(".cells_val").html("");
        }
    })
    //})

//判断验证码是否为空
$(".ipt").blur(function() {
    if ($(".ipt").val() == '') {
        $(".ipt_val").html("*验证码不能为空");
    } else {
        $(".ipt_val").html("");
    }
})
$(".ipts").blur(function() {
        if ($(".ipts").val() == '') {
            $(".ipts_val").html("*验证码不能为空");
        } else {
            $(".ipts_val").html("");
        }
    })
    // 获取本地是否有手机号缓存
var userCell = true; //init mobile
console.log(!isEmptyObject(localStorage.getItem("userCell")))
console.log(localStorage.getItem("userCell") != null)
console.log(localStorage.getItem("userCell"))
if (!isEmptyObject(localStorage.getItem("userCell")) && localStorage.getItem("userCell") != null) {
    userCell = JSON.parse(localStorage.getItem("userCell"));
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

// 渲染首页数据
$(function() {
    localStorage.removeItem("awayIcon1");
    localStorage.removeItem("homeIcon1");
    var matchId = JSON.parse(localStorage.getItem("matchId"));
    if (userCell == null) {
        userCell = true;
    }
    $.ajax({
        type: 'POST',
        url: hostUrl + "/web/match/ok/v1/homePage?mobile=" + userCell,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data)
            if (data.code == 400) {
                $(".count").css("display", "none");
                $(".time").css("display", "none");
                $(".coming").css("display", "block");
            } else {
                $(".coming").css("display", "none");
                time = data.endTime1;
                time1 = data.startTime1;
                $(".time").html(data.startTime1);
                $(".team_left p").html(data.homeName1);
                localStorage.setItem("homeName1", JSON.stringify(data.homeName1));
                $(".team_left img").attr("src", data.homeIcon1);
                // localStorage.setItem("awayIcon1", JSON.stringify(data.homeIcon1));
                $(".team_right p").html(data.awayName1);
                localStorage.setItem("awayName1", JSON.stringify(data.awayName1));
                $(".team_right img").attr("src", data.awayIcon1);
                // localStorage.setItem("homeIcon1", JSON.stringify(data.awayIcon1));
                $(".stake_l .con").html(data.left);
                $(".stake_c .con").html(data.centre);
                $(".stake_r .con").html(data.right);
                $(".stake_l .state").html(data.homeName1);
                $(".stake_r .state").html(data.awayName1);
                $(".next_l img").attr("src", data.awayIcon2);
                $(".next_l p").html(data.awayName2);
                $(".next_r img").attr("src", data.homeIcon2);
                $(".next_r p").html(data.homeName2);
                $(".next_c_t").html(data.startDate2);
                $(".next_c_b").html(data.startHour2);
                if (data.chooseId == "0" || data.chooseId == "1" || data.chooseId == "2") {
                    if (data.chooseId == "1") {
                        //						$(".stake_l").siblings().children('.sheng').css("color","#ccc");
                        $(".stake_l").siblings().children('.sheng').css("background", "rgb(205,205,205)");
                        $(".stake_l").siblings().children('.sheng').css("color", "rgb(225,225,225)");
                        $(".stake_l > .sheng").html("已支持");
                    } else if (data.chooseId == "0") {
                        //						$(".stake_btn").siblings().children('.sheng').css("color","#ccc");
                        $(".stake_btn").siblings().children('.sheng').css("background", "rgb(205,205,205)");
                        $(".stake_btn").siblings().children('.sheng').css("color", "rgb(225,225,225)");
                        $(".stake_btn > .sheng").html("已支持");
                    } else if (data.chooseId == "2") {
                        //						$(".stake_r").siblings().children('.sheng').css("color","#ccc");
                        $(".stake_r").siblings().children('.sheng').css("background", "rgb(205,205,205)");
                        $(".stake_r").siblings().children('.sheng').css("color", "rgb(225,225,225)");
                        $(".stake_r > .sheng").html("已支持");
                    }
                    $(".stake_con > .sheng").prop("onclick", null).off("click");
                } else {
                    localStorage.removeItem('matchId');
                    if (data.chooseId != "") {
                        $(".stake_con").prop("onclick", null).off("click");
                    }
                }
                localStorage.setItem("matchId", JSON.stringify(data.matchId));
            }
        }
    })


    //倒计时
    var opentime = "2018/" + time1.replace("月", '/').replace("日", '');
    var starttime = new Date(opentime);
    console.log(starttime);
    if (opentime <= 0) {
        $(".count").html('投注通道已关闭');
    } else {

        setInterval(function() {
            var newtime = new Date();
            var time = starttime - newtime;
            var day = parseInt(time / 1000 / 60 / 60 / 24);
            var hour = parseInt(time / 1000 / 60 / 60 % 24);
            var minute = parseInt(time / 1000 / 60 % 60);
            var seconds = parseInt(time / 1000 % 60);
            if (time <= 0) {
                $(".count").html('投注通道已关闭');
                $(".stake_con > .sheng").prop("onclick", null).off("click");
                return;
            }
            if (day < 10) {
                day = '0' + day
            }
            if (hour < 10) {
                hour = '0' + hour
            }
            if (minute < 10) {
                minute = '0' + minute
            }
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            var days = day * 24;
            var dayes = Number(days) + Number(hour);
            if (dayes < 10) {
                dayes = "0" + dayes
            }
            $(".count").html(dayes + ":" + minute + ":" + seconds);
        }, 1000)
    }
})

//点击胜平负
var chooseTitle;
//function cathectic(event, clickId) {
$(".stake_btn .sheng").click(function(event) {
    event.stopPropagation();
    console.log($(this).attr("data-value"));
    console.log(localStorage.getItem("userCell"))
    var clickId = $(this).attr("data-value");
    localStorage.setItem("clickId", clickId);
    var chooseId = $(this).attr("data-value");
    console.log(chooseId + "这是chooseId");
    localStorage.setItem("chooseId", chooseId);
    console.log(localStorage.getItem("chooseId"));
    var matchId = JSON.parse(localStorage.getItem("matchId"));
    var left_con = $(".team_left p").html();
    var right_con = $(".team_right p").html();
    var homeName1 = JSON.parse(localStorage.getItem("homeName1"));
    var awayName1 = JSON.parse(localStorage.getItem("awayName1"));
    if (localStorage.getItem("userCell")) {
        $(".div1").css("display", "block")
        $(".dialog").css("display", "block");
        $(".dialog > .inp").css("display", "none");
        if (clickId == 1) {
            $("#stake_l").siblings().removeClass("stake_btn");
            $(".ranks").html(homeName1);
        } else if (clickId == 0) {
            $("#stake_c").siblings().removeClass("stake_btn");
            $(".flag img").attr("src", "");
            $(".flag span").html("平").css({ "width": "100%", "padding-left": ".2rem" });
        } else {
            $("#stake_r").siblings().removeClass("stake_btn");
            $(".ranks").html(awayName1);
        }
        console.log(chooseId + "23423432432423");
        localStorage.setItem("chooseId", chooseId);
    } else {
        $(".dialog").css("display", "block");
        console.log(localStorage.getItem("chooseId") + "----------------")
            //	var chooseTitle;
        if (chooseId == 1) {
            chooseTitle = left_con;
        } else if (chooseId == 2) {
            chooseTitle = right_con;
        } else {
            chooseTitle = "平";
        }

        if (clickId == 1) {
            $("#stake_l").siblings().removeClass("stake_btn");
            $(".ranks").html(homeName1);
        } else if (clickId == 0) {
            $("#stake_c").siblings().removeClass("stake_btn");
            $(".flag img").attr("src", "");
            $(".flag span").html("平").css({ "width": "100%", "padding-left": ".2rem" });
        } else {
            $("#stake_r").siblings().removeClass("stake_btn");
            $(".ranks").html(awayName1);
        }
        console.log(clickId + "click=232323232323232323")
        chooseId = clickId
        console.log(chooseId + "111111111111111111111111111")
        localStorage.setItem("chooseId", chooseId);
        $(".div1").css("display", "block");
        $(".dialog").css("display", "block");
        return;
    }
})

//获取验证码
var InterValObj;
var count = 60;
var curCount;
$(".cell").click(function(event) {
    event.stopPropagation();
})
$(".ipt").click(function(event) {
    event.stopPropagation();
})
$(".cell_btn").click(function(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    console.log("点击了获取验证码")
    if ($(".cell").val() == '') {
        $(".cell_val").html("*手机号不能为空");
    } else if (!reg.test($(".cell").val())) {
        $(".cell_val").html("*手机号格式不正确");
    } else {
        $(".cell_val").html("");
        curCount = count;

        function setTime() {
            if (curCount == 0) {
                window.clearInterval(InterValObj); //停止定时器
                $(".cell_btn").removeAttr("disabled"); //启用按钮
                $(".cell_btn").html("重新获取验证码");
            } else {
                curCount--;
                $(".cell_btn").html(curCount + "秒后重新获取");
            }
        }
        //设置“获取验证码按钮”
        $(".cell_btn").attr("disabled", "true");
        $(".cell_btn").html(curCount + "秒后重新获取");
        InterValObj = window.setInterval(setTime, 1000);
        //发送请求
        $.ajax({
            type: 'POST',
            url: hostUrl + "/web/match/ok/v1/getCode?mobile=" + $(".cell").val(),
            cache: false,
            data: {
                mobile: $(".cell").val()
            },
            success: function(data) {
                console.log(data)
                if (data.code == 400) {
                    localStorage.setItem("userCell", $(".cell").val())
                    $(".cell_val").html("您已参与过竞猜");
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                }
            }
        })
    }
})

// 登录页的点击取消
$(".cancel").click(function(event) {
    event.stopPropagation();
    console.log("点击了取消按钮")
    $(".div1").css("display", "none")
    $(".dialog").css("display", "none");
    $(".cell_val").html("");
    $(".ipt_val").html("");
    $(".stake_con").addClass("stake_btn");
    console.log("取消");
    return;
})


// 点击确定
$(".confirm").click(function(event) {
    event.stopPropagation()
    var matchId = JSON.parse(localStorage.getItem("matchId"));
    var chooseId = JSON.parse(localStorage.getItem("chooseId"));
    console.log(userCell);
    var chooseTitle;
    console.log(chooseId + "q===qqqqqqqqq")
    if (chooseId == "1") {
        chooseTitle = $("#team_l").html();
    } else if (chooseId == "2") {
        chooseTitle = $("#team_r").html();
    }
    console.log($("#team_l").html());
    console.log(localStorage.getItem("homeName1"));
    console.log(localStorage.getItem("awayName1"));
    if (localStorage.getItem("userCell")) {
        console.log("缓存有手机号")
        console.log(chooseId + "+++55555555555")
        console.log(localStorage.getItem("userCell"));
        console.log($(".ipt").val())
        console.log(matchId)
        console.log(chooseId)
        console.log(chooseTitle)
        var code;
        var userId = localStorage.getItem("userId");
        //		console.log(userId)
        if (localStorage.getItem("userCell")) {
            code = "";
        } else {
            code = $(".ipt").val();
        }
        $.ajax({
            type: 'GET',
            //				url: hostUrl + "/web/match/ok/v1/cathectic?mobile=" + $(".cell").val() + "&code=" + $(".ipt").val() + "&matchId=" + matchId + "&chooseId=" + chooseId + "&chooseTitle=" + chooseTitle,
            url: hostUrl + "/web/match/ok/v1/cathectic?mobile=" + userCell + "&code=" + code + "&matchId=" + matchId + "&chooseId=" + chooseId + "&chooseTitle=" + chooseTitle + "&userId=" + userId,
            async: true,
            dataType: "json",
            success: function(data) {
                console.log("确定按钮的投注接口的data" + data)
                console.log(data)
                if (data.code == 400) {
                    console.log(data.code)
                    console.log("该用户投注过")
                    $(".dialog").css("display", "none");
                    $(".div1").css("display", "none")
                        //					alert("您已投注过该场比赛")
                    window.location.reload();
                } else {
                    console.log(data)
                    console.log("可以投注")
                    $(".div1").css("display", "none");
                    $(".dialog").css("display", "none");
                    $(".code").css("display", "none");
                    $('.div1').css('display', 'none');
                    //					localStorage.setItem("userCell", $(".cell").val());
                    localStorage.setItem("UserInfo", JSON.stringify(data.code));
                    localStorage.setItem("chooseId", chooseId);
                    $(".stake_l .con").html(data.left);
                    $(".stake_c .con").html(data.centre);
                    $(".stake_r .con").html(data.right);
                    localStorage.setItem("isCheck", 1);
                    //					$(".stake_btn").siblings().children('.sheng').css("color","#ccc");
                    //					$(".stake_btn").siblings().children('.sheng').css("background","rgba(232, 112, 20, 0.6)");
                    $(".stake_btn").siblings().children('.sheng').css("background", "rgb(205,205,205)");
                    $(".stake_btn").siblings().children('.sheng').css("color", "rgb(225,225,225)");
                    $(".stake_btn > .sheng").html("已支持");
                    $(".stake_con > .sheng").prop("onclick", null).off("click");
                    $(".record-box").css("display", "none");
                    $(".div1").css("display", "none");
                    console.log("投注成功");
                }
            }
        })
        return;
    } else {
        console.log(chooseId + ">>2222222222")
        var matchId = JSON.parse(localStorage.getItem("matchId"));
        var chooseId = JSON.parse(localStorage.getItem("chooseId"));
        var h = $(document).height() - $(window).height();
        var userId = localStorage.getItem("userId");
        //		console.log(userId)
        $(document).scrollTop(h);
        $('.div1').css('display', 'block')
        if (reg.test($(".cell").val()) && !$(".ipt").val() == "") {
            $(".enter").attr("readonly", "false");
            console.log(matchId);
            $.ajax({
                type: 'GET',
                url: hostUrl + "/web/match/ok/v1/cathectic?mobile=" + $(".cell").val() + "&code=" + $(".ipt").val() + "&matchId=" + matchId + "&chooseId=" + chooseId + "&chooseTitle=" + chooseTitle + "&usreId=" + userId,
                async: true,
                dataType: "json",
                success: function(data) {
                    console.log("投注接口的data" + data)
                    console.log(data)
                    if (data.code == 400) {
                        $(".ipt_val").html(data.msg);
                    } else {
                        $(".dialog").css("display", "none");
                        $('.div1').css('display', 'none');
                        localStorage.setItem("userCell", $(".cell").val());
                        localStorage.setItem("UserInfo", JSON.stringify(data.code));
                        localStorage.setItem("chooseId", chooseId);
                        $(".stake_l .con").html(data.left);
                        $(".stake_c .con").html(data.centre);
                        $(".stake_r .con").html(data.right);
                        localStorage.setItem("isCheck", 1);
                        $(".stake_btn").siblings().children('.sheng').css("background", "rgb(205,205,205)");
                        $(".stake_btn").siblings().children('.sheng').css("color", "rgb(225,225,225)");
                        $(".stake_btn > .sheng").html("已支持");
                        $(".stake_con > .sheng").prop("onclick", null).off("click");
                        $(".record-box").css("display", "none");
                        $(".div1").css("display", "none");
                    }
                }
            })
        }
    }
})


var sms_code = '';
// 竞猜记录按钮
$(".record").click(function(event) {
    console.log("点击了竞猜记录按钮")
    event.stopPropagation();
    event.stopImmediatePropagation();
    //	var userCell = JSON.parse(localStorage.getItem("userCell"));
    console.log(userCell);
    console.log(localStorage.getItem("userCell"))
    console.log(!isEmptyObject(localStorage.getItem("userCell")))
    console.log(localStorage.getItem("userCell") != null)
    if (localStorage.getItem("userCell") != null) {
        //	if(localStorage.getItem("userCell")){
        console.log("缓存里有手机号后进来")
        console.log(localStorage.getItem("userCell"))
        gain();
    } else {
        console.log("缓存没有手机号弹出登录框")
        $(".div1").css("display", "block");
        // $(".codes").css("display","block");
        $(".code").css("display", "block");
        //获取验证码
        var InterValObjs;
        var counts = 60;
        var curCounts;
        $(".cells").click(function(event) {
            event.stopPropagation();
        })
        $(".ipts").click(function(event) {
            event.stopPropagation();
        })
        $(".cells_btn").click(function(event) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            console.log("点击了获取验证码")
            if ($(".cells").val() == '') {
                $(".cells_val").html("*手机号不能为空");
            } else if (!reg.test($(".cells").val())) {
                $(".cells_val").html("*手机号格式不正确");
            } else {
                $(".cells_val").html("");
                curCounts = counts;

                function setTime() {
                    if (curCounts == 0) {
                        window.clearInterval(InterValObjs); //停止定时器
                        $(".cells_btn").removeAttr("disabled"); //启用按钮
                        $(".cells_btn").html("重新获取验证码");
                    } else {
                        curCounts--;
                        $(".cells_btn").html(curCounts + "秒后重新获取");
                    }
                }
                //设置“获取验证码按钮”
                $(".cells_btn").attr("disabled", "true");
                $(".cells_btn").html(curCounts + "秒后重新获取");
                InterValObjs = window.setInterval(setTime, 1000);
                //发送请求
                $.ajax({
                    type: 'POST',
                    url: hostUrl + "/web/match/ok/v1/getCodeForGuessLog?mobile=" + $(".cells").val(),
                    cache: false,
                    data: {
                        mobile: $(".cells").val()
                    },
                    success: function(data) {
                        console.log(data)
                        if (data.code == 400) {
                            $(".cells_val").html(data.msg);
                        } else {
                            sms_code = data.code;
                        }
                    }
                })
            }
        })
    }
})

// 竞猜记录按钮里的取消按钮
$(".cancels").click(function(event) {
    event.stopPropagation();
    console.log("点击了取消按钮")
    $(".div1").css("display", "none")
    $(".code").css("display", "none");
    $(".cells_val").html("");
    $(".ipts_val").html("");
    $(".stake_con").addClass("stake_btn");
    console.log("取消");
    return;
})

// 点击竞猜记录弹出的登录框的确定按钮
$(".confirms").click(function() {
    console.log("点击了竞猜记录弹框的确定按钮")
        //if(reg.test($(".cell").val()) && $(".ipt").val() == sms_code){
    if (reg.test($(".cells").val()) && $(".ipts").val() != "") {
        console.log("判断手机号和验证码的正确性")
        gain();
    } else {
        console.log('code no true');
    }
    //	$(".code").css("display","none")
})

// 获取竞猜记录
function gain() {
    console.log("竞猜记录");
    if ($(".cells").val() == null || $(".cells").val() == "") {
        userCell = JSON.parse(localStorage.getItem("userCell"));
    } else {
        userCell = $(".cells").val();
    }
    $.ajax({
        type: 'GET',
        url: hostUrl + "/web/match/ok/v1/getGuessLogByMobile?mobile=" + userCell + "&code=" + $(".ipts").val(),
        async: true,
        dataType: "json",
        success: function(data) {
            console.log(data)
            var html = "";
            if (data.code == 400) {
                console.log("验证码错误进来")
                $(".ipts_val").html(data.msg);
                return false;
            } else {
                console.log("验证码正确后进来")
                $(".code").css("display", "none");
                $(".div1").css("display", "block");
                $(".record-box").css("display", "block");
                if (data.code == 200) {
                    for (var i = 0; i < data.data.length; i++) {
                        html += '<div class="record_con">' +
                            '<div class="date">' + data.data[i].date + '</div>' +
                            '<div class="team_con">' + data.data[i].matchInfo + '</div>' +
                            '<div class="select">我的选择：<span>' + data.data[i].chooseTeam + '</span></div>' +
                            '<div class="result">' + data.data[i].guessResult + '</div>' +
                            '</div>';
                    }
                    if (data.data.length == 0) {
                        $(".anonymous").css("display", "block");
                    } else {
                        $(".anonymous").css("display", "none");
                    }
                    localStorage.setItem("userCell", userCell);
                    $(".record_content").html(html);
                }
                localStorage.setItem("userId", data.userId);
                //				console.log(localStorage.getItem("userId"));
            }
        }
    })
}

// 竞猜记录的关闭按钮
$(".close img").click(function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    $(".div1").css("display", "none");
    $(".record-box").css("display", "none");
    console.log(localStorage.getItem("chooseId"))
    window.location.reload();
})
$('.div1').click(function(event) {
    console.log("点击了body")
    event.stopImmediatePropagation();
    $(".code").css("display", "none");
    $(".codes").css("display", "none")
    $('.div1').css('display', 'none');
    $(".dialog").css("display", "none")
    $(".cell").val("");
    $(".cells").val("");
    $(".ipt").val("");
    $(".ipts").val("");
    $(".cell_val").html("");
    $(".ipt_val").html("");
    $(".cells_val").html("");
    $(".ipts_val").html("");
    $(".stake_con").addClass("stake_btn");
    $(".record-box").css("display", "none");
    $('.div3').css('display', 'none');
    $('.div4').css('display', 'none');
    window.location.reload();
})


$('.rul').click(function() {
    $('.text').css('display', 'block')
    $('.div1').css('display', 'block')
})
$('.closed').click(function() {
    $('.text').css('display', 'none')
    $('.div1').css('display', 'none')
})