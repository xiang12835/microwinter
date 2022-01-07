<template>
    <div>

        <NavBar title="个人中心"/>

        <div class='g-wrapper' style="margin-top: 40px">
            <div class="my-hd">
                <div class="hd-info" v-if="userId==''">
                    <div class='hd-info-span'>
                        <img src="../../assets/images/me.png" class='hd-info-img'>
                    </div>
                    <div class="info-text">
                        <em class="info-tex-em">Hi，你好</em>
                        <button type="button"  class="info-button" @click="toLogin">去登录</button>
                    </div>
                </div>

                <div class="hd-info"  v-if="userId">
                    <div class='hd-info-span'>
                        <img v-if="userInfo.avatar" :src="userInfo.avatar" class='hd-info-img'>
                    </div>
                    <div class="info-text">
                        <em class="info-tex-em">Hi，{{userInfo.userName}}</em>
                    </div>
                </div>
            </div>

            <div class="van-cell-group van-hairline--top-bottom">
                <div class="van-cell dflex van-hairline van-cell--clickable" @click="toMyCollection">
                    <div class="van-cell__title">
                        <em class="icon icon-lan iconfont icon-education"></em>

                        <span class="van-cell-text">我的收藏</span>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>

            <div class="van-cell-group van-hairline--top-bottom mt10" v-if="userId!=''">
                <div class="van-cell dflex van-hairline van-cell--clickable" @click='checkLogout'>
                    <div class="van-cell__title">
                        <em class="icon icon-lv iconfont icon-ren3"></em>
                        <span class="van-cell-text">退出</span>
                        <div class="arrow"></div>
                    </div>
                </div>
            </div>

        </div>

        <!--
        <el-dialog title="提示" :visible.sync="dialogVisible" width="90%">
            <span>您确定退出登录嘛～</span>
            <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible=false">取消</el-button>
				<el-button type="success" @click="toLogout">确认</el-button>
			</span>
        </el-dialog>
        -->

    </div>
</template>

<script>
    import $ from 'jquery'
    import NavBar from '../../components/NavBar.vue'

    export default {
        name: 'mine',
        components:{
            NavBar,
        },
        data () {
            return {
                userId: '',
                userInfo: null,
                dialogVisible: false
            }
        },

        computed: {
            stateUserId() {
                return this.$store.state.userId;
            },
            stateUserInfo() {
                return this.$store.state.userInfo;
            },
        },
        watch: {

        },
        created: function() {
            this.userId=this.stateUserId;
            this.userInfo=this.stateUserInfo;
        },
        methods: {
            toLogin(){
                this.$router.push({ path: '/login'})
            },
            checkLogout() {
                this.dialogVisible = true
            },
            toLogout() {
                this.$utils.delCookie('mUserId');
                this.$utils.delCookie('mOpenId');
                this.$store.state.userId = '';
                this.$store.state.openId = '';
                this.userId = '';
                this.userInfo = null;
                this.dialogVisible = false;
                this.$router.push({ path: '/mine/index'})
            },
            toMyCollection(){
                if (this.userId!='') {
                    this.$router.push({ path: '/mine/collection'})
                } else {
                    this.$message({
                        message: '请先登录',
                        type: 'warning'
                    });
                    this.$router.push({ path: '/login'})
                }
            }
        }

    }
</script>


<style scoped>
    .g-wrapper {
        position: relative;
        min-height: 100%;
        background: #f8f8f8;
        border-bottom: 1px solid #efefef;
    }

    .mt90 {
        margin-top: 40px;
        margin-bottom: 10px;
    }
    .my-hd {
        background: #fff;
        border-bottom: 1px solid #efefef;
        margin-bottom: 11px;
        padding: 16px;
        display: flex;
        align-items: center;

    }
    .hd-info-img{
        max-width: 100%;
        max-height: 100%;
    }

    .hd-info-span{
        float: left;
        width: 66px;
        height: 66px;
        line-height: 66px;
        border-radius: 50%;
        overflow: hidden;
        text-align: center;
        border: 1px solid #f1f1f1;
    }

    .my-hd .hd-info .info-text {
        margin-left: 75px;
    }

    .info-tex-em{
        color:#333;
        float:left;
        font-size:18px;
        overflow:21px;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient:vertical;
        margin-right: 10px;
    }

    .info-button{
        background:#f1514e;
        color:#fff;
        border-radius:5px;
        padding:4px 13px;
        font-size:12px;
        height:24px;
        line-height:14px;
        outline:none;
        border:none;
    }
    .info-text{
        margin-top: 20px;
    }


    .van-cell-group {
        background-color: #fff;
    }
    .van-hairline--top-bottom::after {
        border-width: 1px 0;
    }
    .van-hairline::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        pointer-events: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 0 solid #e5e5e5;
    }
    .van-cell {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px 15px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #333;
        font-size: 14px;
        overflow: hidden;
    }

    .van-cell:not(:last-child)::after {
        left: 15px;
        right: 0;
        width: auto;
        -webkit-transform: scale(1,.5);
        transform: scale(1,.5);
        border-bottom-width: 1px;
    }

    .mt10 {
        margin-top: 10px;
    }
    .mt5 {
        margin-top: 5px;
    }

    .arrow{
        width: 10px;
        height: 10px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        position: absolute;
        right: 15px;
        transform: rotate(45deg);
        top:20px;
    }

    .icon{
        padding:2px;
        font-size:12px;
        color:#fff;
        margin-right: 5px;
        border-radius: 2px;
    }

    .icon-lan{
        background-color:#36baf5;
    }

    .icon-cheng{
        background-color:#fa7959;
    }

    .icon-lv{
        background-color:#31c09d;
    }

    .icon-hong{
        background-color:#fa6566;
    }

    .icon-zi{
        background-color:#d067d4;
    }

    em, i {
        font-style: normal;
    }
</style>
