
<template>
  <div>
    <!-- <DateDemo2></DateDemo2> -->
    
    <TableDemo></TableDemo>
  </div>
</template>



<script>
// import DateDemo2 from "@/components/DateDemo2";
import TableDemo from "@/components/DayTable";

export default {
  components: {
    // DateDemo2,
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

</style>