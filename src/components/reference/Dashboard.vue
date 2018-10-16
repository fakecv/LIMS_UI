<template>
 <div>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  <div class="block text-right">
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="processRequestForm.currentPage"
    :page-sizes="[10, 20, 50]"
    :page-size="20"
    layout="sizes, prev, pager, next"
    :total="totalProcesss">
  </el-pagination>
</div>
  <div style="width: 600px;margin-left:10px;margin-top:20px">
    <el-collapse  v-model="selectActiveName" @change="foldNode" accordion>
      <el-collapse-item v-for="value in tableData" :key="value.id" :title="value.agreementNumber" name="1">
        <div>
          <el-steps :space="200" :active="1" finish-status="success">
            <el-step v-for="(step, index) in value.processingStatues" :key="index" :title="step"></el-step>
          </el-steps>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <div class="block text-right">
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="processRequestForm.currentPage"
    :page-sizes="[10, 20, 50]"
    :page-size="20"
    layout="sizes, prev, pager, next"
    :total="totalProcesss">
  </el-pagination>
</div>
 </div>
</template>
<script>
export default {
  name: 'dashboard',
  data () {
    return {
      step: 0,
      selectActiveName: '1',
      msg: 'Welcome to Your Vue.js App',
      tableData: [],
      totalProcesss: 0,
      processRequestForm: {
        agreementNumber: '',
        sampleName: '',
        materialNumber: '',
        sampleSubNumber: '',
        experimentalMethod: '',
        drawingDesign: '',
        processingStatus: '',
        processingStatues: [],
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    foldNode () {

    },
    handleSizeChange (val) {
      this.processRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.processRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/process/queryProcess', this.processRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalProcesss = res.data.totalProcesss || 0
          console.log(vm.tableData)
        })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '样品检测完成情况一览' },
        tooltip: {},
        xAxis: {
          data: ['已完成', '未完成', '全部', '状态1', '状态2', '状态3']
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  },
  mounted () {
    console.log('mounted')
    this.drawLine()
    this.onSubmit()
  }
}
</script>
