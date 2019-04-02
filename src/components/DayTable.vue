<template>
<div>
  <div id="datee">
    <div span="12">
      <div class="dateleft">
        日期从：
        <DatePicker type="datetime" placeholder="2019/1/1" style="width: 200px" v-model="beginTime" format="yyyy-MM-dd"  @on-change="beginTime=$event" />
      </div>
      <div class="dateleft">
        到：
        <DatePicker type="datetime" placeholder="2019/3/14" style="width: 200px" v-model="endTime" format="yyyy-MM-dd"  @on-change="endTime=$event"></DatePicker>
      </div>

      <div class="dateleft">
        <Button shape="circle" icon="ios-search" @click="timeSearch"></Button>
        <Button class="dateButton" icon="ios-swap" @click="toWeek()">切换报表</Button>
      </div>

      <div class="dateright">
        <Button type="default">导出</Button>
      </div>
    </div>
  </div>

  <div class="head1">
    <div class="headbtn"></div>
  </div>

  <Table border :columns="dailyColumns" :data="dailyData"></Table>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
var myToken
export default {
  data() {
    return {
      dailyColumns: [
        {
          title: "跟进时间",
          align: "center",
          key: "date",
          width: "150px"
        },
        {
          title: "工作内容",
          align: "center",
          key: "content"
        },
        {
          title: "内容描述",
          align: "center",
          key: "description"
        },
        {
          title: "工作类别",
          align: "center",
          key: "type"
        },
        {
          title: "当日工作占比",
          align: "center",
          key: "proportion"
        },
        {
          title: "完成进度",
          align: "center",
          key: "progress"
        },
        {
          title: "完成情况以及处理方法",
          align: "center",
          key: "situation"
        },
        {
          title: "遗留问题",
          align: "center",
          key: "problem"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "撤回"
              )
            ]);
          }
        }
      ],
      datetime: null,
      model1: null,
      dateee: null,
      beginTime: "",
      endTime: "",
      dailyData: []
    };
  },
  methods: {
    show(index) {
      //console.log(this.$data.dailyData[index].dailyId);
      this.axios
        .post(
          "http://10.1.9.54:9200/daily/dailyinfo/findByDailyId",
          qs.stringify({
            dailyId: this.$data.dailyData[index].dailyId
          })
        )
        .then(res => {
          if (res.data.resultCode == "200") {
            this.$store.reportContent = res.data.data;
            this.$router.push("/reportOperation");
          }

          //console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },
    remove(index) {
      var thisRId = this.$data.dailyData[index].dailyId;
      this.dailyData.splice(index, 1);
      // this.axios.post('http://10.1.9.54:9200/daily/dailyinfo/',params)
      // .then(res => {
      //     console.log(res)
      // })
      // .catch(err => {
      //     console.error(err);
      // })
    },
    toWeek: function() {
      this.$router.push("/weekyReport");
    },
    timeSearch(el) {
       myToken = window.localStorage.getItem("token");
      this.axios.defaults.headers.common["tk-token"] = myToken;
      this.axios
        .post(
          "http://10.1.9.54:9200/daily/dailyinfo/findByUserIdAndDate",
          qs.stringify({
            userId: this.$store.user,
            dateFrom: this.$data.beginTime,
            dateTo: this.$data.endTime
          })
        )
        .then(res => {
          //console.log(res);
          if (res.data.resultCode == "200") {
            for (var i = 0; i < res.data.data.length; i++) {
            var da = res.data.data[i].date;
            da = new Date(da);
            var year = da.getFullYear() + "年";
            var month = da.getMonth() + 1 + "月";
            var date = da.getDate() + "日";
            var time = year + month + date;
            res.data.data[i].date = time;
          }
          this.dailyData = res.data.data;
            //console.log( res.data.data)
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    var myToken = window.localStorage.getItem("token");
    this.axios.defaults.headers.common["tk-token"] = myToken;
    this.axios
      .post(
        "http://10.1.9.54:9200/daily/dailyinfo/findByUserId",
        qs.stringify({
          userId: this.$store.user
        })
      )
      .then(res => {
        //console.log(res);
        if (res.data.resultCode == "200") {
          // console.log(res.data.data.length)
          for (var i = 0; i < res.data.data.length; i++) {
            var da = res.data.data[i].date;
            da = new Date(da);
            var year = da.getFullYear() + "年";
            var month = da.getMonth() + 1 + "月";
            var date = da.getDate() + "日";
            var time = year + month + date;
            res.data.data[i].date = time;
          }
          this.dailyData = res.data.data;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
};
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
