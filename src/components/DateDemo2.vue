<template>
  <div id="datee">
    <div span="12">
      <div class="dateleft">
        日期从：<DatePicker type="date" placeholder="2019/1/1" style="width: 200px" v-model="beginTime"></DatePicker>
      </div>
      <div class="dateleft">
        到：<DatePicker type="date" placeholder="2019/3/14" style="width: 200px" v-model="endTime"></DatePicker>
      </div>

      <div class="dateleft">
        <Button shape="circle" icon="ios-search" @click="timeSearch"></Button>
        <Button class='dateButton' icon="ios-swap" @click="toWeek()">切换报表</Button>
      </div>

      <div class="dateright">
        <Button type="default">导出</Button>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import qs from 'qs'

export default {
  name: "DateDemo2",
  
  data() {
    return {
      date:null,
      model1:null,
      dateee:null,
      beginTime:'',
      endTime:'',
      dailyDate:[],
    }
  },
  methods:{
    toWeek:function(){
      this.$router.push('/weekyReport')
    },
    timeSearch(){
      var myToken = window.localStorage.getItem('token')
      this.axios.defaults.headers.common['tk-token'] = myToken
      this.axios.post('http://10.1.6.241/daily/dailyinfo/findByUserIdAndDate',
            qs.stringify(
                {
                    userId:this.$store.user,
                    dateFrom:this.$data.beginTime,
                    dateTo:this.$data.endTime
                    }
                    )
            )
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                  this.dailyDate=res.data.data
                  console.log(this.dailyDate)
                }
            })
            .catch(err => {
                console.error(err); 
            })
    }
  },
  mounted(){
    var myToken = window.localStorage.getItem('token')
    this.axios.defaults.headers.common['tk-token'] = myToken
  }
}
</script>
<style>
#datee {
  height: 40px;
  padding-top: 5px
}
.dateright {
  float: right;
}
.dateleft {
  float: left;
  padding-left: 15px;
}
select.dateleft {
  padding-left: 10px;
}
.dateButton{
  margin-left: 15px;
}
.dateButton{
  margin-left: 15px;
}
</style>