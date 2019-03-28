<template>
<div>
    <Table border :columns="columns7" :data="power"></Table>
     <Modal
        v-model="modal1"
        title="菜单权限"
        @on-ok="ok"
        @on-cancel="cancel"
       
        >
        <transferUrl></transferUrl>
    </Modal>
</div>
</template>
<script>
import transferUrl from '@/components/TransferUrl'
import axios from 'axios'
import qs from 'qs'

var myId
    export default {
        components: {
             transferUrl,
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
                        key: 'uris',
                        render: (h, params) => {
                            let str=''
                            for( let i=0; i<params.row.uris.length;i++){
                                str+=`${params.row.uris[i].uri},`
                            
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
                 uriIds:this.$store.uri
             }
              console.log(params)
              var myToken = window.localStorage.getItem('token')
              this.axios.defaults.headers["Content-Type"]='application/json;charset=UTF-8'
              this.axios.defaults.headers.common['kt-token'] = myToken
              this.axios.post("http://10.1.9.53:9200/daily/power/savePowerAndUris",params).then(res =>{
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
            this.axios.post('http://10.1.9.53:9200/daily/power/findPowerUris')
            .then(res => {
                if(res.data.resultCode == '200'){
                    this.power = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
    }
    }
</script>