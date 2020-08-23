<template>
  <div>
    <el-container style="padding: 10px">
      <el-form :model="userRequestForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="用户名">
              <el-input name="userName" v-model="userRequestForm.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所属部门">
              <el-select name="department" v-model=userRequestForm.department>
               <el-option v-for="item in departments"
                :key="item.Id"
                :label="item.departmentName"
                :value="item.id">
              </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="真实姓名">
              <el-input name="name" v-model="userRequestForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="性别">
              <el-select name="sex" v-model=userRequestForm.sex>
               <el-option label="男" value="male"></el-option>
               <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="职称">
              <el-input name="title" v-model="userRequestForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="文化程度">
              <el-select name="degreeOfEducation" v-model=userRequestForm.degreeOfEducation>
               <el-option label="大专" value="juniorCollege"></el-option>
               <el-option label="大学" value="college"></el-option>
               <el-option label="高职" value="technicalSecondarySchool"></el-option>
               <el-option label="硕士" value="master"></el-option>
               <el-option label="博士" value="doctor"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="所学专业">
              <el-input name="major" v-model="userRequestForm.major"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="手机号码">
              <el-input name="mobileNumber" v-model="userRequestForm.mobileNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
            <el-form-item label="注册邮箱">
              <el-input name="email" v-model="userRequestForm.email"></el-input>
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
          prop="userName"
          label="用户名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department"
          label="所属部门"
          :formatter="departmentFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter="sexFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="职称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="degreeOfEducation"
          label="文化程度"
          :formatter="degreeOfEducationFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="major"
          label="所学专业"
          width="180">
        </el-table-column>
        <el-table-column
          prop="graduateOn"
          label="毕业时间"
          :formatter="dateFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobileNumber"
          label="手机号码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="注册邮箱"
          width="180">
        </el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="userRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="totalUsers">
        </el-pagination>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'userMaintenance',
  data () {
    return {
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      tableData: [],
      totalUsers: 0,
      indexArray: [],
      userForm: {},
      tempUserForm: {},
      userRequestForm: {
        userName: '',
        department: '',
        name: '',
        sex: '',
        title: '',
        degreeOfEducation: '',
        major: '',
        mobileNumber: '',
        email: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      departments: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.userRequestForm.itemsPerPage = val
      this.onSubmit()
    },
    handleCurrentChange (val) {
      this.userRequestForm.currentPage = val
      this.onSubmit()
    },
    dblclick (row, event) {
      this.$router.push('/lims/userDetailEdit/' + row.id)
    },
    onSubmit () {
      let vm = this
      this.$ajax.post('/api/users/queryApplicationUser', this.userRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUsers = res.data.totalUsers || 0
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
        this.tempUserForm = this.tableData[(index - 1)]
        this.userForm = this.tableData[index]
        tmp = this.tempUserForm.sort
        this.tempUserForm.sort = this.userForm.sort
        this.userForm.sort = tmp
        this.$ajax.all([this.update(this.userForm), this.update(this.tempUserForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      }
    },
    moveTopSingle (index) {
      let vm = this
      if (index > 0) {
        this.userForm = this.tableData[index]
        this.$ajax.post('/api/users/moveToTop', this.userForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
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
        this.tempUserForm = this.tableData[(index + 1)]
        this.userForm = this.tableData[index]
        tmp = this.tempUserForm.sort
        this.tempUserForm.sort = this.userForm.sort
        this.userForm.sort = tmp
        this.$ajax.all([this.update(this.userForm), this.update(this.tempUserForm)])
          .then(vm.$ajax.spread((res1, res2) => {
            vm.reload(res1.data)
          })).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      }
    },
    moveBottomSingle (index) {
      let vm = this
      if (index < this.tableData.length - 1) {
        this.userForm = this.tableData[index]
        this.$ajax.post('/api/users/moveToBottom', this.userForm)
          .then(function (res) {
            vm.reload(res.data)
          }).catch(function (error) {
            vm.$message({
              showClose: true,
              duration: 0,
              type: 'error',
              message: error.response.data.detail
            })
          })
      }
    },
    update (val) {
      return this.$ajax.post('/api/users', val)
    },
    reload (val) {
      let vm = this
      this.$ajax.post('/api/users/queryApplicationUser', this.userRequestForm)
        .then(function (res) {
          vm.tableData = res.data.pageResult || []
          vm.totalUsers = res.data.totalUsers || 0
          vm.$nextTick(() => {
            vm.tableData.forEach(row => {
              if (row.id === val.id) {
                vm.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          })
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    loadDepartment () {
      let vm = this
      this.$ajax.get('/api/sample/department/getDepartment')
        .then(function (res) {
          vm.departments = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    sexFormatter (row, column) {
      if (row.sex === 'male') {
        return '男'
      } else {
        return '女'
      }
    },
    degreeOfEducationFormatter (row, column) {
      if (row.degreeOfEducation === 'juniorCollege') {
        return '大专'
      } else {
        return '大学'
      }
    },
    departmentFormatter (row, column) {
      let name = ''
      this.departments.forEach(item => {
        if (row.department === item.id) {
          name = item.departmentName
        }
      })
      return name
    },
    dateFormatter (row, column) {
      if (row.graduateOn) {
        return row.graduateOn.slice(0, 10)
      }
    }
  },
  activated () {
    this.onSubmit()
    this.loadDepartment()
  }
}
</script>
