<template>
  <div>
    <el-container>
      <el-header>
        <el-button-group>
          <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-container style="padding: 10px">
        <el-form :model="agreementForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托编号">
                <el-input name="agreementNumber" v-model="agreementForm.agreementNumber" autoComplete="agreementNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托单位">
                <el-input name="client" v-model="agreementForm.client" autoComplete="client"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品名称">
                <el-input name="sampleName" v-model="agreementForm.sampleName" autoComplete="sampleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="材质牌号">
                <el-input name="materialNumber" v-model="agreementForm.materialNumber" autoComplete="materialNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品接收时间">
                <el-date-picker type="date" placeholder="选择样品接收日期" v-model="agreementForm.receiveSampleTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="要求完成时间">
                <el-date-picker type="date" placeholder="选择要求完成日期" v-model="agreementForm.expectedCompletionTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品数量">
                <el-input name="noOfSample" v-model="agreementForm.noOfSample" autoComplete="noOfSample"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="其他信息">
                <el-input type="textarea" name="comment" v-model="agreementForm.comment" autoComplete="comment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="已验样品处置">
                <el-select  filterable allow-create default-first-option
                  placeholder="请选择处置方式"
                  name="finishedSampleHandlingMethod"
                  v-model="agreementForm.finishedSampleHandlingMethod"
                  >
                <el-option label="样品随报告带走" value="1"></el-option>
                <el-option label="样品由本公司保存" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="报告传送方式">
                <el-checkbox-group v-model="agreementForm.reportTransferMode">
                  <el-checkbox label="取" name="fetch"></el-checkbox>
                  <el-checkbox label="送" name="send"></el-checkbox>
                  <el-checkbox label="邮寄" name="mail"></el-checkbox>
                  <el-checkbox label="传真" name="fax"></el-checkbox>
                  <el-checkbox label="其它" name="other" @change="reportTransferModeOther"></el-checkbox>
                </el-checkbox-group>
                  <el-input name="reportTransferModeOther"
                    :disabled="reportTransferModeOtherDisable"
                    v-model="agreementForm.reportTransferModeOther"
                    autoComplete="reportTransferMode"
                  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="报告数量">
                <el-input name="noOfReport" v-model="agreementForm.noOfReport" autoComplete="noOfReport"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="样品检查">
                <el-radio-group v-model="agreementForm.sampleCheckResult">
                  <el-radio label="yes">符合检测要求</el-radio>
                  <el-radio label="no">不符合检测要求</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="检测类别">
                <el-checkbox-group v-model="agreementForm.experimentalCategory">
                  <el-checkbox label="委托检测" name="experimentalCategory"></el-checkbox>
                  <el-checkbox label="委托检验" name="experimentalCategory"></el-checkbox>
                  <el-checkbox label="现场检测" name="experimentalCategory"></el-checkbox>
                  <el-checkbox label="其它" name="experimentalCategory" @change="experimentalCategoryOther"></el-checkbox>
                </el-checkbox-group>
                <el-input name="experimentalCategoryOther"
                  :disabled="experimentalCategoryOtherDisable"
                  v-model="agreementForm.experimentalCategoryOther"
                  autoComplete="experimentalCategory"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="保密声明">
                <el-input type="textarea" name="privacyClaim" v-model="agreementForm.privacyClaim" autoComplete="privacyClaim"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
      <el-container>
        <el-form :model="customerForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托方联系人">
                <el-input name="clientName" v-model="customerForm.name" autoComplete="clientName">
                  <el-button slot="append" icon="el-icon-search" @click.native="openCustomer"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托方电话">
                <el-input name="clietMobileNumber" v-model="customerForm.mobileNumber" autoComplete="clietMobileNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托人传真">
                <el-input name="clientFax" v-model="customerForm.fax" autoComplete="clientFax"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托人邮箱">
                <el-input name="clientEmail" v-model="customerForm.email" autoComplete="clientEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托人通讯地址">
                <el-input name="clientAddress" v-model="customerForm.address" autoComplete="clientAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
      <el-container>
        <el-form :model="userForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="检测接收人">
                <el-input name="receiverName" v-model="userForm.name" autoComplete="receiverName">
                  <el-button slot="append" icon="el-icon-search" @click.native="openUser"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="接收人电话">
                <el-input name="receiverMobileNumber" v-model="userForm.mobileNumber" autoComplete="receiverMobileNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="接收人传真">
                <el-input name="receiverFax" v-model="userForm.fax" autoComplete="receiverFax"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="接收人邮箱">
                <el-input name="receiverEmail" v-model="userForm.email" autoComplete="receiverEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="接收人通讯地址">
                <el-input name="receiverAddress" v-model="userForm.address" autoComplete="receiverAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
    <el-container direction="vertical">
      <el-row>
        <el-upload
          class="upload-demo"
          drag
          action="dummy"
          :file-list="fileList"
          :auto-upload="true"
          :http-request="uploadPics"
          list-type="picture"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button @click="downloadImage">下载图片</el-button>
      </el-row>
      <el-row>
        <label style="width: 180px;">来样状态图片</label>
      </el-row>

        <img :src="src" class="img-rounded img-responsive" alt="JSA-About Image" style="width: 100%;height: 100px;display: block;"/>

    </el-container>
    </el-container>
    <el-dialog title="客户列表" :visible.sync="customerDialogFormVisible" :modal-append-to-body="false">
      <el-container style="padding: 10px">
        <el-form :model="customerRequestForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-form-item label="客户名称">
              <el-input name="name" v-model="customerRequestForm.name"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-form-item>
              <el-button type="primary" @click="reloadCustomers">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-container>
      <el-table ref="customerTable" :data="staticOptions.customers" style="width: 100%"
        highlight-current-row
        @row-click="handleCustomerRowClick"
        @row-dbclick="handleCustomerRowDLClick"
       >
        <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
        <el-table-column prop="mobileNumber" label="客户电话" width="180"></el-table-column>
        <el-table-column prop="fax" label="客户传真" width="180"></el-table-column>
        <el-table-column prop="email" label="客户邮箱" width="180"></el-table-column>
        <el-table-column prop="address" label="通讯地址" width="180"></el-table-column>
      </el-table>
      <div class="block text-right">
        <el-pagination
          @size-change="handleCustomerSizeChange"
          @current-change="handleCustomerCurrentChange"
          :current-page.sync="customerRequestForm.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="20"
          layout="sizes, prev, pager, next"
          :total="staticOptions.totalCustomers">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customerDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="confirmCustomer">确 定</el-button>
      </div>
    </el-dialog>
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
      <el-table ref="userTable" :data="staticOptions.users" style="width: 100%"
        highlight-current-row
        @row-click="handleUserRowClick"
        @row-dbclick="handleUserRowDLClick"
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
          :total="staticOptions.totalUsers">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="confirmUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'agreementDetail',
  props: ['agreementForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8},
      customerDialogFormVisible: false,
      userDialogFormVisible: false,
      customerRequestForm: {
        name: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      userRequestForm: {
        name: '',
        itemsPerPage: 20,
        currentPage: 1
      },
      reportTransferModeOtherDisable: true,
      experimentalCategoryOtherDisable: true,
      src: [],
      fileList: []
    }
  },
  methods: {
    uploadPics (content) {
      var formData = new FormData()
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      formData.append('files', content.file)
      let vm = this
      this.$ajax.post('/api/sample/agreement/uploadMultipleFiles', formData, config)
        .then(function (res) {
          console.log(res.data)
          // vm.src = res.data
          vm.$message('已经成功保存到服务器!')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    downloadImage () {
      let vm = this
      var reader = new FileReader()
      console.log(reader)
      this.$ajax.get('/api/sample/agreement/downloadFile/' + 'auth0login.PNG', { responseType: 'blob' })
        .then(function (res) {
          vm.$message('已经成功保存到服务器!')
          reader.readAsDataURL(res.data)
          reader.onload = function () {
            var imageDataUrl = reader.result
            vm.src = imageDataUrl
          }
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    actionHandle (action) {
      // var vm = this
      console.log(action.id)
      if (action.id === '1') {
        this.saveToDB()
      } else if (action.id === '2') {
        console.log(action.id)
        this.delete()
      } else if (action.id === '3') {
        console.log(action.id)
      } else if (action.id === '4') {
        console.log(action.id)
      } else if (action.id === '5') {
        this.new()
      } else if (action.id === '6') {
        this.copy()
      } else if (action.id === '7') {
        console.log(action.id)
      }
    },
    reportTransferModeOther (val) {
      if (val) {
        this.reportTransferModeOtherDisable = false
      } else {
        this.reportTransferModeOtherDisable = true
        this.agreementForm.reportTransferModeOther = ''
      }
    },
    experimentalCategoryOther (val) {
      if (val) {
        this.experimentalCategoryOtherDisable = false
      } else {
        this.experimentalCategoryOtherDisable = true
        this.agreementForm.experimentalCategoryOther = ''
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$emit('copy')
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/agreement', this.agreementForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateAgreementForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/delete/' + this.agreementForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteAgreement')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleCustomerSizeChange (val) {
      this.customerRequestForm.itemsPerPage = val
      this.$emit('reloadCustomerData', this.customerRequestForm)
    },
    handleCustomerCurrentChange (val) {
      this.customerRequestForm.currentPage = val
      this.$emit('reloadCustomerData', this.customerRequestForm)
    },
    reloadCustomers () {
      this.$emit('reloadCustomerData', this.customerRequestForm)
    },
    openCustomer () {
      this.customerDialogFormVisible = true
    },
    confirmCustomer () {
      this.customerDialogFormVisible = false
    },
    handleCustomerRowClick (row, event, column) {
      console.log('handleCustomerRowClick')
      console.log(row.name)
      this.$emit('updateCustomer', row)
    },
    handleCustomerRowDLClick (row, event, column) {
      this.$emit('updateCustomer', row)
      this.customerDialogFormVisible = false
    },
    handleUserSizeChange (val) {
      this.userRequestForm.itemsPerPage = val
      this.$emit('reloadUserData', this.userRequestForm)
    },
    handleUserCurrentChange (val) {
      this.userRequestForm.currentPage = val
      this.$emit('reloadUserData', this.userRequestForm)
    },
    reloadUsers () {
      this.$emit('reloadUserData', this.userRequestForm)
    },
    openUser () {
      this.userDialogFormVisible = true
    },
    confirmUser () {
      this.userDialogFormVisible = false
    },
    handleUserRowClick (row, event, column) {
      console.log('handleCustomerRowClick')
      console.log(row.name)
      this.$emit('updateUser', row)
    },
    handleUserRowDLClick (row, event, column) {
      this.$emit('updateUser', row)
      this.userDialogFormVisible = false
    }
  }
}
</script>
<style lang="less">
</style>
