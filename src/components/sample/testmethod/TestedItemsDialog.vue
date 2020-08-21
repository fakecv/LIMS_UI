<template>
  <el-dialog title="审核条目列表" :visible.sync="dialogVisible" :modal-append-to-body="false">
    <el-container style="padding: 10px">
      <el-form :model="testedItemRequestForm" label-width="100px" label-position="left" size="mini">
          <el-form-item label="检测项目类别">
            <el-select name="testedItem" filterable default-first-option v-model="testedItemRequestForm.testCategory">
              <el-option v-for="item in testCategories"
                :key="item.id"
                :label="item.testCategoryName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检测项目名称">
            <el-input name="testedItemName" v-model="testedItemRequestForm.testedItemName"></el-input>
          </el-form-item>
          <el-form-item label="检测项目说明">
            <el-input name="testedItemNumber" v-model="testedItemRequestForm.testedItemNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reloadTestedItems">查询</el-button>
          </el-form-item>
      </el-form>
    </el-container>
    <el-table  ref="testedItemTable" :data="testedItemTable" style="width: 100%" @selection-change="handleSelectionChange">
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
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItems">
        </el-pagination>
      </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click.native="updateTestMethod">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'testedItemsDialog',
  props: ['dialogVisible', 'testCategories'],
  data () {
    return {
      testedItemTable: [],
      totalTestedItems: 0,
      multipleSelection: [],
      testedItemRequestForm: {
        testedItemName: '',
        testedItemNumber: '',
        testCategory: '',
        itemsPerPage: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    reloadTestedItems () {
      let vm = this
      this.$ajax.post('/api/sample/testedItem/queryTestedItem', this.testedItemRequestForm)
        .then(function (res) {
          vm.testedItemTable = res.data.pageResult || []
          vm.totalTestedItems = res.data.totalTestedItems || 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleSizeChange (val) {
      this.testedItemRequestForm.itemsPerPage = val
      this.reloadTestedItems()
    },
    handleCurrentChange (val) {
      this.testedItemRequestForm.currentPage = val
      this.reloadTestedItems()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    updateTestMethod () {
      this.$emit('updateTestMethod', this.multipleSelection)
    },
    cancel () {
      this.$emit('cancelUpdateTestMethod')
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
    this.reloadTestedItems()
  }
}
</script>
<style lang="less">
</style>
