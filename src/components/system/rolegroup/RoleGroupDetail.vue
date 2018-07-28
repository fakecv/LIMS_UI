<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
        </el-button>
      </el-button-group>
    </el-header>
    <el-container style="padding: 10px">
      <el-form :model="roleForm" label-width="100px" label-position="left" size="mini">
        <el-row :gutter="20">
          <el-form-item label="角色组名称">
            <el-input name="icon" v-model="roleForm.name"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="角色组角色">
        <div style="text-align: center; height: 850px;width: 600px;margin: auto">
          <el-transfer
            style="text-align: left; display: inline-block;"
            v-model="targetValue"
            :titles="['角色列表', '已包含角色列表']"
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
            </el-row>
          </el-transfer>
        </div>
          </el-form-item>
        </el-row>
      </el-form>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'roleDetailGroup',
  props: ['staticOptions', 'roleForm'],
  data () {
    return {
      data: [],
      targetValue: [1, 4],
      actions: [
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 12, 'xl': 8}
    }
  },
  methods: {
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
      }
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
    query () {
      let vm = this
      this.data = []
      const loading = this.$loading({
        lock: true,
        text: '加载角色列表，请稍等。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$ajax.get('/api/queryRoles', this.form)
        .then(function (res) {
          res.data.pageResult.forEach(item => {
            vm.data.push({key: item.name, label: item.name})
          })
          loading.close()
        }).catch(function (error) {
          console.log(error.message)
          loading.close()
        })
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
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
