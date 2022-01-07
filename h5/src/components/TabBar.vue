<template> 
<div>
    <ul class="g-footer">
        <li class="homeside" @click="toHome">
            <a>
                <img src="../assets/images/home.png" class="lefticon" alt="">
                首页
            </a>
        </li>
        <li class="myside" @click="toMine">
            <a>
                <img src="../assets/images/me.png" class="lefticon" alt="">
                我的
            </a>
        </li>
    </ul>

</div>
</template>
<script>

    import $ from 'jquery'

  export default {
    name: 'TabBar',
     data () {
        return {
            
        }
    },
    computed: {
        user() {
             return this.$store.state.user
        },
    },

    methods: {
        toHome(){
            $(".current").removeClass('current');
            $(".homeside").addClass('current');
            this.$router.push({ path: '/'})
        },
        toMine(){
            $(".current").removeClass('current');
            $(".myside").addClass('current');
            this.$router.push({ path: '/mine/index'})
        },
    }
　}
</script>

<style scroll>
.g-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #efefef;
    background-color: #fff;
    margin-bottom: 0;
    padding-left:0;
}
.g-footer li {
    flex: 1;
     text-align:center;
     font-size:12px;
}
.g-footer li img{
    width:20px;
    display: block;
    margin:0 auto;
}

.current a{
        color: #00cc74 !important;
}

ul, ol, li {
    list-style: none;
}

a {
    color: #262626!important;
    text-decoration: none;
}
</style>
