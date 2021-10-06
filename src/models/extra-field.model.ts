export enum ExtraFieldType {
  Text = 'text',
  Phone = 'phone',
  Link = 'link',
}

export class ExtraField {
  constructor(
    public type: ExtraFieldType = ExtraFieldType.Text,
    public value: string = '',
    public label?: string,
  ) {}
  
  get isText() {
    return this.type === ExtraFieldType.Text;
  }
  
  get isPhone() {
    return this.type === ExtraFieldType.Phone;
  }

  get isLink() {
    return this.type === ExtraFieldType.Link;
  }
}
