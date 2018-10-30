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
            <el-badge :value="300" class="item">
              <img src="@/../static/image/tasklist.png" class="image">
            </el-badge>
            <el-button type="text">待完成任务</el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :xl="6" :lg="8" :sm="12" :xs="24" style="margin-bottom:20px;">
        <div @click="sampleChecker">
          <el-card class="box-card">
            <img src="@/../static/image/checker.png" class="image">
            <el-button type="text">审核</el-button>
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
      currentDate: new Date()
    }
  },
  methods: {
    sampleReceive () {
      router.replace('agreementDetailNew')
    },
    taskList () {
      router.replace('processMaintenance')
    },
    sampleChecker () {
      router.replace('processMaintenance')
    }
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
