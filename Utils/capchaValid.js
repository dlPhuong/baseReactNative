export function capchaValid(capcha,capchaValid) {
    if (!capcha) return "capcha không được để trống"
    if (capcha!=capchaValid && capcha) return 'Capcha không đúng'
    return ''
  }