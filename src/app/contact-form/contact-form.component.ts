import cloneDeep from 'lodash.clonedeep';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '@@models/contact.model';
import { ContactService } from '@@services/contacts.service';
import { ExtraField } from '@@models/extra-field.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contact!: Contact;
  isNewContact: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const contact = this.contactService.getContact(id); 
    if (contact) {
      this.contact = cloneDeep(contact);
      this.isNewContact = false;
    } else {
      this.contact = new Contact();
    }
  }

  createExtraField(field: ExtraField): void {
    this.contact.extra.push(field);
  }

  removeExtraField(index: number): void {
    this.contact.extra.splice(index);
  }

  onSubmit(form: NgForm): void {
    this.contactService.updateContact(this.contact);
    this.router.navigate(['contacts']);
  }
}
