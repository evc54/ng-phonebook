import escape from 'lodash.escape';
import { Pipe, PipeTransform } from '@angular/core';

import { ExtraFieldType } from '@@models/extra-field.model';

@Pipe({ name: 'extraFieldFormat' })
export class ExtraFieldFormatPipe implements PipeTransform {
  transform(value: string, type: ExtraFieldType = ExtraFieldType.Phone): string {
    switch (type) {
      // get international format for phone numbers
      case ExtraFieldType.Phone:
        return value.replace(/^(\d)(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');

      // remove protocol prefix & trailing slash for urls
      case ExtraFieldType.Link:
        const url = new URL(value);
        const path = url.pathname.endsWith('/') ? url.pathname.substr(0, -1) : url.pathname;
        return `${url.host}${path}`;

      // escape html control characters and convert new lines to <br> tags
      // returns html
      case ExtraFieldType.Text:
        return escape(value.trim()).replace(/(?:\r\n|\r|\n)/g, '<br>');

      // otherwise return just plain value
      default:
        return value;
    }
  }
}
