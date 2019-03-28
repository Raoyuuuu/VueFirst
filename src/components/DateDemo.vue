<template>
  <div id="datee">
    <div span="12">
      <div class="dateleft">
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <div class="dateleft">
        <Button shape="circle" icon="ios-search"></Button>
        <Button class='dateButton'  icon="ios-swap" @click="changeToDay">切换报表</Button>
      </div>

      <div class="dateright">
        <Button>导出</Button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: "DateDemo",
  data() {
    return {
      dateList:[],
      date:null,
      model1:null,
      dateee:null
    }
    
  },
  methods:{
    changeToDay:function(){
      this.$router.push('/dailyReport')
    }
  },
  mounted(){
    var myToken = window.localStorage.getItem('token')
    var myId = this.$store.user
    this.axios.defaults.headers.common['tk-token'] = myToken
    // debugger
    this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/showWeeklyInfo',
      qs.stringify({
        userId:myId
      })
    )
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    })
  }
}
</script>
<style>
#datee {
  height: 40px;
  padding-top: 5px;
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
</style>

