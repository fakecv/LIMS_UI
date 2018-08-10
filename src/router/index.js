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
import CustomerDetailNew from '@/components/customer/CustomerDetailNew'
import CustomerDetailEdit from '@/components/customer/CustomerDetailEdit'
import CustomerMaintenance from '@/components/customer/CustomerMaintenance'
import AgreementDetailNew from '@/components/sample/agreement/AgreementDetailNew'
import AgreementDetailEdit from '@/components/sample/agreement/AgreementDetailEdit'
import AgreementMaintenance from '@/components/sample/agreement/AgreementMaintenance'
import DrawingDesignDetailNew from '@/components/sample/drawingdesign/DrawingDesignDetailNew'
import DrawingDesignDetailEdit from '@/components/sample/drawingdesign/DrawingDesignDetailEdit'
import DrawingDesignMaintenance from '@/components/sample/drawingdesign/DrawingDesignMaintenance'
import ExperimentalMethodDetailNew from '@/components/sample/experimentalmethod/ExperimentalMethodDetailNew'
import ExperimentalMethodDetailEdit from '@/components/sample/experimentalmethod/ExperimentalMethodDetailEdit'
import ExperimentalMethodMaintenance from '@/components/sample/experimentalmethod/ExperimentalMethodMaintenance'
import ProcessingDetailNew from '@/components/sample/processing/ProcessingDetailNew'
import ProcessingDetailEdit from '@/components/sample/processing/ProcessingDetailEdit'
import ProcessingMaintenance from '@/components/sample/processing/ProcessingMaintenance'
import ProcessingStatusDetailNew from '@/components/sample/processingstatus/ProcessingStatusDetailNew'
import ProcessingStatusDetailEdit from '@/components/sample/processingstatus/ProcessingStatusDetailEdit'
import ProcessingStatusMaintenance from '@/components/sample/processingstatus/ProcessingStatusMaintenance'
import RoleGroupDetailNew from '@/components/system/rolegroup/RoleGroupDetailNew'
import RoleGroupDetailEdit from '@/components/system/rolegroup/RoleGroupDetailEdit'
import RoleGroupMaintenance from '@/components/system/rolegroup/RoleGroupMaintenance'
import TableSchedule from '@/components/equipment/MyTableSchedule'
import Schedule from '@/components/equipment/Schedule'
import ComposeSchedule from '@/components/equipment/ComposeSchedule'
import CheckableTable from '@/components/reference/CheckableTable'

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
          path: 'checkableTable',
          name: 'checkableTable',
          component: CheckableTable
        },
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
          path: 'customerDetailEdit/:id',
          name: 'customerDetailEdit',
          component: CustomerDetailEdit
        },
        {
          path: 'customerMaintenance',
          name: 'customerMaintenance',
          component: CustomerMaintenance
        },
        {
          path: 'customerDetailNew',
          name: 'customerDetailNew',
          component: CustomerDetailNew
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
          path: 'agreementDetailEdit/:id',
          name: 'agreementDetailEdit',
          component: AgreementDetailEdit
        },
        {
          path: 'agreementMaintenance',
          name: 'agreementMaintenance',
          component: AgreementMaintenance
        },
        {
          path: 'agreementDetailNew',
          name: 'agreementDetailNew',
          component: AgreementDetailNew
        },
        {
          path: 'drawingDesignDetailEdit/:id',
          name: 'drawingDesignDetailEdit',
          component: DrawingDesignDetailEdit
        },
        {
          path: 'drawingDesignMaintenance',
          name: 'drawingDesignMaintenance',
          component: DrawingDesignMaintenance
        },
        {
          path: 'drawingDesignDetailNew',
          name: 'drawingDesignDetailNew',
          component: DrawingDesignDetailNew
        },
        {
          path: 'experimentalMethodDetailEdit/:id',
          name: 'experimentalMethodDetailEdit',
          component: ExperimentalMethodDetailEdit
        },
        {
          path: 'experimentalMethodMaintenance',
          name: 'experimentalMethodMaintenance',
          component: ExperimentalMethodMaintenance
        },
        {
          path: 'experimentalMethodDetailNew',
          name: 'experimentalMethodDetailNew',
          component: ExperimentalMethodDetailNew
        },
        {
          path: 'processingDetailEdit/:id',
          name: 'processingDetailEdit',
          component: ProcessingDetailEdit
        },
        {
          path: 'processingMaintenance',
          name: 'processingMaintenance',
          component: ProcessingMaintenance
        },
        {
          path: 'processingDetailNew',
          name: 'processingDetailNew',
          component: ProcessingDetailNew
        },
        {
          path: 'processingStatusDetailEdit/:id',
          name: 'processingStatusDetailEdit',
          component: ProcessingStatusDetailEdit
        },
        {
          path: 'processingStatusMaintenance',
          name: 'processingStatusMaintenance',
          component: ProcessingStatusMaintenance
        },
        {
          path: 'processingStatusDetailNew',
          name: 'processingStatusDetailNew',
          component: ProcessingStatusDetailNew
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
