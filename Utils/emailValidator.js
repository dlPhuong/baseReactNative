export function emailValidator(email) {
    const re = /((09|03|07|08|05)+([0-9]{8})\b)/g
    if (!email) return "số điện thoại không được để trống"
    if (!re.test(email)) return 'oh no hình như số điện thoại bạn nhập không đúng rồi bro'
    return ''
  }