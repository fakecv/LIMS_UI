<template>
  <el-container>
    <el-header>
      <i class="fa fa-hand-o-right" aria-hidden="true"><span style="margin:10px;">导航页</span></i>
    </el-header>
    <el-row>
      <el-col :xl="6" :lg="8" :sm="12" :xs="24" style="margin-bottom:20px;">
        <div @click="sampleReceive">
          <el-card class="box-card">
            <img src="@/../static/image/sample.png" class="image">
              <el-button type="text">样品接收</el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :xl="6" :lg="8" :sm="12" :xs="24" style="margin-bottom:20px;">
        <div @click="taskList">
          <el-card class="box-card">
            <el-badge :value="task.uncompletedAgreement" class="item">
              <img src="@/../static/image/tasklist.png" class="image">
            </el-badge>
            <el-button type="text">待完成协议</el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :xl="6" :lg="8" :sm="12" :xs="24" style="margin-bottom:20px;">
        <div @click="sampleChecker">
          <el-card class="box-card">
            <el-badge :value="task.uncompletedProcess" class="item">
            <img src="@/../static/image/checker.png" class="image">
            </el-badge>
            <el-button type="text">待完成流转</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import router from '@/router'
export default {
  name: 'navPage',
  data () {
    return {
      task: {
        uncompletedAgreement: '',
        uncompletedProcess: ''
      }
    }
  },
  methods: {
    getTaskStatistic () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/getNumberOfUncompletedAgreement')
        .then(function (res) {
          vm.task.uncompletedAgreement = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
      this.$ajax.get('/api/sample/process/getNumberOfUncompletedProcess')
        .then(function (res) {
          vm.task.uncompletedProcess = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    sampleReceive () {
      router.replace('agreementDetailNew')
    },
    taskList () {
      router.replace('agreementMaintenance')
    },
    sampleChecker () {
      router.replace('processMaintenance')
    }
  },
  activated () {
    this.getTaskStatistic()
  }
}
</script>
<style scoped>
  .box-card {
    width: 100px;
    height: 100px;
    text-align:center;
  }

  .image {
    margin-bottom: 0px;
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
