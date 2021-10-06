import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '@@models/contact.model';
import { ContactService } from '@@services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    if (!this.contactService.populated) {
      this.router.navigate(['']);
      return;
    }

    this.contacts = this.contactService.getContacts();
  }

  onUpdate(contact: Contact): void {
    this.router.navigate(['contact', contact.id]);
  }
}
