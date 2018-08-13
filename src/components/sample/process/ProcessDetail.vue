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
        <el-form :model="processForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="委托编号">
                <el-select name="agreementNumber" filterable default-first-option v-model="processForm.agreementNumber" @change="getAgreementNumber">
                <el-option v-for="item in staticOptions.agreements"
                  :key="item.Id"
                  :label="item.agreementNumber"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品名称">
                <el-input name="sampleName" v-model="processForm.sampleName" readonly autoComplete="sampleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品接收时间">
                <el-date-picker type="date" placeholder="选择日期" readonly v-model="processForm.receiveSampleTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="材质牌号">
                <el-input name="materialNumber" v-model="processForm.materialNumber" readonly autoComplete="materialNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="要求完成时间">
                <el-date-picker type="date" placeholder="选择日期" readonly v-model="processForm.expectedCompletionTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="来样编号">
                <el-input name="sampleClientNumber" v-model="processForm.sampleClientNumber" autoComplete="sampleClientNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="样品编号">
                <el-input name="sampleNumber" v-model="processForm.sampleNumber" autoComplete="sampleNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="试样编号">
                <el-input name="sampleSubNumber" v-model="processForm.sampleSubNumber" autoComplete="sampleSubNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="检测项目">
                <el-input type="textarea" name="experimentalItem" v-model="processForm.experimentalItem" autoComplete="experimentalItem"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="检测方法">
                <el-select name="experimentalMethod" filterable default-first-option v-model="processForm.experimentalMethod">
                <el-option v-for="item in staticOptions.experimentalMethods"
                  :key="item.Id"
                  :label="item.experimentalMethodNumber"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="加工图号">
                <el-select name="drawingDesign" filterable default-first-option v-model="processForm.drawingDesign">
                <el-option v-for="item in staticOptions.drawingDesigns"
                  :key="item.Id"
                  :label="item.drawingDesignName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="提交部门">
                <el-select name="submitFrom" filterable default-first-option v-model="processForm.submitFrom">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.Id"
                  :label="item.departmentName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="提交至">
                <el-select name="submitTo" filterable default-first-option v-model="processForm.submitTo">
                <el-option v-for="item in staticOptions.departments"
                  :key="item.Id"
                  :label="item.departmentName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="当前流转状态">
                <el-select name="processingStatus" filterable default-first-option v-model="processForm.processingStatus">
                <el-option v-for="item in staticOptions.processingStatuses"
                  :key="item.Id"
                  :label="item.processingStatusName"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col  :span="24">
              <el-form-item label="其他信息">
                <el-input type="textarea" name="comment" v-model="processForm.comment" autoComplete="comment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'processDetail',
  props: ['processForm', 'staticOptions', 'customerForm', 'userForm'],
  data () {
    return {
      actions: [
        {'name': '新建', 'id': '5', 'icon': 'el-icon-circle-plus', 'loading': false},
        {'name': '复制', 'id': '6', 'icon': 'el-icon-circle-plus-outline', 'loading': false},
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '数据库保存并提交', '8': '1', 'icon': 'el-icon-check', 'loading': false},
        {'name': '解锁', 'id': '7', 'icon': 'el-icon-edit', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
    actionHandle (action) {
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
      } else if (action.id === '8') {
        console.log(action.id)
        this.submit()
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
      this.$ajax.post('/api/sample/process', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
          vm.$emit('updateProcessForm', res.data)
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/sample/process/delete/' + this.processForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
          vm.$emit('deleteProcess')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    },
    getAgreementNumber  (val) {
      this.$emit('getAgreementInfo', val)
    },
    submit () {
      let vm = this
      this.$ajax.post('/api/sample/processing', this.processForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
        }).catch(function (error) {
          vm.$message(error.response.data.message)
        })
    }
  }
}
</script>
<style lang="less">
</style>
