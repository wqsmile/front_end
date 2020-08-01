const cookie = {
  // 设置cookie
  set(name, value, time) {
    // const endDate = new Date()
    // endDate.setDate(endDate.getDate() + time) // time为天数
    // document.cookie = `${name}=${value}; expires=${endDate}`
    document.cookie = `${name}=${value}; max-age=${time}`
  },
  // 获取cookie
  get(name) {
    if (document.cookie) {
      return document.cookie.split('; ').filter(item => item.split('=')[0] === name)[0].split('=')[1]
    }   
  },
  // 移除cookie
  remove(name) {
    this.set(name, '', 0)
  },
  // 清空cookie
  clear() {
    document.cookie.split('; ').forEach(item => this.remove(item.split('=')[0]))
  }
}