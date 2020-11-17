import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(data: any[]): any[] {
    return data.slice().reverse();
  }

}
