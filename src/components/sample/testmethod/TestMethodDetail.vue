<template>
  <el-container>
    <el-header style="min-width:400px;">
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px" direction="vertical">
      <el-form :model="testedMethodRequestForm" label-width="100px" label-position="left" size="mini">
        <el-col>
          <el-form-item label="试验方法编号">
            <el-input name="testMethodName" v-model="testedMethodRequestForm.testMethodName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="试验方法描述">
            <el-input type="textarea" name="testMethodNumber" v-model="testedMethodRequestForm.testMethodNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="检测项目名称">
            <button type="button" class="btn btn-secondary" @click="addTestedItems">添加审核条目</button>
            <button type="button" class="btn btn-secondary" @click="deleteTestedItems">删除审核条目</button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-container>
    <el-table ref="multipleTable"
    :data="testedItemTable" style="width: 100%"
    @select="handleSelection">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
        <el-table-column
          prop="testCategory"
          label="检测项目类别"
          :formatter="testCategoryFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemName"
          label="检测项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="检测项目价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemNumber"
          label="检测项目说明"
          width="180">
        </el-table-column>
    </el-table>
    <testedItemsDialog
      :dialogVisible="dialogVisible"
      :testCategories="testCategories"
      @updateTestMethod="updateTestMethod"
      @cancelUpdateTestMethod="cancelUpdateTestMethod"
    />
  </el-container>
</template>

<script>
import testedItemsDialog from '@/components/sample/testmethod/TestedItemsDialog'
export default {
  name: 'testMethodDetail',
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-delete', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      selectedTestedItems: [],
      testCategories: [],
      dialogVisible: false,
      testedItemTable: [],
      testedMethodRequestForm: {
        id: '',
        testMethodName: '',
        sort: '',
        testMethodNumber: '',
        testedItem: []
      },
      testMethodResetForm: {
        id: '',
        testMethodName: '',
        sort: '',
        testMethodNumber: '',
        testedItem: []
      }
    }
  },
  components: {
    testedItemsDialog: testedItemsDialog
  },
  methods: {
    loadTestMethod (testMethodId) {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/' + testMethodId)
        .then(function (res) {
          vm.testedMethodRequestForm = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadTestCategory () {
      let vm = this
      this.$ajax.get('/api/sample/testCategory/getTestCategory')
        .then(function (res) {
          vm.testCategories = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    addTestedItems () {
      this.dialogVisible = true
    },
    cancelUpdateTestMethod () {
      this.dialogVisible = false
    },
    deleteTestedItems () {
      let vm = this
      this.selectedTestedItems.forEach(row => {
        for (var i = 0; i < vm.testedItemTable.length; i++) {
          if (vm.testedItemTable[i].id === row.id) {
            vm.testedItemTable.splice(i, 1)
          }
        }
      })
      this.testedMethodRequestForm.testedItem = []
      this.testedItemTable.forEach(row => {
        this.testedMethodRequestForm.testedItem.push(row.id)
      })
    },
    handleSelection (val) {
      this.selectedTestedItems = []
      val.forEach(row => {
        this.selectedTestedItems.push(row)
      })
    },
    loadSelectedTestedItems (testedMethodId) {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/selectedTestedItems/' + testedMethodId)
        .then(function (res) {
          vm.testedItemTable = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateTestMethod (event) {
      let vm = this
      event.forEach(row => {
        if (vm.testedMethodRequestForm.testedItem.indexOf(row.id) < 0) {
          vm.testedMethodRequestForm.testedItem.push(row.id)
          vm.testedItemTable.push(row)
        }
      })
      this.dialogVisible = false
    },
    actionHandle (action) {
      if (action.id === '1') {
        this.saveToDB()
      } else if (action.id === '2') {
        this.confirmDelete()
      } else if (action.id === '3') {
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.new()
      } else if (action.id === '6') {
        this.copy()
      } else if (action.id === '7') {
      }
    },
    new () {
      this.resetTestMethodForm()
    },
    copy () {
      this.$message('复制成功!')
      this.resetTestMethodId()
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/testMethod', this.testedMethodRequestForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.updateTestMethodForm(res.data)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    confirmDelete () {
      let vm = this
      if (this.testedMethodRequestForm.id && this.testedMethodRequestForm.id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/testMethod/delete/' + this.testedMethodRequestForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.resetTestMethodForm()
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateTestMethodForm (event) {
      this.testedMethodRequestForm.id = event.id
    },
    resetTestMethodId () {
      this.testedMethodRequestForm.id = ''
    },
    resetTestMethodForm () {
      this.testedMethodRequestForm = JSON.parse(JSON.stringify(this.testMethodResetForm))
      this.$router.push('/lims/testMethodDetailNew')
    },
    testCategoryFormatter (row, column) {
      let name = ''
      this.testCategories.forEach(item => {
        if (row.testCategory === item.id) {
          name = item.testCategoryName
        }
      })
      return name
    }
  },
  activated () {
    this.loadTestCategory()
    if (this.$route.params.id !== undefined) {
      this.loadTestMethod(this.$route.params.id)
      this.loadSelectedTestedItems(this.$route.params.id)
    }
  }
}
</script>
<style lang="less">
</style>
