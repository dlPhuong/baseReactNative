export function capchaValid(capcha,capchaValid) {
    if (!capcha) return "capcha không được để trống"
    if (capcha!=capchaValid && capcha!=null) return 'Capcha không đúng'
    return ''
  }