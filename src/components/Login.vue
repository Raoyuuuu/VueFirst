<template>
<div class = 'login'>
        <!-- User:<input type="name" name = "name" v-model="username"/> -->
        <Input prefix="ios-contact" type="text" placeholder="Enter name" style="width: auto" v-model="username"/>
        <br/>
        <Input class = 'loginpassword' prefix="md-lock" type="password" placeholder="Enter password" style="width: auto" v-model="password" @on-enter="clickFn"/>
        <!-- password:<input type="password" name = "password" v-model="password"/> -->
        <br/>
        <Button @click="clickFn">Login</Button>       
</div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
var storage = window.localStorage;

export default {
    data(){
        return{
            username:null,
            password:null   
        }
    },
    methods: {
            clickFn:function(){
                var username1 = this.$data.username;
                var password1 = this.$data.password;
       
                this.axios.post('http://10.1.9.54:9200/daily/userinfo/loginToken',qs.stringify({
                    username: username1,
                    password: password1
                }))
                .then(res => {
                    // debugger
                    // console.log(res);
                    // console.log(res.data.data.token);
                    if(res.data.resultCode == '200'){
                        storage.setItem('username',res.data.data.userInfo.name);
                        storage.setItem('userId',res.data.data.userInfo.userId);
                        storage.setItem('token',res.data.data.token);
                        this.$router.push('/layoutCom');
                    }else if(res.data.resultCode == '510'){
                        alert('账号或密码输入错误。')
                    }else{
                        alert('与服务器链接超时，请稍后重试。')
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
            },          
        },
    }
</script>

<style>
    .login{
        margin-top: 20%
    }
    .loginpassword{
        margin-bottom: 15px;
        margin-top: 15px
    }
</style>
