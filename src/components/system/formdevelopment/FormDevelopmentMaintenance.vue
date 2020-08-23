<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="formDevelopmentForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="页面名称">
              <el-input name="domain" v-model="formDevelopmentForm.domain" autoComplete="domain"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="包名称">
              <el-input name="packageName" v-model="formDevelopmentForm.packageName" autoComplete="packageName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="页面内联">
              <el-switch name="switch" v-model="formDevelopmentForm.inline" autoComplete="inline"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="页面标签位置">
              <el-input name="labelPosition" v-model="formDevelopmentForm.labelPosition" autoComplete="labelPosition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="页面标签宽度">
              <el-input name="labelWidth" v-model="formDevelopmentForm.labelWidth" autoComplete="labelWidth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="页面标签尺寸">
              <el-select name="size" filterable default-first-option v-model="formDevelopmentForm.size">
                <el-option v-for="item in staticOptions.sizes"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="页面是否应用">
              <el-switch name="switch" v-model="formDevelopmentForm.statusIcon" autoComplete="statusIcon"></el-switch>
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
          prop="domain"
          label="页面名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="packageName"
          label="包名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="inline"
          label="页面内联"
          :formatter="translateInlineFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="labelPosition"
          label="页面标签位置"
          width="180">
        </el-table-column>
        <el-table-column
          prop="labelWidth"
          label="页面标签宽度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="页面标签尺寸"
          width="180">
        </el-table-column>
        <el-table-column
          prop="statusIcon"
          label="页面是否应用"
          :formatter="translateStatusFormatter"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formDevelopmentForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalFormTemplates">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'formDevelopmentMaintenance',
  data () {
    return {
      tableData: [],
      totalFormTemplates: 0,
      staticOptions: {
        sizes: [
          {id: '1', label: '普通', value: 'medium'},
          {id: '2', label: '小号', value: 'small'},
          {id: '3', label: '迷你', value: 'mini'}
        ]
      },
      formDevelopmentForm: {
        domain: '',
        packageName: '',
        inline: true,
        labelPosition: '',
        labelWidth: '',
        size: '',
        statusIcon: true,
        itemsPerPage: 20,
        currentPage: 1
      },
      columnSize: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }
    }
  },
  methods: {
    dblclick (row, event) {
      let vm = this
      vm.$route.params.fid = 'qry'
      this.$ajax.get('/api/system/formDevelopment/' + row.id)
        .then(function (res) {
          let document = res.data
          vm.$store.commit('FORM_IMPORT_WITH_FID_G', {fid: vm.$route.params.fid, initV: document})
          vm.$router.push('/lims/UIGenerator/form/qry/' + row.id)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    handleSizeChange (val) {
      this.formDevelopmentForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.formDevelopmentForm.currentPage = val
      this.onSubmit()
    },
    // load all the formDevelopmentes
    onSubmit () {
      let vm = this
      this.$ajax
        .post('/api/system/formDevelopment/queryFormDevelopment', this.formDevelopmentForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalFormTemplates = res.data.totalFormTemplates || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    translateInlineFormatter (row, column) {
      if (row.inline) {
        return '是'
      } else {
        return '否'
      }
    },
    translateStatusFormatter (row, column) {
      if (row.statusIcon) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  activated () {
    this.onSubmit()
  }
}
</script>
