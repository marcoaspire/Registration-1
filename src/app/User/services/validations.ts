import { FormControl } from '@angular/forms';

export const fullNamePattern:string ='([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const  isValidDate  = (control:FormControl) =>{
  const DATE_REGEXP = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  var date = new Date(control.value);

  if (compareDates(date))
  {
    return DATE_REGEXP.test(control.value) || control.value === '' ? null : {
      validateDate: {
        valid: false
      }
    };
  }
  return {
    validateDate: {
      valid: false
    }
  }
}


function compareDates(date:Date):boolean{
  var now = new Date();

  if (now.getFullYear() === date.getFullYear()
  && now.getUTCDate() === date.getUTCDate()
  && now.getMonth() === date.getMonth())
    return true;
  else
  return  now>date;
}



export const matchPassword  = (control:FormControl) =>{
  if (control.value.Password === control.value.ConfirmPassword &&  control.value.Password!= '' )
    return true;
  return { notmatched: true };
}
