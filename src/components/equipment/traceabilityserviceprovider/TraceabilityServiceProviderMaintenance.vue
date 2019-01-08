<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="traceabilityServiceProviderForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="溯源服务供应商名称">
              <el-input name="traceabilityServiceProviderName" v-model="traceabilityServiceProviderForm.traceabilityServiceProviderName" autoComplete="traceabilityServiceProviderName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="供应商简介">
              <el-input name="supplierDescription" v-model="traceabilityServiceProviderForm.supplierDescription" autoComplete="supplierDescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="是否为法定计量机构">
              <el-select name="legalMetrological" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.legalMetrological">
                <el-option v-for="item in staticOptions.legalMetrologicals"
                  :key="item.id"
                  :label="item.legalMetrological"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="是否通过认证/认可">
              <el-select name="qualification" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.qualification">
                <el-option v-for="item in staticOptions.qualifications"
                  :key="item.id"
                  :label="item.qualification"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="授权能力范围是否符合">
              <el-select name="authorityScope" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.authorityScope">
                <el-option v-for="item in staticOptions.authorityScopes"
                  :key="item.id"
                  :label="item.authorityScope"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="人员是否符合要求">
              <el-select name="personnel" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.personnel">
                <el-option v-for="item in staticOptions.personnels"
                  :key="item.id"
                  :label="item.personnel"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="服务质量">
              <el-select name="serviceQuality" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.serviceQuality">
                <el-option v-for="item in staticOptions.serviceQualitys"
                  :key="item.id"
                  :label="item.serviceQuality"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="其它说明">
              <el-input name="note" v-model="traceabilityServiceProviderForm.note" autoComplete="note"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="综合评价结果">
              <el-select name="assessmentResult" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.assessmentResult">
                <el-option v-for="item in staticOptions.assessmentResults"
                  :key="item.id"
                  :label="item.assessmentResult"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="确认意见">
              <el-select name="confirmation" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.confirmation">
                <el-option v-for="item in staticOptions.confirmations"
                  :key="item.id"
                  :label="item.confirmation"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="审核意见">
              <el-select name="audit" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.audit">
                <el-option v-for="item in staticOptions.audits"
                  :key="item.id"
                  :label="item.audit"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="批准意见">
              <el-select name="approve" filterable clearable default-first-option v-model="traceabilityServiceProviderForm.approve">
                <el-option v-for="item in staticOptions.approves"
                  :key="item.id"
                  :label="item.approve"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文本">
              <el-input name="sort" v-model="traceabilityServiceProviderForm.sort" autoComplete="sort"></el-input>
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

      <el-row type="flex" justify="end">
        <el-button-group size="mini">
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveTop">置顶</el-button>
          <el-button type="primary" icon="el-icon-arrow-up" @click.native="moveUp">上移</el-button>
          <el-button type="primary" @click.native="moveDown">下移<i class="el-icon-arrow-down"></i></el-button>
          <el-button type="primary" @click.native="moveBottom">置底<i class="el-icon-arrow-down"></i></el-button>
        </el-button-group>
      </el-row>
      <el-table ref="multipleTable"
      :data="tableData" style="width: 100%"
      @row-dblclick=dblclick
      @selection-change="handleSelectionChange"
      @select="handleSelection">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="traceabilityServiceProviderName"
          label="溯源服务供应商名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="supplierDescription"
          label="供应商简介"
          width="180">
        </el-table-column>
        <el-table-column
          prop="legalMetrological"
          label="是否为法定计量机构"
          width="180">
        </el-table-column>
        <el-table-column
          prop="qualification"
          label="是否通过认证/认可"
          width="180">
        </el-table-column>
        <el-table-column
          prop="authorityScope"
          label="授权能力范围是否符合"
          width="180">
        </el-table-column>
        <el-table-column
          prop="personnel"
          label="人员是否符合要求"
          width="180">
        </el-table-column>
        <el-table-column
          prop="serviceQuality"
          label="服务质量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="note"
          label="其它说明"
          width="180">
        </el-table-column>
        <el-table-column
          prop="assessmentResult"
          label="综合评价结果"
          width="180">
        </el-table-column>
        <el-table-column
          prop="confirmation"
          label="确认意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="audit"
          label="审核意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="approve"
          label="批准意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="文本"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="traceabilityServiceProviderRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTraceabilityServiceProviders">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'traceabilityServiceProviderMaintenance',
  data () {
    return {
      tableData: [],
      indexArray: [],
      traceabilityServiceProviderForm: {},
      tempTraceabilityServiceProviderForm: {},
      totalTraceabilityServiceProviders: 0,
      traceabilityServiceProviderRequestForm: {
        traceabilityServiceProviderName: '',
        supplierDescription: '',
        legalMetrological: '',
        qualification: '',
        authorityScope: '',
        personnel: '',
        serviceQuality: '',
        note: '',
        assessmentResult: '',
        confirmation: '',
        audit: '',
        approve: '',
        sort: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItems: [],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      staticOptions: {
        departments: [],
        results: []
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.traceabilityServiceProviderRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.traceabilityServiceProviderRequestForm.currentPage = val
      this.onSubmit()
    },
    loadData () {
      let vm = this
      this.$ajax.get('/api/equipment/traceabilityServiceProvider/getTraceabilityServiceProvider')
        .then(function (res) {
          vm.tableData = res.data
        })
    },
    dblclick (row, event) {
      this.$router.push('/lims/traceabilityServiceProviderDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/equipment/traceabilityServiceProvider/queryTraceabilityServiceProvider', this.traceabilityServiceProviderRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTraceabilityServiceProviders = res.data.totalTraceabilityServiceProviders || 0
        })
    },
    handleSelection (selection, row) {
      if (selection.indexOf(row) > 0) {
        selection.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item)
        })
      }
    },
    handleSelectionChange (selection) {
      let vm = this
      this.indexArray = []
      selection.forEach(item => {
        vm.indexArray.push(vm.tableData.indexOf(item))
      })
    },
    moveUp () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveUpSingle(item)
      })
    },
    moveTop () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveTopSingle(item)
      })
    },
    moveUpSingle (index) {
      let vm = this
      let tmp = ''
      if (index > 0) {
        this.tempTraceabilityServiceProviderForm = this.tableData[(index - 1)]
        this.traceabilityServiceProviderForm = this.tableData[index]
        tmp = this.tempTraceabilityServiceProviderForm.sort
        this.tempTraceabilityServiceProviderForm.sort = this.traceabilityServiceProviderForm.sort
        this.traceabilityServiceProviderForm.sort = tmp
        this.$ajax.all([this.update(this.traceabilityServiceProviderForm), this.update(this.tempTraceabilityServiceProviderForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      if (index > 0) {
        this.traceabilityServiceProviderForm = this.tableData[index]
        this.$ajax.post('/api/equipment/traceabilityServiceProvider/moveToTop', this.traceabilityServiceProviderForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveDown () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveDownSingle(item)
      })
    },
    moveBottom () {
      let vm = this
      this.indexArray.forEach(item => {
        vm.moveBottomSingle(item)
      })
    },
    moveDownSingle (index) {
      let vm = this
      let tmp = ''
      if (index < this.tableData.length - 1) {
        this.tempTraceabilityServiceProviderForm = this.tableData[(index + 1)]
        this.traceabilityServiceProviderForm = this.tableData[index]
        tmp = this.tempTraceabilityServiceProviderForm.sort
        this.tempTraceabilityServiceProviderForm.sort = this.traceabilityServiceProviderForm.sort
        this.traceabilityServiceProviderForm.sort = tmp
        this.$ajax.all([this.update(this.traceabilityServiceProviderForm), this.update(this.tempTraceabilityServiceProviderForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      if (index < this.tableData.length - 1) {
        this.traceabilityServiceProviderForm = this.tableData[index]
        this.$ajax.post('/api/equipment/traceabilityServiceProvider/moveToBottom', this.traceabilityServiceProviderForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message(error.response.data.message)
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/equipment/traceabilityServiceProvider', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/equipment/traceabilityServiceProvider/queryTraceabilityServiceProvider', this.traceabilityServiceProviderRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalTraceabilityServiceProviders = res.data.totalTraceabilityServiceProviders || 0
          vm.$nextTick(() => {
            vm.tableData.forEach(row => {
              if (row.id === val.id) {
                vm.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          })
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
