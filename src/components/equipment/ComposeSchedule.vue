<template>
  <div id="sub">
    <div id="sub1">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        style="width: 100%;">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        style="width: 100%;">
      </el-table-column>
    </el-table>
    </div>
    <div id="sub2">
    <el-table
      :data="tableData2"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="80">
      </el-table-column>
    </el-table>
    </div>
    <div id="sub3">
    <el-table
      :data="tableData2"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </div>
    <div id="sub4">
    <el-table
      :data="tableData1"
      :cell-style="cellStyleMethod"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        style="width: 100%">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        style="width: 100%">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'composeSchedule',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData2: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      tableData1: [
        {
          date: '2016-05-02',
          name: '王小猫',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小猫',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小猫',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]

    }
  },
  methods: {
    headerResize (newWidth, oldWidth, column, event) {
    },
    tableChange () {
    },
    cellStyleMethod ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0) {
        return {
          fontWeight: 'bold',
          padding: 0,
          textAlign: 'right',
          verticalAlign: 'top'
        }
      } else {
        return {
          textAlign: 'center',
          padding: 0,
          height: '37px',
          border: '1px',
          borderColor: '#ff6358',
          width: '20px',
          backgroundColor: '#ff6358'
        }
      }
      // }
    }
  }

}
</script>

<style scoped>
#sub {
position: relative;
background-color: yellow;
padding: 0px;
top: 0px;
left: 0px;
width: 100%;
height: 800px;
}
#sub1 {
position: absolute;
background-color: blue;
padding: 0px;
top: 0px;
left: 0px;
width: 100%;
height: 0px;
z-index: 100;
}
#sub2 {
position: absolute;
padding: 0px;
background-color: red;
top: 120px;
left: 0px;
width: 80px;
height: 0px;
}
#sub3 {
position: absolute;
padding: 0px;
background-color: burlywood;
top: 120px;
left: 80px;
width: 100%;
height: 0px;
z-index: 180;
}
#sub4 {
position: absolute;
padding: 0px;
background-color: burlywood;
top: 120px;
left: 80px;
width: 100%;
height: 0px;
z-index: 80;
}
#sub5 {
position: absolute;
padding: 0px;
background-color: burlywood;
top: 400px;
left: 80px;
width: 500px;
height: 200px;
z-index: 10000;
}

</style>
