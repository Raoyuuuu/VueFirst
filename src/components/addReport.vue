<template>
    <div>
        <i-button class = 'saveReport' type="default" @click="addReport">保存表单</i-button>
        <div class="report">
            <img src="@/assets/keytopLogo.jpg" class="logo"/>
            <div class = "operationBody">
            <i-button class = 'contorlReport' type="default" @click="reSet">重置</i-button>
            </div>
            <div id ="smallSizeInput">
                <div class = 'smallSize'>
                    工作内容:<i-Input placeholder="" class = 'reportInput' v-model="content"></i-Input>
                </div>
                <div class = 'smallSize'>
                    工作类别:<i-Input placeholder="" class = 'reportInput' v-model="type"></i-Input>
                </div>
                <div class = 'smallSize'>
                    工作占比:<i-Input placeholder="" class = 'reportInput' v-model="proportion"></i-Input>
                </div>
                <div class = 'smallSize'>
                    完成进度:<i-Input placeholder="" class = 'reportInput' v-model="progress"></i-Input>
                </div>
            </div>
            <div id ="largeSizeInput">
                <div class = 'largeSize'>
                    内容描述:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="description"/>
                </div>
                <div class = 'largeSize'>
                    完成情况以及处理方法:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="situation"/>
                </div>
                <div class = 'largeSize'>
                    遗留问题:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="problem"/>
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
            userId:null,
            content:null,
            type:null,
            proportion:null,
            progress:null,
            description:null,
            situation:null,
            problem:null,
            time:null,
        }
    },
    methods:{
        reSet:function(){
            this.content = null
            this.type = null
            this.proportion = null
            this.progress = null
            this.description = null
            this.situation = null
            this.problem = null
        },
        addReport:function(){
            this.axios.post('http://10.1.6.241:9200/daily/dailyinfo/save',
                qs.stringify({
                    userId:this.$data.userId,
                    content:this.$data.content,
                    type:this.$data.type,
                    proportion:this.$data.proportion,
                    progress:this.$data.progress,
                    description:this.$data.description,
                    situation:this.$data.situation,
                    problem:this.$data.problem,
                })
            )
            .then(res => {
                if(res.data.resultCode == '200'){
                    alert('操作成功')
                    this.$router.go(-1)
                }
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted(){
        var myToken = window.localStorage.getItem('token')
        var da = new Date().getTime()
        da = new Date(da);
        this.time = da
        this. userId = window.localStorage.getItem('userId')
        console.log(this.$data.time)
        
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
        height: 364px;
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
