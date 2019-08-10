    <template>
    <div>
      <el-container style="padding: 10px">
        <el-form :model="roleRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="角色名称">
              <el-input name="userRoleName" v-model="roleRequestForm.userRoleName"></el-input>
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
          prop="userRoleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          label="菜单名称"
          width="370">
          <template slot-scope="scope">
            <el-cascader :options="linkMenus" v-model="scope.row.menuId" style="width: 350px;">
            </el-cascader>
          </template>
        </el-table-column>
        <el-table-column
          prop="userRoleDescription"
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
        userRoleName: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      linkMenus: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.roleRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.roleRequestForm.currentPage = val
      this.onSubmit()
    },
    formatter (row, column) {
      return this.menuList[row.menuId]
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/sample/role/getRole')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/roleDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/role/queryUserRole', this.roleRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalRoles = res.data.totalUserRoles || 0
        })
    },
    loadMenuLinks () {
      let vm = this
      this.$ajax.post('/api/systemMenu/menuLinks', 'LINK')
        .then(function (res) {
          vm.linkMenus = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  },
  mounted () {
    this.loadMenuLinks()
    this.onSubmit()
  },
  activated () {
    this.loadMenuLinks()
    this.onSubmit()
  }
}
</script>
