<template>
  <div id="datee">
    <div span="12">
      <div class="dateleft">
        <DatePicker
          type="date"
          :value="date"
          v-model="dateee"
          format="yyyy/MM/dd"
          placeholder="选择日期"
          id="time"
          style="width: 200px"
        ></DatePicker>
      </div>
      <div class="dateleft">
        <Select v-model="model1" style="width:200px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <div class="dateleft">
        <Button shape="circle" icon="ios-search"></Button>
        <Button class='dateButton' type="default" icon="ios-swap" @click="changeToDay">切换报表</Button>
      </div>

      <div class="dateright">
        <Button type="default ">导出</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DateDemo",
  data() {
    return {
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
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
    this.axios.defaults.headers.common['tk-token'] = myToken
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

