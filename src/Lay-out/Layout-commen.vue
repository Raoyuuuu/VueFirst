<template>
    <div class="layout">
        <statusBar></statusBar>
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <div class="title">
                            报表系统
                        </div>
                        </div>
                    <div class="layout-nav">
                        <Button class="titleButton"  shape="circle" icon="ios-arrow-dropleft" @click="turnUp">返回上级</Button>
                        <Button class="titleButton"  shape="circle" icon="ios-arrow-dropleft" @click="turnIndex">返回首页</Button>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1" >
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                菜单
                            </template>
                            <MenuItem class="item" v-for="(item,index) in menuItem" :name='index' @click.native="turnToPage(item.menuUrl)" 
                            :key="item.menuId">{{item.menuName}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">  
                    <Breadcrumb :style="{margin: '24px 0'}" class="tip">   
                        <!-- <BreadcrumbItem>{{msg}}</BreadcrumbItem> -->
                    </Breadcrumb>
                    <Content :style="{padding: '0 24px 72px 24px',minHeight: '280px', background: '#fff', overflow: 'ellipsis'}">
                        <router-view/>
                    </Content> 
                   
                </Layout>
            </Layout>
        </Layout>
        
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import statusBar from '@/head/StatusBar'
import Table from '@/components/Table'
import ContentBlank from '@/components/reportOperation'



    export default {
         components:{
             statusBar,
             Table,
             ContentBlank,
            //  ContentBlankWeek
         },
         data(){
             return{
                 msg: this.$store.title,
                 username: window.localStorage.getItem('username'),
                 department:[],
                 menuItem:[]
             }
         },
         methods:{
             turnToPage:function(path){
                 this.$router.push(path)
             },
             turnUp:function(){
                 this.$router.go(-1)
             },
             turnIndex:function(){
                 this.$router.push("/welcome")
             }
         },mounted(){
             var myToken = window.localStorage.getItem('token')
             this.$router.push('/welcome')
             this.axios.defaults.headers.common['kt-token'] = myToken;
             this.axios.post('http://10.1.9.54:9200/daily/deptinfo/findAll')
             .then(res => {
                 //console.log(res)
                 if(res.data.resultCode == '200'){
                     this.department = res.data.data;
                 }
             })
             .catch(err => {
                 console.error(err); 
             })
             this.axios.post('http://10.1.9.54:9200//daily/menu/findMenuByUserId')
             .then(res => {
                // console.log(res)
                 if(res.data.resultCode == '200'){
                     this.menuItem = res.data.data;
                 }
             })
             .catch(err => {
                 console.error(err); 
             })
         }
    }

</script>
<style scoped>
.tip{
    text-align: left
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #fff;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: -20px;
}
.title{
    position: relative;
    top: -15px;
}
.titleButton{
    margin-left: 50px
}
</style>