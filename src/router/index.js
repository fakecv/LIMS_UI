import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/Login'
import ForgetPassword from '@/components/login/ForgetPassword'
import Lims from '@/components/frame/LimsNew'
import HelloWorld from '@/components/Helloworld'
import UserDetail from '@/components/user/userDetail'
import UserMaintenance from '@/components/user/UserMaintenance'
import Task from '@/components/Task'
import LimsMenu from '@/components/frame/LimsMenu'
import DyForm from '@/components/frame/DyForm'
import StForm from '@/components/StForm'
import StMenu from '@/components/StMenu'
import CompanyName from '@/components/CompanyName'
import ThemePicker from '@/components/frame/themePicker'
import Preview from '@/views/preview/preview'
import Editor from '@/views/editor'
import EditorFormAside from '@/views/editor/form/aside'
import EditorFormMain from '@/views/editor/form/main'
import EditorTableAside from '@/views/editor/table/aside'
import EditorTableMain from '@/views/editor/table/main'
import UIGenerator from '@/components/develop/UIGenerator'
import ActionHeader from '@/components/frame/ActionHeader'
import FileUpload from '@/components/Sample-FileUpload'
import MenuEditor from '@/components/menu/MenuEditor'
import MenuDetailNew from '@/components/menu/MenuDetailNew'
import MenuDetailEdit from '@/components/menu/MenuDetailEdit'
import MenuMaintenance from '@/components/menu/MenuMaintenance'
import RoleDetailNew from '@/components/user_management/RoleDetailNew'
import DepartmentDetailNew from '@/components/sample/department/DepartmentDetailNew'
import DepartmentDetailEdit from '@/components/sample/department/DepartmentDetailEdit'
import DepartmentMaintenance from '@/components/sample/department/DepartmentMaintenance'
import RoleDetailEdit from '@/components/user_management/RoleDetailEdit'
import RoleGroupDetailNew from '@/components/user_management/RoleGroupDetailNew'
import RoleGroupDetailEdit from '@/components/user_management/RoleGroupDetailEdit'
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
      // props: true
    },
    {
      path: '/ForgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
    },
    {
      path: '/companyName',
      name: 'companyName',
      component: CompanyName
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/lims',
      name: 'lims',
      component: Lims,
      children: [
        {
          path: 'userDetail',
          name: 'userDetail',
          component: UserDetail
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
          path: 'roleDetailEdit',
          name: 'roleDetailEdit',
          component: RoleDetailEdit
        },
        {
          path: 'roleGroupDetailEdit',
          name: 'roleGroupDetailEdit',
          component: RoleGroupDetailEdit
        },
        {
          path: 'roleGroupDetailNew',
          name: 'roleGroupDetailNew',
          component: RoleGroupDetailNew
        },
        {
          path: 'departmentDetailEdit',
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
          path: 'userMaintenance',
          name: 'userMaintenance',
          component: UserMaintenance
        },
        {
          path: 'task',
          name: 'task',
          component: Task
        },
        {
          path: 'dyForm',
          name: 'dyForm',
          component: DyForm
        },
        {
          path: 'FileUpload',
          name: 'FileUpload',
          component: FileUpload
        },
        {
          path: 'stForm',
          name: 'stForm',
          component: StForm
        },
        {
          path: 'stMenu',
          name: 'stMenu',
          component: StMenu
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
        },
        {
          path: 'MenuEditor',
          name: 'MenuEditor',
          component: MenuEditor
        }
      ]

    },
    {
      path: '/limsMenu',
      name: 'limsMenu',
      component: LimsMenu,
      children: [
        {
          path: 'userDetail',
          name: 'limsUserDetail',
          component: UserDetail
        },
        {
          path: 'userMaintenance',
          name: 'limsUserMaintenance',
          component: UserMaintenance
        },
        {
          path: 'task',
          name: 'limsTask',
          component: Task
        }
      ]

    },
    {
      path: '/editor',
      redirect: '/editor/form/qry',
      component: Editor,
      children: [
        {
          path: 'form/:fid',
          components: {
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
        }
      ]
    },
    {
      path: '/preview',
      component: Preview
    },
    {
      path: '*',
      redirect: '/lims'
    }
  ]
})

export default router
