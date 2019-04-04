<template>
    <Tree :data="data1"></Tree>
</template>
<script>
    export default {
        data () {
            return {
                data1: []
            }
        },
        methods:{
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
        },
        monuted(){
             var data=[]
             var myToken = window.localStorage.getItem('token')
             this.axios.defaults.headers.common['kt-token'] = myToken;
             this.axios.post('http://10.1.9.54:9200//daily/menu/findMenuTreeByUserId')
             .then(res => {
                console.log(res)
                debugger
                 if(res.data.resultCode == '200'){
                     data = res.data.data
                    this.setTitle(data)
                    this.data1 = data
                 }
             })
             .catch(err => {
                 console.error(err); 
             })
        }
    }
</script>
