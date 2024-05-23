import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

  transform(value: number, maxStars: number = 5): string {
    const fullStar = '<i class="fa fa-star"></i>';
    const halfStar = '<i class="fa fa-star-half-o"></i>';
    const emptyStar = '<i class="fa fa-star-o"></i>';
    let stars = '';

    for (let i = 1; i <= maxStars; i++) {
      if (i <= value) {
        stars += fullStar;
      } else if (i === Math.ceil(value) && value % 1 !== 0) {
        stars += halfStar;
      } else {
        stars += emptyStar;
      }
    }

    return stars;
  }

}
