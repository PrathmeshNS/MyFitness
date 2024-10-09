import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  private maleImage: string[] = ["assets/maleUserImage.png", "assets/maleUserImage2.png", "assets/maleUserImage3.png", "assets/maleUserImage4.png", "assets/maleUserImage5.png", "assets/maleUserImage6.png"]

  private femaleImage: string[] = ["assets/femaleUserImage.png", "assets/femaleUserImage2.png", "assets/femaleUserImage3.png", "assets/femaleUserImage4.png", "assets/femaleUserImage5.png", "assets/femaleUserImage6.png"]

  generateRandomeIndex() {
    const randomIndex = Math.floor(Math.random() * this.maleImage.length);
    return randomIndex
  }
  

  transform(gender: string): string {
    if (gender.toLowerCase() == "male") {
      return this.maleImage[this.generateRandomeIndex()]
    }
    else {
      return this.femaleImage[this.generateRandomeIndex()]
    }
  }

}
