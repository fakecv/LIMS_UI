<template>
  <div>
    <el-container>
      <el-header style="min-width:400px;">
        <el-button-group>
          <el-button type="info" v-for="(action,index) in staticOptions.actions" :key="index" size="mini" v-show="action.show" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-header>
      <el-tabs ref="agreementTabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="委托协议信息" name="agreement">
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
                    <el-radio-group v-model="agreementForm.testDuration" @change="handleTestDuration">
                      <el-radio label="5">5个工作日</el-radio>
                      <el-radio label="3">3个工作日（加收50%检测费）</el-radio>
                      <el-radio label="1.5">1.5个工作日（加收100%检测费）</el-radio>
                      <el-radio label="0">其它</el-radio>
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
                    <el-radio-group v-model="agreementForm.distributionOption" @change="distribution">
                      <el-radio label="yes">涉及分包项目</el-radio>
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
                    <el-select ref="processPriorityRef" name="processPriority" filterable default-first-option v-model="agreementForm.processPriority" @change="priorityChange">
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
                  <el-form-item label="规格">
                    <el-input name="sampleSpecification" v-model="agreementForm.sampleSpecification" autoComplete="sampleSpecification"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="取样依据">
                    <el-input name="samplingBasis" v-model="agreementForm.samplingBasis" autoComplete="samplingBasis"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="检测依据">
                    <el-select name="testingBasis" filterable clearable default-first-option editable allow-create v-model="agreementForm.testingBasis">
                      <el-option v-for="item in staticOptions.testingBasises"
                        :key="item.id"
                        :label="item.testingBasisName"
                        :value="item.testingBasisName">
                      </el-option>
                    </el-select>
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
                <el-col :span="24">
                  <el-form-item label="检测类别">
                    <el-radio-group v-model="agreementForm.experimentalCategory">
                      <el-radio label="委托检测"></el-radio>
                      <el-radio label="委托检验"></el-radio>
                      <el-radio label="现场检测"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="委托单位">
                    <el-input name="customerCompany" v-model="agreementForm.customerCompany" autoComplete="customerCompany">
                      <el-button slot="append" icon="el-icon-search" @click.native="openCustomer"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="委托方联系人">
                  <el-select name="customerName" filterable clearable
                   default-first-option v-model="agreementForm.customerName"
                   @change="updateCustomer">
                    <el-option v-for="item in staticOptions.customerNames"
                      :key="item.id"
                      :label="item.customerName"
                      :value="item.id">
                    </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="委托方电话">
                    <el-input name="clietMobileNumber" v-model="agreementForm.customerMobileNumber" autoComplete="clietMobileNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="委托人传真">
                    <el-input name="clientFax" v-model="agreementForm.customerFax" autoComplete="clientFax"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="委托人邮箱">
                    <el-input name="clientEmail" v-model="agreementForm.customerEmail" autoComplete="clientEmail"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="委托人通讯地址">
                    <el-input name="clientAddress" v-model="agreementForm.customerAddress" autoComplete="clientAddress"></el-input>
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
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="检测接收人">
                    <el-input name="receiverName" v-model="agreementForm.receiverName" autoComplete="receiverName">
                      <el-button slot="append" icon="el-icon-search" @click.native="openUser"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="接收人电话">
                    <el-input name="receiverMobileNumber" v-model="agreementForm.receiverMobileNumber" autoComplete="receiverMobileNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="接收人传真">
                    <el-input name="receiverFax" v-model="agreementForm.receiverFax" autoComplete="receiverFax"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="接收人邮箱">
                    <el-input name="receiverEmail" v-model="agreementForm.receiverEmail" autoComplete="receiverEmail"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
                  <el-form-item label="接收人通讯地址">
                    <el-input name="receiverAddress" v-model="agreementForm.receiverAddress" autoComplete="receiverAddress"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
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
            <div id="demo">
              <el-row>
                <el-col :span="24">
                <label style="width: 180px;">来样状态图片</label>
                </el-col>
                <el-col>
                <el-tag v-for="(item,index) in staticOptions.images" :key="index" :closable="true" @close="removeImage(item)">{{item.title}}</el-tag>
                </el-col>
              </el-row>
              <v-gallery :images="staticOptions.images"  >
              </v-gallery>
            </div>
            </el-form>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="样品流转列表" name="process" :disabled="staticOptions.processListed">
          <Process ref="process"
           :agreementNumber="agreementForm.agreementNumber"
           :agreementId="agreementForm.id"
           :processPriority="agreementForm.processPriority"
           :agreementComment="agreementForm.comment"
           v-on:refreshAgreement="refreshAgreement">
          </Process>
        </el-tab-pane>
      </el-tabs>
    </el-container>
    <clientDialog
      :customerDialogFormVisible="customerDialogFormVisible"
      v-on:confirmCustomer="confirmCustomer"
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
      :previewForm="previewForm"
      :agreementId="agreementForm.id"
      :reportOptionDialog='reportOptionDialog'
      v-on:preview="preview"
      v-on:close="closePreviewDialog"
    />
    <el-dialog title="模板定义" :visible.sync="agreementTemplateDialogFormVisible" append-to-body>
      <el-form :model="agreementTemplateForm">
        <el-form-item label="模板名称" :label-width="formLabelWidth">
          <el-input v-model="agreementTemplateForm.templateName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="agreementTemplateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTemplateToDB">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import vueImages from 'vue-images'
import previewDialog from './dialog/PreviewDialog'
import clientDialog from './dialog/ClientDialog'
import userDialog from './dialog/UserDialog'
import Process from '@/components/sample/process/ProcessDetailAdd'
export default {
  name: 'agreementDetail',
  props: ['agreementForm', 'staticOptions'],
  data () {
    return {
      agreementTemplateDialogFormVisible: false,
      agreementTemplateForm: {
        agreementId: '',
        templateName: '',
        comment: '',
        customerCompany: '',
        materialNumber: '',
        sampleName: ''
      },
      formLabelWidth: '120px',
      processListed: true,
      activeName: 'agreement',
      agreementNumberButton: false,
      reportOptionDialog: false,
      previewForm: {
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
      distributionDisable: false,
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
    userDialog: userDialog,
    Process: Process
  },
  methods: {
    priorityChange (value) {
      let vm = this
      if (!this.staticOptions.processListed) {
        this.$confirm('是否同时更新样品流转优先级?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('/api/sample/process/updateProcessPriority/' + this.agreementForm.id + ',' + value)
            .then(function (res) {
              vm.$message('已经成功更新样品流转优先级!')
              vm.$refs.processPriorityRef.blur()
            }).catch(function (error) {
              vm.$message({
                showClose: true,
                duration: 0,
                type: 'error',
                message: error.response.data.detail
              })
            })
        }).catch(() => {
          this.$refs.processPriorityRef.blur()
        })
      }
    },
    saveTemplateToDB () {
      let vm = this
      this.agreementTemplateForm.agreementId = this.agreementForm.id
      this.agreementTemplateForm.comment = this.agreementForm.comment
      this.agreementTemplateForm.customerCompany = this.agreementForm.customerCompany
      this.agreementTemplateForm.materialNumber = this.agreementForm.materialNumber
      this.agreementTemplateForm.sampleName = this.agreementForm.sampleName
      this.$ajax.post('/api/sample/agreement/addAgreementTemplate', this.agreementTemplateForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.agreementTemplateDialogFormVisible = false
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    updateCustomer (val) {
      this.$emit('updateCustomer', val)
    },
    handleClick (tab, event) {
      if (tab.name === 'process') {
        this.$refs.process.loadAgreementProcess(this.agreementForm.id)
      }
    },
    handleTestDuration (val) {
      if (val === '3') {
        this.agreementForm.expectedCompletionTime = new Date().getDay() > 2 ? new Date(Date.now() + 864e5 * 5) : new Date(Date.now() + 864e5 * 3)
        this.durationDisable = true
      } else if (val === '5') {
        this.agreementForm.expectedCompletionTime = new Date(Date.now() + 864e5 * 7)
        this.durationDisable = true
      } else if (val === '1.5') {
        this.agreementForm.expectedCompletionTime = new Date().getDay() > 3 && new Date().getHours() > 12 ? new Date(Date.now() + 864e5 * 3.5) : new Date(Date.now() + 864e5 * 1.5)
        this.durationDisable = true
      } else {
        this.agreementForm.expectedCompletionTime = ''
        this.durationDisable = false
      }
    },
    actionHandle (action) {
      if (action.id === '1') {
        this.new()
        this.agreementNumberButton = false
      } else if (action.id === '2') {
        this.copy()
        this.agreementNumberButton = false
      } else if (action.id === '3') {
        this.saveToDB()
        this.agreementNumberButton = false
      } else if (action.id === '4') {
        this.confirmDelete()
      } else if (action.id === '5') {
        if (this.agreementForm.agreementNumber && this.agreementForm.agreementNumber !== '') {
          this.previewReport(this.agreementForm.agreementNumber)
        }
      } else if (action.id === '6') {
        if (this.agreementForm.id && this.agreementForm.id !== '') {
          this.agreementTemplateForm.templateName = ''
          this.agreementTemplateDialogFormVisible = true
        }
      } else if (action.id === '7') {
        if (this.agreementForm.id && this.agreementForm.id !== '') {
          this.downloadAgreement()
        }
      } else if (action.id === '8') {
        if (this.agreementForm.id && this.agreementForm.id !== '') {
          this.downloadProcess()
        }
      } else if (action.id === '9') {
        if (this.agreementForm.id && this.agreementForm.id !== '') {
          this.downloadTask()
        }
      }
    },
    downloadAgreement () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/downloadAgreement/' + this.agreementForm.agreementNumber, {responseType: 'blob'})
        .then(function (res) {
          if (!res.data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([res.data
          ]), {type: 'application/vnd.ms-excel'})
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '委托协议.xlsx')

          document.body.appendChild(link)
          link.click()
        }).catch(function (error) {
          var reader = new FileReader()
          reader.onload = function () {
            let jsonData = JSON.parse(this.result)
            vm.$message(jsonData.message)
          }
          reader.readAsText(error.response.data)
        })
    },
    downloadProcess () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/downloadProcess/' + this.agreementForm.agreementNumber, {responseType: 'blob'})
        .then(function (res) {
          if (!res.data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([res.data
          ]), {type: 'application/vnd.ms-excel'})
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '样品加工及流转表.xlsx')

          document.body.appendChild(link)
          link.click()
        }).catch(function (error) {
          var reader = new FileReader()
          reader.onload = function () {
            let jsonData = JSON.parse(this.result)
            vm.$message(jsonData.message)
          }
          reader.readAsText(error.response.data)
        })
    },
    downloadTask () {
      let vm = this
      this.$ajax.get('/api/sample/agreement/downloadTask/' + this.agreementForm.agreementNumber, {responseType: 'blob'})
        .then(function (res) {
          if (!res.data) {
            return
          }
          let url = window.URL.createObjectURL(new Blob([res.data
          ]), {type: 'application/vnd.ms-excel'})
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '检测任务单.xlsx')

          document.body.appendChild(link)
          link.click()
        }).catch(function (error) {
          var reader = new FileReader()
          reader.onload = function () {
            let jsonData = JSON.parse(this.result)
            vm.$message(jsonData.message)
          }
          reader.readAsText(error.response.data)
        })
    },
    new () {
      this.$emit('new')
    },
    copy () {
      this.$message('复制成功!')
      this.$emit('copy', this.agreementForm.id)
    },
    saveToDB () {
      let vm = this
      this.$ajax.post('/api/sample/agreement', this.agreementForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateAgreementForm', res.data)
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
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
      if (val === 'yes') {
        this.distributionDisable = false
        this.agreementForm.distribution = '当面'
      } else {
        this.distributionDisable = true
        this.agreementForm.distribution = ''
      }
    },
    handleCustomerNoteChange (val) {
      this.agreementForm.comment = val
    },
    openCustomer () {
      this.customerDialogFormVisible = true
    },
    confirmCustomer () {
      let vm = this
      this.customerDialogFormVisible = false
      this.$ajax.get('/api/customer/customerNote/getSingleCustomerNotes/' + this.agreementForm.customerId)
        .then(function (res) {
          vm.staticOptions.customerNotes = res.data
        }).catch(function (error) {
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
        })
    },
    handleCustomerRowClick (row) {
      this.$emit('updateCustomerCompany', row)
    },
    handleCustomerRowDLClick (row) {
      this.$emit('updateCustomerCompany', row)
      this.customerDialogFormVisible = false
      this.confirmCustomer()
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
        this.previewForm.reportList = []
        this.reportOptionDialog = true
        this.previewForm.reportList.push(agreementNumber)
        this.previewForm.reportList = this.previewForm.reportList.concat(['agreement', 'process', 'task'])
      }
    },
    preview () {
      this.reportOptionDialog = false
      if (this.agreementForm.customerCompany === '') {
        this.agreementForm.customerCompany = 'document'
      }
      this.$router.push('/lims/agreementReport/' + this.previewForm.reportList.join(',') + '/' + this.agreementForm.customerCompany)
    },
    closePreviewDialog () {
      this.reportOptionDialog = false
    },
    removeImage (item) {
      this.$emit('removeImage', item)
    },
    refreshAgreement () {
      this.$emit('refreshAgreement', this.agreementForm.id)
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
          vm.$message({
            showClose: true,
            duration: 0,
            type: 'error',
            message: error.response.data.detail
          })
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
            imageCP.url = reader.result
            imageCP.title = file.name
            vm.$emit('addImage', imageCP)
          }
        }).catch(function (error) {
          reader.onload = function () {
            let jsonData = JSON.parse(this.result)
            vm.$message(jsonData.message)
          }
          reader.readAsText(error.response.data)
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
