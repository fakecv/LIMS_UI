<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductGroupForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="组名称">
              <el-input name="testedItemProductGroupName" v-model="testedItemProductGroupForm.testedItemProductGroupName" autoComplete="testedItemProductGroupName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="组描述">
              <el-input name="testedItemProductGroupDescription" v-model="testedItemProductGroupForm.testedItemProductGroupDescription" autoComplete="testedItemProductGroupDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table :data="tableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="testedItemProductGroupName"
          label="组名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testedItemProductGroupDescription"
          label="组描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemProductGroupForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItemProductGroups">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'testedItemProductGroupMaintenance',
  data () {
    return {
      tableData: [],
      totalTestedItemProductGroups: 0,
      testedItemProductGroupForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      this.$router.push('/lims/testedItemProductGroupDetailEdit/' + row.id)
    },
    handleSizeChange (val) {
      this.testedItemProductGroupForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.testedItemProductGroupForm.currentPage = val
      this.onSubmit()
    },
    // load all the testedItemProductGroupes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProductGroup/queryTestedItemProductGroup', this.testedItemProductGroupForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTestedItemProductGroups = res.data.totalTestedItemProductGroups || 0
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }
}
</script>
