
<template>
  <div>
    <DateDemo2></DateDemo2>
    <div class="head1">
      <div class="headbtn">
      </div>
    </div>
    <TableDemo></TableDemo>
  </div>
</template>



<script>
import DateDemo2 from "@/components/DateDemo2";
import TableDemo from "@/components/DayTable";

export default {
  components: {
    DateDemo2,
    TableDemo
  },
  methods:{
    clickFn:function(){
      this.$router.push('/addReport')
    }
  }
};
</script>

<style>
.content {
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: #d8d8d8;
  border-radius: 5px;
  height: auto;
}
.head1 {
  width: 100%;
  height: 70px;

  border-top: solid 2px #d8d8d8;
}
.headbtn {
  padding-top: 20px;
  padding-right: 20px;
  float: right;
}
.headbtn > button {
  width: 90px;
  margin: 0px 10px;
}
</style>