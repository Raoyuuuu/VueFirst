<template>
  <div id="datee">
    <div span="12">
      <div class="dateleft">
        日期从：<DatePicker type="date" placeholder="2019/1/1" style="width: 200px"></DatePicker>
      </div>
      <div class="dateleft">
        到：<DatePicker type="date" placeholder="2019/3/14" style="width: 200px"></DatePicker>
      </div>

      <div class="dateleft">
        <Button shape="circle" icon="ios-search"></Button>
        <Button class='dateButton' icon="ios-swap" @click="toWeek()">切换报表</Button>
      </div>

      <div class="dateright">
        <Button type="default">导出</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DateDemo2",
  
  data() {
    return {
      date:null,
      model1:null,
      dateee:null
    }
  },
  methods:{
    toWeek:function(){
      this.$router.push('/weekyReport')
    },
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