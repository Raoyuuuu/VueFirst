<template>
  <div>
    <Table  border ref="selection" :columns="columns4" :data="power" height="400" @on-select="update"></Table>
    <!-- <Button @click="handleSelectAll(true)">全选</Button>
    <Button @click="handleSelectAll(false)">取消全选</Button> -->
  </div>
</template>
<script>
var Storage = window.localStorage
export default {
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "可选权限",
          key: "powerName"
        },
        {
          title: "权限描述",
          key: "descrip"
        }
      ],

      power: [],
      selection:[],
      role:[],
      rolelist:{}
    };
  },
  created() {
    var myToken = window.localStorage.getItem("token");
    this.axios.defaults.headers.common["kt-token"] = myToken;
    this.axios
      .post("http://10.1.9.54:9200/daily/power/findAllPowers")
      .then(res => {
        if (res.data.resultCode == "200") {
          // for(let i=0;i<res.data.data.length;i++){
          this.power = res.data.data;
          console.log(this.power);
          // }
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },

    update(ww,row){
         this.selection.push(row.powerId)
         
         this.$store.role = this.$data.selection
         console.log(this.$store.role)
        
        }
    }
  
};
</script>
