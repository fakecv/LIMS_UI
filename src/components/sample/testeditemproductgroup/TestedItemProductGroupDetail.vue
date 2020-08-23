<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductGroupForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="组名称">
              <el-input name="testedItemProductGroupName" v-model="testedItemProductGroupForm.testedItemProductGroupName" autoComplete="testedItemProductGroupName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组描述">
              <el-input type="textarea" name="testedItemProductGroupDescription" v-model="testedItemProductGroupForm.testedItemProductGroupDescription" autoComplete="testedItemProductGroupDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="检测项目">
            <button type="button" size='mini' class="btn btn-secondary" @click="newTestedItemProduct">新建检测项目</button>
            <button type="button" size='mini' class="btn btn-secondary" @click="addTestedItemProducts">添加已有检测项目</button>
            <button type="button" class="btn btn-secondary" @click="deleteTestedItemProducts">删除检测项目</button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
      <el-row type="flex" justify="end">
        <el-button-group size="mini">
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveUp">上移</el-button>
          <el-button type="primary" @click.native="moveDown">下移<i class="el-icon-arrow-down"></i></el-button>
        </el-button-group>
      </el-row>
    <div>
      <el-table  ref="multipleTable"
        tooltip-effect="light"
        :data="testedItemProductGroupForm.testedItemTasks"
        style="width: 100%"
        @selection-change="handleTestedItemProductGroupSelection"
        @row-dblclick="dblclick"
       >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="testCategory"
            label="检测类别"
            :formatter="testCategoryFormatter"
            width="180">
          </el-table-column>
          <el-table-column
            prop="testedItem"
            label="检测项目"
            :formatter="testedItemFormatter"
            width="180">
          </el-table-column>
          <el-table-column
            prop="testParameter"
            label="检测项目参数"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            prop="testMethod"
            show-overflow-tooltip
            label="检测方法"
            width="180">
          </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="testedItemProductListDialogVisible" :modal-append-to-body="false">
      <testedItemProductListDialog
        ref="testedItemProductListDialog"
        :testedItemProductForm="testedItemProductForm"
        v-bind="$attrs"
        :staticOptions="staticOptions"
        v-on="$listeners"
        />
      <div slot="footer" class="dialog-footer">
        <el-button @click="testedItemProductListDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="updateTestedItemProducts">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="testedItemProductDialogVisible" :modal-append-to-body="false">
      <testedItemProductDialog
        :testedItemTaskForm="testedItemTaskForm"
        :staticOptions="staticOptions"
        v-bind="$attrs"
        v-on="$listeners"
        />
      <div slot="footer" class="dialog-footer">
        <el-button @click="testedItemProductDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="upsertTestedItemTask">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import testedItemProductDialog from './dialog/testedItemProductDialog'
import testedItemProductListDialog from './dialog/testedItemProductListDialog'
export default {
  name: 'testedItemProductGroupDetail',
  props: ['testedItemProductGroupForm', 'staticOptions', 'testedItemProductForm', 'testedItemTaskForm'],
  inheritAttrs: false,
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '4', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '5', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '6', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '7', 'icon': 'el-icon-download', 'loading': false}
      ],
      multipleSelection: [],
      indexArray: [],
      tempTestedItemProducts: [],
      deletedTestedItemProducts: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      testedItemProductListDialogVisible: false,
      testedItemProductDialogVisible: false,
      existTask: true
    }
  },
  components: {
    testedItemProductDialog,
    testedItemProductListDialog
  },
  methods: {
    upsertTestedItemTask () {
      if (!this.existTask) {
        this.$emit('insertTestedItemProduct', this.testedItemTaskForm)
      }
      this.testedItemProductDialogVisible = false
    },
    newTestedItemProduct () {
      this.testedItemProductDialogVisible = true
      this.existTask = false
      this.$emit('newTestedItemProducts')
    },
    updateTestedItemProducts () {
      this.testedItemProductListDialogVisible = false
      this.$emit('updateTestedItemProducts')
    },
    dblclick (row, event) {
      this.testedItemProductDialogVisible = true
      this.existTask = true
      this.$emit('loadTestedItemTask', row)
    },
    addTestedItemProducts () {
      let vm = this
      this.testedItemProductListDialogVisible = true
      this.$nextTick(() => {
        vm.$refs.testedItemProductListDialog.$refs.testedItemProductTable.clearSelection()
      })
    },
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
        this.$message('复制成功!')
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
      } else if (action.id === '5') {
        this.confirmDelete()
      } else if (action.id === '6') {
      } else if (action.id === '7') {
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/testedItemProductGroup', this.testedItemProductGroupForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
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
      if (this.testedItemProductGroupForm.id && this.testedItemProductGroupForm.id !== '') {
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
      this.$ajax.get('/api/sample/testedItemProductGroup/delete/' + this.testedItemProductGroupForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteTestedItemProductGroupForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    deleteTestedItemProducts () {
      this.$emit('deleteTestedItemProducts', this.deletedTestedItemProducts)
    },
    handleTestedItemProductGroupSelection (val) {
      let vm = this
      this.deletedTestedItemProducts = val
      this.indexArray = []
      val.forEach(item => {
        vm.indexArray.push(vm.testedItemProductGroupForm.testedItemTasks.indexOf(item))
      })
    },
    moveUp () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveUpSingle(item)
      })
    },
    moveUpSingle (index) {
      let vm = this
      if (index > 0) {
        for (var i = 0; i < this.testedItemProductGroupForm.testedItemTasks.length; i++) {
          if (i === index - 1) {
            vm.tempTestedItemProducts.push(this.testedItemProductGroupForm.testedItemTasks[index])
          } else if (i === index) {
            vm.tempTestedItemProducts.push(this.testedItemProductGroupForm.testedItemTasks[index - 1])
          } else {
            vm.tempTestedItemProducts.push(this.testedItemProductGroupForm.testedItemTasks[i])
          }
        }
        this.testedItemProductGroupForm.testedItemTasks = this.tempTestedItemProducts
        this.$nextTick(() => {
          vm.$refs.multipleTable.toggleRowSelection(this.testedItemProductGroupForm.testedItemTasks[index - 1], true)
        })
        this.tempTestedItemProducts = []
      }
    },
    moveDown () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveDownSingle(item)
      })
    },
    moveDownSingle (index) {
      let vm = this
      if (index < this.testedItemProductGroupForm.testedItemTasks.length - 1) {
        for (var i = 0; i < this.testedItemProductGroupForm.testedItemTasks.length; i++) {
          if (i === index + 1) {
            vm.tempTestedItemProducts.push(this.testedItemProductGroupForm.testedItemTasks[index])
          } else if (i === index) {
            vm.tempTestedItemProducts.push(this.testedItemProductGroupForm.testedItemTasks[index + 1])
          } else {
            vm.tempTestedItemProducts.push(this.testedItemProductGroupForm.testedItemTasks[i])
          }
        }
        this.testedItemProductGroupForm.testedItemTasks = this.tempTestedItemProducts
        this.$nextTick(() => {
          vm.$refs.multipleTable.toggleRowSelection(this.testedItemProductGroupForm.testedItemTasks[index + 1], true)
        })
        this.tempTestedItemProducts = []
      }
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.staticOptions.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    },
    testMethodFormatter (row, column) {
      let name = ''
      this.staticOptions.testMethods.forEach(item => {
        if (row.testMethod === item.id) {
          name = item.testMethodName
        }
      })
      return name
    },
    testParameterFormatter (row, column) {
      let name = ''
      this.staticOptions.testParameters.forEach(item => {
        if (row.testParameter === item.id) {
          name = item.testParameterName
        }
      })
      return name
    },
    testCategoryFormatter (row, column) {
      let name = ''
      this.staticOptions.testCategories.forEach(item => {
        if (row.testCategory === item.id) {
          name = item.testCategoryName
        }
      })
      return name
    }
  }
}
</script>
<style lang="less">
</style>
