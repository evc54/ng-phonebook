import { Injectable } from '@angular/core';

import { Contact } from '@@models/contact.model';
import { ExtraField } from '@@models/extra-field.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  public populated: Boolean = false;

  constructor() {}

  async importDefaultData(): Promise<void> {
    const defaultData = (await import('./contacts.default.json')).default;
    this.importData(defaultData);
  }

  // make models from json parsed data
  importData(data: Array<any>): void {
    this.contacts = data.map(
      contact => new Contact(
        contact.id,
        contact.name,
        contact.surname,
        contact.phone,
        ('extra' in contact && contact.extra || []).map((extra: any) => new ExtraField(extra.type, extra.value, extra.label))
      )
    );
    this.populated = true;
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  updateContact(contact: Contact): void {
    const index = this.contacts.findIndex(({ id }) => id === contact.id);
    if (index === -1) this.contacts.push(contact); // new contact
    else this.contacts.splice(index, 1, contact); // existing contact
  }

  destroyContacts(): void {
    this.contacts = [];
  }
}
