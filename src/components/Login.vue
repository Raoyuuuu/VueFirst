<template>
<div>
        User:<input type="name" name = "name" v-model="username"/>
        <br/>
        password:<input type="password" name = "password" v-model="password"/>
        <br/>
        <button @click="clickFn">Login</button>       
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
        
        // jump(){
        //     // alert("You wanna to Loginning");
        //     var flag = document.getElementById('user').value;
        //     window.location.host('/#/layout?username='+flag);
        // }
            clickFn:function(){
                var username1 = this.$data.username;
                var password1 = this.$data.password;
                this.axios.post('http://10.1.9.54:9200/daily/userinfo/loginToken',qs.stringify({
                    username: username1,
                    password: password1
                }))
                .then(res => {
                    // debugger
                    console.log(res);
                    console.log(res.data.data.token);
                    if(res.data.resultCode == '200'){
                        storage.setItem('username',res.data.data.userInfo.name);
                        storage.setItem('userId',res.data.data.userInfo.userId);
                        storage.setItem('token',res.data.data.token);
                        this.$router.push('/layoutCom');
           
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

</style>
