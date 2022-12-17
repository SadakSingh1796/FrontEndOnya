import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { OnyaComponent } from 'app/onya/onya.component';
import { CustomerComponent } from 'app/customer/customer.component';
import { BrowserModule } from '@angular/platform-browser';
import {DialogModule} from 'primeng/dialog';
import { DialogCusDocumentComponent } from 'app/customer/dialog-cus-document/dialog-cus-document.component';
import { InputSwitchModule } from "primeng/inputswitch";
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';
import {TableModule} from 'primeng/table';
import { ProductService } from 'app/customer/productservice';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BusinessComponent } from 'app/business/business.component';
import { TabViewModule } from 'primeng/tabview';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DialogModule,
    InputSwitchModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArEmz3j2sLeBl3rCRQngoykAZfRxpP4rE',
      libraries: ['places']
    }),
    TableModule,
    MultiSelectModule,
    CalendarModule,
    // BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TabViewModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    OnyaComponent,
    CustomerComponent,
    DialogCusDocumentComponent,
    BusinessComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers: [ProductService]
})

export class AdminLayoutModule {}
