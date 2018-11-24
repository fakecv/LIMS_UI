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
import Child from '@/components/reference/Child'
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
import EditorFormAside from '@/views/editor/form/aside'
import EditorFormMain from '@/views/editor/form/main'
import EditorTableAside from '@/views/editor/table/aside'
import EditorTableMain from '@/views/editor/table/main'
import FileUpload from '@/components/reference/FileUpload'
import ForgetPassword from '@/components/system/login/ForgetPassword'
import FormDevelopmentDetailNew from '@/components/system/formdevelopment/FormDevelopmentDetailNew'
import FormDevelopmentDetailEdit from '@/components/system/formdevelopment/FormDevelopmentDetailEdit'
import FormDevelopmentMaintenance from '@/components/system/formdevelopment/FormDevelopmentMaintenance'
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
import NavPage from '@/components/frame/NavPage'
import NumberGeneratorDetailNew from '@/components/sample/numbergenerator/NumberGeneratorDetailNew'
import NumberGeneratorDetailEdit from '@/components/sample/numbergenerator/NumberGeneratorDetailEdit'
import NumberGeneratorMaintenance from '@/components/sample/numbergenerator/NumberGeneratorMaintenance'
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
import ProcessPriorityDetailNew from '@/components/sample/processpriority/ProcessPriorityDetailNew'
import ProcessPriorityDetailEdit from '@/components/sample/processpriority/ProcessPriorityDetailEdit'
import ProcessPriorityMaintenance from '@/components/sample/processpriority/ProcessPriorityMaintenance'
import ReportDevelopmentDetailNew from '@/components/report/reportdevelopment/ReportDevelopmentDetailNew'
import ReportDevelopmentDetailEdit from '@/components/report/reportdevelopment/ReportDevelopmentDetailEdit'
import ReportDevelopmentMaintenance from '@/components/report/reportdevelopment/ReportDevelopmentMaintenance'
import ReportElementDetailNew from '@/components/report/reportelement/ReportElementDetailNew'
import ReportElementDetailEdit from '@/components/report/reportelement/ReportElementDetailEdit'
import ReportElementMaintenance from '@/components/report/reportelement/ReportElementMaintenance'
import RoleDetailNew from '@/components/system/role/RoleDetailNew'
import RoleDetailEdit from '@/components/system/role/RoleDetailEdit'
import RoleGroupDetailNew from '@/components/system/rolegroup/RoleGroupDetailNew'
import RoleGroupDetailEdit from '@/components/system/rolegroup/RoleGroupDetailEdit'
import RoleGroupMaintenance from '@/components/system/rolegroup/RoleGroupMaintenance'
import RoleMaintenance from '@/components/system/role/RoleMaintenance'
import Schedule from '@/components/equipment/Schedule'
import ShortCut from '@/components/frame/ShortCut'
import TableSchedule from '@/components/equipment/MyTableSchedule'
import TestCategoryDetailNew from '@/components/sample/testcategory/TestCategoryDetailNew'
import TestCategoryDetailEdit from '@/components/sample/testcategory/TestCategoryDetailEdit'
import TestCategoryMaintenance from '@/components/sample/testcategory/TestCategoryMaintenance'
import TestedItemDetailNew from '@/components/sample/testeditem/TestedItemDetailNew'
import TestedItemDetailEdit from '@/components/sample/testeditem/TestedItemDetailEdit'
import TestedItemMaintenance from '@/components/sample/testeditem/TestedItemMaintenance'
import TestMethodDetailNew from '@/components/sample/testmethod/TestMethodDetailNew'
import TestMethodDetailEdit from '@/components/sample/testmethod/TestMethodDetailEdit'
import TestMethodMaintenance from '@/components/sample/testmethod/TestMethodMaintenance'
import TestParameterDetailNew from '@/components/sample/testparameter/TestParameterDetailNew'
import TestParameterDetailEdit from '@/components/sample/testparameter/TestParameterDetailEdit'
import TestParameterMaintenance from '@/components/sample/testparameter/TestParameterMaintenance'
import TestedItemProductDetailNew from '@/components/sample/testeditemproduct/TestedItemProductDetailNew'
import TestedItemProductDetailEdit from '@/components/sample/testeditemproduct/TestedItemProductDetailEdit'
import TestedItemProductMaintenance from '@/components/sample/testeditemproduct/TestedItemProductMaintenance'
import TestedItemProductGroupDetailNew from '@/components/sample/testeditemproductgroup/TestedItemProductGroupDetailNew'
import TestedItemProductGroupDetailEdit from '@/components/sample/testeditemproductgroup/TestedItemProductGroupDetailEdit'
import TestedItemProductGroupMaintenance from '@/components/sample/testeditemproductgroup/TestedItemProductGroupMaintenance'
import TestedItemTaskDetailNew from '@/components/sample/testeditemtask/TestedItemTaskDetailNew'
import TestedItemTaskDetailEdit from '@/components/sample/testeditemtask/TestedItemTaskDetailEdit'
import TestedItemTaskMaintenance from '@/components/sample/testeditemtask/TestedItemTaskMaintenance'
import ThemePicker from '@/components/frame/themePicker'
import UIGenerator from '@/components/develop/UIGenerator'
import UserDetailNew from '@/components/system/user/UserDetailNew'
import UserDetailEdit from '@/components/system/user/UserDetailEdit'
import UserMaintenance from '@/components/system/user/UserMaintenance'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: '/context/',
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
          path: 'child',
          name: 'child',
          component: Child
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
          path: 'fileUpload',
          name: 'fileUpload',
          component: FileUpload
        },
        {
          path: 'formDevelopmentDetailEdit/:id',
          name: 'formDevelopmentAuditorDetailEdit',
          component: FormDevelopmentDetailEdit
        },
        {
          path: 'formDevelopmentDetailNew',
          name: 'formDevelopmentDetailNew',
          component: FormDevelopmentDetailNew
        },
        {
          path: 'formDevelopmentMaintenance',
          name: 'formDevelopmentMaintenance',
          component: FormDevelopmentMaintenance
        },
        {
          path: 'internalAuditCheckListDetailEdit/:id',
          name: 'internalAuditorCheckListDetailEdit',
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
          path: 'navPage',
          name: 'navPage',
          component: NavPage
        },
        {
          path: 'numberGeneratorDetailEdit/:id',
          name: 'numberGeneratorDetailEdit',
          component: NumberGeneratorDetailEdit
        },
        {
          path: 'numberGeneratorDetailNew',
          name: 'numberGeneratorDetailNew',
          component: NumberGeneratorDetailNew
        },
        {
          path: 'numberGeneratorMaintenance',
          name: 'numberGeneratorMaintenance',
          component: NumberGeneratorMaintenance
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
          path: 'processPriorityDetailEdit/:id',
          name: 'processPriorityDetailEdit',
          component: ProcessPriorityDetailEdit
        },
        {
          path: 'processPriorityDetailNew',
          name: 'processPriorityDetailNew',
          component: ProcessPriorityDetailNew
        },
        {
          path: 'processPriorityMaintenance',
          name: 'processPriorityMaintenance',
          component: ProcessPriorityMaintenance
        },
        {
          path: 'roleDetailEdit/:id',
          name: 'roleDetailEdit',
          component: RoleDetailEdit
        },
        {
          path: 'reportDevelopmentDetailEdit/:id',
          name: 'reportDevelopmentAuditorDetailEdit',
          component: ReportDevelopmentDetailEdit
        },
        {
          path: 'reportDevelopmentDetailNew',
          name: 'reportDevelopmentDetailNew',
          component: ReportDevelopmentDetailNew
        },
        {
          path: 'reportDevelopmentMaintenance',
          name: 'reportDevelopmentMaintenance',
          component: ReportDevelopmentMaintenance
        },
        {
          path: 'reportElementDetailEdit/:id',
          name: 'reportElementAuditorDetailEdit',
          component: ReportElementDetailEdit
        },
        {
          path: 'reportElementDetailNew',
          name: 'reportElementDetailNew',
          component: ReportElementDetailNew
        },
        {
          path: 'reportElementMaintenance',
          name: 'reportElementMaintenance',
          component: ReportElementMaintenance
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
          path: 'shortCut',
          name: 'shortCut',
          component: ShortCut
        },
        {
          path: 'tableSchedule',
          name: 'tableSchedule',
          component: TableSchedule
        },
        {
          path: 'testCategoryDetailEdit/:id',
          name: 'testCategoryAuditorDetailEdit',
          component: TestCategoryDetailEdit
        },
        {
          path: 'testCategoryDetailNew',
          name: 'testCategoryDetailNew',
          component: TestCategoryDetailNew
        },
        {
          path: 'testCategoryMaintenance',
          name: 'testCategoryMaintenance',
          component: TestCategoryMaintenance
        },
        {
          path: 'testedItemDetailEdit/:id',
          name: 'testedItemDetailEdit',
          component: TestedItemDetailEdit
        },
        {
          path: 'testedItemDetailNew',
          name: 'testedItemDetailNew',
          component: TestedItemDetailNew
        },
        {
          path: 'testedItemMaintenance',
          name: 'testedItemMaintenance',
          component: TestedItemMaintenance
        },
        {
          path: 'testParameterDetailEdit/:id',
          name: 'testParameterDetailEdit',
          component: TestParameterDetailEdit
        },
        {
          path: 'testParameterDetailNew',
          name: 'testParameterDetailNew',
          component: TestParameterDetailNew
        },
        {
          path: 'testParameterMaintenance',
          name: 'testParameterMaintenance',
          component: TestParameterMaintenance
        },
        {
          path: 'testMethodDetailEdit/:id',
          name: 'testMethodDetailEdit',
          component: TestMethodDetailEdit
        },
        {
          path: 'testMethodDetailNew',
          name: 'testMethodDetailNew',
          component: TestMethodDetailNew
        },
        {
          path: 'testMethodMaintenance',
          name: 'testMethodMaintenance',
          component: TestMethodMaintenance
        },
        {
          path: 'testedItemProductDetailEdit/:id',
          name: 'testedItemProductAuditorDetailEdit',
          component: TestedItemProductDetailEdit
        },
        {
          path: 'testedItemProductDetailNew',
          name: 'testedItemProductDetailNew',
          component: TestedItemProductDetailNew
        },
        {
          path: 'testedItemProductMaintenance',
          name: 'testedItemProductMaintenance',
          component: TestedItemProductMaintenance
        },
        {
          path: 'testedItemProductGroupDetailEdit/:id',
          name: 'testedItemProductGroupAuditorDetailEdit',
          component: TestedItemProductGroupDetailEdit
        },
        {
          path: 'testedItemProductGroupDetailNew',
          name: 'testedItemProductGroupDetailNew',
          component: TestedItemProductGroupDetailNew
        },
        {
          path: 'testedItemProductGroupMaintenance',
          name: 'testedItemProductGroupMaintenance',
          component: TestedItemProductGroupMaintenance
        },
        {
          path: 'testedItemTaskDetailEdit/:id',
          name: 'testedItemTaskAuditorDetailEdit',
          component: TestedItemTaskDetailEdit
        },
        {
          path: 'testedItemTaskDetailNew',
          name: 'testedItemTaskDetailNew',
          component: TestedItemTaskDetailNew
        },
        {
          path: 'testedItemTaskMaintenance',
          name: 'testedItemTaskMaintenance',
          component: TestedItemTaskMaintenance
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
              path: 'form/:fid/:id',
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
