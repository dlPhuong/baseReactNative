export function identityValid(identity) {
  const re = /^[0-9]+$/
    if (!identity) return "không được bỏ trống trường này"
    if (identity.lenght <= 8 || identity.lenght >= 14) return "bạn đang nhập sai cccd/cmt"
    if (!re.test(identity)) return 'bạn nhập chữ rồi bro'
    return ''
  }