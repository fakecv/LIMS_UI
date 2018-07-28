<template>
    <el-container>
        <el-form :inline="true" label-width="80px" size="mini" :ref="formName">
            <el-form-item v-for="(item, index) in formData" :key='index' :label="item.name" width="item.width">
                <el-input :name='item.name' v-if="item.type === 'input'" v-model='item.val' :width="100" :hidden="item.hidden"></el-input>
                <el-radio-group v-if="item.type === 'radio-group'" v-model="item.val">
                    <el-radio v-for="(radio,radioIndex) in item.child" :key="radioIndex" v-if="radio.type === 'radio'" :label="radio.val">{{radio.name}}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-if="item.type === 'checkbox-group'" v-model="item.val">
                    <el-checkbox v-for="(checkbox,checkboxIndex) in item.child" :key="checkboxIndex" v-if="checkbox.type === 'checkbox'" :label="checkbox.val">{{checkbox.name}}</el-checkbox>
                </el-checkbox-group>
                <el-time-picker v-if="item.type === 'timePicker'" type="fixed-time" placeholder="选择时间" v-model="item.val" style="width: 100%;"></el-time-picker>
                <el-date-picker v-if="item.type === 'datePicker'" type="date" placeholder="选择日期" v-model="item.val" style="width: 100%;"></el-date-picker>
                <el-select v-if="item.type === 'select'" v-model="item.val" :placeholder="item.name">
                    <el-option v-for="(selectOption,selectOptionIndex) in item.child" :key="selectOptionIndex" v-if="selectOption.type === 'selectOption'" :label="selectOption.name" :value="selectOption.val">
                    </el-option>
                </el-select>
                <el-row v-if="item.type === 'row'" :style="{width: item.val}">
                </el-row>
                <hr v-if="item.type === 'hr'" :style="{width: item.val}">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">立即创建</el-button>
                <el-button @click="resetForm(formName)">取消</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      formName: 'userForm',
      initialFormData: {},
      formData: [{
        type: 'checkbox-group',
        data: {},
        name: 'checkbox选项',
        process: this.click1,
        val: [],
        child: [{
          type: 'checkbox',
          data: {},
          name: 'checkbox1',
          val: 3
        }, {
          type: 'checkbox',
          data: {},
          name: 'checkbox2',
          val: 4
        }]
      }, {
        type: 'row',
        data: {},
        name: 'row选项',
        process: this.click1,
        val: '200px',
        child: null
      }, {
        type: 'hr',
        data: {},
        name: 'row选项',
        process: this.click1,
        val: '600px',
        child: null
      }, {
        type: 'hr',
        data: {},
        name: 'row1选项',
        process: this.click1,
        val: '600px',
        child: null
      }, {
        type: 'radio-group',
        data: {},
        name: 'radio选项',
        process: this.click1,
        val: 4,
        child: [{
          type: 'radio',
          data: {},
          name: 'radio1',
          val: 3
        }, {
          type: 'radio',
          data: {},
          name: 'radio2',
          val: 4
        }]
      }, {
        type: 'timePicker',
        data: {},
        name: 'timePicker选项',
        process: this.click1,
        val: '',
        child: null
      }, {
        type: 'datePicker',
        data: {},
        name: '选项',
        process: this.click1,
        val: '',
        child: null
      }, {
        type: 'input',
        data: {},
        hidden: false,
        name: '',
        process: this.click1,
        val: '',
        child: null
      }, {
        type: 'select',
        data: {},
        name: '选项',
        process: this.click1,
        val: '',
        child: [{
          type: 'selectOption',
          data: {},
          name: 'select1',
          val: 3
        }, {
          type: 'selectOption',
          data: {},
          name: 'select2',
          val: 4
        }]
      }]
    }
  },
  mounted: function () {
    this.initialFormData = this.formData
  },
  methods: {
    click1 () {
      console.log(this.formData[1].val)
    },
    click2 () {},
    submit () {
      // 在这里可以拿到用户输入的值，通过v-model赋的值
      // 我在这里就直接取值了，这里的麻烦之处就在于可能需要遍历formData来取到对应的值
      // 可以使用数组的find方法
      console.log(this.formData[0].val[0])
    },
    resetForm (formName) {
      console.log(formName)
      this.formData.forEach(child => {
        child.val = ''
      })
    }
  }
}
</script>
