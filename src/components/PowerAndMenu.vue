<template>
<div>
    <Table border :columns="columns7" :data="power"></Table>
     <Modal
        v-model="modal1"
        title="菜单权限"
        @on-ok="ok"
        @on-cancel="cancel"
       
        >
        <transferMenu></transferMenu>
    </Modal>
</div>
</template>
<script>
import transferMenu from '@/components/TransferMenu'
import axios from 'axios'
import qs from 'qs'

var myId
    export default {
        components: {
             transferMenu,
            },
        data(){
            return {
                modal1:false,
                powerId:[],
                power:[],
                columns7: [
                    {
                        title: '权限',
                        key: 'power',
                        render: (h, params) => {
                            
                               let str=''
                                var id = params.row.power.powerId
                                
                                this.powerId.push(id)
                                str+=`${params.row.power.powerName},`
                            
                        
                            return h('div',  str);
                         
                    },
                    },
                    {
                        title: '菜单',
                        key: 'menuList',
                        render: (h, params) => {
                            let str=''
                            for( let i=0; i<params.row.menuList.length;i++){
                                str+=`${params.row.menuList[i].menuName},`
                            
                            }
                            return h('div',  str);
                        
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
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
            }
        },
        methods: {
            edit (data) {
                myId = this.$data.powerId[data]
                console.log(myId)
                this.modal1=true

            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            ok(){
             console.log("OK")
             var params={
                 powerId:myId,
                 menuIds:this.$store.power
             }
              console.log(params)
              var myToken = window.localStorage.getItem('token')
              this.axios.defaults.headers["Content-Type"]='application/json;charset=UTF-8'
              this.axios.defaults.headers.common['kt-token'] = myToken
              this.axios.post("http://10.1.9.53:9200/daily/power/savePowerAndMenus",params).then(res =>{
                  if(res.data.resultCode == '200'){
                     console.log('保存成功')
                  }
              }).catch(err => {
                 console.error(err); 
             })

            },
            cancel(){
            }
        },
    mounted(){
            var myToken = window.localStorage.getItem('token')
            this.axios.defaults.headers.common['kt-token'] =myToken
            this.axios.post('http://10.1.9.53:9200/daily/power/findPowerMenus')
            .then(res => {
                if(res.data.resultCode == '200'){
                    // var index = res.data.data
                    // for(let i=0;i<index.length;i++){
                    //     var powername = res.data.data[i].role.roleName
                    //     this.perssionList.push(powername)

                    //     }
                    this.power = res.data.data
                    //console.log(this.power)
                }
            })
            .catch(err => {
                console.error(err); 
            })
    }
    }
</script>