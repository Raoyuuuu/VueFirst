<template>
    <div>
        <i-button class = 'saveReport' type="default" @click="saveUri">保存</i-button>
        <div class="report">
            <img src="@/assets/keytopLogo.jpg" class="logo"/>
            <div class = "operationBody">
            <i-button class = 'contorlReport' type="default" @click="reSet">重置</i-button>
            </div>
            <div id ="smallSizeInput">
                <div class = 'smallSize'>
                    菜单名称:<i-Input placeholder="" class = 'reportInput' v-model="menuName"></i-Input>
                </div>
                <div class = 'smallSize'>
                    菜单路由:<i-Input placeholder="" class = 'reportInput' v-model="menuUrl"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
    data(){
        return{
            menuName:null,
            menuUrl:null
        }
    },
    methods:{
        saveUri:function(){
            this.axios.post('http://10.1.6.241:9200/daily/menu/addMenu',
            qs.stringify({
                menuName:this.$data.menuName,
                menuUrl:this.$data.menuUrl
            })
            )
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    alert('操作成功')
                    this.$router.push('/menuControl')
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        reSet:function(){
            this.menuName = null
            this.menuUrl = null
        }
    },
    mounted(){
        var myToken = window.localStorage.getItem('token')
        this.axios.defaults.headers.common['tk-token'] = myToken
    },
}
</script>
 
<style>
    .saveReport{
        position: relative;
        top: 13px;
        float: right;
        height: 30px;
        width: 80px;
        margin-right: 30px
    }
    .contorlReport{
        
        float: right;
        height: 30px;
        width: 80px;
        margin-left: 20px
    }
    .reportMessage{
        padding-top: 10px;
        height: 41px;
        width: 100%;
        position: relative;
        top: 51px;
        border: rgba(165, 165, 165, 0.904) 2px solid;
    }
    .report{
        width: 100%;
        position: relative;

        height: 600px;

        top: 49px;
        border: rgba(165, 165, 165, 0.904) 2px solid;
    }
    .reportSelect{
        height: 30px;
        width: 21.31%;
        margin-right: -20px;
        
    }
    .reportInput{
        height: 30px;
        width: 80%;
        margin-right: -20px;
    }
    .operationBody{
        height: 54px;
        text-align: right;
        padding-right: 26px;
        padding-top: 24px
    }
    .smallSize{
        margin-top:24px; 
        display: block;
        width: 70%;
    }
    .largeSize{
        margin-top:24px; 
        display: block;
        width: 45%;
        text-align: left
    }
    #smallSizeInput{
        width: 50%;
        display: table;
        padding-left:20%;
        position: relative;
        top: 61px;
    }
    #largeSizeInput{
        width: 50%;
        display: table;
        float: right;
        padding-left:5%;
        margin-top: -219px
    }
    .logo{
        position: absolute;
        width: 299px;
        height: 85px;
        top: 12px;
        left: 23%;
    }
</style>
