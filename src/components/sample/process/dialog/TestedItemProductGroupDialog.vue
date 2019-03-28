<template>
  <el-dialog :visible.sync="testedItemProductGroupFormVisible" :modal-append-to-body="false">
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
            <el-button type="primary" @click="loadTestedItemProductGroupData">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table ref="testedItemProductGroupTable" :data="testedItemProductGroupTableData" style="width: 100%" @selection-change="handleTestedItemProductGroupChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          @size-change="handleTestedItemProductGroupSizeChange"
          @current-change="handleTestedItemProductGroupCurrentChange"
          :current-page.sync="testedItemProductGroupForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItemProductGroups">
        </el-pagination>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="testedItemProductGroupFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateTestedItemTasks">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'testedItemProductGroupDialog',
  props: [
    'testedItemProductGroupForm',
    'testedItemProductGroupTableData',
    'testedItemProductGroupFormVisible',
    'totalTestedItemProductGroups'
  ],
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12}
    }
  },
  methods: {
    loadTestedItemProductGroupData () {
      this.$emit('loadTestedItemProductGroupData')
    },
    handleTestedItemProductGroupChange (val) {
      this.$emit('handleTestedItemProductGroupChange', val)
    },
    handleTestedItemProductGroupSizeChange (val) {
      this.$emit('handleTestedItemProductGroupSizeChange', val)
    },
    handleTestedItemProductGroupCurrentChange (val) {
      this.$emit('handleTestedItemProductGroupCurrentChange', val)
    },
    updateTestedItemTasks (val) {
      this.$emit('updateTestedItemTasks', val)
    }
  }

}
</script>
<style>

</style>
