<template>
    <div>
    <div class="addButton">
        
        <div class="dateleft">
            日期：<DatePicker type="daterange" style="width: 200px"  @on-change="handleChange" ></DatePicker>
        </div>

        <Button type="default" icon="md-add" @click="clickFn" class="newButton">生成周报</Button>
        
        <Select style="width:200px">
          <Option v-for="(item,index) in dateList" :key="index" :value="item.dateTo" @click.native="choose(item.dateFrom,item.dateTo)">
            {{item.dateFrom}}至{{item.dateTo}}
            </Option>
        </Select>

        <Button type="default" icon="md-add" @click="modal2=true" >新增</Button>
        </div>
        <Table border :columns="weekyColumns" :data="weeklyData"></Table>

        <!--周报编辑模态框-->
        <Modal
        v-model="modal1"
        title="周报编辑"
        :mask-closable="false"
        @on-ok="ok"
        @on-cancel="cancel">
        <div>
            项目名称: <Input v-model="reportContentWeek.target" placeholder="Enter something..." /><br><br>
            类别: <Select v-model="reportContentWeek.projectType" class = 'searchInput' placeholder="Enter something...">
                        <Option v-for="itemm in workType" :value="itemm.value" :key="itemm.value" >{{ itemm.label }}</Option>
                 </Select><br><br>
            当前进度: <Input v-model="reportContentWeek.progress" placeholder="Enter something..." /><br><br>
            预计完成时间: <Input v-model="reportContentWeek.planDate" placeholder="Enter something..." /><br><br>
            内容描述: <Input v-model="reportContentWeek.description" placeholder="Enter something..." /><br><br>
            未完成原因: <Input v-model="reportContentWeek.reason" placeholder="Enter something..." /><br><br>
        </div>
        </Modal>
        
        <!--周报新增模态框-->
        <Modal
        v-model="modal2"
        title="周报新增"
        :mask-closable="false"
        @on-ok="ok2"
        @on-cancel="cancel">
        <div>
            <Select v-model="reportContentWeek2.kind"  placeholder="请选择时间">
                        <Option v-for="itemn in planType" :value="itemn.value" :key="itemn.value" >{{ itemn.label }}</Option>
            </Select><br><br>

            项目名称：<Input v-model="reportContentWeek2.target" placeholder="Enter something..."></Input><br><br>

            类别：
            <Select v-model="reportContentWeek2.projectType"  placeholder="请选择类别">
                        <Option v-for="itemnn in workType" :value="itemnn.value" :key="itemnn.value" >{{ itemnn.label }}</Option>
            </Select><br><br>

            当前进度：<Input v-model="reportContentWeek2.progress" placeholder="Enter something..."></Input><br><br>

            预计完成时间：<Input v-model="reportContentWeek2.planDate" placeholder="Enter something..."></Input><br><br>

            内容描述：<Input v-model="reportContentWeek2.description" placeholder="Enter something..."></Input><br><br>

            未完成原因：<Input v-model="reportContentWeek2.reason" placeholder="Enter something..."></Input><br><br>
        </div>
        </Modal>
        </div>
  
</template>
<script>
import axios from 'axios'
import qs from 'qs'
var userId
var daF
var daT
var time
var timeT
    export default {
        data () {
            
            return {
                
                modal1:false,
                modal2:false,
                reportContentWeek:[],
                reportContentWeek2:[],
                dataValue:[],

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
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            edit (index) {
                this.modal1=true
                console.log(this.$data.weeklyData[index].weeklyId)
                this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/findByWeeklyId',
                qs.stringify({
                    weeklyId:this.$data.weeklyData[index].weeklyId
                })
                )
                .then(res => {
                    if(res.data.resultCode == '200'){
                        this.reportContentWeek = res.data.data
                        }
                })
                .catch(err => {
                    console.error(err); 
                })
            },

            remove (index) {
                var thisWId = this.$data.weeklyData[index].weeklyId
                console.log(thisWId)
                this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/delete',
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
                 var kinds =this.$data.reportContentWeek.kind
                 if(kinds===1){
                     kinds="本周工作"
                 }
                 else{
                     kinds="下周工作"
                 }
                 this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/updateByWeeklyId',
                 qs.stringify({
                   
                    weeklyId:this.$data.reportContentWeek.weeklyId,
                    kindStr:kinds,
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
                     this.show()
                }   
            })
            .catch(err => {
                console.error(err); 
            })
            },
            
            ok2(){
                daF = new Date(this.$data.weeklyData[0].dateFrom)
                var year = daF.getFullYear()+'-';
                var month = daF.getMonth()+1+'-';
                var date = daF.getDate();
                time = year+month+date

                daT = new Date(this.$data.weeklyData[0].dateTo)
                var yearT = daT.getFullYear()+'-';
                var monthT = daT.getMonth()+1+'-';
                var dateT = daT.getDate();
                timeT = yearT+monthT+dateT

                this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/save',
                qs.stringify({ 
                    kindStr:this.$data.reportContentWeek2.kind,
                    userId:userId,
                    target:this.$data.reportContentWeek2.target,
                    projectType:this.$data.reportContentWeek2.projectType,
                    planDate:this.$data.reportContentWeek2.planDate,
                    progress:this.$data.reportContentWeek2.progress,
                    description:this.$data.reportContentWeek2.description,
                    reason:this.$data.reportContentWeek2.reason,
                    dateF:time,
                    dateT:timeT,
                })
                )
                .then(res => {
                    if(res.data.resultCode == '200'){
                        alert('操作成功')
                        this.show
                    }
                    console.log(res)
                })
                .catch(err => {
                    console.error(err); 
                })
            },
           
            clickFn:function(){
                var d1 = new Date(this.dataValue[0])
                var d2 =  new Date(this.dataValue[1])
                var diff = (d2-d1)/1000/3600/24
                if(diff <= 7){
                    this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/editWeeklyInfo',
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
                    alert('超过七天，请重新选择')
                }
            },
            handleChange(daterange) {
                this.dataValue = daterange;
            },
            choose:function(daF,daT){
                this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/findByDateAndUserId',
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
                        this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/showWeeklyInfo',
                            qs.stringify({
                                userId:userId
                                })
                    )
                    .then(res => {
                    //console.log(res)
                    if(res.data.resultCode == '200'){
                    //console.log(res.data.data.dateScope.length)
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
                  }
                  this.dateList = res.data.data.dateScope
                  this.weeklyData = res.data.data.lastWeeklyInfo
                  

                }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
           

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
