import { NgModule } from '@angular/core';
import { ApplicationConfig } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripDataService } from './services/trip-data.service';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

export const appConfig: ApplicationConfig = {
  providers: [TripDataService],
};

@NgModule({
  declarations: [
    TripListingComponent,
    TripCardComponent,
    AddTripComponent,
    AppComponent,
    EditTripComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule, // Add CommonModule to imports
  ],
  providers: [TripDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
