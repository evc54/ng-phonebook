import shortid from "shortid";

import { ExtraField  } from "./extra-field.model";

export class Contact {
  constructor(
    public id: string = shortid(),
    public name: string = '',
    public surname: string = '',
    public phone: string = '',
    public extra: ExtraField[] = []
  ) {}
}
