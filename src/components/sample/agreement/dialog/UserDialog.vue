<template>
  <el-dialog title="用户列表" :visible.sync="userDialogFormVisible" :modal-append-to-body="false">
    <el-container style="padding: 10px">
      <el-form :model="userRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-form-item label="用户名称">
            <el-input name="name" v-model="userRequestForm.name"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="reloadUsers">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table ref="userTable" :data="users" style="width: 100%"
      highlight-current-row
      @row-click="handleUserRowClick"
      @row-dblclick="handleUserRowDLClick"
    >
      <el-table-column prop="name" label="接收人名称" width="180"></el-table-column>
      <el-table-column prop="mobileNumber" label="接收人电话" width="180"></el-table-column>
      <el-table-column prop="fax" label="接收人传真" width="180"></el-table-column>
      <el-table-column prop="email" label="接收人邮箱" width="180"></el-table-column>
      <el-table-column prop="address" label="接收人通讯地址" width="180"></el-table-column>
    </el-table>
    <div class="block text-right">
      <el-pagination
        @size-change="handleUserSizeChange"
        @current-change="handleUserCurrentChange"
        :current-page.sync="userRequestForm.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="20"
        layout="sizes, prev, pager, next"
        :total="totalUsers">
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="userDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="confirmUser">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'userDialog',
  props: ['users', 'userRequestForm', 'userDialogFormVisible', 'totalUsers'],
  data () {
    return {
    }
  },
  methods: {
    confirmUser () {
      this.$emit('confirmUser')
    },
    reloadUsers () {
      this.$emit('reloadUsers')
    },
    handleUserSizeChange (val) {
      this.$emit('handleUserSizeChange', val)
    },
    handleUserCurrentChange (val) {
      this.$emit('handleUserCurrentChange', val)
    },
    handleUserRowClick (row, event, column) {
      this.$emit('handleUserRowClick', row)
    },
    handleUserRowDLClick (row, event, column) {
      this.$emit('handleUserRowDLClick', row)
    }
  }

}
</script>
<style>

</style>
