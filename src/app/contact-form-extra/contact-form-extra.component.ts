import { Component, Output, EventEmitter } from '@angular/core';

import { ExtraField, ExtraFieldType } from '@@models/extra-field.model';

@Component({
  selector: 'app-contact-form-extra',
  templateUrl: './contact-form-extra.component.html',
  styleUrls: ['./contact-form-extra.component.scss']
})
export class ContactFormExtraComponent {
  @Output() onCreate = new EventEmitter<ExtraField>();

  field: ExtraField = new ExtraField();
  visible: Boolean = false;

  extraFieldTypes = [
    { title: 'Text', value: ExtraFieldType.Text },
    { title: 'Phone number', value: ExtraFieldType.Phone },
    { title: 'Link', value: ExtraFieldType.Link },
  ];

  get isLink() {
    return this.field.type === ExtraFieldType.Link;
  }

  get isValidated() {
    return Boolean(this.isLink || this.field.label);
  }

  onToggle(): void {
    this.visible = !this.visible;
    if (this.visible) this.field = new ExtraField();
  }

  onSubmit(): void {
    if (!this.isValidated) return;
    this.onCreate.emit(this.field);
    this.visible = false;
  }
}
