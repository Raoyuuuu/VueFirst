<template>
    <div >
      <div class='addButton'>
        <Button type="default" icon="md-add" @click="clickFn">新增</Button>
      </div>
      <Table class='menu' border :columns="uriColumns" :data="uriList"></Table>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'



export default {
    data () {
            return {
                uriColumns: [
                    {
                        type: 'index',
                        align: 'center',
                        title:'No'
                    },{
                        title: '接口名',
                        align: 'center',
                        key: 'descrip',
                    },{
                        title: '接口路由',
                        align: 'center',
                        key: 'uri',
                    },{
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '50px'
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
                                }, '删除')
                            ]);
                        }
                    }
                ],
                uriList:[]
            }
        },methods:{
            show:function(index){
                 var thisMId = this.$data.uriList[index].uriId
                 this.axios.post('10.1.6.241:9200/daily/uri/findUriById',
                qs.stringify({
                    uriId:thisMId
                }))
                .then(res => {
                    console.log(res)
                    if(res.data.resultCode == '200'){
                    this.$store.uriContent = res.data.data
                    this.$router.push('/interfaceOperation')
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            remove:function(index){
                var thisMId = this.$data.uriList[index].uriId
                 this.axios.post('http://10.1.6.241:9200/daily/uri/delUriById',
                qs.stringify({
                    uriId:thisMId
                }))
                .then(res => {
                    console.log(res)
                    if(res.data.resultCode == '200'){
                    alert("操作成功")
                    this.menuList.splice(index, 1)
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            clickFn:function(){
                this.$router.push('/addUri')
            }
        },mounted(){
            var myToken = window.localStorage.getItem('token')
            this.axios.defaults.headers.common['tk-token'] = myToken
            this.axios.post('http://10.1.6.241:9200/daily/uri/findAllUris')
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    this.uriList = res.data.data
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
    }
    .menu{
       width: 100%;  
       display: inline-block;
    }
</style>
