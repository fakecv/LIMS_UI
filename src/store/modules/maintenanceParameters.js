export default {
  state: {
    processRequestForm: {
      agreementNumber: '',
      sampleNumber: '',
      sampleSubNumber: '',
      comment: '',
      processPriority: '',
      submitTime: '',
      drawingDesign: '',
      submitFrom: '',
      processingStatus: '',
      submitTo: '',
      itemsPerPage: 20,
      currentPage: 1
    },
    agreementRequestForm: {
      agreementNumber: '',
      done: 'false',
      sampleName: '',
      experimentalCategory: '',
      itemsPerPage: 20,
      currentPage: 1
    }
  },
  mutations: {
    query (state, { fid, requestForm }) {
      state[fid] = requestForm
    }
  }
}
