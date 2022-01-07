<template>
    <div class="g-header">
        <div class="hd">{{title}}</div>
    </div>
</template>

<script>

    export default {
        name: "NavBar",
        props:['title'],
    }

</script>

<style scoped>
    .g-header {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 8;
        width: 100%;
        line-height: 38px;
        background-color: #00cc74;
        color: #fff;
        height: 40px;
    }
    .g-header .hd {
        color: #fff;
        font-size: 16px;
        text-align: center;
        padding: 0 1rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 0 auto;
        width: 120px;
        display: flex;
        justify-content: center;
    }
</style>