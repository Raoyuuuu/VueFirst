<template>
  <div id="datee">
    <div span="12">
      <div class="dateleft">
        <Select style="width:200px">
          <Option v-for="item in dateList" :key="item.dateFrom" :value="item.dateTo" @click.native="choose(item.dateFrom,item.dateTo)">
            {{item.dateFrom}}至{{item.dateTo}}
            </Option>
        </Select>
      </div>

      <div class="dateleft">
        <Button shape="circle" icon="ios-search"></Button>
        <Button class='dateButton'  icon="ios-swap" @click="changeToDay">切换报表</Button>
      </div>

      <div class="dateright">
        <Button @click="ontPut">导出</Button>
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
      dateFrom:null,
      dateTo:null
    }
    
  },
  methods:{
    changeToDay:function(){
      this.$router.push('/dailyReport')
    },
    choose:function(form,to){
      this.dateFrom = form
      this.dateTo = to
    },
    ontPut:function(){
      var myHerf = 'http://10.1.6.241:9200/daily/weeklyinfo/export?userId='
      +this.$store.user+'&dateFrom='+this.$data.dateFrom+'&dateTo='+this.$data.dateTo;
      window.location.href=myHerf
    }
  },
  mounted(){
    var myToken = window.localStorage.getItem('token')
    var myId = this.$store.user
    this.axios.defaults.headers['tk-token'] = myToken
    this.axios.post('http://10.1.6.241:9200/daily/weeklyinfo/showWeeklyInfo',
      qs.stringify({
        userId:myId
      })
    )
    .then(res => {
      console.log(res)
      if(res.data.resultCode == '200'){
                for (var i=0;i<res.data.data.dateScope.length;i++){
                    var daF = res.data.data.dateScope[i].dateFrom
                    var daT= res.data.data.dateScope[i].dateTo
                     daF = new Date(daF);
                     daT = new Date(daT);
                     var yearF = daF.getFullYear()+'-';
                     var monthF = daF.getMonth()+1+'-';
                     var dateF = daF.getDate()+'';
                     var timeF = yearF+monthF+dateF;
                     res.data.data.dateScope[i].dateFrom = timeF
                     var yearT = daT.getFullYear()+'-';
                     var monthT = daT.getMonth()+1+'-';
                     var dateT = daT.getDate()+'';
                     var timeT = yearT+monthT+dateT;
                     res.data.data.dateScope[i].dateTo = timeT
                  }
                  this.dateList = res.data.data.dateScope
          }
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

