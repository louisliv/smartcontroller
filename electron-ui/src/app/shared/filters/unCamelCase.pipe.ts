import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unCamelCase'
})
export class UnCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    var words = value.match(/[A-Za-z][a-z]*/g) || [];
  
    return words.map(this.capitalize).join(" ");
  }
  
  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }
}