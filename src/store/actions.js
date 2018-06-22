import {reqData} from '../tools'

export default {
  async getData({commit},cb) {
    const result = await reqData({
      buildcode:'3506I0006',
      starttime:'2018-05-19+09%3A34%3A12',
      endtime:'2018-06-20+09%3A34%3A12',
      timetype:'day'
    })
    commit('receiveData', {data01: result})
    cb && cb()
  }
}
