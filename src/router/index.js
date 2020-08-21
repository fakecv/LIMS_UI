import Vue from 'vue'
import Router from 'vue-router'
import ActionHeader from '@/components/frame/ActionHeader'
import AgreementDetailNew from '@/components/sample/agreement/AgreementDetailNew'
import AgreementTemplateMaintenance from '@/components/sample/agreement/AgreementTemplateMaintenance'
import AgreementMaintenance from '@/components/sample/agreement/AgreementMaintenance'
import AgreementReport from '@/components/sample/agreement/AgreementReport'
import AuditDepartmentDetailNew from '@/components/internalaudit/auditdepartment/AuditDepartmentDetailNew'
import AuditDepartmentDetailEdit from '@/components/internalaudit/auditdepartment/AuditDepartmentDetailEdit'
import AuditDepartmentMaintenance from '@/components/internalaudit/auditdepartment/AuditDepartmentMaintenance'
import AvailableEquipmentDetailNew from '@/components/sample/availableequipment/AvailableEquipmentDetailNew'
import AvailableEquipmentDetailEdit from '@/components/sample/availableequipment/AvailableEquipmentDetailEdit'
import AvailableEquipmentMaintenance from '@/components/sample/availableequipment/AvailableEquipmentMaintenance'
import CheckableTable from '@/components/reference/CheckableTable'
import Child from '@/components/reference/Child'
import ComposeSchedule from '@/components/equipment/ComposeSchedule'
import CustomerCompanyDetailNew from '@/components/customer/customercompany/CustomerCompanyDetailNew'
import CustomerCompanyDetailEdit from '@/components/customer/customercompany/CustomerCompanyDetailEdit'
import CustomerCompanyMaintenance from '@/components/customer/customercompany/CustomerCompanyMaintenance'
import CustomerDetailNew from '@/components/customer/customer/CustomerDetailNew'
import CustomerDetailEdit from '@/components/customer/customer/CustomerDetailEdit'
import CustomerMaintenance from '@/components/customer/customer/CustomerMaintenance'
import CustomerNoteDetailNew from '@/components/customer/customernote/CustomerNoteDetailNew'
import CustomerNoteDetailEdit from '@/components/customer/customernote/CustomerNoteDetailEdit'
import CustomerNoteMaintenance from '@/components/customer/customernote/CustomerNoteMaintenance'
import ConsumableAcceptanceCheckDetailNew from '@/components/equipment/consumableacceptancecheck/ConsumableAcceptanceCheckDetailNew'
import ConsumableAcceptanceCheckDetailEdit from '@/components/equipment/consumableacceptancecheck/ConsumableAcceptanceCheckDetailEdit'
import ConsumableAcceptanceCheckMaintenance from '@/components/equipment/consumableacceptancecheck/ConsumableAcceptanceCheckMaintenance'
import ConsumableProcurementDetailNew from '@/components/equipment/consumableprocurement/ConsumableProcurementDetailNew'
import ConsumableProcurementDetailEdit from '@/components/equipment/consumableprocurement/ConsumableProcurementDetailEdit'
import ConsumableProcurementMaintenance from '@/components/equipment/consumableprocurement/ConsumableProcurementMaintenance'
import ConsumableSupplierAssessmentDetailNew from '@/components/equipment/consumablesupplierassessment/ConsumableSupplierAssessmentDetailNew'
import ConsumableSupplierAssessmentDetailEdit from '@/components/equipment/consumablesupplierassessment/ConsumableSupplierAssessmentDetailEdit'
import ConsumableSupplierAssessmentMaintenance from '@/components/equipment/consumablesupplierassessment/ConsumableSupplierAssessmentMaintenance'
import Dashboard from '@/components/reference/Dashboard'
import DepartmentDetailNew from '@/components/sample/department/DepartmentDetailNew'
import DepartmentDetailEdit from '@/components/sample/department/DepartmentDetailEdit'
import DepartmentMaintenance from '@/components/sample/department/DepartmentMaintenance'
import DrawingDesignDetailNew from '@/components/sample/drawingdesign/DrawingDesignDetailNew'
import DrawingDesignDetailEdit from '@/components/sample/drawingdesign/DrawingDesignDetailEdit'
import DrawingDesignMaintenance from '@/components/sample/drawingdesign/DrawingDesignMaintenance'
import '@/components/dynamic-form'
import EditorFormAside from '@/views/editor/form/aside'
import EditorFormMain from '@/views/editor/form/main'
import EditorTableAside from '@/views/editor/table/aside'
import EditorTableMain from '@/views/editor/table/main'
import EquipmentAcceptanceDetailNew from '@/components/equipment/equipmentacceptance/EquipmentAcceptanceDetailNew'
import EquipmentAcceptanceDetailEdit from '@/components/equipment/equipmentacceptance/EquipmentAcceptanceDetailEdit'
import EquipmentAcceptanceMaintenance from '@/components/equipment/equipmentacceptance/EquipmentAcceptanceMaintenance'
import FileUpload from '@/components/reference/FileUpload'
import ForgetPassword from '@/components/system/login/ForgetPassword'
import FormDevelopmentDetailNew from '@/components/system/formdevelopment/FormDevelopmentDetailNew'
import FormDevelopmentDetailEdit from '@/components/system/formdevelopment/FormDevelopmentDetailEdit'
import FormDevelopmentMaintenance from '@/components/system/formdevelopment/FormDevelopmentMaintenance'
import GeneralApplicanceCheckDetailNew from '@/components/equipment/generalapplicancecheck/GeneralApplicanceCheckDetailNew'
import GeneralApplicanceCheckDetailEdit from '@/components/equipment/generalapplicancecheck/GeneralApplicanceCheckDetailEdit'
import GeneralApplicanceCheckMaintenance from '@/components/equipment/generalapplicancecheck/GeneralApplicanceCheckMaintenance'
import GeneralApplicanceRequestDetailNew from '@/components/equipment/generalapplicancerequest/GeneralApplicanceRequestDetailNew'
import GeneralApplicanceRequestDetailEdit from '@/components/equipment/generalapplicancerequest/GeneralApplicanceRequestDetailEdit'
import GeneralApplicanceRequestMaintenance from '@/components/equipment/generalapplicancerequest/GeneralApplicanceRequestMaintenance'
import InternalAuditCheckListDetailNew from '@/components/internalaudit/internalauditchecklist/InternalAuditCheckListDetailNew'
import InternalAuditCheckListDetailEdit from '@/components/internalaudit/internalauditchecklist/InternalAuditCheckListDetailEdit'
import InternalAuditCheckListMaintenance from '@/components/internalaudit/internalauditchecklist/InternalAuditCheckListMaintenance'
import InternalAuditorDetailNew from '@/components/internalaudit/internalauditor/InternalAuditorDetailNew'
import InternalAuditorDetailEdit from '@/components/internalaudit/internalauditor/InternalAuditorDetailEdit'
import InternalAuditorMaintenance from '@/components/internalaudit/internalauditor/InternalAuditorMaintenance'
import login from '@/components/system/login/Login'
import Lims from '@/components/frame/LimsNew'
import ManagementReviewInputMaterialsDetailNew from '@/components/managementreview/managementreviewinputmaterials/ManagementReviewInputMaterialsDetailNew'
import ManagementReviewInputMaterialsDetailEdit from '@/components/managementreview/managementreviewinputmaterials/ManagementReviewInputMaterialsDetailEdit'
import ManagementReviewInputMaterialsMaintenance from '@/components/managementreview/managementreviewinputmaterials/ManagementReviewInputMaterialsMaintenance'
import ManagementReviewYearPlanDetailNew from '@/components/managementreview/managementreviewyearplan/ManagementReviewYearPlanDetailNew'
import ManagementReviewYearPlanDetailEdit from '@/components/managementreview/managementreviewyearplan/ManagementReviewYearPlanDetailEdit'
import ManagementReviewYearPlanMaintenance from '@/components/managementreview/managementreviewyearplan/ManagementReviewYearPlanMaintenance'
import MenuDetailNew from '@/components/system/menu/MenuDetailNew'
import MenuDetailEdit from '@/components/system/menu/MenuDetailEdit'
import MenuMaintenance from '@/components/system/menu/MenuMaintenance'
import NavPage from '@/components/frame/NavPage'
import NumberGeneratorDetailNew from '@/components/sample/numbergenerator/NumberGeneratorDetailNew'
import NumberGeneratorDetailEdit from '@/components/sample/numbergenerator/NumberGeneratorDetailEdit'
import NumberGeneratorMaintenance from '@/components/sample/numbergenerator/NumberGeneratorMaintenance'
import Preview from '@/views/preview/preview'
import ProcessDetailAdd from '@/components/sample/process/ProcessDetailAdd'
import ProcessDetailNew from '@/components/sample/process/ProcessDetailNew'
import ProcessDetailEdit from '@/components/sample/process/ProcessDetailEdit'
import ProcessMaintenance from '@/components/sample/process/ProcessMaintenance'
import ProcessReview from '@/components/sample/process/ProcessReview'
import ProcessingStatusDetailNew from '@/components/sample/processingstatus/ProcessingStatusDetailNew'
import ProcessingStatusDetailEdit from '@/components/sample/processingstatus/ProcessingStatusDetailEdit'
import ProcessingStatusMaintenance from '@/components/sample/processingstatus/ProcessingStatusMaintenance'
import ProcessPriorityDetailNew from '@/components/sample/processpriority/ProcessPriorityDetailNew'
import ProcessPriorityDetailEdit from '@/components/sample/processpriority/ProcessPriorityDetailEdit'
import ProcessPriorityMaintenance from '@/components/sample/processpriority/ProcessPriorityMaintenance'
import ProcurementDetailNew from '@/components/equipment/procurement/ProcurementDetailNew'
import ProcurementDetailEdit from '@/components/equipment/procurement/ProcurementDetailEdit'
import ProcurementMaintenance from '@/components/equipment/procurement/ProcurementMaintenance'
import ProviderDetailNew from '@/components/equipment/provider/ProviderDetailNew'
import ProviderDetailEdit from '@/components/equipment/provider/ProviderDetailEdit'
import ProviderMaintenance from '@/components/equipment/provider/ProviderMaintenance'
import ReportDevelopmentDetailNew from '@/components/report/reportdevelopment/ReportDevelopmentDetailNew'
import ReportDevelopmentDetailEdit from '@/components/report/reportdevelopment/ReportDevelopmentDetailEdit'
import ReportDevelopmentMaintenance from '@/components/report/reportdevelopment/ReportDevelopmentMaintenance'
import ReportElementDetailNew from '@/components/report/reportelement/ReportElementDetailNew'
import ReportElementDetailEdit from '@/components/report/reportelement/ReportElementDetailEdit'
import ReportElementMaintenance from '@/components/report/reportelement/ReportElementMaintenance'
import ReportEnrichmentDetailNew from '@/components/report/reportenrichment/ReportEnrichmentDetailNew'
import ReportEnrichmentDetailEdit from '@/components/report/reportenrichment/ReportEnrichmentDetailEdit'
import ReportEnrichmentMaintenance from '@/components/report/reportenrichment/ReportEnrichmentMaintenance'
import RoleDetailNew from '@/components/system/role/RoleDetailNew'
import RoleDetailEdit from '@/components/system/role/RoleDetailEdit'
import RoleGroupDetailNew from '@/components/system/rolegroup/RoleGroupDetailNew'
import RoleGroupDetailEdit from '@/components/system/rolegroup/RoleGroupDetailEdit'
import RoleGroupMaintenance from '@/components/system/rolegroup/RoleGroupMaintenance'
import RoleMaintenance from '@/components/system/role/RoleMaintenance'
import Schedule from '@/components/equipment/Schedule'
import ShortCut from '@/components/frame/ShortCut'
import SupplierAssessmentDetailNew from '@/components/equipment/supplierassessment/SupplierAssessmentDetailNew'
import SupplierAssessmentDetailEdit from '@/components/equipment/supplierassessment/SupplierAssessmentDetailEdit'
import SupplierAssessmentMaintenance from '@/components/equipment/supplierassessment/SupplierAssessmentMaintenance'
import TableSchedule from '@/components/equipment/MyTableSchedule'
import TaskListMaintenance from '@/components/tasklist/TaskListMaintenance'
import TemplateFileDetailNew from '@/components/sample/templatefile/TemplateFileDetailNew'
import TemplateFileDetailEdit from '@/components/sample/templatefile/TemplateFileDetailEdit'
import TemplateFileMaintenance from '@/components/sample/templatefile/TemplateFileMaintenance'
import TestingBasisDetailNew from '@/components/sample/testingbasis/TestingBasisDetailNew'
import TestingBasisDetailEdit from '@/components/sample/testingbasis/TestingBasisDetailEdit'
import TestingBasisMaintenance from '@/components/sample/testingbasis/TestingBasisMaintenance'
import TestCategoryDetailNew from '@/components/sample/testcategory/TestCategoryDetailNew'
import TestCategoryDetailEdit from '@/components/sample/testcategory/TestCategoryDetailEdit'
import TestCategoryMaintenance from '@/components/sample/testcategory/TestCategoryMaintenance'
import TestedItemDetailNew from '@/components/sample/testeditem/TestedItemDetailNew'
import TestedItemDetailEdit from '@/components/sample/testeditem/TestedItemDetailEdit'
import TestedItemMaintenance from '@/components/sample/testeditem/TestedItemMaintenance'
import TestMethodDetailNew from '@/components/sample/testmethod/TestMethodDetail'
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
import TraceabilityServiceProviderDetailNew from '@/components/equipment/traceabilityserviceprovider/TraceabilityServiceProviderDetailNew'
import TraceabilityServiceProviderDetailEdit from '@/components/equipment/traceabilityserviceprovider/TraceabilityServiceProviderDetailEdit'
import TraceabilityServiceProviderMaintenance from '@/components/equipment/traceabilityserviceprovider/TraceabilityServiceProviderMaintenance'
import UIGenerator from '@/components/develop/UIGenerator'
import UserDetailNew from '@/components/system/user/UserDetailNew'
import UserDetailEdit from '@/components/system/user/UserDetailEdit'
import UserMaintenance from '@/components/system/user/UserMaintenance'
import UnsubmittedTaskListMaintenance from '@/components/tasklist/UnsubmittedTaskListMaintenance'
import WangxingangDetailNew from '@/components/equipment/wangxingang/WangxingangDetailNew'
import WangxingangDetailEdit from '@/components/equipment/wangxingang/WangxingangDetailEdit'
import WangxingangMaintenance from '@/components/equipment/wangxingang/WangxingangMaintenance'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
const router = new Router({
  mode: 'history',
  // base: '/lims/',
  routes: [
    {
      path: '/login/:id/:userName',
      name: 'logon',
      component: login
    },
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
          path: 'agreementDetailNew/:id',
          name: 'agreementDetailEdit',
          component: AgreementDetailNew
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
          path: 'agreementTemplateMaintenance',
          name: 'agreementTemplateMaintenance',
          component: AgreementTemplateMaintenance
        },
        {
          path: 'agreementReport/:id/:companyName',
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
          path: 'availableEquipmentDetailEdit/:id',
          name: 'availableEquipmentDetailEdit',
          component: AvailableEquipmentDetailEdit
        },
        {
          path: 'availableEquipmentDetailNew',
          name: 'availableEquipmentDetailNew',
          component: AvailableEquipmentDetailNew
        },
        {
          path: 'availableEquipmentMaintenance',
          name: 'availableEquipmentMaintenance',
          component: AvailableEquipmentMaintenance
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
          path: 'consumableAcceptanceCheckDetailEdit/:id',
          name: 'consumableAcceptanceCheckAuditorDetailEdit',
          component: ConsumableAcceptanceCheckDetailEdit
        },
        {
          path: 'consumableAcceptanceCheckDetailNew',
          name: 'consumableAcceptanceCheckDetailNew',
          component: ConsumableAcceptanceCheckDetailNew
        },
        {
          path: 'consumableAcceptanceCheckMaintenance',
          name: 'consumableAcceptanceCheckMaintenance',
          component: ConsumableAcceptanceCheckMaintenance
        },
        {
          path: 'consumableProcurementDetailEdit/:id',
          name: 'consumableProcurementAuditorDetailEdit',
          component: ConsumableProcurementDetailEdit
        },
        {
          path: 'consumableProcurementDetailNew',
          name: 'consumableProcurementDetailNew',
          component: ConsumableProcurementDetailNew
        },
        {
          path: 'consumableProcurementMaintenance',
          name: 'consumableProcurementMaintenance',
          component: ConsumableProcurementMaintenance
        },
        {
          path: 'consumableSupplierAssessmentDetailEdit/:id',
          name: 'consumableSupplierAssessmentAuditorDetailEdit',
          component: ConsumableSupplierAssessmentDetailEdit
        },
        {
          path: 'consumableSupplierAssessmentDetailNew',
          name: 'consumableSupplierAssessmentDetailNew',
          component: ConsumableSupplierAssessmentDetailNew
        },
        {
          path: 'consumableSupplierAssessmentMaintenance',
          name: 'consumableSupplierAssessmentMaintenance',
          component: ConsumableSupplierAssessmentMaintenance
        },
        {
          path: 'customerCompanyDetailEdit/:id',
          name: 'customerCompanyDetailEdit',
          component: CustomerCompanyDetailEdit
        },
        {
          path: 'customerCompanyDetailNew',
          name: 'customerCompanyDetailNew',
          component: CustomerCompanyDetailNew
        },
        {
          path: 'customerCompanyMaintenance',
          name: 'customerCompanyMaintenance',
          component: CustomerCompanyMaintenance
        },
        {
          path: 'customerDetailEdit/:id',
          name: 'customerAuditorDetailEdit',
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
          path: 'customerNoteDetailEdit/:id',
          name: 'customerNoteAuditorDetailEdit',
          component: CustomerNoteDetailEdit
        },
        {
          path: 'customerNoteDetailNew',
          name: 'customerNoteDetailNew',
          component: CustomerNoteDetailNew
        },
        {
          path: 'customerNoteMaintenance',
          name: 'customerNoteMaintenance',
          component: CustomerNoteMaintenance
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
          path: 'equipmentAcceptanceDetailEdit/:id',
          name: 'equipmentAcceptanceAuditorDetailEdit',
          component: EquipmentAcceptanceDetailEdit
        },
        {
          path: 'equipmentAcceptanceDetailNew',
          name: 'equipmentAcceptanceDetailNew',
          component: EquipmentAcceptanceDetailNew
        },
        {
          path: 'equipmentAcceptanceMaintenance',
          name: 'equipmentAcceptanceMaintenance',
          component: EquipmentAcceptanceMaintenance
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
          path: 'generalApplicanceCheckDetailEdit/:id',
          name: 'generalApplicanceCheckAuditorDetailEdit',
          component: GeneralApplicanceCheckDetailEdit
        },
        {
          path: 'generalApplicanceCheckDetailNew',
          name: 'generalApplicanceCheckDetailNew',
          component: GeneralApplicanceCheckDetailNew
        },
        {
          path: 'generalApplicanceCheckMaintenance',
          name: 'generalApplicanceCheckMaintenance',
          component: GeneralApplicanceCheckMaintenance
        },
        {
          path: 'generalApplicanceRequestDetailEdit/:id',
          name: 'generalApplicanceRequestAuditorDetailEdit',
          component: GeneralApplicanceRequestDetailEdit
        },
        {
          path: 'generalApplicanceRequestDetailNew',
          name: 'generalApplicanceRequestDetailNew',
          component: GeneralApplicanceRequestDetailNew
        },
        {
          path: 'generalApplicanceRequestMaintenance',
          name: 'generalApplicanceRequestMaintenance',
          component: GeneralApplicanceRequestMaintenance
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
          path: 'managementReviewInputMaterialsDetailEdit/:id',
          name: 'managementReviewInputMaterialsAuditorDetailEdit',
          component: ManagementReviewInputMaterialsDetailEdit
        },
        {
          path: 'managementReviewInputMaterialsDetailNew',
          name: 'managementReviewInputMaterialsDetailNew',
          component: ManagementReviewInputMaterialsDetailNew
        },
        {
          path: 'managementReviewInputMaterialsMaintenance',
          name: 'managementReviewInputMaterialsMaintenance',
          component: ManagementReviewInputMaterialsMaintenance
        },
        {
          path: 'managementReviewYearPlanDetailEdit/:id',
          name: 'managementReviewYearPlanAuditorDetailEdit',
          component: ManagementReviewYearPlanDetailEdit
        },
        {
          path: 'managementReviewYearPlanDetailNew',
          name: 'managementReviewYearPlanDetailNew',
          component: ManagementReviewYearPlanDetailNew
        },
        {
          path: 'managementReviewYearPlanMaintenance',
          name: 'managementReviewYearPlanMaintenance',
          component: ManagementReviewYearPlanMaintenance
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
          path: 'processDetailAdd/:id',
          name: 'processDetailAdd',
          component: ProcessDetailAdd
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
          path: 'processReview/:id',
          name: 'processReview',
          component: ProcessReview
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
          path: 'procurementDetailEdit/:id',
          name: 'procurementAuditorDetailEdit',
          component: ProcurementDetailEdit
        },
        {
          path: 'procurementDetailNew',
          name: 'procurementDetailNew',
          component: ProcurementDetailNew
        },
        {
          path: 'procurementMaintenance',
          name: 'procurementMaintenance',
          component: ProcurementMaintenance
        },
        {
          path: 'providerDetailEdit/:id',
          name: 'providerAuditorDetailEdit',
          component: ProviderDetailEdit
        },
        {
          path: 'providerDetailNew',
          name: 'providerDetailNew',
          component: ProviderDetailNew
        },
        {
          path: 'providerMaintenance',
          name: 'providerMaintenance',
          component: ProviderMaintenance
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
          path: 'reportEnrichmentDetailEdit/:id',
          name: 'reportEnrichmentAuditorDetailEdit',
          component: ReportEnrichmentDetailEdit
        },
        {
          path: 'reportEnrichmentDetailNew',
          name: 'reportEnrichmentDetailNew',
          component: ReportEnrichmentDetailNew
        },
        {
          path: 'reportEnrichmentMaintenance',
          name: 'reportEnrichmentMaintenance',
          component: ReportEnrichmentMaintenance
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
          path: 'supplierAssessmentDetailEdit/:id',
          name: 'supplierAssessmentAuditorDetailEdit',
          component: SupplierAssessmentDetailEdit
        },
        {
          path: 'supplierAssessmentDetailNew',
          name: 'supplierAssessmentDetailNew',
          component: SupplierAssessmentDetailNew
        },
        {
          path: 'supplierAssessmentMaintenance',
          name: 'supplierAssessmentMaintenance',
          component: SupplierAssessmentMaintenance
        },
        {
          path: 'tableSchedule',
          name: 'tableSchedule',
          component: TableSchedule
        },
        {
          path: 'taskListMaintenance',
          name: 'taskListMaintenance',
          component: TaskListMaintenance
        },
        {
          path: 'templateFileDetailEdit/:id',
          name: 'templateFileAuditorDetailEdit',
          component: TemplateFileDetailEdit
        },
        {
          path: 'templateFileDetailNew',
          name: 'templateFileDetailNew',
          component: TemplateFileDetailNew
        },
        {
          path: 'templateFileMaintenance',
          name: 'templateFileMaintenance',
          component: TemplateFileMaintenance
        },
        {
          path: 'testingBasisDetailEdit/:id',
          name: 'testingBasisDetailEdit',
          component: TestingBasisDetailEdit
        },
        {
          path: 'testingBasisDetailNew',
          name: 'testingBasisDetailNew',
          component: TestingBasisDetailNew
        },
        {
          path: 'testingBasisMaintenance',
          name: 'testingBasisMaintenance',
          component: TestingBasisMaintenance
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
          component: TestMethodDetailNew
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
          path: 'traceabilityServiceProviderDetailEdit/:id',
          name: 'traceabilityServiceProviderAuditorDetailEdit',
          component: TraceabilityServiceProviderDetailEdit
        },
        {
          path: 'traceabilityServiceProviderDetailNew',
          name: 'traceabilityServiceProviderDetailNew',
          component: TraceabilityServiceProviderDetailNew
        },
        {
          path: 'traceabilityServiceProviderMaintenance',
          name: 'traceabilityServiceProviderMaintenance',
          component: TraceabilityServiceProviderMaintenance
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
          path: 'unsubmittedTaskListMaintenance',
          name: 'unsubmittedTaskListMaintenance',
          component: UnsubmittedTaskListMaintenance
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
          path: 'wangxingangDetailEdit/:id',
          name: 'wangxingangAuditorDetailEdit',
          component: WangxingangDetailEdit
        },
        {
          path: 'wangxingangDetailNew',
          name: 'wangxingangDetailNew',
          component: WangxingangDetailNew
        },
        {
          path: 'wangxingangMaintenance',
          name: 'wangxingangMaintenance',
          component: WangxingangMaintenance
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
      redirect: 'login/first'
    }
  ]
})

export default router
