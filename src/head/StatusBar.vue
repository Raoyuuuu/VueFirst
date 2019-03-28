<template>
    <div id = 'box'>
        <div><img src="@/assets/keytopLogo.jpg" id = 'logo'/></div>
        <table id = 'userStatus'>
            <tr>
                <td class = 'UserItem'>
                    <img src="@/assets/userImg.jpg" class="circleSquare"/>
                    {{username}}
                </td>
                <!-- <td class = 'reportManage'>
                    <a href="#"  @click="changeCss(1)">{{reportManage}}</a> <Icon type="md-log-out" />
                </td> -->
                <td>
                    <Button type="text" shape="circle" @click="loginOff"><Icon type="md-log-out" size ="20"/></Button>
                </td>
            </tr>
        </table>
        <!-- <tools></tools> -->
    </div>
</template>

<script>
import tools from './toolBar'
import axios from 'axios'
import qs from 'qs'


export default {
    components:{
        tools
        },
    methods:{
        loginOff:function(){
            
            this.axios.post('http://10.1.9.54:9200/daily/userinfo/logOut')
            
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    alert("操作成功！")
                    this.$router.push('/')
                    window.localStorage.clear()
                }
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    data(){
        return{
         username:window.localStorage.getItem('username'),
         reportShow: '退出登录',
        }
    },
    mounted(){
        var myToken = window.localStorage.getItem('token')
        this.axios.defaults.headers.common['kt-token'] = myToken;


        // var powList
        // var powIdList = ''
        // var length
        // this.axios.post('http://10.1.9.54:9200/daily/power/findAllPowers')
        // .then(res => {
        //     powList = res.data.data
        //     console.log(powIdList)
        //     length = powList.length
        //     for(let i = 0;i < length;i++){
        //     powIdList = powIdList + powList[i].powerId
        //     if(i < length-1){
        //         powIdList = powIdList + ','
        //     }
        // }
        //     // debugger
        //     console.log(powIdList)
     
        //      this.axios.post('http://10.1.9.53:9200/daily/roleinfo/saveRoleAndPowers',
        //         qs.stringify({
        //             roleId:'31adc9cf5fc04c73bef0d23344c4003b',
        //             powerIds:powIdList
        //         })
        //      )
        //      .then(res => {
        //          console.log(res)
        //      })
        //      .catch(err => {
        //          console.error(err); 
        //      })
        // })
        // .catch(err => {
        //     console.error(err); 
        // })
    }
   
   

    
}
</script>

<style>
    /* tr{
        padding-bottom: 8px
    }    */
    #box{
        height: 60px;
        text-align: center;
        background-color: #fff;
        padding-right: 15px;
        padding-left: 15px
    }
    .circleSquare{
        height: 20px;
        width: 20px;
        border-radius: 10px
    }
    #userStatus{
        margin-top: 12px;
        float: right;
        font-size: 15px;
        font-weight: normal
    }
    .UserItem{
        padding-right: 22px;
        border-right: rgb(140, 148, 156) 2px solid;
    }
    a{
        color: black;
        text-decoration: none;
    }
    .black{
        color: rgb(100, 127, 199);
    }
    .blue{
        color: black;
    }
    #logo{
        float: left;
        height: 60px;
    }
    .loginOut{
        width: 20px;
        height: 20px;
    }
    /* a:active{
        color:black
    }
    a:visited{
        color:black
    }
    a:hover{
         color: rgb(101, 163, 221);
    } */
</style>
