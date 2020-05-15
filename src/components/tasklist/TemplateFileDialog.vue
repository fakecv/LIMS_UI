<template>
  <el-dialog title="模板文件列表" :visible.sync="templateFileDialog"  append-to-body>
        <el-table ref="multipleTable"
          max-height="250"
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
            width="180">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeTemplateFileDialog">取 消</el-button>
      <el-button type="primary" @click="closeTemplateFileDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'templateFileDialog',
  props: ['templateFileDialog', 'processId'],
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12},
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
    closeTemplateFileDialog () {
      this.$emit('closeTemplateFileDialog')
    },
    handleEdit (index, row) {
      let vm = this
      row.sampleId = this.processId
      this.$ajax.post('/api/sample/templateFile/downloadTemplateFile/', row, {responseType: 'blob'})
        .then(function (res) {
          let url = window.URL.createObjectURL(new Blob([res.data]), {type: 'application/msword;charset=utf-8'})
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', res.headers.filename)
          document.body.appendChild(link)
          link.click()
          link.remove()
        }).catch(function (error) {
          let fileReader = new FileReader()
          fileReader.onload = function () {
            try {
              let jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
              vm.$message(jsonData.message)
            } catch (err) { // 解析成对象失败，说明是正常的文件流
              alert('success...')
            }
          }
          fileReader.readAsText(error.response.data)
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
    }
  },
  watch: {
    processId (newValue, oldValue) {
      return newValue
    }
  },
  activated () {
    this.onSubmit()
  }

}
</script>
<style>

</style>
