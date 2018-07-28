<template>
  <div>
    <el-container id="menudetail" direction="vertical">
      <el-row>
        <el-button-group>
          <el-button  class="actionButton" type="info" v-for="(action,index) in actions" :key="index" size="mini" :icon="action.icon" :loading="action.loading" @click="actionHandle(action)">{{action.name}}
          </el-button>
        </el-button-group>
      </el-row>
      <el-row style="padding: 10px">
        <el-form :model="menuForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="上级菜单序号">
                <el-cascader :options="staticOptions.parentMenu" v-model="menuForm.parentMenuId" :change-on-select="true"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单变量名称">
                <el-input name="name" v-model=menuForm.name></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单图标">
                <el-input name="icon" v-model=menuForm.icon></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单显示名称">
                <el-input name="alias" v-model=menuForm.alias></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="是否应用">
                <el-switch name="switch" v-model=menuForm.state></el-switch>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单次序号">
                <el-input name="sort" v-model=menuForm.sort></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单指向页面">
                <el-input name="value" v-model=menuForm.value></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单类型">
                <el-radio-group v-model="menuForm.type">
                  <el-radio label="OPTIONS">选项</el-radio>
                  <el-radio label="LINK">链接</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单描述">
                <el-input name="description" v-model=menuForm.description></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary" @click="dialogFormVisible  = true">1</button>
          <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">2</button>
          <button type="button" class="btn btn-secondary">3</button>
          <button type="button" class="btn btn-secondary">4</button>
        </div>
        <div class="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" class="btn btn-secondary">5</button>
          <button type="button" class="btn btn-secondary">6</button>
          <button type="button" class="btn btn-secondary">7</button>
        </div>
        <div class="btn-group" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary">8</button>
        </div>
      </el-row>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </el-container>
      <el-row class="footer-row">
        <el-form :model="menuForm" label-width="100px" label-position="left" size="mini">
          <el-row :gutter="20">
            <el-col :lg="columnSize.lg" :md="columnSize.md" :xl="columnSize.xl" :xs="columnSize.xs" :sm="columnSize.sm">
              <el-form-item label="菜单创建人:">
                <span>{{menuForm.createUserId}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'menuDetail',
  props: ['staticOptions', 'menuForm'],
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      selectedOptions: [],
      selectedParentId: '',
      dialogFormVisible: false,
      footerForm: {
        parentMenuId: '张秀梅'
      },
      actions: [
        {'name': '数据库保存', 'id': '1', 'icon': 'el-icon-document', 'loading': false},
        {'name': '删除', 'id': '2', 'icon': 'el-icon-upload', 'loading': false},
        {'name': '文件导入', 'id': '3', 'icon': 'el-icon-upload2', 'loading': false},
        {'name': '文件保存', 'id': '4', 'icon': 'el-icon-download', 'loading': false}
      ],
      columnSize: {'xs': 24, 'sm': 12, 'md': 12, 'lg': 8, 'xl': 8}
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
      }
    },
    saveToDB () {
      let vm = this
      console.log('save to DB ' + this.selectedParentId)
      this.$ajax.post('/api/systemMenu', this.menuForm)
        .then(function (res) {
          vm.$message('已经成功保存到数据库!')
        }).catch(function (error) {
          console.log(error.message)
          vm.$message('Something wrong happen!')
        })
    },
    delete () {
      let vm = this
      this.$ajax.get('/api/systemMenu/delete/' + this.menuForm.id)
        .then(function (res) {
          vm.$message('已经成功删除！')
        }).catch(function (error) {
          console.log('MenuDetail delete ' + error)
          vm.$message('Something wrong happen!')
        })
    }
  }
}
</script>
<style lang="less">
.actionButton, .btn-group{
  margin-top: 5px;
}
#menudetail > .el-row {
  margin: 10px;
}
.footer-row {
  background: #e3d7d3;
  padding: 10px;
}
</style>
