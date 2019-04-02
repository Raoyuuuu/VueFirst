<template>
  <div>
    <Table border ref="selection" :columns="columns4" :data="uriAll" height="400" @on-select="update"></Table>
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
          title: "接口",
          key: "uri"
        },
        {
          title: "描述",
          key: "descrip"
        }
      ],

      uriAll: [],
      selection: []
    };
  },
  created() {
    var myToken = window.localStorage.getItem('token');
    this.axios.defaults.headers.common["kt-token"] =myToken;
    this.axios
      .post("http://10.1.9.54:9200/daily/uri/findAllUris")
      .then(res => {
        if (res.data.resultCode == "200") {
          this.uriAll = res.data.data;
          console.log(this.uriAll);
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
      this.selection.push(row.uriId);

      this.$store.uri = this.$data.selection;
      console.log(this.$store.uri);
    }
  }
};
</script>
