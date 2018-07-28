    <template>
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
  </template>

<script>
export default {
  name: 'menuMaintenance',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    loadData () {
      let vm = this
      this.$ajax.get('/api/systemMenu/getMenuItem')
        .then(function (res) {
          console.log('menuMaintenance')
          console.log(res)
          vm.tableData = res.data
        })
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
    }
  },
  mounted () {
    this.loadData()
  }

}
</script>
