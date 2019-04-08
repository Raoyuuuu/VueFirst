<template>
    <div>
    <div class="addButton">
        
        <div class="dateleft">
            日期：<DatePicker type="daterange" style="width: 200px"  @on-change="handleChange" ></DatePicker>
        </div>
        <Button type="default" icon="md-add" @click="clickFn" class="newButton">生成周报</Button>
        <Select style="width:200px">
          <Option v-for="item in dateList" :key="item.dateFrom" :value="item.dateTo" @click.native="choose(item.dateFrom,item.dateTo)">
            {{item.dateFrom}}至{{item.dateTo}}
            </Option>
        </Select>

        <Button type="default" icon="md-add" @click="clickAdd" >新增</Button>
        </div>
        <Table border :columns="weekyColumns" :data="weeklyData"></Table>
        <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        :mask-closable="false"
        @on-ok="ok"
        @on-cancel="cancel">
        <div>
            项目名称: <Input v-model="reportContentWeek.target" placeholder="Enter something..." /><br><br>
            类别: <Select v-model="reportContentWeek.projectType" class = 'searchInput' placeholder="Enter something...">
                        <Option v-for="item in workType" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                 </Select><br><br>
            当前进度: <Input v-model="reportContentWeek.progress" placeholder="Enter something..." /><br><br>
            预计完成时间: <Input v-model="reportContentWeek.planDate" placeholder="Enter something..." /><br><br>
            内容描述: <Input v-model="reportContentWeek.description" placeholder="Enter something..." /><br><br>
            未完成原因: <Input v-model="reportContentWeek.reason" placeholder="Enter something..." /><br><br>
        </div>
        </Modal>
        </div>
  
</template>
<script>
import axios from 'axios'
import qs from 'qs'
 var userId
    export default {
        data () {
            return {
                modal1:false,
                reportContentWeek:[],
                weekyColumns: [
                    {
                        title: '时间',
                        align: 'center',
                        key: 'kind',
                        width:'150px',
                        sortable: true,
                        render:(h,params)=>{
                            
                            if(params.row.kind===1){
                               return h('div','本周')
                               
                            }
                            else{
                               return h('div','下周')
                            }
                        }
                    },{
                        title: '项目名称',
                        align: 'center',
                        key: 'target'
                    },{
                        title: '类别',
                        align: 'center',
                        key: 'projectType',
                        
                    },{
                        title: '内容描述',
                        align: 'center',
                        key: 'description'
                    },{
                        title: '当前进度',
                        align: 'center',
                        key: 'progress'
                    },{
                        title: '预计完成时间',
                        align: 'center',
                        key: 'planDate'
                    },{
                        title: '未完成原因',
                        align: 'center',
                        key: 'reason'
                    },{
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '撤回')
                            ]);
                        }
                    }
                ],
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
                weeklyData:[],
                dataValue:[],
                dateList:[],
                
            }
        },
        methods: {
            edit (index) {
                this.modal1=true
                console.log(this.$data.weeklyData[index].weeklyId)
                this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/findByWeeklyId',
                qs.stringify({
                    weeklyId:this.$data.weeklyData[index].weeklyId
                })
                )
                .then(res => {
                    if(res.data.resultCode == '200'){
                        this.reportContentWeek = res.data.data
                        //this.$router.push('/reportOperationWeek')
                        }
                })
                .catch(err => {
                    console.error(err); 
                })
            },

            remove (index) {
                var thisWId = this.$data.weeklyData[index].weeklyId
                console.log(thisWId)
                this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/delete',
                    qs.stringify({
                        weeklyId:thisWId
                    })
                )
                .then(res => {
                    console.log(res)
                    if(res.data.resultCode == '200'){
                        alert('操作成功')
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
                this.weeklyData.splice(index, 1);
            },


            ok(){
                 console.log(this.$data.reportContentWeek)
                 this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/updateByWeeklyId',
                 qs.stringify({
                    weeklyId:this.$data.reportContentWeek.weeklyId,
                    target:this.$data.reportContentWeek.target,
                    projectType:this.$data.reportContentWeek.projectType,
                    description:this.$data.reportContentWeek.description,
                    progress:this.$data.reportContentWeek.progress,
                    planDate:this.$data.reportContentWeek.planDate, 
                    reason:this.$data.reportContentWeek.reason,
                })
            )
            .then(res => {
                if(res.data.resultCode = '200'){
                    alert('操作成功')
                    //this.$router.go(-1)
                    this.show()
                }   
            })
            .catch(err => {
                console.error(err); 
            })
            },
            
            cancle(){

            },
           
            clickFn:function(){
                var d1 = new Date(this.dataValue[0])
                var d2 =  new Date(this.dataValue[1])
                var diff = (d2-d1)/1000/3600/24
                if(diff <= 7){
                    this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/editWeeklyInfo',
                        qs.stringify({
                            userId:userId,
                            dateFrom:this.dataValue[0],
                            dateTo:this.dataValue[1]
                        })
                    )
                    .then(res => {
                        console.log(res)
                        this.weeklyData = res.data.data
                        
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                }else{
                    alert('超过七天')
                }
            },
            clickAdd:function(){
                var daF = this.weeklyData[0].dateFrom
                var daT = this.weeklyData[0].dateTo
                this.$store.dateF = daF
                this.$store.dateT = daT
                if(daF&&daT){
                    this.$router.push('/addNewWeekly')
                }
                else{ 
                    alert("请先生产周报")
                    }
                   
            },
            handleChange(daterange) {
                this.dataValue = daterange;
            },
            choose:function(daF,daT){
                this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/findByDateAndUserId',
                    qs.stringify({
                        userId:userId,
                        dateFrom:daF,
                        dateTo:daT
                    })
                )
                .then(res => {
                    console.log(res)
                    this.weeklyData = res.data.data
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            show(){
            var myToken = window.localStorage.getItem('token')
            userId = window.localStorage.getItem('userId')
            var userName = window.localStorage.getItem('username')
            this.axios.defaults.headers.common['tk-token'] = myToken
                this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/showWeeklyInfo',
                    qs.stringify({
                        userId:userId
                    })
                )
                .then(res => {
                    console.log(res)
                    if(res.data.resultCode == '200'){
                    console.log(res.data.data.dateScope.length)
                    for (var i=0;i<res.data.data.dateScope.length;i++){
                    var daF = res.data.data.dateScope[i].dateFrom
                    var daT= res.data.data.dateScope[i].dateTo
                     daF = new Date(daF);
                     daT = new Date(daT);
                     var yearF = daF.getFullYear()+'-';
                     var monthF = daF.getMonth()+1+'-';
                     var dateF = daF.getDate()+'';
                     var timeF = yearF+monthF+dateF;
                     res.data.data.dateScope[i].dateFrom = timeF
                     var yearT = daT.getFullYear()+'-';
                     var monthT = daT.getMonth()+1+'-';
                     var dateT = daT.getDate()+'';
                     var timeT = yearT+monthT+dateT;
                     res.data.data.dateScope[i].dateTo = timeT
                    //  this.$data.dateList.push(timeF+'至'+timeT)
                  }
                  this.dateList = res.data.data.dateScope
                  this.weeklyData = res.data.data.lastWeeklyInfo
                }
                })
                .catch(err => {
                    console.error(err); 
                })
            }

            },
            mounted(){
            this.show()
        }
    }
</script>
<style>
    .addButton{
        text-align: right;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-top: 10px
    }
    .newButton{
        float: left;
        margin-left: 15px;
    }
    .dateleft{
        float: left;
        padding-left: 15px;
    }
</style>
