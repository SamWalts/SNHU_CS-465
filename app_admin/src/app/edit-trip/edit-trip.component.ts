import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css',
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert('Something wrong, cannot find where I stashed tripCode!');
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:' + tripCode);
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.tripDataService
      .getTrip(tripCode)
      .then((value: any) => {
        this.trip = value;
        // Populate the record into the form
        this.editForm.patchValue(value[0]);
        if (!value) {
          this.message = 'No trip found!';
        } else {
          this.message = 'Trip ' + tripCode + ' retrieved!';
        }
        console.log(this.message);
      })
      .catch((error: any) => {
        console.log('Error: ' + error);
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).then((formData) => {
        console.log('TripEditComponent#onSubmit data', formData);
        this.router.navigate(['list-trips']);
      });
    }
  }
  get f() {
    return this.editForm.controls;
  }
}
