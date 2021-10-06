import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '@@services/contacts.service';

@Component({
  selector: 'app-contact-list-manage',
  templateUrl: './contact-list-manage.component.html',
  styleUrls: ['./contact-list-manage.component.scss'],
})
export class ContactListManageComponent {
  constructor(
    private router: Router,
    private contactService: ContactService
  ) {}

  // create blob, convert it to data uri object and download locally as json file
  // dumb approach and also may be slow on large data sets
  onDownload(): void {
    const contacts = this.contactService.getContacts();
    const json = JSON.stringify(contacts, null, 2);
    const blob = new Blob([ json ], { type : 'application/json' });
    const uri = URL.createObjectURL(blob);

    const el = document.createElement('a');
    document.body.appendChild(el);
    el.style.display = 'none';
    el.download = 'contacts.json';
    el.href = uri;
    el.click();

    // unload data uri object
    URL.revokeObjectURL(uri);

    // remove link el from dom
    setTimeout(() => document.body.removeChild(el), 10000);
  }

  // clean up phonebook records
  onClear(): void {
    this.contactService.destroyContacts();
    this.router.navigate(['']);
  }
}
