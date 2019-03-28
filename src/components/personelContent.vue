<template>
<div> 
    <div id = 'searchItem'>
         <div class = 'searchItem'>
            姓名:<i-Input placeholder="" class = 'searchInput' v-model="name"></i-Input>
        </div>
        <div class = 'searchItem'>
            职位:<i-Input placeholder="" class = 'searchInput' v-model="age"></i-Input>
        </div>
        <div class = 'searchItem'>
            <Select v-model="sex" class = 'searchInput' placeholder="性别">
                <Option v-for="item in content" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
        </div>
        <div class = 'searchItem'>
            <Select v-model="dept" class = 'searchInput' placeholder="部门">
                <Option v-for="item in department" :value="item.deptName" 
                :key="item.deptId" @click.native='getID(item.deptId)'>
                    {{ item.deptName }}
                    </Option>
            </Select>
        </div>
        <div class = 'searchItem'>
            <Button type="default" shape="circle" icon="ios-search" @click="clickFn"></Button>
        </div>
    </div>
    
    <Table highlight-row stripe border :columns="perColumn" :data="personel"
     @on-current-change="showPerson" class="personTable">
    </Table>

</div>
   
</template>

<script>
import axios from 'axios'
import qs from 'qs'


export default {
 data(){
     return{
        perColumn:[{
            type: 'index',
            width: 60,
            align: 'center',
            title:'No'
        },{
            title:'姓名',
            key: 'name'
        },{
            title: '部门',
            key:'deptId'
        },{
            title:'职位',
            key:'role'
        },{
            title:'性别',
            key:'sex'
        }],
        personel:[],
        department:[],
        content:[{
                value: '男',
                label: '男'
            },{
                value: '女',
                label: '女'
            }],
        name:'',
        age:'',
        sex:'',
        dept:'',
        deptId:'',
        }
    },
 methods:{
    showPerson:function(el){
        var userID = el.userId
        // alert(userID)
        this.$store.user = userID
        this.$router.push('/dailyReport')
        },
        clickFn:function(el){
            // console.log(qs.stringify(this.$data.name))
            // console.log(qs.stringify(this.$data.deptId))
            this.axios.defaults.headers.common['kt-token'] = myToken
            this.axios.post('http://10.1.9.54:9200/daily/userinfo/findUserByParams',
            qs.stringify(
                {
                    name:  this.$data.name,
                    // age: this.$data.role,
                    // sex: this.$data.sex,
                    deptId: this.$data.deptId,
                    }
                    )
            )
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    this.personel = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        getID:function(id){
            this.deptId = id
        }
    },mounted(){
            var myToken = window.localStorage.getItem('token')
            this.axios.defaults.headers.common['tk-token'] = myToken
            this.axios.post('http://10.1.9.54:9200/daily/userinfo/findAllUser')
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    this.personel = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
            this.axios.post('http://10.1.9.54:9200/daily/deptinfo/findAll')
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                    this.department = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
    }
}
</script>

<style>
    #searchItem{
        margin-top: 15px;
        text-align: left;
        margin-bottom: 10px;
        padding-left: 10px
    }
    .searchItem{
        display:inline-block;
        margin-left: 28px;
        font-size: 16px
    }
    .searchInput{
        height: 30px;
        width: 90px;
    }
    .dateButton{
        margin-left: 28px;
    }

</style>
