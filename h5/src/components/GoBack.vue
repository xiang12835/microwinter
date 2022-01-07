<template>
    <div class="gobackapp" @click="goBack"><s></s></div>
</template>

<script>
    export default {
        name: "GoBack",
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="less">
    .gobackapp {
        position: fixed;
        background-color: rgba(0, 0, 0, .5);
        bottom: 3rem;
        bottom: calc(3rem + constant(safe-area-inset-bottom));
        bottom: calc(3rem + env(safe-area-inset-bottom));
        left: .75rem;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        z-index: 99;

        s {
            display: inline-block;
            position: absolute;
            left: 12px;
            top: 9px;
            width: 12px;
            height: 12px;
            border-top: 2px solid #fff;
            border-left: 2px solid #fff;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }
    }

</style>