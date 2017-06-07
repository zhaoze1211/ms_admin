<template>
    <div class="msg-list-wrap">
        <div class="msg-list-con" :class="{chat:chat}" :style="{height:height}">
            <el-checkbox-group v-model="groupList" @change="changelist" :class="{showCheckbox:showCheckbox}">
                <div v-if="!chat">
                    <div class="clearfix" v-for="(item,index) in record.list">
                        <template v-if="showCheckbox">
                            <el-checkbox class="float-left" :label="item.exportid.toString()" v-if="!checkAll2">&nbsp;
                            </el-checkbox>
                            <label v-else class="el-checkbox float-left">
                                <span class="el-checkbox__input"><span
                                        class="el-checkbox__inner is-disabled is-checked"></span> <input type="checkbox"
                                                                                                         class="el-checkbox__original"
                                                                                                         value=""
                                                                                                         disabled="disabled"> </span>
                                <span class="el-checkbox__label">&nbsp;</span>
                            </label>
                        </template>

                        <img :src="item.groupsendimg" class="avatar float-left" @click="otherClick(item.id)">
                        <div class="msgInfo float-left">
                            <el-row>
                                <el-col :span="24"><span v-html="item.groupsenduname"></span> {{item.createtime |
                                    formatTime}}&nbsp;&nbsp;
                                    <el-button type="text" class="txtBtn" v-if="flock">
                                        回复
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="msgCon" v-if="item.msgtype==1"
                                         v-html="msgConEmoji(item.content)"></div>
                                    <div class="msgCon" v-if="item.msgtype==3 ||item.msgtype==47"><img
                                            :src="item.filepath"
                                            class="msgTypePic"
                                            @click="bigPic($event)">
                                    </div>
                                    <div class="audioL" v-if="item.msgtype==34">
                                        <div class="msgCon">
                                            <a href="javascript:;" class="audio"
                                               @click="audioBtn('other',item.filepath,$event)"></a>
                                        </div>
                                        <!--<span class="common timeLong">{{item.duration}}''</span>-->
                                        <!--<span class="common audioFlag"></span>-->
                                    </div>
                                    <div class="msgCon videoType" v-if="item.msgtype==62">
                                        <video preload="auto" class="video" :src="item.filepath"></video>
                                        <div class="videoMark">
                                            <a href="javascript:;" @click="videoBtn($event)"></a>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div id="chatCon" v-else>
                    <el-row v-if="!hideMore">
                        <el-col :span="24" class="more">
                            <el-button type="text" @click="lookMore">查看更多消息</el-button>
                        </el-col>
                    </el-row>
                    <div v-for="(item,index) in chatRecord">
                        <div v-if="item.isself==0">
                            <el-row>
                                <el-col :span="24">
                                    <div class="otherCon"><img :src="item.groupsendimg" class="avatar"
                                                               @click="otherClick(item)"></div>
                                    <div class="date"><span v-html="msgConEmoji(item.groupsenduname)"></span><span v-if="flock"> 来自群 {{item.fromname}} </span>
                                        {{item.createtime | formatTime}}
                                        <el-button type="text" class="txtBtn" v-if="flock" @click="huifu(item)">
                                            回复
                                        </el-button>
                                    </div>
                                    <el-row>
                                        <el-col :span="20" class="elWrap">
                                            <div class="msgCon" v-if="item.msgtype==1"
                                                 v-html="msgConEmoji(item.content)"></div>
                                            <div class="msgCon" v-if="item.msgtype==3 ||item.msgtype==47"><img :src="item.filepath"
                                                                                            class="msgTypePic"
                                                                                            @click="bigPic($event)">
                                            </div>
                                            <div class="audioL" v-if="item.msgtype==34">
                                                <div class="msgCon">
                                                    <a href="javascript:;" class="audio"
                                                       @click="audioBtn('other',item.filepath,$event)"></a>
                                                </div>
                                                <span class="common timeLong">{{item.duration}}</span>
                                                <!--<span class="common" v-if="item.duration">''</span>-->
                                                <!--<span class="common audioFlag" v-if="item.duration"></span>-->
                                            </div>
                                            <div class="msgCon videoType " v-if="item.msgtype==62">
                                                <video preload="auto" class="video" :src="item.filepath"></video>
                                                <div class="videoMark">
                                                    <a href="javascript:;" @click="videoBtn($event)"></a>
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="sendMsg" v-if="item.isself==1">
                            <el-row>
                                <el-col :span="24">
                                    <div class="meCon"><img :src="item.groupsendimg" class="avatar"
                                                            @click="meClick(item)">
                                    </div>
                                    <div class="date">{{item.createtime | formatTime}} 我</div>
                                    <el-row>
                                        <el-col :span="20" class="elWrap">
                                            <div class="msgCon" v-if="item.msgtype==1"
                                                 v-html="msgConEmoji(item.content)"></div>
                                            <div class="msgCon" v-if="item.msgtype==3 ||item.msgtype==47"><img :src="item.filepath"
                                                                                            class="msgTypePic"
                                                                                            @click="bigPic($event)">
                                            </div>
                                            <div class="audioR" v-if="item.msgtype==34">
                                                <!--<span class="common audioFlag" v-if="item.duration"></span>-->
                                                <span class="common timeLong">{{item.duration}}</span>
                                                <!--<span class="common" v-if="item.duration">''</span>-->
                                                <div class="msgCon">
                                                    <a href="javascript:;" class="audio"
                                                       @click="audioBtn('me',item.filepath,$event)"></a>
                                                </div>
                                            </div>
                                            <div class="msgCon videoType" v-if="item.msgtype==62">
                                                <video preload="auto" class="video" :src="item.filepath"></video>
                                                <div class="videoMark">
                                                    <a href="javascript:;" @click="videoBtn($event)"></a>
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-checkbox-group>
        </div>
        <el-row class="allCheckbox" v-if="showCheckbox">
            <el-col :span="12" style="height: 21px">
                <div v-if="record.list && record.list.length > 0">
                    <el-checkbox v-if="!checkAll2" :indeterminate="isIndeterminate" v-model="checkAll"
                                 @change="pageCheckboxBtn">当前页全选
                    </el-checkbox>
                    <el-checkbox v-else disabled v-model="checkAll2">当前页全选</el-checkbox>
                    <el-checkbox v-model="checkAll2" @change="allPageCheckboxBtn">所有页全选</el-checkbox>
                </div>
            </el-col>
        </el-row>
        <audio preload="auto" id="myAudio"></audio>
        <audio preload="auto" id="audioInfo"></audio>
    </div>
</template>

<script>
    import utils from '../../libs/utils';
    export default{
        props: ["showCheckbox", "checkedGroup", "record", "chat", "chatRecord", "send", "height", "flock", "insert", "hideMore"],
        data(){
            return {
                groupList: [],//选择的列表
                qxStatus: false,//当前页全选
                allPageStatus: false,//所有页全选
                radioValue: '',//单选
                checkAll: false,//是否全选
                isIndeterminate: false,
                checkAll2: 0,//是否所有页全选
                listIdArr: [],//当前数组的id数组
                checkedCount: [],//当前数数组的选中数量
            }
        },
        mounted: function () {
            this.$nextTick(function () {

            });
        },
        methods: {
            changelist(arr){
                this.updateCheckedCount(arr);
                this.$emit("choose", this.groupList);
            },
            updateCheckedCount(arr){
                this.checkedCount = arr.length + this.listIdArr.length - utils.arrUnique(arr.concat(this.listIdArr)).length;
                this.checkAll = this.checkedCount === this.listIdArr.length;
                this.isIndeterminate = this.checkedCount > 0 && this.checkedCount < this.listIdArr.length;
            },
            //当前页全选
            pageCheckboxBtn(event){

                var newarr = [];
                if (event.target.checked) {
                    newarr = utils.arrUnique(this.groupList.concat(this.listIdArr));
                } else {
                    let arr2 = JSON.parse(JSON.stringify(this.listIdArr));
                    newarr = utils.arrMinus(this.groupList, arr2);
                }
                this.groupList = newarr;
                this.isIndeterminate = false;

            },
            //所有页全选
            allPageCheckboxBtn(event){
                this.checkAll2 = event.target.checked;
//                if(this.checkAll2){
//                    this.groupList = utils.arrUnique(this.groupList.concat(this.listIdArr));
//                }else{
//                    this.groupList = [];
//                }
                this.$emit("chooseAll", this.checkAll2);
            },
            //归档
            gdBtn(){
                if (this.groupList.length == 0) {
                    this.$notify.error({
                        title: '错误',
                        message: '请选择要归档的消息'
                    });
                } else {
                    this.$emit("gd-btn", this.groupList);
                }
            },
            //文本内容
            msgConEmoji(value){
                let reg = /(?:((ht|f)tps?):\/\/)?([\w.]+[\w\/]*\.[\w.]+[\w\/]*\??[\w=\&\+\%]*)/;
                if (value.search(reg) != -1) {
                    let content = value.replace(value.match(reg)[0], "<a style='color: #57C8F2' target='_blank' href='" + value.match(reg)[0] + "'>" + value.match(reg)[0] + "</a>");
                    return utils.emoji(content);
                } else {
                    return utils.emoji(value);
                }
            },
            //滚动到底部
            scrollBottom(){
                setTimeout(function () {
                    let chat = $(".chat");
                    let h = $("#chatCon").height() + chat.height();
                    chat.animate({scrollTop: h}, 700)
                }, 30)
            },
            //放大图片
            bigPic(e){
                utils.layerPic.init(e.target);
            },
            //语音
            audioBtn(type, link, e){
                let myAudio = document.getElementById("myAudio");
                myAudio.src = link;
                $("a.audio").removeClass("audioR_play").removeClass("audioL_play");
                myAudio.play();
                if (type == "me") {
                    //发送消息
                    if (!myAudio.paused) {
                        $(e.target).addClass("audioR_play").parents("div.audioR");
                    }
                    let timer = setInterval(function () {
                        if (myAudio.ended) {
                            $(e.target).removeClass("audioR_play");
                            clearInterval(timer);
                        }
                        if (myAudio.paused) {
                            $(e.target).removeClass("audioR_play");
                            clearInterval(timer);
                        }
                    }, 500)
                } else {
                    //接收消息
                    if (!myAudio.paused) {
                        $(e.target).addClass("audioL_play").parents("div.audioL");
                    }
                    let timer = setInterval(function () {
                        if (myAudio.ended) {
                            $(e.target).removeClass("audioL_play");
                            clearInterval(timer);
                        }
                        if (myAudio.paused) {
                            $(e.target).removeClass("audioL_play");
                            clearInterval(timer);
                        }
                    }, 500)
                }
            },
            //消息类型状态
            msgTypeStatus(obj, callback){
                if (obj.msgtype == 34) {
                    let myAudio = document.getElementById("audioInfo");
                    myAudio.src = obj.filepath;
                    let timer = setInterval(function () {
                        if (myAudio.readyState == 4) {
                            clearInterval(timer);
                            obj.duration = parseInt(myAudio.duration);
                            callback();
                        }
                    }, 300);
                    setTimeout(function () {
                        clearInterval(timer);
                    }, 10000);
                } else {
                    callback();
                }
            },
            //视频
            videoBtn(e){
                let mark = $(e.target).parent();
                let video = $(e.target).parent().prev()[0];
                let that = this;
                let flag = true;
                let _timer = setInterval(function () {
                    if (video.readyState == 0) {
                        if (flag) {
                            flag = false;
                            mark.parent().addClass("loading");//纠结
                            setTimeout(function () {
                                mark.parent().removeClass("loading").addClass("videoFail");
                                clearInterval(_timer);
                            }, 3000);
                        }
                    } else {
                        clearInterval(_timer);
                        mark.parent().removeClass("loading");
                        mark.dblclick(function (e) {
                            video.play();
                            mark.parent().removeClass("videoPause").addClass("videoPlaying");
                            that.requestFullscreen(video);
                        });
                        if (video.paused) {
                            video.play();
                            mark.hide();
                            mark.parent().removeClass("videoPause").addClass("videoPlaying");

                        } else {
                            video.pause();
                            mark.parent().removeClass("videoPlaying").addClass("videoPause");
                        }
                        let timer = setInterval(function () {
                            if (video.ended) {
                                clearInterval(timer);
                                mark.parent().removeClass("videoPlaying");
                                mark.parent().removeClass("videoPause");
                                mark.show();
                            }
                        }, 300);
                    }
                }, 300)


            },
            //全屏播放
            requestFullscreen(elem){
                let temp = true;
                if (temp) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    }
                    else if (elem.webkitRequestFullScreen) {
                        // 对 Chrome 特殊处理，
                        // 参数 Element.ALLOW_KEYBOARD_INPUT 使全屏状态中可以键盘输入。
                        if (window.navigator.userAgent.toUpperCase().indexOf('CHROME') >= 0) {
                            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                        }
                        // Safari 浏览器中，如果方法内有参数，则 Fullscreen 功能不可用。
                        else {
                            elem.webkitRequestFullScreen();
                        }
                    }
                    else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    }
                    temp = false;
                }
            },
            //我的头像点击事件
            meClick(id){
                this.$emit("me-click", id);
            },
            //对方头像点击事件
            otherClick(id){
                this.$emit("other-click", id);
            },
            //查看历史消息
            lookMore(){
                this.$emit("insert");
            },
            huifu(id){
                this.$emit("huifu", id);
            }
        },
        watch: {
            send: function (obj, oldVal) {
                let that = this;
                this.msgTypeStatus(obj, function () {
                    that.chatRecord.push(obj);
                });
                this.scrollBottom();
            },
            record: function (newValue, oldVal) {
                let that = this;
                this.groupList = this.checkedGroup.exportids ? this.checkedGroup.exportids : [];
                this.checkAll2 = this.checkedGroup.isall === 1 ? true : false;
                that.listIdArr = [];
                newValue.list.forEach(function (item) {
                    that.listIdArr.push(item.exportid + "");
                });
                this.updateCheckedCount(this.groupList);
            }
        },
        computed: {},
        components: {
            "elRow": require("../../components/row/row.vue"),
            "elCol": require("../../components/col/col.vue"),
            "elCheckboxGroup": require("../../components/checkbox/checkbox-group.vue"),
            "elCheckbox": require("../../components/checkbox/checkbox.vue"),
            "elButton": require("../../components/button/button.vue"),
            "elRadio": require("../../components/radio/radio.vue"),
        }
    }
    require("../../assets/styles/components/msg-list.less");
</script>
