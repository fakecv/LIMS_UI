<template>
  <div>
    <p style="text-align: center; margin: 10px 0 20px">请挑选你喜欢的企业名称到右边并保存</p>
    <el-row>
      <el-col :span="4">支付宝打赏
        <icon name="appreciate (b)" :w="60" :h="60" ></icon>
        <el-card :body-style="{ padding: '0px' }">
          <img src="../assets/支付宝.jpg" class="image">
        </el-card>
      </el-col>
      <el-col :span="12">
    <div style="text-align: center; height: 650px;">
      <el-transfer
        style="text-align: left; display: inline-block;"
        v-model="targetValue"
        :titles="['全选', '全选']"
        :left-default-checked="[1]"
        :button-texts="['到左边', '到右边']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        @change="handleChange"
        :data="data">
        <el-row  class="transfer-footer-left" slot="left-footer">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="lastPage">上一页</el-button>
          </el-col>
          <el-col :span="12">
           <el-button type="primary" size="mini" @click="nextPage">下一页</el-button>
          </el-col>
        </el-row>
        <el-row  class="transfer-footer-right" slot="right-footer">
          <el-col :span="12" style="text-align: center;padding: 3px">
            {{appreciateCount}}
          </el-col>
          <el-col :span="12">
           <icon name="appreciate (p)" :w="iconWidth" :h="iconHeight"></icon>
          </el-col>
        </el-row>
      </el-transfer>
    </div>
  </el-col>
  <el-col :span="4" style="text-align: right;">微信打赏
    <icon name="appreciate (b)" :w="60" :h="60"></icon>
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/微信.jpg" class="image">
    </el-card>
  </el-col>
</el-row>
    <el-form ref="form" :model="form"  style="padding: 10px;">
      <el-form-item>
        <el-input v-model="form.companyName" placeholder="请输入所需包含的汉字，没有输入默认从爱开始"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click=query>查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="12">
        <p style="text-align: left; margin: 10px 0 20px">已经精心挑选的企业：（还可以进一步优选）</p>
      </el-col>
      <el-col :span="12">
        <el-button type="primary"
          style="text-align: right; margin: 10px 0 20px"
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          >保存到粘贴板</el-button>
      </el-col>
    </el-row>
    <div>
      <el-row>
      <el-tag
        v-for="tag in tags"
        :key="tag.key"
        closable
        @close="handleClose(tag)"
        >
        {{tag.name}}
      </el-tag>
    </el-row>
  </div>
  </div>
</template>
<script>
export default {
  name: 'companyName',
  data () {
    return {
      data: [],
      targetValue: [],
      form: {
        companyName: '',
        itemsPerPage: 15,
        currentPage: 1
      },
      loading: false,
      message: '',
      tags: [],
      iconWidth: '18.19',
      iconHeight: '18.19',
      appreciateCount: 0
    }
  },
  methods: {
    onCopy: function (e) {
      this.$message('您所挑选的公司名称已经拷贝到粘贴板，请打开记事本按crtl + v进行粘贴', 'success'
      )
    },
    onError: function (e) {
      this.$message(e.message, 'error')
    },
    handleChange (value, direction, movedKeys) {
      let vm = this
      let tag = {}
      if (direction === 'right') {
        movedKeys.forEach(function (movedKey) {
          vm.tags.push({name: movedKey, key: movedKey})
          vm.appreciateCount += 1
        })
        vm.message = ''
        vm.tags.forEach(function (tag) {
          vm.message += tag.name + ' '
        })
      }
      if (direction === 'left') {
        movedKeys.forEach(function (movedKey) {
          tag = {name: movedKey, key: movedKey}
          vm.tags.splice(vm.tags.indexOf(tag), 1)
          vm.appreciateCount -= 1
        })
        vm.message = ''
        vm.tags.forEach(function (tag) {
          vm.message += tag.name + ' '
        })
      }
    },
    handleClose (tag) {
      let vm = this
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.message = ''
      this.tags.forEach(function (tag) {
        vm.message += tag.name + ' '
      })
    },
    query () {
      let vm = this
      this.data = []
      const loading = this.$loading({
        lock: true,
        text: '正在从540万名字中查询您所需要的，请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$ajax.post('/api/queryCompanies', this.form)
        .then(function (res) {
          res.data.pageResult.forEach(item => {
            vm.data.push({key: item.name, label: item.name})
          })
          loading.close()
        }).catch(function (error) {
          console.log(error.message)
          loading.close()
        })
    },
    nextPage () {
      this.form.currentPage += 1
      this.query()
    },
    lastPage () {
      if (this.form.currentPage > 1) {
        this.form.currentPage -= 1
        this.query()
      }
    }
  }
}
</script>
<style>
  .transfer-footer-right {
    margin-left: 50px;
    padding: 5px;
  }
  .transfer-footer-left {
    margin-left: 20px;
    padding: 5px;
  }
  .el-transfer-panel, .el-transfer-panel__body, .el-transfer-panel__body, .el-checkbox-group {
    height: 650px;
  }
</style>
