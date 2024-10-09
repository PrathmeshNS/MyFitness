import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salutation'
})
export class SalutationPipe implements PipeTransform {

  transform(gender: String,name:String): String {
    if (gender.toLowerCase() =='male') { 
      return "Mr. "+name;
    } else {
      return "Ms. "+name;
    }
  }

}
