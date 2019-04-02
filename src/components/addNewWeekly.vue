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
                    <Select v-model="kind" class = 'searchInput' placeholder="选择类别">
                        <Option v-for="item in planType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                    </Select>
                </div>
                <div class = 'smallSize'>
                    项目名称:<i-Input placeholder="" class = 'reportInput' v-model="target"></i-Input>
                </div>
                <div class = 'smallSize'>
                    类别:<Select v-model="projectType" class = 'searchInput' placeholder="选择类别">
                        <Option v-for="item in workType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                    </Select>
                </div>
                <div class = 'smallSize'>
                    当前进度:<i-Input placeholder="" class = 'reportInput' v-model="progress"></i-Input>
                </div>
                <div class = 'smallSize'>
                    预计完成时间:<i-Input placeholder="" class = 'reportInput' v-model="planDate"></i-Input>
                </div>
            </div>
            <div id ="largeSizeInput">
                <div class = 'largeSize'>
                    内容描述:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="description"/>
                </div>
                <div class = 'largeSize'>
                    未完成原因:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="reason"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

var daF 
var daT
var time
var timeT
export default {
    data(){
        return{
            dataValue:[],
            kind:null,
            userId:null,

            target:null,
            projectType:null,
            progress:null,
            planDate:null,
            description:null,
            reason:null,
       
            planType:[{
                value: '本周工作',
                label: '本周工作'   
            },{
                value: '下周计划',
                label: '下周计划'
            }],
            workType:[{
                value: '项目维护',
                label: '项目维护'   
            },{
                value: '项目开发',
                label: '项目开发'
            },{
                value: '产品研发',
                label: '产品研发'
            }],
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
            
            this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/save',
                qs.stringify({ 
                    kindStr:this.$data.kind,
                    userId:this.$data.userId,
                    dateF:time,
                    dateT:timeT,
                    target:this.$data.target,
                    projectType:this.$data.projectType,
                    planDate:this.$data.planDate,
                    progress:this.$data.progress,
                    description:this.$data.description,
                    reason:this.$data.reason,
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
        },
        handleChange(daterange) {
                this.dataValue = daterange;
            },

    },
    mounted(){
        console.log(this.$store.dateF+' '+this.$store.dateT)

        var myToken = window.localStorage.getItem('token')
        daF = new Date(this.$store.dateF)
        var year = daF.getFullYear()+'-';
        var month = daF.getMonth()+1+'-';
        var date = daF.getDate();
        time = year+month+date
        console.log(time)
        
        daT = new Date(this.$store.dateT)

        var yearT = daT.getFullYear()+'-';
        var monthT = daT.getMonth()+1+'-';
        var dateT = daT.getDate();
        timeT = yearT+monthT+dateT
        console.log(timeT)
        
        this.userId = window.localStorage.getItem('userId')
        
        if(this.$store.dataValue){
            this.dataValue = this.$store.dataValue
        }
        
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
        height: 464px;
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
    .searchInput{
        width: 120px;
        position: absolute;
        left: 23%;
    }
</style>
