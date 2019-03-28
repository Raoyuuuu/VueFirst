<template>
    <div >
      <div class='addButton'>
        <Button @click="clickFn" type="default" icon="md-add">新增</Button>
      </div>
      <Table class='menu' border :columns="menuColumns" :data="menuList"></Table>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data () {
            return {
                menuColumns: [
                    {
                        type: 'index',
                        align: 'center',
                        title:'No'
                    },{
                        title: '菜单名',
                        align: 'center',
                        key: 'menuName',
                    },{
                        title: '菜单路由',
                        align: 'center',
                        key: 'menuUrl',
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
                menuList:[]
            }
        },methods:{
            show(index){
                var thisMId = this.$data.menuList[index].menuId
                console.log(thisMId)
                this.axios.post('http://10.1.9.54:9200/daily/menu/findMenuById',
                qs.stringify({
                    menuId:thisMId
                }))
                .then(res => {
                    console.log(res)
                    if(res.data.resultCode == '200'){
                    this.$store.menuContent = res.data.data
                    this.$router.push('/menuOperation')
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
                
            },
             remove(index){
                var thisMId = this.$data.menuList[index].menuId
                 this.axios.post('http://10.1.9.54:9200/daily/menu/delMenuById',
                qs.stringify({
                    menuId:thisMId
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
                this.$router.push('/addMenu')
            }
        },mounted(){
            var myToken = window.localStorage.getItem('token')
            this.axios.defaults.headers.common['tk-token'] = myToken
            this.axios.post('http://10.1.9.54:9200/daily/menu/findAllMenus')
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    this.menuList = res.data.data
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
        margin-top: 10px;
        text-align: right;
    }
    .menu{
        margin-top: 15px;
        width: 100%; 
        display: inline-block;
    }
</style>
