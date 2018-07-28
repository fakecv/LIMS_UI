<template>
<div>
  <el-container>
    <el-header style="height:47px;">
      <el-row>
        <el-col :span="15">
          <el-row :gutter="10">
            <el-col :span="7">
              <el-date-picker
                v-model="value1"
                size="mini"
                type="date"
                width = "50px"
                @change="change"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-col>
            <el-col :span="5">
              <el-button-group>
                <el-button type="warning" icon="el-icon-arrow-left" size="mini"></el-button>
                <el-button type="warning" icon="el-icon-arrow-right" size="mini"></el-button>
              </el-button-group>
            </el-col>
            <el-col :span="12" style="font-size: 0.5rem;">
              {{sunday | myDate}} {{sunday | dateDate}} - {{saturday | myDate}} {{saturday | dateDate}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9" style="text-align: right">
          <el-button-group>
            <el-button type="warning" size="mini">日</el-button>
            <el-button type="warning" size="mini">工作周</el-button>
            <el-button type="warning" size="mini">周</el-button>
            <el-button type="warning" size="mini">月</el-button>
            <el-button type="warning" size="mini">日程</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        :data="tableData6"
        :span-method="objectSpanMethod1"
        border
        max-height="602"
        height="602"
        :header-row-style="headerRowStyleMethod"
        :row-style="rowStyleMethod"
        :header-cell-style="headerRowStyleMethod"
        :cell-style="cellStyleMethod"
        :row-class-name="rowClassNameMethod"
        style="width: 100%;"
        @cell-dblclick="edit">
        <el-table-column
          prop="time"
          label=""
          width="85">
        </el-table-column>
        <el-table-column v-for="(column,headerIndex) in headerData"
          :prop=column.id
          :label=column.label
          :key="headerIndex">
          <template slot-scope="scope">
            <el-row>
              <el-col  v-for="(tag, index) in scope.row[column.id]" v-if="scope.row[column.id][index].id !== ''" :key="index">
                <el-popover trigger="hover" placement="top">
                  <p>任务名称:  {{ scope.row[column.id][index].title }}</p>
                  <p>任务内容: {{ scope.row[column.id][index].start }} - {{ scope.row[column.id][index].end }}</p>
                  <div slot="reference" class="name-wrapper" style="padding:0;">
                    <el-tag class="meetingTag" closable size="mini" type="danger"><b>任务{{ scope.row[column.id][index].id }}</b></el-tag>
                  </div>
                </el-popover>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer style="height:47px;">
      <el-button type="warning" size="mini">只显示工作时间</el-button>
    </el-footer>
  </el-container>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'myTableSchedule',
  data () {
    return {
      headerData: [],
      tableData6: [],
      sunday: '',
      saturday: '',
      datetime: new Date(),
      value1: '',
      dialogFormVisible: false,
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    value2 () {
      return this.value1 + 'hello'
    }
  },
  methods: {
    edit (row, column, cell, event) {
      this.tableData6[10]['fri'] = [
        {
          id: '3',
          start: 10,
          end: 13,
          title: 'meeting 2',
          referenced: true,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.tableData6[11]['fri'] = [
        {
          id: '',
          start: 11,
          end: 12,
          title: 'meeting 2',
          referenced: false,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.tableData6[12]['fri'] = [
        {
          id: '',
          start: 12,
          end: 13,
          title: 'meeting 2',
          referenced: false,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.dialogFormVisible = true
    },
    toHtml (row, column, cellValue, index) {
      console.log('toHtml')
      if (cellValue && cellValue !== '') {
        console.log(cellValue)
        let cellTag = this.$createElement('el-tag', row[column.property], {attrs: {closable: true, type: 'warning'}})
        return cellTag
      } else {
        return ''
      }
    },
    generateData () {
      this.tableData6 = []
      let agenda = [
        {
          id: '',
          start: 0,
          end: 0,
          title: '',
          referenced: false,
          isTakenOver: false,
          recurrenceRule: ''
        }
      ]
      this.tableData6.push({
        time: 'all day'
      })
      this.tableData6.push({
        time: '12:00AM',
        sun: agenda,
        mon: agenda,
        tue: agenda,
        wed: agenda,
        thu: agenda,
        fri: agenda,
        sat: agenda
      })
      this.tableData6.push({
        time: '12:30AM',
        sun: agenda,
        mon: agenda,
        tue: agenda,
        wed: agenda,
        thu: agenda,
        fri: agenda,
        sat: agenda
      })
      for (let i = 1; i <= 11; i++) {
        this.tableData6.push({
          time: i + ':00AM',
          sun: agenda,
          mon: agenda,
          tue: agenda,
          wed: agenda,
          thu: agenda,
          fri: agenda,
          sat: agenda
        })
        this.tableData6.push({
          time: i + ':30AM',
          sun: agenda,
          mon: agenda,
          tue: agenda,
          wed: agenda,
          thu: agenda,
          fri: agenda,
          sat: agenda
        })
      }
      for (let i = 1; i <= 11; i++) {
        this.tableData6.push({
          time: i + ':00PM',
          sun: agenda,
          mon: agenda,
          tue: agenda,
          wed: agenda,
          thu: agenda,
          fri: agenda,
          sat: agenda
        })
        this.tableData6.push({
          time: i + ':30PM',
          sun: agenda,
          mon: agenda,
          tue: agenda,
          wed: agenda,
          thu: agenda,
          fri: agenda,
          sat: agenda
        })
      }
      this.tableData6[4]['sun'] = [
        {
          id: '1',
          start: 0,
          end: 2,
          title: 'meeting 1',
          referenced: true,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.tableData6[5]['sun'] = [
        {
          id: '',
          start: 1,
          end: 2,
          title: 'meeting 2',
          referenced: false,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.tableData6[15]['wed'] = [
        {
          id: '2',
          start: 15,
          end: 18,
          title: 'meeting 2',
          referenced: true,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.tableData6[16]['wed'] = [
        {
          id: '',
          start: 16,
          end: 17,
          title: 'meeting 2',
          referenced: false,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
      this.tableData6[17]['wed'] = [
        {
          id: '',
          start: 17,
          end: 18,
          title: 'meeting 2',
          referenced: false,
          isTakenOver: true,
          recurrenceRule: ''
        }
      ]
    },
    change (value) {
      // 获取时间段
      var date = value + ''
      // 标准日期格式yyyy/mm/dd
      var weekByDate = new Date(date.replace(/-/g, '/'))
      // console.log(this.getWeekByDay(value))
      // 获取日期字符串对应的时间戳
      var timestamp = new Date(weekByDate).getTime()
      // 获取星期几
      var currentDay = new Date(weekByDate).getDay()
      // 获取所在星期的星期日和星期六
      this.sunday = timestamp - currentDay * 24 * 60 * 60 * 1000
      this.saturday = timestamp + (6 - currentDay) * 24 * 60 * 60 * 1000
      // 给定表头列的属性名称和属性值
      var prop = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      var weekNum = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      // 初始化表头
      this.headerData = []
      for (let i = 0; i <= 6; i++) {
        this.headerData.push({
          id: prop[i],
          label: weekNum[i] + this.getNowSimpleFormatDate(this.sunday + i * 24 * 60 * 60 * 1000)
        })
      }
    },
    /*
       *根据日期获取当前星期X(0-6,0代表星期天)
       *@param yyyy/mm/dd 标准日期格式
       *@returns：星期X
       */
    getWeekByDay (weekByDate) {
      var week = new Date(weekByDate).getDay()
      // 创建星期数组
      var weekNum = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return weekNum[week]
    },
    /*
       *获取当前时间戳的日期字符串
       * @param timestamp 时间戳
       *@returns：YYYY年MM月DD日
       */
    getNowFormatDate (timestamp) {
      var year = new Date(timestamp).getFullYear()
      var month = new Date(timestamp).getMonth() + 1
      var date = new Date(timestamp).getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (date >= 0 && date <= 9) {
        date = '0' + date
      }
      var dateByTime = year + '年' + month + '月' + date + '日'
      return dateByTime
    },
    getNowSimpleFormatDate (timestamp) {
      var month = new Date(timestamp).getMonth() + 1
      var date = new Date(timestamp).getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (date >= 0 && date <= 9) {
        date = '0' + date
      }
      var dateByTime = month + '/' + date
      return dateByTime
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    objectSpanMethod1 ({ row, column, rowIndex, columnIndex }) {
      // let week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      // if (rowIndex === 3) {
      //   console.log('objectSpanMethod1')
      //   console.log(week[columnIndex])
      //   if (row[week[columnIndex]] !== undefined) { console.log(row[week[columnIndex]][0].period) }
      //   console.log(column)
      //   console.log(rowIndex)
      //   console.log(columnIndex)
      // }
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 1,
            colspan: 1
          }
        } else if (rowIndex % 2 === 1) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    rowStyleMethod ({row, rowIndex}) {
      return {
        height: '37px'
      }
    },
    rowClassNameMethod ({row, rowIndex}) {
      return {
        border: false,
        borderColor: 'red'
      }
    },
    headerRowStyleMethod ({row, rowIndex}) {
      return {
        height: '37px',
        padding: 0,
        textAlign: 'center',
        fontWeight: 'bold'
      }
    },
    cellStyleMethod ({row, column, rowIndex, columnIndex}) {
      let prop = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      if (columnIndex === 0) {
        return {
          fontWeight: 'bold',
          padding: 0,
          textAlign: 'right'
        }
      } else {
        if (row[prop[columnIndex - 1]] !== undefined && row[prop[columnIndex - 1]][0].isTakenOver) {
          return {
            textAlign: 'center',
            height: '37px',
            padding: 0,
            backgroundColor: '#ff6358',
            border: '1px'
          }
        } else {
          return {
            textAlign: 'center',
            padding: 0,
            height: '37px',
            backgroundColor: '#fafafa'
          }
        }
      }
    }
  },

  mounted () {
    this.change(new Date())
    this.generateData()
  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 130px;
}
.el-table-column {
    max-height: 300px;
    overflow: auto;
}
.el-tag--mini {
    width: 60px;
    padding: 0 5px;
    border-radius: 0px;
    margin: 0px;
    z-index: 1000;
}
.el-tag--danger {
    background-color: #ff6358;
    border-color: #ff6358;
    color:#fff;
}

</style>
