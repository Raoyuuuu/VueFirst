<template>
<div class = 'welcomeUser'>
    你好，{{username}}!!
</div>
</template>

<script>
    export default {
        data(){
            return{
                username:window.localStorage.getItem('username')
            }
        }
        
    }
</script>
<style>
 .welcomeUser{
     height: 280px;
     text-align: center;
     padding-top:10%;
     font-size:40px;
     color:rgba(165, 165, 165, 0.904)
 }
</style>