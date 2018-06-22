import {reqData} from '../tools'

export default {
  async getData({commit},cb) {
    const result = await reqData()
    commit('receiveData', {data01: result})
    cb && cb()
  }
}
