<template>
    <div>
        <!-- <Button type="primary" @click="clickFn">编辑</Button> -->
    <div class="addButton">
        
        <!-- <div class="dateleft">
            到：<DatePicker type="date" style="width: 200px" v-model="data2"></DatePicker>
        </div> -->
        <div class="dateleft">
            日期：<DatePicker type="daterange" style="width: 200px"  @on-change="handleChange" ></DatePicker>
        </div>
        <Button type="default" icon="md-add" @click="clickFn" class="newButton">生成周报</Button>
        <Button type="default" icon="md-add" @click="clickAdd" >新增</Button>
        </div>
        <Table border :columns="weekyColumns" :data="weeklyData"></Table>
    </div>
    
</template>
<script>
import axios from 'axios'
import qs from 'qs'
 var userId
    export default {
        data () {
            return {
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
                                        type: 'default',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'default',
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
                weeklyData:[],
                dataValue:[],
                // data2:null
            }
        },
        methods: {
            show (index) {
                console.log(this.$data.weeklyData[index].weeklyId)
                this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/findByWeeklyId',
                qs.stringify({
                    weeklyId:this.$data.weeklyData[index].weeklyId
                })
                )
                .then(res => {
                    if(res.data.resultCode == '200'){
                        this.$store.reportContentWeek = res.data.data
                        this.$router.push('/reportOperationWeek')
                        }
                    
                    console.log(res)
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            remove (index) {
                this.weeklyData.splice(index, 1);
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
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                }
            },
            clickAdd:function(){
                this.$router.push('/addNewWeekly')
            },
            handleChange(daterange) {
                this.dataValue = daterange;
            },
            },
            mounted(){
            var myToken = window.localStorage.getItem('token')
            userId = window.localStorage.getItem('userId')
            var userName = window.localStorage.getItem('username')
            this.axios.defaults.headers.common['tk-token'] = myToken
             this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/findByUserId',qs.stringify({
            userId:userId
        }))
        .then(res => {
            console.log(res)
            if(res.data.resultCode == '200'){
                // console.log(res.data.data.length)
                // for (var i=0;i<res.data.data.length;i++){
                    
                //     var da = res.data.data[i].date
                //      da = new Date(da);
                //      var year = da.getFullYear()+'年';
                //      var month = da.getMonth()+1+'月';
                //      var date = da.getDate()+'日';
                //      var time = year+month+date
                //      res.data.data[i].date = time
                // }
               this.weeklyData = res.data.data
                //  this.$store.title = userName+"的日报表"
                // console.log(this.$store.title)
                }
            })
            .catch(err => {
                console.error(err); 
            })
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
