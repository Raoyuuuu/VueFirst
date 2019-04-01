<template>
    <Table border :columns="weekyColumns" :data="weekyData"></Table>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

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
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
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
                                        size: 'small'
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
                weekyData:[]
            }
        },
        methods: {
            show (index) {
                console.log(this.$data.weekyData[index].weeklyId)
                
                this.axios.post('http://10.1.9.53:9200/daily/weeklyinfo/findByUserId',
                //this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/findByDailyId',
                qs.stringify({
                    weeklyId:this.$data.weekyData[index].weeklyId
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
                var thisRId = this.$data.weekyData[index].userId
                this.weekyData.splice(index, 1);
                // this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/',params)
                // .then(res => {
                //     console.log(res)
                // })
                // .catch(err => {
                //     console.error(err); 
                // })
            }
        },mounted(){
            var myToken = window.localStorage.getItem('token')
            this.axios.defaults.headers.common['tk-token'] = myToken
            this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/showWeeklyInfo',
            //this.axios.post('http://10.1.9.53:9200/daily/dailyinfo/findByUserId',
        qs.stringify({
            userId:this.$store.user
        }))
        .then(res => {
            console.log(res)
      
            if(res.data.resultCode == '200'){
                // console.log(res.data.data.length)
                // for (var i=0;i<res.data.data.length;i++){
                //      var da = res.data.data[i].date
                //      da = new Date(da);
                //      var year = da.getFullYear()+'年';
                //      var month = da.getMonth()+1+'月';
                //      var date = da.getDate()+'日';
                //      var time = year+month+date
                //      res.data.data[i].date = time
                // }
                this.weekyData = res.data.data.lastWeeklyInfo
                console.log(this.weekyData)
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }
    }
</script>