<template>

  <div>
    <Table border ref="selection" :columns="columns4" :data="menu" height="400" @on-select="update"></Table>
    <!-- <Button @click="handleSelectAll(true)">全选</Button>
    <Button @click="handleSelectAll(false)">取消全选</Button>-->
  </div>
</template>
<script>
var Storage = window.localStorage;
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
          title: "可选菜单",
          key: "menuName"
        },
        {
          title: "menuUrl",
          key: "menuUrl"
        }
      ],

      menu: [],
      selection: []
    };
  },
  created() {
    var myToken = window.localStorage.getItem("token");
    this.axios.defaults.headers.common["kt-token"] =myToken;
    this.axios
    
      .post("http://10.1.9.54:9200/daily/menu/findAllMenus")
      .then(res => { 
        
        if (res.data.resultCode == "200") {
         
          // for(let i=0;i<res.data.data.length;i++){
          this.menu = res.data.data;
          console.log(this.menu);

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

    update(ww, row) {
      this.selection.push(row.menuId);

      this.$store.power = this.$data.selection;
      console.log(this.$store.power);
    }
  }
};
</script>
