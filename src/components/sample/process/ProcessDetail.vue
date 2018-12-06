<template>
  <div>
    <el-container>
      <el-header style="min-width:500px;">
        <el-button-group>
          <el-button :ref="action.ref" type="info" v-for="(action,index) in actions"
            :key="index" size="mini" :icon="action.icon"
            :loading="action.loading"
            @click="actionHandle(action)"
            :disabled="action.disabled"
            >
            {{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-container style="padding: 10px">
        <el-form :model="processForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托编号">
                <el-select name="agreementNumber" filterable default-first-option v-model="processForm.agreementNumber" @change="getAgreementNumber">
                <el-option v-for="item in staticOptions.agreements"
                  :key="item.Id"
                  :label="item.agreementNumber"
                  :value="item.agreementNumber">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品名称">
                <el-input name="sampleName" v-model="agreementForm.sampleName" readonly autoComplete="sampleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品接收时间">
                <el-date-picker type="datetime" placeholder="选择日期" readonly v-model="agreementForm.receiveSampleTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="材质牌号">
                <el-input name="materialNumber" v-model="agreementForm.materialNumber" readonly autoComplete="materialNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="要求完成时间">
                <el-date-picker type="datetime" placeholder="选择日期" readonly v-model="agreementForm.expectedCompletionTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="来样编号">
                <el-input name="sampleClientNumber" v-model="processForm.sampleClientNumber" autoComplete="sampleClientNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="优先级">
                <el-select name="processPriority" filterable default-first-option v-model="processForm.processPriority">
                <el-option v-for="item in staticOptions.processPriorities"
                  :key="item.id"
                  :label="item.processPriorityName"
                  :value="item.processPriorityName">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="其他信息">
                <el-input type="textarea" name="comment" v-model="processForm.comment" autoComplete="comment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="样品编号">
                <el-input name="sampleNumber" v-model="processForm.sampleNumber" autoComplete="sampleNumber"></el-input>
                <el-button  :disabled="sampleNumberButton" @click="sampleNumberGenerator">生成样品编号</el-button>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="试样编号">
                <el-input name="sampleSubNumber" v-model="processForm.sampleSubNumber" autoComplete="sampleSubNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
    <el-row type="flex" justify="end">
      <el-button-group style="min-width: 200px">
        <el-button type="success" icon="el-icon-plus" size="mini" circle @click="addTestedItemTask"></el-button>
        <el-button type="success" icon="el-icon-tickets" size="mini" circle @click="addTestedItemProduct">添加检测项目产品</el-button>
        <el-button type="success" icon="el-icon-goods" size="mini" circle @click="addTestedItemProductGroup">添加检测项目组</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteTestedItemTask"></el-button>
      </el-button-group>
    </el-row>
        </el-form>
    </el-container>
    <el-row>
      <el-col :span="24">
    <el-table :data="staticOptions.testedItemTaskTableData" @row-dblclick="dblclick" @selection-change="handleTestedItemTaskChange" size="mini">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="testedItem"
          label="检测项目"
          :formatter="testedItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testParameter"
          label="检测项目参数"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethod"
          label="检测方法"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processPriority"
          label="优先级"
          :formatter="processPriorityFormatter"
          width="180">
            <template slot-scope="scope">
              <el-select name="processPriority" filterable default-first-option v-model="scope.row.processPriority" size="mini">
                <el-option v-for="item in staticOptions.processPriorities"
                  :key="item.id"
                  :label="item.processPriorityName"
                  :value="item.processPriorityName">
                </el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column
          prop="rejectNote"
          label="驳回原因"
          show-overflow-tooltip
          width="180">
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>
    <el-container style="padding: 10px">
      <el-form :model="processForm" label-width="100px" label-position="left" size="mini">
      <el-row>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="加工图号">
              <el-select name="drawingDesign" filterable default-first-option v-model="processForm.drawingDesign">
                <el-option v-for="item in staticOptions.filteredDrawingDesigns"
                  :key="item.id"
                  :label="item.drawingDesignName"
                  :value="item.drawingDesignName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交部门">
              <el-select name="submitFrom" filterable default-first-option v-model="processForm.submitFrom">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.departmentName"
                  :value="item.departmentName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="当前流转状态">
              <el-select name="processingStatus" filterable default-first-option v-model="processForm.processingStatus">
                <el-option v-for="item in staticOptions.processingStatuses"
                  :key="item.id"
                  :label="item.processingStatusName"
                  :value="item.processingStatusName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="提交至">
              <el-select name="submitTo" filterable default-first-option v-model="processForm.submitTo">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.id"
                  :label="item.departmentName"
                  :value="item.departmentName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          </el-row>
        </el-form>
      </el-container>
    </el-container>
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
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="testedItemProductGroupFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="updateTestedItemTasks">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog :visible.sync="testedItemProductFormVisible" :modal-append-to-body="false">
    <div>
    <el-container style="padding: 10px">
      <el-form :model="testedItemProductForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目名称">
              <el-input name="testedItemProductName" v-model="testedItemProductForm.testedItemProductName" autoComplete="testedItemProductName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目类别">
                <el-select name="testedItem" filterable clearable default-first-option v-model="testedItemProductForm.testCategory" @change="handleTestCategoryChange">
                  <el-option v-for="item in staticOptions.testCategories"
                    :key="item.id"
                    :label="item.testCategoryName"
                    :value="item.id">
                  </el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目">
              <el-select name="testedItem" filterable clearable default-first-option v-model="testedItemProductForm.testedItem" @change="handleTestedItemChange">
                <el-option v-for="item in staticOptions.filteredTestedItems"
                  :key="item.id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目参数">
              <el-select name="testParameter" filterable clearable default-first-option v-model="testedItemProductForm.testParameter">
                <el-option v-for="item in staticOptions.filteredTestParameters"
                  :key="item.id"
                  :label="item.testParameterName"
                  :value="item.testParameterName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测方法">
              <el-select name="testMethod" filterable clearable default-first-option v-model="testedItemProductForm.testMethod">
                <el-option v-for="item in staticOptions.filteredTestMethods"
                  :key="item.id"
                  :label="item.testMethodName"
                  :value="item.testMethodName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-button type="primary" @click="loadTestedItemProductData">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
    <el-table :data="testedItemProductTableData" style="width: 100%"  @selection-change="handleTestedItemProductChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="testedItem"
          label="检测项目"
          :formatter="testedItemFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="testParameter"
          label="检测项目参数"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="testMethod"
          label="检测方法"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="testedItemProductForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalTestedItemProducts">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="testedItemProductFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="updateTestedItemProduct">确 定</el-button>
      </div>
    </div>
  </el-dialog>
  <el-dialog :visible.sync="testedItemTaskFormVisible" :modal-append-to-body="false">
    <el-container style="padding: 10px">
      <el-form :model="testedItemTaskForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="检测项目名称">
              <el-input name="testedItemProductName" v-model="testedItemTaskForm.testedItemTaskName" autoComplete="testedItemTaskName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目类别">
                <el-select name="testedItem" filterable default-first-option v-model="testedItemTaskForm.testCategory" @change="handleTestCategoryChange">
                  <el-option v-for="item in staticOptions.testCategories"
                    :key="item.id"
                    :label="item.testCategoryName"
                    :value="item.id">
                  </el-option>
                  </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目">
              <el-select name="testedItem" filterable default-first-option v-model="testedItemTaskForm.testedItem" @change="handleTestedItemChange">
                <el-option v-for="item in staticOptions.filteredTestedItems"
                  :key="item.id"
                  :label="item.testedItemName"
                  :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测项目参数">
              <el-input name="testParameter" v-model="testedItemTaskForm.testParameter" autoComplete="testParameter"></el-input>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="staticOptions.checkedTestParameters" @change="handleCheckedTestParametersChange">
                <el-checkbox v-for="testParameter in staticOptions.filteredTestParameters" :label="testParameter.testParameterName" :key="testParameter.id">{{testParameter.testParameterName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg*2" :md="columnSize.md*2" :xl="columnSize.xl*2" :xs="columnSize.xs*2" :sm="columnSize.sm*2">
            <el-form-item label="检测方法">
              <el-select name="testMethod" filterable default-first-option v-model="testedItemTaskForm.testMethod">
                <el-option v-for="item in staticOptions.filteredTestMethods"
                  :key="item.id"
                  :label="item.testMethodName"
                  :value="item.testMethodName">
                </el-option>
                </el-select>
            </el-form-item>
          </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="优先级">
                <el-select name="processPriority" filterable default-first-option v-model="testedItemTaskForm.processPriority">
                <el-option v-for="item in staticOptions.processPriorities"
                  :key="item.id"
                  :label="item.processPriorityName"
                  :value="item.processPriorityName">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="24">
            <el-form-item label="驳回原因">
              <el-input type="textarea" name="rejectNote" v-model="testedItemTaskForm.rejectNote" autoComplete="rejectNote"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="testedItemTaskFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="updateTestedItemTask">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'processDetail',
  props: ['agreementForm', 'processForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      sampleNumberButton: false,
      actions: [
        {'ref': 'new', 'name': '新建', 'id': '1', 'icon': 'el-icon-circle-plus', 'loading': false, 'disabled': false},
        {'ref': 'copy', 'name': '复制', 'id': '2', 'icon': 'el-icon-circle-plus-outline', 'loading': false, 'disabled': false},
        {'ref': 'save', 'name': '数据库保存', 'id': '3', 'icon': 'el-icon-document', 'loading': false, 'disabled': false},
        {'ref': 'submit', 'name': '数据库保存并提交', 'id': '4', 'icon': 'el-icon-check', 'loading': false, 'disabled': false},
        {'ref': 'unlock', 'name': '解锁', 'id': '5', 'icon': 'el-icon-edit', 'loading': false, 'disabled': false},
        {'ref': 'delete', 'name': '删除', 'id': '6', 'icon': 'el-icon-delete', 'loading': false, 'disabled': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12},
      isIndeterminate: true,
      checkAll: false,
      testedItemProductGroupFormVisible: false,
      testedItemProductFormVisible: false,
      testedItemTaskFormVisible: false,
      testedItemProductGroupForm: {
        testedItemProductGroupName: '',
        testedItemProductGroupDescription: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemTaskForm: {
        testedItemTaskName: '',
        testCategory: '',
        testedItem: '',
        testedItemName: '',
        testParameter: '',
        testMethod: '',
        processPriority: '',
        rejectNote: ''
      },
      testedItemProductForm: {
        testedItemProductName: '',
        testCategory: '',
        testedItem: '',
        testedItemName: '',
        testParameter: '',
        testMethod: '',
        id: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      testedItemProductGroupTableData: [],
      testedItemProductTableData: [],
      deletedTestedItemTasks: [],
      totalTestedItemProductGroups: 0,
      totalTestedItemProducts: 0
    }
  },
  methods: {
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
      } else if (action.id === '2') {
        this.copy()
      } else if (action.id === '3') {
        this.saveToDB()
      } else if (action.id === '4') {
        this.submit()
      } else if (action.id === '5') {
        this.actions[3].disabled = false
      } else if (action.id === '6') {
        this.confirmDelete()
      }
    },
    addTestedItemTask () {
      this.$emit('addTestedItemTask')
    },
    addTestedItemProductGroup () {
      this.loadTestedItemProductGroupData()
      this.staticOptions.testedItemProducts = []
      this.testedItemProductGroupFormVisible = true
    },
    addTestedItemProduct () {
      this.loadTestedItemProductData()
      this.staticOptions.testedItemProducts = []
      this.testedItemProductFormVisible = true
    },
    dblclick (row, event) {
      this.testedItemTaskFormVisible = true
      this.testedItemTaskForm = row
      this.getFilteredTestItems(this.testedItemTaskForm.testCategory)
      this.getTestMethod(this.testedItemTaskForm.testedItem)
    },
    updateTestedItemProduct (val) {
      this.$emit('updateTestedItemProduct', val)
      this.testedItemProductFormVisible = false
    },
    updateTestedItemTask () {
      this.testedItemTaskFormVisible = false
      this.$emit('updateTestedItemTask')
    },
    updateTestedItemTasks (val) {
      this.$emit('updateTestedItemTasks', val)
      this.testedItemProductGroupFormVisible = false
    },
    deleteTestedItemTask () {
      let vm = this
      this.deletedTestedItemTasks.forEach(item => {
        for (var i = 0; i < vm.staticOptions.testedItemTaskTableData.length; i++) {
          if (vm.staticOptions.testedItemTaskTableData[i].id === item.id) {
            vm.staticOptions.testedItemTaskTableData.splice(i, 1)
          }
        }
      })
      this.deletedTestedItemTasks = []
    },
    handleSizeChange (val) {
      this.testedItemProductGroupForm.itemsPerPage = val
      this.loadTestedItemProductGroupData()
    },
    handleCurrentChange (val) {
      this.testedItemProductGroupForm.currentPage = val
      this.loadTestedItemProductGroupData()
    },
    handleTestedItemProductGroupChange (val) {
      let vm = this
      this.staticOptions.testedItemProducts = []
      val.forEach(item => {
        // item.processPriority = vm.processForm.processPriority
        vm.staticOptions.testedItemProducts.push(item)
      })
    },
    handleTestedItemProductChange (val) {
      let vm = this
      this.staticOptions.testedItemProducts = []
      val.forEach(item => {
        // item.processPriority = vm.processForm.processPriority
        vm.staticOptions.testedItemProducts.push(item)
      })
    },
    handleTestedItemTaskChange (val) {
      this.deletedTestedItemTasks = val
    },
    handleCheckedTestParametersChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.staticOptions.filteredTestParameters.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.staticOptions.filteredTestParameters.length
      this.testedItemTaskForm.testParameter = value.join(',')
      // this.testedItemProductForm.testParameter = value
    },
    handleCheckAllChange (val) {
      let vm = this
      if (val) {
        this.staticOptions.filteredTestParameters.forEach(testParameter => {
          vm.staticOptions.checkedTestParameters.push(testParameter.testParameterName)
        })
        this.testedItemTaskForm.testParameter = this.staticOptions.checkedTestParameters.join(',')
      } else {
        this.staticOptions.checkedTestParameters = []
        this.testedItemTaskForm.testParameter = ''
      }
      this.isIndeterminate = false
    },
    // load all the testedItemProductGroups
    loadTestedItemProductGroupData () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProductGroup/queryTestedItemProductGroup', this.testedItemProductGroupForm)
        .then(function (res) {
          vm.testedItemProductGroupTableData = res.data.pageResult || []
          vm.totalTestedItemProductGroups = res.data.totalTestedItemProductGroups || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    // load all the testedItemProductes
    loadTestedItemProductData () {
      let vm = this
      this.$ajax
        .post('/api/sample/testedItemProduct/queryTestedItemProduct', this.testedItemProductForm)
        .then(function (res) {
          vm.testedItemProductTableData = res.data.pageResult || []
          vm.totalTestedItemProducts = res.data.totalTestedItemProducts || 0
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    new () {
      this.$emit('new')
      this.sampleNumberButton = false
    },
    copy () {
      this.$emit('copy')
      this.$message('复制成功!')
      this.sampleNumberButton = false
    },
    saveToDB () {
      let vm = this
      this.processForm.testedItemTasks = this.staticOptions.testedItemTaskTableData
      this.$ajax.post('/api/sample/process', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessForm', res.data)
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    submit () {
      let vm = this
      this.processForm.testedItemTasks = this.staticOptions.testedItemTaskTableData
      this.$ajax.post('/api/sample/process/submitProcess', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessForm', res.data)
          vm.sampleNumberButton = false
          vm.actions[3].disabled = true
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    confirmDelete () {
      let vm = this
      if (this.processForm.id && this.processForm.id !== '') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.delete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/process/delete/' + this.processForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteProcessForm')
          vm.sampleNumberButton = false
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    getAgreementNumber  (val) {
      this.$emit('getAgreementInfo', val)
    },
    getFilteredTestItems (testCategoryId) {
      this.staticOptions.filteredTestedItems =
        this.staticOptions.testedItems.filter(function (val) {
          return val.testCategory === testCategoryId
        })
    },
    handleTestCategoryChange (testCategoryId) {
      this.testedItemTaskForm.testedItem = ''
      this.getFilteredTestItems(testCategoryId)
    },
    getTestMethod  (val) {
      this.$emit('getTestMethod', val)
      this.$emit('getTestParameter', val)
      // this.$emit('getDrawingDesigns', val)
    },
    handleTestedItemChange (val) {
      this.testedItemTaskForm.drawingDesign = ''
      this.testedItemTaskForm.testParameter = ''
      this.testedItemTaskForm.testMethod = ''
      this.staticOptions.filteredTestedItems.forEach(item => {
        if (item.id === val) {
          this.testedItemTaskForm.testedItemName = item.testedItemName
        }
      })
      this.getTestMethod(val)
    },
    sampleNumberGenerator () {
      let vm = this
      this.$ajax.get('/api/sample/process/generateSampleNumber')
        .then(function (res) {
          vm.processForm.sampleNumber = res.data
          vm.processForm.sampleSubNumber = res.data
          vm.sampleNumberButton = true
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            message: error.response.data.message
          })
        })
    },
    drawingDesignFormatter (row, column) {
      let name = ''
      this.staticOptions.drawingDesigns.forEach(item => {
        if (row.drawingDesign === item.id) {
          name = item.drawingDesignName
        }
      })
      return name
    },
    expectedCompletionTimeFormatter (row, column) {
      if (row.expectedCompletionTime) {
        let dateTT = new Date(row.expectedCompletionTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    processPriorityFormatter (row, column) {
      let name = ''
      this.staticOptions.processPriorities.forEach(item => {
        if (row.processPriority === item.id) {
          name = item.processPriorityName
        }
      })
      return name
    },
    processingStatusFormatter (row, column) {
      let name = ''
      this.staticOptions.processingStatuses.forEach(item => {
        if (row.processingStatus === item.id) {
          name = item.processingStatusName
        }
      })
      return name
    },
    receiveSampleTimeFormatter (row, column) {
      if (row.receiveSampleTime) {
        let dateTT = new Date(row.receiveSampleTime)
        let hours = dateTT.getHours() < 10 ? '0' : ''
        let min = dateTT.getMinutes() < 10 ? '0' : ''
        return `${dateTT.getFullYear()}/${dateTT.getMonth() + 1}/${dateTT.getDate()} ${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
      }
    },
    submitFromFormatter (row, column) {
      let name = ''
      this.staticOptions.departments.forEach(item => {
        if (row.submitFrom === item.id) {
          name = item.departmentName
        }
      })
      return name
    },
    submitToFormatter (row, column) {
      let name = ''
      this.staticOptions.departments.forEach(item => {
        if (row.submitTo === item.id) {
          name = item.departmentName
        }
      })
      return name
    },
    testedItemFormatter (row, column) {
      let name = ''
      this.staticOptions.testedItems.forEach(item => {
        if (row.testedItem === item.id) {
          name = item.testedItemName
        }
      })
      return name
    },
    testMethodFormatter (row, column) {
      let name = ''
      this.staticOptions.testMethods.forEach(item => {
        if (row.testMethod === item.id) {
          name = item.testMethodName
        }
      })
      return name
    },
    testParameterFormatter (row, column) {
      let name = ''
      this.staticOptions.testParameters.forEach(item => {
        if (row.testParameter === item.id) {
          name = item.testParameterName
        }
      })
      return name
    },
    testCategoryFormatter (row, column) {
      let name = ''
      this.staticOptions.testCategories.forEach(item => {
        if (row.testCategory === item.id) {
          name = item.testCategoryName
        }
      })
      return name
    }
  }
}
</script>
<style lang="less">
.testedItemTask {
  overflow: auto;
}
</style>
