import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  registrationForm: FormGroup;
  submitted = false;
  submitSuccess = false;

  skills = [
    'JavaScript', 'TypeScript', 'Angular', 'React',
    'Node.js', '.NET Core', 'SQL', 'Python', 'Java', 'Azure'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      yearsOfExperience: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      skills: [[], Validators.required]
    });
  }

  // helper to easily access form fields in the HTML
  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    const formData = this.registrationForm.value;

    this.http.post('http://localhost:5198/api/profile/submit', formData)
      .subscribe({
        next: () => {
          this.submitSuccess = true;
        },
        error: (err) => {
          console.error('Submit failed', err);
        }
      });
  }

  onReset() {
  this.submitted = false;
  this.submitSuccess = false;
  this.registrationForm.reset();
  }
}

