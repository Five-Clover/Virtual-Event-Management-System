import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { EventService }
from '../../../services/event';

import { CategoryService }
from '../../../services/category';

import { Category }
from '../../../models/category.model';

import { CreateEvent }
from '../../../models/create-event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css'
})
export class EventForm
implements OnInit {

  categories: Category[] = [];

  existingEvents: any[] = [];

  eventId = '';

  isEditMode = false;

  model: CreateEvent = {

    eventName: '',

    categoryId: '',

    eventDate: new Date(),

    description: '',

    status: 'Active'
  };

  errorMessage = '';

  successMessage = '';

  constructor(

    private eventService: EventService,

    private categoryService: CategoryService,

    private router: Router,

    private route: ActivatedRoute,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.eventId =
      this.route.snapshot.params['id'];

    this.loadExistingEvents();

    this.loadCategories();
  }

  loadExistingEvents() {

    this.eventService
      .getAll()
      .subscribe({

        next: (response) => {

          this.existingEvents =
            response;
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadCategories() {

    this.categoryService
      .getAll()
      .subscribe({

        next: (response) => {

          console.log(response);

          this.categories =
            response;

          this.cdr.detectChanges();

          if (this.eventId) {

            this.isEditMode = true;

            this.loadEvent();
          }
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadEvent() {

    this.eventService
      .getById(this.eventId)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.model = {

            eventName:
              response.eventName,

            categoryId:
              response.categoryId?.toString(),

            eventDate:
              response.eventDate,

            description:
              response.description,

            status:
              response.status
          };

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  saveEvent() {

    console.log(this.model);

    // EVENT NAME

    if (!this.model.eventName) {

      this.errorMessage =
        'Event name is required';

      return;
    }

    // CATEGORY

    if (!this.model.categoryId) {

      this.errorMessage =
        'Please select category';

      return;
    }

    // FUTURE DATE

    const today = new Date();

    today.setHours(
      0, 0, 0, 0
    );

    const selectedDate =

      new Date(
        this.model.eventDate
      );

    if (
      selectedDate < today
    ) {

      this.errorMessage =

        'Event date cannot be in the past';

      return;
    }

    // DUPLICATE EVENT

    const duplicate =

      this.existingEvents.find(x =>

        x.eventName
          .toLowerCase()

        ===

        this.model.eventName
          .toLowerCase()
      );

    if (
      duplicate &&
      !this.isEditMode
    ) {

      this.errorMessage =

        'Event already exists';

      return;
    }

    // CLEAR ERROR

    this.errorMessage = '';

    // UPDATE

    if (this.isEditMode) {

      this.eventService
        .update(
          this.eventId,
          this.model
        )
        .subscribe({

          next: (response) => {

            console.log(response);

            this.showSuccess('Event updated successfully');

            setTimeout(() => {
            this.router.navigateByUrl(
              '/events'
            );}, 1500);
          },

          error: (error) => {

            console.log(error);

           
              this.showError(
              'Failed to update event');
           
            
          }
        });

    }

    // CREATE

    else {

      this.eventService
        .create(this.model)
        .subscribe({

          next: (response) => {

            console.log(response);

            this.showSuccess('Event created successfully');
            
            setTimeout(() => {
            this.router.navigateByUrl(
              '/events'
            );}, 1500);
          },

          error: (error) => {

            console.log(error);

            
              this.showError('Failed to create event');
            
            
          }
        });
    }
  }

  showSuccess(message: string) {

    this.errorMessage = '';

    this.successMessage = '';

    this.cdr.detectChanges();

    this.successMessage = message;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.successMessage = '';

      this.cdr.detectChanges();

    }, 3000);
  }

  showError(message: string) {

    this.successMessage = '';

    this.errorMessage = '';

    this.cdr.detectChanges();

    this.errorMessage = message;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.errorMessage = '';

      this.cdr.detectChanges();

    }, 3000);
    }
}