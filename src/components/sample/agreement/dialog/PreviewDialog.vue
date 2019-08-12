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
    <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      >
      <el-table-column
        prop="displayName"
        show-overflow-tooltip
        label="文件名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        show-overflow-tooltip
        label="文件内容"
        width="480">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block text-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="templateFileRequestForm.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        :total="totalTemplateFiles">
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'previewDialog',
  props: ['form', 'agreementId', 'reportOptionDialog'],
  data () {
    return {
      tableData: [],
      templateFileForm: {},
      totalTemplateFiles: 0,
      templateFileRequestForm: {
        sampleId: '',
        fileName: '',
        location: '',
        content: '',
        displayName: '',
        link: '',
        show: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      let vm = this
      row.sampleId = this.agreementId
      this.$ajax.post('/api/sample/agreement/downloadTemplateFile/', row, {responseType: 'blob'})
        .then(function (res) {
          if (!res.data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([res.data]), {type: 'application/msword;charset=utf-8'})
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'lims.doc')

          document.body.appendChild(link)
          link.click()
        }
        ).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleSizeChange (val) {
      this.templateFileRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.templateFileRequestForm.currentPage = val
      this.onSubmit()
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/templateFile/queryTemplateFile', this.templateFileRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTemplateFiles = res.data.totalTemplateFiles || 0
        })
    },
    preview () {
      this.$emit('preview')
    },
    close () {
      this.$emit('close')
    }
  },
  mounted () {
    this.onSubmit()
  },
  activated () {
    this.onSubmit()
  }

}
</script>
<style>

</style>
