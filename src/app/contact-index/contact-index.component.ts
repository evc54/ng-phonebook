import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '@@services/contacts.service';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.scss']
})
export class ContactIndexComponent implements OnInit {
  pending: Boolean = false;

  constructor(
    private router: Router,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    if (this.contactService.populated) this.toContactPage();
  }
  
  toContactPage(): void {
    this.router.navigate(['contacts']);
  }

  chooseJsonFile(): void {
    var file = document.createElement('input');
    file.type = 'file';
    file.accept = 'application/json';
    file.onchange = () => {
      file.files?.length && this.uploadJsonFile(file.files[0]);
    };
    file.click();
  }

  // uploads, parses and then imports json file
  // no error control implemented!
  uploadJsonFile(file: File): void {
    this.pending = true;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onerror = () => {
      this.pending = false;
    };
    fileReader.onload = ($event: ProgressEvent<FileReader>) => {
      try {
        const result: any = $event.target?.result;
        const data = JSON.parse(result);
        this.contactService.importData(data);
      } catch (err) {
        this.pending = false;
      }
      if (this.contactService.populated) this.toContactPage();
    };
  }

  async onChooseSource($event: Event, defaultData: boolean = true): Promise<void> {
    $event.preventDefault();

    if (!defaultData) return this.chooseJsonFile();

    this.pending = true;
    await this.contactService.importDefaultData();
    if (this.contactService.populated) this.toContactPage()
  }
}
