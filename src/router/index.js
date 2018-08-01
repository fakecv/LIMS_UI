import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/system/login/Login'
import ForgetPassword from '@/components/system/login/ForgetPassword'
import Lims from '@/components/frame/LimsNew'
import ThemePicker from '@/components/frame/themePicker'
import Preview from '@/views/preview/preview'
import EditorFormAside from '@/views/editor/form/aside'
import EditorFormMain from '@/views/editor/form/main'
import EditorTableAside from '@/views/editor/table/aside'
import EditorTableMain from '@/views/editor/table/main'
import UIGenerator from '@/components/develop/UIGenerator'
import ActionHeader from '@/components/frame/ActionHeader'
import UserDetailNew from '@/components/system/user/UserDetailNew'
import UserDetailEdit from '@/components/system/user/UserDetailEdit'
import UserMaintenance from '@/components/system/user/UserMaintenance'
import MenuDetailNew from '@/components/system/menu/MenuDetailNew'
import MenuDetailEdit from '@/components/system/menu/MenuDetailEdit'
import MenuMaintenance from '@/components/system/menu/MenuMaintenance'
import RoleDetailNew from '@/components/system/role/RoleDetailNew'
import RoleDetailEdit from '@/components/system/role/RoleDetailEdit'
import RoleMaintenance from '@/components/system/role/RoleMaintenance'
import DepartmentDetailNew from '@/components/sample/department/DepartmentDetailNew'
import DepartmentDetailEdit from '@/components/sample/department/DepartmentDetailEdit'
import DepartmentMaintenance from '@/components/sample/department/DepartmentMaintenance'
import RoleGroupDetailNew from '@/components/system/rolegroup/RoleGroupDetailNew'
import RoleGroupDetailEdit from '@/components/system/rolegroup/RoleGroupDetailEdit'
import RoleGroupMaintenance from '@/components/system/rolegroup/RoleGroupMaintenance'
import TableSchedule from '@/components/equipment/MyTableSchedule'
import Schedule from '@/components/equipment/Schedule'
import ComposeSchedule from '@/components/equipment/ComposeSchedule'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/:id',
      name: 'login',
      component: login
    },
    {
      path: '/ForgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
    },
    {
      path: '/lims',
      name: 'lims',
      component: Lims,
      children: [
        {
          path: 'userDetailNew',
          name: 'userDetailNew',
          component: UserDetailNew
        },
        {
          path: 'userDetailEdit/:id',
          name: 'userDetailEdit',
          component: UserDetailEdit
        },
        {
          path: 'userMaintenance',
          name: 'userMaintenance',
          component: UserMaintenance
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: Schedule
        },
        {
          path: 'tableSchedule',
          name: 'tableSchedule',
          component: TableSchedule
        },
        {
          path: 'composeSchedule',
          name: 'composeSchedule',
          component: ComposeSchedule
        },
        {
          path: 'menuDetailNew',
          name: 'menuDetailNew',
          component: MenuDetailNew
        },
        {
          path: 'roleDetailNew',
          name: 'roleDetailNew',
          component: RoleDetailNew
        },
        {
          path: 'roleDetailEdit/:id',
          name: 'roleDetailEdit',
          component: RoleDetailEdit
        },
        {
          path: 'roleMaintenance',
          name: 'roleMaintenance',
          component: RoleMaintenance
        },
        {
          path: 'roleGroupDetailEdit/:id',
          name: 'roleGroupDetailEdit',
          component: RoleGroupDetailEdit
        },
        {
          path: 'roleGroupDetailNew',
          name: 'roleGroupDetailNew',
          component: RoleGroupDetailNew
        },
        {
          path: 'roleGroupMaintenance',
          name: 'roleGroupMaintenance',
          component: RoleGroupMaintenance
        },
        {
          path: 'departmentDetailEdit/:id',
          name: 'departmentDetailEdit',
          component: DepartmentDetailEdit
        },
        {
          path: 'departmentMaintenance',
          name: 'departmentMaintenance',
          component: DepartmentMaintenance
        },
        {
          path: 'departmentDetailNew',
          name: 'departmentDetailNew',
          component: DepartmentDetailNew
        },
        {
          path: 'menuDetailEdit/:id',
          name: 'menuDetailEdit',
          component: MenuDetailEdit
        },
        {
          path: 'menuMaintenance',
          name: 'menuMaintenance',
          component: MenuMaintenance
        },
        {
          path: 'UIGenerator',
          name: 'UIGenerator',
          component: UIGenerator,
          children: [
            {
              path: 'form/:fid',
              components: {
                header: ActionHeader,
                aside: EditorFormAside,
                main: EditorFormMain
              }
            },
            {
              path: 'table',
              components: {
                aside: EditorTableAside,
                main: EditorTableMain
              }
            },
            {
              path: 'preview',
              component: Preview
            }
          ]
        },
        {
          path: 'themePicker',
          name: 'themePicker',
          component: ThemePicker
        }
      ]

    },
    // 正式上线后要改为 /login/first 或者错误信息提示页面，跳转后需要用户重新登录系统, 当出现问题后跳转至该页面，提示问题
    {
      path: '*',
      redirect: '/lims/menuDetailNew'
    }
  ]
})

export default router
