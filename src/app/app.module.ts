import { NgxMaskModule } from 'ngx-mask'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { ExtraFieldFormatPipe } from '@@pipes/extra-field-format.pipe';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactListManageComponent } from './contact-list-manage/contact-list-manage.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactFormExtraComponent } from './contact-form-extra/contact-form-extra.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
};

@NgModule({
  declarations: [
    ExtraFieldFormatPipe,
    AppComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactListManageComponent,
    ContactFormComponent,
    ContactFormExtraComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: globalRippleConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
