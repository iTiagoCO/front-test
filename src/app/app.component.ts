import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterModule, AppComponent]
})
export class AppComponent {
  title = 'diplomado-frontend-proyecto';
  codeKey: string = '';
  publicKey: string | null = null; 
  myForm: FormGroup;  // Asegúrate de que esta línea esté presente

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.myForm = this.fb.group({  // Asegúrate de que esta línea esté presente
      name: ['', Validators.required]
    });
  }

}
