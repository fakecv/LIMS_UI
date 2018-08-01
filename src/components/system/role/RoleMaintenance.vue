    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="roleRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="角色名称">
              <el-input name="roleName" v-model="roleRequestForm.roleName"></el-input>
            </el-form-item>
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
          prop="roleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="menuId"
          :formatter="formatter"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleDescription"
          :formatter="formatter"
          label="角色描述"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="roleRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalRoles">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'roleMaintenance',
  data () {
    return {
      tableData: [],
      totalRoles: 0,
      roleRequestForm: {
        roleName: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      menuList: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.roleRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.roleRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    formatter (row, column) {
      return this.menuList[row.menuId]
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/role/getRole')
        .then(function (res) {
          console.log('roleMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/roleDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/sample/role/queryRole', this.roleRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalRoles = res.data.totalRoles || 0
          console.log('totalDeparts is: ' + vm.totalRoles)
        })
    }
  },
  mounted () {
    this.onSubmit()
  }

}
</script>
