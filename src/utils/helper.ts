export const Logger = (message: any, params?: any) => console.log(message, params);

export function convertLang(str: string) {
    // bắt đầu xóa dấu tiếng việt  trong chuỗi
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  }
  export const handleClearSpecialCharacter = (str: string) => {
    const newStr = convertLang(str);
    return newStr;
  };
  
  // export const handleClearSpecialCharacter = (str: string) => {
  //   return str
  //     .normalize('NFD')
  //     .replace(/[\u0300-\u036f]/g, '')
  //     .replace(/đ/g, 'd')
  //     .replace(/Đ/g, 'D');
  // };
  export function removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }
  
  export function convertTimeToFacebookStyle(inputTime: any) {
    const inputDate:any = new Date(inputTime);
    const currentDate:any = new Date();
    const timeDifference: any = currentDate - inputDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
  
    if (secondsDifference < 60) {
      return `Vừa xong`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference} phút trước`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference} giờ trước`;
    } else if (secondsDifference < 604800) {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference} ngày trước`;
    } else if (secondsDifference < 2419200) {
      const weeksDifference = Math.floor(secondsDifference / 604800);
      return `${weeksDifference} tuần trước`;
    } else if (secondsDifference < 29030400) {
      const monthsDifference = Math.floor(secondsDifference / 2419200);
      return `${monthsDifference} tháng trước`;
    } else {
      const yearsDifference = Math.floor(secondsDifference / 29030400);
      return `${yearsDifference} năm trước`;
    }
  };
  export const delay = async (ms: any) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
};