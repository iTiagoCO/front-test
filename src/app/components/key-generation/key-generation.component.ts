import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-key-generation',
    templateUrl: './key-generation.component.html',
    styleUrls: ['./key-generation.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, CommonModule, RouterModule, AppComponent]
  })
  export class KeyGenerationComponent implements OnInit {
  title = 'diplomado-frontend-proyecto';
  codeKey: string = '';
  publicKey: string | null = null; 
  myForm: FormGroup;  // Asegúrate de que esta línea esté presente

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.myForm = this.fb.group({  // Asegúrate de que esta línea esté presente
      name: ['', Validators.required]
    });
  }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  generateKey() {
    const body = { codeKey: this.myForm.value.name };
  
    this.http.post('http://localhost/api/v1/user', body, { responseType: 'text' })
      .subscribe(
        (response: string) => {
          console.log('Respuesta del servidor:', response);
          this.publicKey = response;
        },
        (error: any) => {  // Asegúrate de tipar el error como `any`
          console.error('Error al generar la llave:', error);
        }
      );
  }
}
