<template>
  <div>
    <div id="datee">
      <div span="12">
        <div class="dateleft">
          <Select style="width:200px">
            <Option
              v-for="item in dateList"
              :key="item.dateFrom"
              :value="item.dateTo"
              @click.native="choose(item.dateFrom,item.dateTo)"
            >{{item.dateFrom}}至{{item.dateTo}}</Option>
          </Select>
        </div>

        <div class="dateleft">
          <Button shape="circle" icon="ios-search" @click="timeSearch"></Button>
          <Button class="dateButton" icon="ios-swap" @click="changeToDay">切换报表</Button>
        </div>

        <div class="dateright">
          <Button @click="ontPut">导出</Button>
        </div>
      </div>
    </div>

    <div class="head1">
      <div class="headbtn"></div>
    </div>
    <Table border :columns="weekyColumns" :data="weekyData"></Table>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      weekyColumns: [
        {
          title: "时间",
          align: "center",
          key: "kind",
          width: "150px",
          sortable: true,
          render: (h, params) => {
            if (params.row.kind === 1) {
              return h("div", "本周");
            } else {
              return h("div", "下周");
            }
          }
        },
        {
          title: "项目名称",
          align: "center",
          key: "target"
        },
        {
          title: "类别",
          align: "center",
          key: "projectType"
        },
        {
          title: "内容描述",
          align: "center",
          key: "description"
        },
        {
          title: "当前进度",
          align: "center",
          key: "progress"
        },
        {
          title: "预计完成时间",
          align: "center",
          key: "planDate"
        },
        {
          title: "未完成原因",
          align: "center",
          key: "reason"
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
      weekyData: [],
      dateList: [],
      dateFrom: null,
      dateTo: null
    };
  },
  methods: {
    show(index) {
      this.axios
        .post(
          "http://10.1.9.53:9200/daily/weeklyinfo/findByUserId",
          qs.stringify({
            weeklyId: this.$data.weekyData[index].weeklyId
          })
        )
        .then(res => {
          if (res.data.resultCode == "200") {
            this.$store.reportContentWeek = res.data.data;
            this.$router.push("/reportOperationWeek");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    remove(index) {
      var thisRId = this.$data.weekyData[index].userId;
      this.weekyData.splice(index, 1);
    },
    timeSearch() {
      console.log(this.dateFrom);
      console.log(this.dateTo);
      var myToken = window.localStorage.getItem('token')
      this.axios.defaults.headers.common['tk-token'] = myToken
      this.axios.post('http://10.1.9.53:9200/daily/dailyinfo/findByUserIdAndDate',
            qs.stringify(
                {
                    userId:this.$store.user,
                    dateFrom:this.$data.dateFrom,
                    dateTo:this.$data.dateTo
                    }
                    )
            )
            .then(res => {
                console.log(res)
                if(res.data.resultCode == '200'){
                  this.weekyData=res.data.data
                  console.log(this.weekyData)
                }
            })
            .catch(err => {
                console.error(err); 
            })
    },
    changeToDay: function() {
      this.$router.push("/dailyReport");
    },
    choose: function(form, to) {
      this.dateFrom = form;
      this.dateTo = to;
    },
    ontPut: function() {
      var myHerf =
        "http://10.1.9.53:9200/daily/weeklyinfo/export?userId=" +
        this.$store.user +
        "&dateFrom=" +
        this.$data.dateFrom +
        "&dateTo=" +
        this.$data.dateTo;
      window.location.href = myHerf;
    }
  },
  mounted() {
    var myToken = window.localStorage.getItem('token')
    var myId = this.$store.user
    // console.log(myId)
    this.axios.defaults.headers['tk-token'] = myToken
    // this.axios.defaults.headers.common['Content-Type']= 'application/vnd.ms-excel'
    // debugger
    this.axios.post('http://10.1.9.54:9200/daily/weeklyinfo/showWeeklyInfo',
      qs.stringify({
        userId:myId
      })
    )
    .then(res => {
      console.log(res)
      if(res.data.resultCode == '200'){
                // console.log(res.data.data.dateScope.length)
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
                    //  this.$data.dateList.push(timeF+'至'+timeT)
                  }
                  this.dateList = res.data.data.dateScope
                  // console.log(this.$data.dateList)
          }
    })
    .catch(err => {
      console.error(err); 
    })

    // var myToken = window.localStorage.getItem("token");
    // this.axios.defaults.headers.common["tk-token"] = myToken;
    this.axios
      .post(
        "http://10.1.9.54:9200/daily/weeklyinfo/showWeeklyInfo",
        qs.stringify({
          userId: this.$store.user
        })
      )
      .then(res => {
        console.log(res);

        if (res.data.resultCode == "200") {
          // console.log(res.data.data.length)
          // for (var i=0;i<res.data.data.length;i++){
          //      var da = res.data.data[i].date
          //      da = new Date(da);
          //      var year = da.getFullYear()+'年';
          //      var month = da.getMonth()+1+'月';
          //      var date = da.getDate()+'日';
          //      var time = year+month+date
          //      res.data.data[i].date = time
          // }
          this.weekyData = res.data.data.lastWeeklyInfo;
          console.log(this.weekyData);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>
<style>
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
