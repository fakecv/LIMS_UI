<template>
  <el-dialog title="用户列表" :visible.sync="reportOptionDialog" :modal-append-to-body="false">
  <el-container style="padding: 10px">
      <el-form :model="form">
        <el-form-item label="可预览文件列表">
            <el-checkbox-group v-model="form.reportList">
              <el-checkbox label="cover">检测报表封面</el-checkbox>
              <el-checkbox label="agreement">委托协议书</el-checkbox>
              <el-checkbox label="process">样品流转表</el-checkbox>
              <el-checkbox label="task">检测任务单</el-checkbox>
              <el-checkbox label="other">自定义报表</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-form>
  </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="preview">确 定</el-button>
    </div>
</el-dialog>
</template>
<script>
export default {
  name: 'previewDialog',
  props: ['form', 'reportOptionDialog'],
  data () {
    return {
    }
  },
  methods: {
    preview () {
      this.$emit('preview')
    },
    close () {
      this.$emit('close')
    }
  }

}
</script>
<style>

</style>
