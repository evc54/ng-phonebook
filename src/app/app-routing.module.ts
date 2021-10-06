import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  { path: '', component: ContactIndexComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contact/new', component: ContactFormComponent },
  { path: 'contact/:id', component: ContactFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
