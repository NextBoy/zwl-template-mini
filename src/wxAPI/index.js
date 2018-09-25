export const wxAPI = (wxApi, config = {}) => {
  return new Promise((resolve, reject) => {
    wx[wxApi]({
      ...config,
      success: res => {
        if (wxApi === 'request') {
          resolve(res.data)
        } else {
          resolve(res)
        }
      },
      fail: err => reject(err)
    })
  })
}
