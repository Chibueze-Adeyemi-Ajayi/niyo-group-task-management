export function generateOTP(length:number = 4) {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      const randomDigit = digits[randomIndex];
      otp += randomDigit;
    }
  
    return otp;
  }

  export function htmlWrapper(content:string) {
    return `<div style='background:#eee'>
        <div style='padding:20px; width:200px; min-height:300px; margin:auto; line-spacing:20px; font-size: 18px; background:#fff'>
            ${content}
        </div>
    </div>`;
  }