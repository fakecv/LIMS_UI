import Vue from 'vue'
import Router from 'vue-router'
import ActionHeader from '@/components/frame/ActionHeader'
import AgreementDetailNew from '@/components/sample/agreement/AgreementDetailNew'
import AgreementDetailEdit from '@/components/sample/agreement/AgreementDetailEdit'
import AgreementMaintenance from '@/components/sample/agreement/AgreementMaintenance'
import AgreementReport from '@/components/sample/agreement/AgreementReport'
import AuditDepartmentDetailNew from '@/components/internalaudit/auditdepartment/AuditDepartmentDetailNew'
import AuditDepartmentDetailEdit from '@/components/internalaudit/auditdepartment/AuditDepartmentDetailEdit'
import AuditDepartmentMaintenance from '@/components/internalaudit/auditdepartment/AuditDepartmentMaintenance'
import CheckableTable from '@/components/reference/CheckableTable'
import ComposeSchedule from '@/components/equipment/ComposeSchedule'
import CustomerDetailNew from '@/components/customer/CustomerDetailNew'
import CustomerDetailEdit from '@/components/customer/CustomerDetailEdit'
import CustomerMaintenance from '@/components/customer/CustomerMaintenance'
import Dashboard from '@/components/reference/Dashboard'
import DepartmentDetailNew from '@/components/sample/department/DepartmentDetailNew'
import DepartmentDetailEdit from '@/components/sample/department/DepartmentDetailEdit'
import DepartmentMaintenance from '@/components/sample/department/DepartmentMaintenance'
import DrawingDesignDetailNew from '@/components/sample/drawingdesign/DrawingDesignDetailNew'
import DrawingDesignDetailEdit from '@/components/sample/drawingdesign/DrawingDesignDetailEdit'
import DrawingDesignMaintenance from '@/components/sample/drawingdesign/DrawingDesignMaintenance'
import ExperimentalMethodDetailNew from '@/components/sample/experimentalmethod/ExperimentalMethodDetailNew'
import ExperimentalMethodDetailEdit from '@/components/sample/experimentalmethod/ExperimentalMethodDetailEdit'
import ExperimentalMethodMaintenance from '@/components/sample/experimentalmethod/ExperimentalMethodMaintenance'
import ExperimentalItemDetailNew from '@/components/sample/experimentalitem/ExperimentalItemDetailNew'
import ExperimentalItemDetailEdit from '@/components/sample/experimentalitem/ExperimentalItemDetailEdit'
import ExperimentalItemMaintenance from '@/components/sample/experimentalitem/ExperimentalItemMaintenance'
import EditorFormAside from '@/views/editor/form/aside'
import EditorFormMain from '@/views/editor/form/main'
import EditorTableAside from '@/views/editor/table/aside'
import EditorTableMain from '@/views/editor/table/main'
import ForgetPassword from '@/components/system/login/ForgetPassword'
import FileUpload from '@/components/reference/FileUpload'
import InternalAuditCheckListDetailNew from '@/components/internalaudit/internalauditchecklist/InternalAuditCheckListDetailNew'
import InternalAuditCheckListDetailEdit from '@/components/internalaudit/internalauditchecklist/InternalAuditCheckListDetailEdit'
import InternalAuditCheckListMaintenance from '@/components/internalaudit/internalauditchecklist/InternalAuditCheckListMaintenance'
import InternalAuditorDetailNew from '@/components/internalaudit/internalauditor/InternalAuditorDetailNew'
import InternalAuditorDetailEdit from '@/components/internalaudit/internalauditor/InternalAuditorDetailEdit'
import InternalAuditorMaintenance from '@/components/internalaudit/internalauditor/InternalAuditorMaintenance'
import login from '@/components/system/login/Login'
import Lims from '@/components/frame/LimsNew'
import MenuDetailNew from '@/components/system/menu/MenuDetailNew'
import MenuDetailEdit from '@/components/system/menu/MenuDetailEdit'
import MenuMaintenance from '@/components/system/menu/MenuMaintenance'
import Preview from '@/views/preview/preview'
import ProcessDetailNew from '@/components/sample/process/ProcessDetailNew'
import ProcessDetailEdit from '@/components/sample/process/ProcessDetailEdit'
import ProcessMaintenance from '@/components/sample/process/ProcessMaintenance'
import ProcessingDetailNew from '@/components/sample/processing/ProcessingDetailNew'
import ProcessingDetailEdit from '@/components/sample/processing/ProcessingDetailEdit'
import ProcessingMaintenance from '@/components/sample/processing/ProcessingMaintenance'
import ProcessingStatusDetailNew from '@/components/sample/processingstatus/ProcessingStatusDetailNew'
import ProcessingStatusDetailEdit from '@/components/sample/processingstatus/ProcessingStatusDetailEdit'
import ProcessingStatusMaintenance from '@/components/sample/processingstatus/ProcessingStatusMaintenance'
import RoleDetailNew from '@/components/system/role/RoleDetailNew'
import RoleDetailEdit from '@/components/system/role/RoleDetailEdit'
import RoleGroupDetailNew from '@/components/system/rolegroup/RoleGroupDetailNew'
import RoleGroupDetailEdit from '@/components/system/rolegroup/RoleGroupDetailEdit'
import RoleGroupMaintenance from '@/components/system/rolegroup/RoleGroupMaintenance'
import RoleMaintenance from '@/components/system/role/RoleMaintenance'
import Schedule from '@/components/equipment/Schedule'
import TableSchedule from '@/components/equipment/MyTableSchedule'
import ThemePicker from '@/components/frame/themePicker'
import UIGenerator from '@/components/develop/UIGenerator'
import UserDetailNew from '@/components/system/user/UserDetailNew'
import UserDetailEdit from '@/components/system/user/UserDetailEdit'
import UserMaintenance from '@/components/system/user/UserMaintenance'

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
          path: 'agreementDetailEdit/:id',
          name: 'agreementDetailEdit',
          component: AgreementDetailEdit
        },
        {
          path: 'agreementDetailNew',
          name: 'agreementDetailNew',
          component: AgreementDetailNew
        },
        {
          path: 'agreementMaintenance',
          name: 'agreementMaintenance',
          component: AgreementMaintenance
        },
        {
          path: 'agreementReport/:id',
          name: 'agreementReport',
          component: AgreementReport
        },
        {
          path: 'auditDepartmentDetailEdit/:id',
          name: 'auditDepartmentDetailEdit',
          component: AuditDepartmentDetailEdit
        },
        {
          path: 'auditDepartmentDetailNew',
          name: 'auditDepartmentDetailNew',
          component: AuditDepartmentDetailNew
        },
        {
          path: 'auditDepartmentMaintenance',
          name: 'auditDepartmentMaintenance',
          component: AuditDepartmentMaintenance
        },
        {
          path: 'checkableTable',
          name: 'checkableTable',
          component: CheckableTable
        },
        {
          path: 'composeSchedule',
          name: 'composeSchedule',
          component: ComposeSchedule
        },
        {
          path: 'customerDetailEdit/:id',
          name: 'customerDetailEdit',
          component: CustomerDetailEdit
        },
        {
          path: 'customerDetailNew',
          name: 'customerDetailNew',
          component: CustomerDetailNew
        },
        {
          path: 'customerMaintenance',
          name: 'customerMaintenance',
          component: CustomerMaintenance
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
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
          path: 'experimentalItemDetailEdit/:id',
          name: 'experimentalItemDetailEdit',
          component: ExperimentalItemDetailEdit
        },
        {
          path: 'experimentalItemDetailNew',
          name: 'experimentalItemDetailNew',
          component: ExperimentalItemDetailNew
        },
        {
          path: 'experimentalItemMaintenance',
          name: 'experimentalItemMaintenance',
          component: ExperimentalItemMaintenance
        },
        {
          path: 'experimentalMethodDetailEdit/:id',
          name: 'experimentalMethodDetailEdit',
          component: ExperimentalMethodDetailEdit
        },
        {
          path: 'experimentalMethodDetailNew',
          name: 'experimentalMethodDetailNew',
          component: ExperimentalMethodDetailNew
        },
        {
          path: 'experimentalMethodMaintenance',
          name: 'experimentalMethodMaintenance',
          component: ExperimentalMethodMaintenance
        },
        {
          path: 'fileUpload',
          name: 'fileUpload',
          component: FileUpload
        },
        {
          path: 'internalAuditCheckListDetailEdit/:id',
          name: 'internalAuditorDetailEdit',
          component: InternalAuditCheckListDetailEdit
        },
        {
          path: 'internalAuditCheckListDetailNew',
          name: 'internalAuditCheckListDetailNew',
          component: InternalAuditCheckListDetailNew
        },
        {
          path: 'internalAuditCheckListMaintenance',
          name: 'internalAuditCheckListMaintenance',
          component: InternalAuditCheckListMaintenance
        },
        {
          path: 'internalAuditorDetailEdit/:id',
          name: 'internalAuditorDetailEdit',
          component: InternalAuditorDetailEdit
        },
        {
          path: 'internalAuditorDetailNew',
          name: 'internalAuditorDetailNew',
          component: InternalAuditorDetailNew
        },
        {
          path: 'internalAuditorMaintenance',
          name: 'internalAuditorMaintenance',
          component: InternalAuditorMaintenance
        },
        {
          path: 'menuDetailEdit/:id',
          name: 'menuDetailEdit',
          component: MenuDetailEdit
        },
        {
          path: 'menuDetailNew',
          name: 'menuDetailNew',
          component: MenuDetailNew
        },
        {
          path: 'menuMaintenance',
          name: 'menuMaintenance',
          component: MenuMaintenance
        },
        {
          path: 'processDetailEdit/:id',
          name: 'processDetailEdit',
          component: ProcessDetailEdit
        },
        {
          path: 'processDetailNew',
          name: 'processDetailNew',
          component: ProcessDetailNew
        },
        {
          path: 'processMaintenance',
          name: 'processMaintenance',
          component: ProcessMaintenance
        },
        {
          path: 'processingDetailEdit/:id',
          name: 'processingDetailEdit',
          component: ProcessingDetailEdit
        },
        {
          path: 'processingDetailNew',
          name: 'processingDetailNew',
          component: ProcessingDetailNew
        },
        {
          path: 'processingMaintenance',
          name: 'processingMaintenance',
          component: ProcessingMaintenance
        },
        {
          path: 'processingStatusDetailEdit/:id',
          name: 'processingStatusDetailEdit',
          component: ProcessingStatusDetailEdit
        },
        {
          path: 'processingStatusDetailNew',
          name: 'processingStatusDetailNew',
          component: ProcessingStatusDetailNew
        },
        {
          path: 'processingStatusMaintenance',
          name: 'processingStatusMaintenance',
          component: ProcessingStatusMaintenance
        },
        {
          path: 'roleDetailEdit/:id',
          name: 'roleDetailEdit',
          component: RoleDetailEdit
        },
        {
          path: 'roleDetailNew',
          name: 'roleDetailNew',
          component: RoleDetailNew
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
          path: 'themePicker',
          name: 'themePicker',
          component: ThemePicker
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
          path: 'userDetailEdit/:id',
          name: 'userDetailEdit',
          component: UserDetailEdit
        },
        {
          path: 'userDetailNew',
          name: 'userDetailNew',
          component: UserDetailNew
        },
        {
          path: 'userMaintenance',
          name: 'userMaintenance',
          component: UserMaintenance
        }
      ]

    },
    // 正式上线后要改为 /login/first 或者错误信息提示页面，跳转后需要用户重新登录系统, 当出现问题后跳转至该页面，提示问题
    {
      path: '*',
      redirect: '/login/first'
    }
  ]
})

export default router
