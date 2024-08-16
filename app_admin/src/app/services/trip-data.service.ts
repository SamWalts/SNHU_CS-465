import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  apiBaseUrl = 'http://localhost:3000/api'; // Add the 'apiBaseUrl' property
  url = `${this.apiBaseUrl}/trips/`; // Update the 'url' property

  public getTrip(tripCode: string): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrip');
    return this.http
      .get(this.url + tripCode)
      .toPromise()
      .then((response) => response as Trip)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get(this.url)
      .toPromise()
      .then((response) => response as Trip[])
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('travlr-token')}`,
      }),
    };
    console.log('Inside TripDataService#addTrip');
    console.log(formData);
    return this.http
      .post(this.url, formData, httpOptions)
      .toPromise()
      .then((response) => response as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('travlr-token')}`,
      }),
    };
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put(this.url + formData.code, formData, httpOptions)
      .toPromise()
      .then((response) => response as Trip[])
      .catch(this.handleError);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
  private async makeAuthApiCall(
    urlPath: string,
    user: User
  ): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response as AuthResponse)
      .catch(this.handleError);
  }
  //   try {
  //     const response = await this.http
  //       .post<AuthResponse>(url, user)
  //       .toPromise();
  //     if (response) {
  //       return response;
  //     } else {
  //       throw new Error('Response is undefined');
  //     }
  //   } catch (error) {
  //     return this.handleError(error);
  //   }
  // }
}
