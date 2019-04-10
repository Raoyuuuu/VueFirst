<template>
    <div class='treeDiv'>
    <Modal
        v-model="modal6"
        title="新增菜单"
        @on-ok="append2">
        菜单名称:<Input prefix="ios-bookmark" type="text"  style="width: auto" v-model="menuName"/>
        <br/>
        菜单链接:<Input class = 'loginpassword' prefix="ios-link" type="text"  style="width: auto" v-model="menuUrl"/>
        <!-- password:<input type="password" name = "password" v-model="password"/> -->
        <br/>
    </Modal>
    <Modal
        v-model="modal7"
        title="编辑菜单"
        @on-ok="upDate">
        菜单名称:<Input prefix="ios-bookmark" type="text"  style="width: auto" v-model="menuName"/>
        <br/>
        菜单链接:<Input class = 'loginpassword' prefix="ios-link" type="text"  style="width: auto" v-model="menuUrl"/>
        <!-- password:<input type="password" name = "password" v-model="password"/> -->
        <br/>
    </Modal>
    <Tree :data="data5" :render="renderContent" class="tree" ></Tree>
    </div>
</template>
<style>
 .tree{
     text-align: left
 }
 .treeDiv{
     margin-left:35%
 }
</style>

<script>
import axios from 'axios'
import qs from 'qs'

var nodeKey
var dataTemp = []
var thisMenuId
    export default {
        data () {
            return {
                data5: [
                     {
                        title: '功能菜单',
                        expand: true,
                        menuId:'0',
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', {
                                    style: {
                            width: '120px',
                            display: 'inline-block',
                            }
                        
                                },[
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        marginLeft: '200px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '98px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
            
                modal6: false,
                modal7: false,
                menuName:null,
                menuUrl:null
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        // marginLeft:'10%'
                    }
                }, [
                    h('span', {
                        style: {
                            width: '100px',
                            display: 'inline-block',
                            }
                        }, [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginLeft: '8px'
                            }
                        }),
                        h('span', data.title),
                        
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            // float: '',
                            marginLeft: '200px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-apps'
                            }),
                            on: {
                                click: () => { this.show(data) }
                            }
                        })
                    ])
                ]);
            },
            show(data){
                this.modal7 = true
                this.menuName = data.menuName
                this.menuUrl = data.menuUrl
                thisMenuId = data.menuId
                dataTemp = data
            },
            upDate(){
                this.axios.post('http://10.1.6.241:9200/daily/menu/updateMenu',
                    qs.stringify({
                        menuId:thisMenuId,
                        menuName:this.$data.menuName,
                        menuUrl:this.$data.menuUrl
                    })
                )
                .then(res => {
                    if(res.data.resultCode == '200'){
                    this.$set(dataTemp, 'title', this.$data.menuName);
                    // alert('操作成功')

                }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            append (data) {
                this.modal6 = true
                nodeKey = data.nodeKey
                dataTemp = data   
            },append2 () {
                const children = dataTemp.children || [];
                children.push({
                    title: this.menuName,
                    menuPid: dataTemp.menuId,
                    menuName: this.menuName,
                    menuUrl: this.menuUrl
                });
                this.$set(dataTemp, 'children', children);
                this.axios.post('http://10.1.6.241:9200/daily/menu/addMenu',
                    qs.stringify({
                        menuPid: dataTemp.menuId,
                        menuName: this.menuName,
                        menuUrl: this.menuUrl
                    })
                )
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err); 
                })
        
                
                
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                console.log(data)
                this.axios.post('http://10.1.6.241:9200/daily/menu/delMenuById',
                qs.stringify({
                    menuId:data.menuId
                }))
                .then(res => {
                    console.log(res)
                    if(res.data.resultCode == '200'){
                    alert("操作成功")
                    parent.children.splice(index, 1);
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            setTitle(dataList){
                var length = dataList.length
                for(var i=0;i<length;i++){
                    this.$set(dataList[i],'title',dataList[i].menuName)
                    if(dataList[i].children){
                    // console.log('111')
                    this.setTitle(dataList[i].children)
                }
                }
               

            }
        },mounted(){
            var myToken = window.localStorage.getItem('token')
            var data = []
            this.axios.defaults.headers['kt-token'] = myToken
            this.axios.post('http://10.1.6.241:9200/daily/menu/findMenuTree')
            .then(res => {
                console.log(res)
                data = res.data.data
                this.setTitle(data)
                this.$set(this.data5[0],'children',data)
                // debugger
            })
            .catch(err => {
                console.error(err); 
            })
            // this.setTitle(data)
            // debugger
            // this.$set(this.data5[2],'title','parent 3')
        }
    }
</script>