<template>
    <div>
        <div class="addButton">
        <Button type="default" icon="md-add" @click="modal2 = true" >新增</Button>
        </div>

        <Table border :columns="dailyColumns" :data="dailyData"></Table>

        <Modal
        v-model="modal1"
        title="日工作汇报编辑"
        :mask-closable="false"
        @on-ok="ok"
        @on-cancel="cancel">
        
        
        <div>
        工作内容：<Input v-model="reportContent.content" placeholder="Enter something..."/><br/><br>
        内容描述:<Input v-model="reportContent.description" placeholder="Enter something..."/><br/><br>
        工作类别：<Input v-model="reportContent.type" placeholder="Enter something..."/><br/><br>
        工作占比:<Input v-model="reportContent.proportion" placeholder="Enter something..."/><br/><br>
        完成进度:<Input v-model="reportContent.progress" placeholder="Enter something..."/><br/><br>
        完成情况以及处理方法:<Input v-model="reportContent.situation" placeholder="Enter something..."/><br/><br>
        遗留问题:<Input v-model="reportContent.problem" placeholder="Enter something..."/><br/><br>
        </div>
        </Modal>

        <Modal
        title="工作汇报添加"
        v-model="modal2"
        :mask-closable="false"
        @on-ok="ok2"
        @on-cancel="cancel"
        >
        <div>
        工作内容：<Input v-model="reportContent2.content" placeholder="Enter something..."/><br/><br>
        内容描述:<Input v-model="reportContent2.description" placeholder="Enter something..."/><br/><br>
        工作类别：<Input v-model="reportContent2.type" placeholder="Enter something..."/><br/><br>
        工作占比:<Input v-model="reportContent2.proportion" placeholder="Enter something..."/><br/><br>
        完成进度:<Input v-model="reportContent2.progress" placeholder="Enter something..."/><br/><br>
        完成情况以及处理方法:<Input v-model="reportContent2.situation" placeholder="Enter something..."/><br/><br>
        遗留问题:<Input v-model="reportContent2.problem" placeholder="Enter something..."/><br/><br>
        </div>
        </Modal>

    </div>
    
</template>
<script>

import axios from 'axios'
import qs from 'qs'

    export default {
        data () {
            return {
                temp:[],
                dailyData:[],
                reportContent:[],
                reportContent2:[],
                modal1:false,
                modal2:false,
                dailyColumns: [
                    {
                        title: '跟进时间',
                        align: 'center',
                        key: 'date',
                        width:'150px'
                    },{
                        title: '工作内容',
                        align: 'center',
                        key: 'content'
                    },{
                        title: '内容描述',
                        align: 'center',
                        key: 'description'
                    },{
                        title: '工作类别',
                        align: 'center',
                        key: 'type'
                    },{
                        title: '当日工作占比',
                        align: 'center',
                        key: 'proportion'
                    },{
                        title: '完成进度',
                        align: 'center',
                        key: 'progress'
                    },{
                        title: '完成情况以及处理方法',
                        align: 'center',
                        key: 'situation'
                    },{
                        title: '遗留问题',
                        align: 'center',
                        key: 'problem'
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
                
            }
        },
        methods: {
            edit (index) {
                this.modal1=true
                console.log(this.$data.dailyData[index].dailyId)
                this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/findByDailyId',
                qs.stringify({
                    dailyId:this.$data.dailyData[index].dailyId
                })
                )
                .then(res => {
                    if(res.data.resultCode == '200'){
                        this.reportContent = res.data.data
                        console.log(res.data.data)
                        //this.$router.push('/reportOperation')
                        }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            remove (index) {
                var thisDId = this.$data.dailyData[index].dailyId
                console.log(thisDId)
                this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/delByDailyId',
                    qs.stringify({
                        dailyId: thisDId
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
                this.dailyData.splice(index, 1);
            },
            clickFn:function(){

            },
            ok () {
                console.log(this.$data.reportContent)
                this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/updateByDailyId',
                qs.stringify({
                    dailyId:this.$data.reportContent.dailyId,
                    content:this.$data.reportContent.content,
                    type:this.$data.reportContent.type,
                    proportion:this.$data.reportContent.proportion,
                    progress:this.$data.reportContent.progress,
                    description:this.$data.reportContent.description, 
                    situation:this.$data.reportContent.situation,
                    problem:this.$data.reportContent.problem,
                })
            )
             .then(res => {
                if(res.data.resultCode = '200'){
                    //alert('保存成功')
                    this.show()
                    this.$set(this.temp,'title','x')
                    //this.$router.go(-1)
                }   
            })
            .catch(err => {
                console.error(err); 
            })
            
            },
            ok2 () {
            console.log(this.reportContent2)
            var userId = window.localStorage.getItem('userId')
            this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/save',
                qs.stringify({
                    userId:userId,
                    content:this.$data.reportContent2.content,
                    type:this.$data.reportContent2.type,
                    proportion:this.$data.reportContent2.proportion,
                    progress:this.$data.reportContent2.progress,
                    description:this.$data.reportContent2.description,
                    situation:this.$data.reportContent2.situation,
                    problem:this.$data.reportContent2.problem,
                })
            )
            .then(res => {
                if(res.data.resultCode == '200'){
                    //alert('保存成功')
                    //this.$router.go(-1)
                    this.show()
                }
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
            
            },

            cancel () {
                //this.$Message.info('Clicked cancel');
            },
            show(){
            var myToken = window.localStorage.getItem('token')
            var userId = window.localStorage.getItem('userId')
            var userName = window.localStorage.getItem('username')
            this.axios.defaults.headers.common['tk-token'] = myToken
             this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/findByUserId',qs.stringify({
            userId:userId
            }))
            .then(res => {
            console.log(res)
            if(res.data.resultCode == '200'){
                // console.log(res.data.data.length)
                for (var i=0;i<res.data.data.length;i++){
                    
                    var da = res.data.data[i].date
                     da = new Date(da);
                     var year = da.getFullYear()+'年';
                     var month = da.getMonth()+1+'月';
                     var date = da.getDate()+'日';
                     var time = year+month+date
                     res.data.data[i].date = time
                }
               this.dailyData = res.data.data
                 this.$store.title = userName+"的日报表"
                console.log(this.$store.title)
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
</style>
