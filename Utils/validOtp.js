export function validOtp(otp,otpValid) {
    if (!otp) return "OTP không được để trống"
    if (otp!=otpValid && otp!=null) return 'OTP không đúng'
    return ''
  }