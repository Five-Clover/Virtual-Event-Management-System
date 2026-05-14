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

import { SpeakerService }
from '../../../services/speaker';

import { CreateSpeaker }
from '../../../models/create-speaker.model';

@Component({
  selector: 'app-speaker-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './speaker-form.html',
  styleUrl: './speaker-form.css'
})
export class SpeakerForm
implements OnInit {

  speakerId = '';

  isEditMode = false;

  existingSpeakers: any[] = [];

  errorMessage = '';

  model: CreateSpeaker = {

    speakerName: ''
  };

  successMessage = '';

  constructor(

    private speakerService: SpeakerService,

    private route: ActivatedRoute,

    private router: Router,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadExistingSpeakers();

    this.speakerId =
      this.route.snapshot.params['id'];

    if (this.speakerId) {

      this.isEditMode = true;

      this.loadSpeaker();
    }
  }

  loadExistingSpeakers() {

    this.speakerService
      .getAll()
      .subscribe({

        next: (response) => {

          this.existingSpeakers =
            response;
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadSpeaker() {

    this.speakerService
      .getById(this.speakerId)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.model = {

            speakerName:
              response.speakerName
          };

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);

          alert(
            JSON.stringify(error)
          );
        }
      });
  }

  saveSpeaker() {

    // REQUIRED

    if (!this.model.speakerName) {

      this.errorMessage =

        'Speaker name is required';

      return;
    }

    // LENGTH

    if (
      this.model.speakerName.length < 3
    ) {

      this.errorMessage =

        'Speaker name must contain at least 3 characters';

      return;
    }

    // DUPLICATE

    const duplicate =

      this.existingSpeakers.find(x =>

        x.speakerName
          .toLowerCase()

        ===

        this.model.speakerName
          .toLowerCase()
      );

    if (
      duplicate &&
      !this.isEditMode
    ) {

      
      this.errorMessage =

        'Speaker already exists';

      return;
    }

    // CLEAR ERROR

    this.errorMessage = '';

    console.log(this.model);

    // UPDATE

    if (this.isEditMode) {

      this.speakerService
        .update(
          this.speakerId,
          this.model
        )
        .subscribe({

          next: (response) => {

            console.log(response);

            this.showSuccess('Speaker updated successfully');

            setTimeout(() => {
            this.router.navigateByUrl(
              '/speakers'
            );}, 1500);
          },

          error: (error) => {

            console.log(error);

            this.showError('Failed to update speaker');
            
          }
        });
    }

    // CREATE

    else {

      this.speakerService
        .create(this.model)
        .subscribe({

          next: (response) => {

            console.log(response);

            this.showSuccess('Speaker created successfully');
            
            setTimeout(() => {
            this.router.navigateByUrl(
              '/speakers'
            );}, 1500);
            
          },

          error: (error) => {

            console.log(error);

            this.showError('Failed to create speaker');
            
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