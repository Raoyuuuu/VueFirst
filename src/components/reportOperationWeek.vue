<template>
    <div>
        <i-button class = 'saveReport' type="default"  @click="updReport" >保存表单</i-button>
        <!-- <div class = 'reportMessage'>{{msg}}-日工作报表</div> -->
        <div class="report">
            <img src="@/assets/keytopLogo.jpg" class="logo"/>
            <div class = "operationBody">
            <i-button class = 'contorlReport' type="default" @click="reSet">重置</i-button>
            </div>
            <div id ="smallSizeInput">
                
                <div class = 'smallSize'>
                    项目名称:<i-Input placeholder="" class = 'reportInput' v-model="reportContentWeek.target"></i-Input>
                </div>
                <div class = 'smallSize'>
                    类别:<Select v-model="reportContentWeek.projectType" class = 'searchInput' placeholder="选择类别">
                        <Option v-for="item in workType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                    </Select>
                </div>
                <div class = 'smallSize'>
                    当前进度:<i-Input placeholder="" class = 'reportInput' v-model="reportContentWeek.progress"></i-Input>
                </div>
                <div class = 'smallSize'>
                    预计完成时间:<i-Input placeholder="" class = 'reportInput' v-model="reportContentWeek.planDate"></i-Input>
                </div>
            </div>
            <div id ="largeSizeInput">
                <div class = 'largeSize'>
                    内容描述:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="reportContentWeek.description"/>
                </div>
                <div class = 'largeSize'>
                    未完成原因:<Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""  v-model="reportContentWeek.reason"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// var myToken
var target
var projectType
var description
var progress
var planDate
var reason
//var problem
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return{
            reportContentWeek:this.$store.reportContentWeek,
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
        this.$data.reportContentWeek.target = target
        this.$data.reportContentWeek.projectType = projectType
        this.$data.reportContentWeek.description = description
        this.$data.reportContentWeek.progress = progress
        this.$data.reportContentWeek.planDate = planDate
        this.$data.reportContentWeek.reason = reason
        //this.$data.reportContentWeek.problem = problem
        },
        updReport:function(){
            this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/updateByWeeklyId',
                qs.stringify({
                    weeklyId:this.$data.reportContentWeek.weeklyId,
                    target:this.$data.reportContentWeek.target,
                    projectType:this.$data.reportContentWeek.projectType,
                    description:this.$data.reportContentWeek.description,
                    progress:this.$data.reportContentWeek.progress,
                    planDate:this.$data.reportContentWeek.planDate, 
                    reason:this.$data.reportContentWeek.reason,
                    //problem:this.$data.reportContentWeek.problem,
                })
            )
            .then(res => {
                console.log(res)
                if(res.data.resultCode = '200'){
                    alert('操作成功')
                    this.$router.go(-1)
                }   
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted(){
        var myToken = window.localStorage.getItem('token')
        this.axios.defaults.headers.common['tk-token'] = myToken
        
        target = this.$data.reportContentWeek.target
        projectType = this.$data.reportContentWeek.projectType
        description = this.$data.reportContentWeek.description
        progress = this.$data.reportContentWeek.progress
        planDate = this.$data.reportContentWeek.planDate
        reason = this.$data.reportContentWeek.reason
        //problem = this.$data.reportContent.problem
    },
    // watch:{
    //     myVaule(){
    //         console.log(this.myVaule)
    //     }
    // }
    // directives:{
    //     focus:{
    //         :function(el){
    //             alert(el.value);
    //         }
    //     }
    // }
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
        height: 864px;
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
