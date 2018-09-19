    <template>
    <div>
       <el-row style="padding: 10px">
        <el-form :model="menuItemRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="上级菜单序号">
                <el-cascader :options="parentMenu" v-model="menuItemRequestForm.parentMenuId" clearable :change-on-select="true"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单显示名称">
                <el-input name="alias" v-model="menuItemRequestForm.alias"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="是否应用">
                <el-switch name="switch" v-model="menuItemRequestForm.state"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单类型">
                <el-radio-group v-model="menuItemRequestForm.type">
                  <el-radio label="OPTIONS">选项</el-radio>
                  <el-radio label="LINK">链接</el-radio>
                  <el-radio label="">二者</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-table :data="tableData" style="width: 100%" @row-dblclick=dblclick>
        <el-table-column
          prop="alias"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="菜单状态"
          :formatter="formatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="菜单类型">
        </el-table-column>
        <el-table-column
          prop="description"
          label="菜单描述">
        </el-table-column>
        <el-table-column
          prop="lastModifiedBy"
          label="菜单创建者">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="menuItemRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalMenuItems">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'menuMaintenance',
  data () {
    return {
      tableData: [],
      totalMenuItems: 0,
      parentMenu: [],
      menuItemRequestForm: {
        name: '',
        parentMenuId: [],
        parentId: '',
        alias: '',
        state: true,
        type: 'OPTIONS',
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 8, 'xl': 8}
    }
  },
  methods: {
    handleSizeChange (val) {
      this.menuItemRequestForm.itemsPerPage = val
      console.log(`每页 ${val} 条`)
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.menuItemRequestForm.currentPage = val
      console.log(`当前页: ${val}`)
      this.onSubmit()
    },
    formatter (row, column) {
      if (row.state) {
        return '启用'
      } else {
        return '未启用'
      }
    },
    dblclick (row, event) {
      console.log(row.id)
      this.$router.push('/lims/menuDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/systemMenu/queryMenuItem', this.menuItemRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalMenuItems = res.data.totalMenuItems || 0
          console.log('totalMenuItems is: ' + vm.totalMenuItems)
        })
    },
    loadParentMenu () {
      let vm = this
      this.$ajax.get('/api/systemMenu/parentMenuOptions')
        .then(function (res) {
          vm.parentMenu = res.data
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Somthing wrong happen in loadParentMenu!')
        })
    }
  },
  mounted () {
    this.loadParentMenu()
    this.onSubmit()
  }

}
</script>
