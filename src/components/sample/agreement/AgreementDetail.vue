<template>
  <div>
    <el-container>
      <el-header style="min-width:400px;">
        <el-button-group>
          <el-button type="info" v-for="(action,index) in staticOptions.actions" :key="index" size="mini" v-show="action.show" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-container style="padding: 10px">
        <el-form :model="agreementForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="委托编号">
                <el-input name="agreementNumber" v-model="agreementForm.agreementNumber" autoComplete="agreementNumber"></el-input>
                <el-button :disabled="agreementNumberButton" @click="agreementNumberGenerator">生成委托编号</el-button>
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
                <el-date-picker type="datetime" placeholder="选择样品接收日期" v-model="agreementForm.receiveSampleTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="要求完成时间">
                <el-date-picker type="datetime" placeholder="选择要求完成日期" default-time="12:00:00" v-model="agreementForm.expectedCompletionTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="检测周期">
                <el-radio-group v-model="agreementForm.testDuration">
                  <el-radio label="5">5个工作日</el-radio>
                  <el-radio label="3">3个工作日（加收50%检测费）</el-radio>
                  <el-radio label="1.5">1.5个工作日（加收100%检测费）</el-radio>
                  <el-radio label="0" @change="durationChange">其它</el-radio>
                </el-radio-group>
                <el-input name="duration"
                  :disabled="durationDisable"
                  v-model="agreementForm.duration"
                  autoComplete="duration"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分包情况">
                <el-radio-group v-model="agreementForm.distributionOption">
                  <el-radio label="yes" @change="distribution">涉及分包项目</el-radio>
                  <el-radio label="no">未涉及分包项目</el-radio>
                </el-radio-group>
                <el-input name="distribution"
                  :disabled="distributionDisable"
                  v-model="agreementForm.distribution"
                  autoComplete="distribution"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="优先级">
                <el-select name="processPriority" filterable default-first-option v-model="agreementForm.processPriority">
                <el-option v-for="item in staticOptions.processPriorities"
                  :key="item.Id"
                  :label="item.processPriorityName"
                  :value="item.processPriorityName">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品数量">
                <el-input name="noOfSample" v-model="agreementForm.noOfSample" autoComplete="noOfSample"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="已经完成">
                  <el-radio-group name="done" v-model="agreementForm.done">
                    <el-radio label="true">是</el-radio>
                    <el-radio label="false">否</el-radio>
                  </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="已验样品处置">
                <el-radio-group
                  name="finishedSampleHandlingMethod"
                  v-model="agreementForm.finishedSampleHandlingMethod"
                  >
                <el-radio label="0">样品随报告带走</el-radio>
                <el-radio label="1">样品由本公司保存3个月销毁</el-radio>
                <el-radio label="2" @change="sampleStoreRequest">对样品储存要求</el-radio>
                </el-radio-group>
                <el-input name="sampleStoreRequest"
                  :disabled="sampleStoreRequestDisable"
                  v-model="agreementForm.sampleStoreRequest"
                  autoComplete="sampleStoreRequest"
                ></el-input>
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
            <!-- <el-col :span="24">
              <el-form-item label="样品检查偏离说明" label-width="150px">
                <el-input type="textarea" name="sampleCheckResultNotes" v-model="agreementForm.sampleCheckResultNotes" autoComplete="sampleCheckResultNotes"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="24">
              <el-form-item label="检测类别">
                <el-radio-group v-model="agreementForm.experimentalCategory">
                  <el-radio label="委托检测"></el-radio>
                  <el-radio label="委托检验"></el-radio>
                  <el-radio label="现场检测"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发票选择">
                <el-radio-group v-model="agreementForm.invoice">
                  <el-radio label="yes">开普票</el-radio>
                  <el-radio label="no">开专票</el-radio>
                </el-radio-group>
                <el-input name="invoiceTitle"
                  v-model="agreementForm.invoiceTitle"
                  autoComplete="invoiceTitle"
                ></el-input>
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
              <el-form-item label="委托单位">
                <el-input name="client" v-model="customerForm.company" autoComplete="company"></el-input>
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
            <el-col :span="24">
              <el-form-item label="其它信息">
              <el-select name="customerNote" filterable clearable default-first-option v-model="agreementForm.comment">
                <el-option v-for="item in staticOptions.customerNotes"
                  :key="item.id"
                  :label="item.customerNoteName"
                  :value="item.customerNoteDescription">
                </el-option>
                </el-select>
                <el-input type="textarea" name="comment" v-model="agreementForm.comment" autoComplete="comment"></el-input>
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
          <el-upload ref="upload"
            class="upload-demo"
            drag
            action="dummy"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="handleChange"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选取文件</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
          <el-button @click="uploadToServer">上传图片</el-button>
        </el-row>
        <div id="demo" v-if="staticOptions.images.length>0">
          <el-row>
          <label style="width: 180px;">来样状态图片</label>
          <el-tag v-for="(item,index) in staticOptions.images" :key="index" :closable="true" @close="removeImage(item)">{{item.caption}}</el-tag>
          </el-row>
          <vue-images :imgs="staticOptions.images"
                      :modalclose="modalclose"
                      :keyinput="keyinput"
                      :mousescroll="mousescroll"
                      :showclosebutton="showclosebutton"
                      :showcaption="showcaption"
                      :imagecountseparator="imagecountseparator"
                      :showimagecount="showimagecount"
                      :showthumbnails="showthumbnails">
          </vue-images>
        </div>
      </el-container>
    </el-container>
    <clientDialog
      :customers="staticOptions.customers"
      :customerRequestForm="customerRequestForm"
      :customerDialogFormVisible="customerDialogFormVisible"
      :totalCustomers="staticOptions.totalCustomers"
      v-on:confirmCustomer="confirmCustomer"
      v-on:reloadCustomers="reloadCustomers"
      v-on:handleCustomerSizeChange="handleCustomerSizeChange"
      v-on:handleCustomerCurrentChange="handleCustomerCurrentChange"
      v-on:handleCustomerRowClick="handleCustomerRowClick"
      v-on:handleCustomerRowDLClick="handleCustomerRowDLClick"
      />
    <userDialog
      :users="staticOptions.users"
      :userRequestForm="userRequestForm"
      :userDialogFormVisible="userDialogFormVisible"
      :totalUsers="staticOptions.totalUsers"
      v-on:confirmUser="confirmUser"
      v-on:reloadUsers="reloadUsers"
      v-on:handleUserSizeChange="handleUserSizeChange"
      v-on:handleUserCurrentChange="handleUserCurrentChange"
      v-on:handleUserRowClick="handleUserRowClick"
      v-on:handleUserRowDLClick="handleUserRowDLClick"
      />
    <previewDialog
      :form="form"
      :reportOptionDialog='reportOptionDialog'
      v-on:preview="preview"
    />
  </div>
</template>

<script>

import vueImages from 'vue-images'
import previewDialog from './dialog/PreviewDialog'
import clientDialog from './dialog/ClientDialog'
import userDialog from './dialog/UserDialog'
export default {
  name: 'agreementDetail',
  props: ['agreementForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      agreementNumberButton: false,
      reportOptionDialog: false,
      form: {
        reportList: []
      },
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 12},
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
      sampleStoreRequestDisable: true,
      distributionDisable: true,
      durationDisable: true,
      invoiceDisable: true,
      invoiceTitleDisable: true,
      src: [],
      fileList: [],
      modalclose: true,
      keyinput: true,
      mousescroll: true,
      showclosebutton: true,
      showcaption: true,
      imagecountseparator: 'of',
      showimagecount: true,
      showthumbnails: true,
      imageNumber: 1
    }
  },
  components: {
    vueImages: vueImages,
    previewDialog: previewDialog,
    clientDialog: clientDialog,
    userDialog: userDialog
  },
  methods: {
    displayAction () {
      let vm = this
      this.$ajax.post('/api/security/agreement', this.agreementForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateAgreementForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    actionHandle (action) {
      if (action.id === '1') {
        this.saveToDB()
        this.agreementNumberButton = false
      } else if (action.id === '2') {
        this.confirmDelete()
      } else if (action.id === '3') {
        if (this.agreementForm.agreementNumber && this.agreementForm.agreementNumber !== '') {
          this.previewReport(this.agreementForm.agreementNumber)
        }
      } else if (action.id === '4') {
        console.log(this.agreementForm.agreementNumber)
        this.$router.push('/lims/processReview/' + this.agreementForm.agreementNumber)
      } else if (action.id === '5') {
        this.new()
        this.agreementNumberButton = false
      } else if (action.id === '6') {
        this.copy()
        this.agreementNumberButton = false
      } else if (action.id === '7') {
      }
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$message('复制成功!')
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
    confirmDelete () {
      let vm = this
      if (this.agreementForm.id && this.agreementForm.id !== '') {
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
      this.$ajax.get('/api/sample/agreement/delete/' + this.agreementForm.id)
        .then(function (res) {
          vm.$message({
            type: 'success',
            message: '已经成功删除！'
          })
          vm.$emit('deleteAgreementForm')
          vm.agreementNumberButton = false
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    agreementNumberGenerator () {
      this.$emit('agreementNumberGenerator')
      this.agreementNumberButton = true
    },
    reportTransferModeOther (val) {
      if (val) {
        this.reportTransferModeOtherDisable = false
      } else {
        this.reportTransferModeOtherDisable = true
        this.agreementForm.reportTransferModeOther = ''
      }
    },
    sampleStoreRequest (val) {
      if (val) {
        this.sampleStoreRequestDisable = false
      } else {
        this.sampleStoreRequestDisable = true
        this.agreementForm.sampleStoreRequest = ''
      }
    },
    distribution (val) {
      if (val) {
        this.distributionDisable = false
      } else {
        this.distributionDisable = true
        this.agreementForm.distribution = ''
      }
    },
    durationChange (val) {
      if (val) {
        this.durationDisable = false
      } else {
        this.durationDisable = true
        this.agreementForm.duration = ''
      }
    },
    handleCustomerSizeChange (val) {
      this.customerRequestForm.itemsPerPage = val
      this.$emit('reloadCustomerData', this.customerRequestForm)
    },
    handleCustomerCurrentChange (val) {
      this.customerRequestForm.currentPage = val
      this.$emit('reloadCustomerData', this.customerRequestForm)
    },
    handleCustomerNoteChange (val) {
      this.agreementForm.comment = val
    },
    reloadCustomers () {
      this.$emit('reloadCustomerData', this.customerRequestForm)
    },
    openCustomer () {
      this.customerDialogFormVisible = true
    },
    confirmCustomer () {
      let vm = this
      this.customerDialogFormVisible = false
      this.$ajax.get('/api/customer/customerNote/getSingleCustomerNotes/' + this.customerForm.id)
        .then(function (res) {
          vm.staticOptions.customerNotes = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleCustomerRowClick (row) {
      this.$emit('updateCustomer', row)
    },
    handleCustomerRowDLClick (row) {
      let vm = this
      console.log('agreement ' + row.id)
      this.$emit('updateCustomer', row)
      this.customerDialogFormVisible = false
      this.$ajax.get('/api/customer/customerNote/getSingleCustomerNotes/' + this.customerForm.id)
        .then(function (res) {
          vm.staticOptions.customerNotes = res.data
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
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
    handleUserRowClick (row) {
      this.$emit('updateUser', row)
    },
    handleUserRowDLClick (row) {
      this.$emit('updateUser', row)
      this.userDialogFormVisible = false
    },
    previewReport (agreementNumber) {
      if (agreementNumber && agreementNumber !== '') {
        this.reportOptionDialog = true
        this.form.reportList.push(agreementNumber)
        this.form.reportList = this.form.reportList.concat(['agreement', 'process', 'task'])
      }
    },
    preview () {
      this.reportOptionDialog = false
      this.$router.push('/lims/agreementReport/' + this.form.reportList.join(','))
    },
    removeImage (item) {
      this.$emit('removeImage', item)
    },
    uploadPics () {
      let vm = this
      var formData = new FormData()
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.fileList.forEach(file => {
        formData.append('files', file.raw)
      })
      formData.append('agreementNumber', this.agreementForm.agreementNumber)
      this.$ajax.post('/api/sample/agreement/uploadMultipleFiles', formData, config)
        .then(function (res) {
          vm.$message('图片已经上传到服务器!')
          vm.fileList.forEach(file => {
            vm.downloadToFrontEnd(file.raw)
          })
          vm.fileList = []
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    handleChange (file, fileList) {
      // console.log('handleChange')
      // if (this.agreementForm.imageNameList.indexOf(file.name) !== -1) {
      //   this.$confirm('此操作将覆盖原有' + file.name + '文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '添加成功!'
      //     })
      //   }).catch(() => {
      //     fileList.splice(fileList.indexOf(file), 1)
      //     this.$message({
      //       type: 'info',
      //       message: '已取消添加'
      //     })
      //   })
      // }
      // if (fileList.indexOf(file) !== -1) {
      //   this.$alert('不可重复添加！', '提示', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       fileList.splice(fileList.indexOf(file), 1)
      //     }
      //   })
      // }
      this.fileList = fileList
    },
    downloadToFrontEnd (file) {
      let vm = this
      let downloadFormTemp = {agreementNumber: this.agreementForm.agreementNumber, fileName: file.name}
      var reader = new FileReader()
      this.$ajax.post('/api/sample/agreement/downloadFile', downloadFormTemp, { responseType: 'blob' })
        .then(function (res) {
          reader.readAsDataURL(res.data)
          reader.onload = function () {
            var imageCP = {}
            imageCP.imageUrl = reader.result
            imageCP.caption = file.name
            vm.$emit('addImage', imageCP)
          }
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    uploadToServer () {
      if (this.agreementForm.agreementNumber === '') {
        this.$alert('请先输入委托协议书编号', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        if (this.fileList.length > 0) {
          this.uploadPics()
          this.$refs.upload.clearFiles()
        }
      }
    }
  }
}
</script>
<style lang="less">
</style>
