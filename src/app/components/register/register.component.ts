import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', // Asegúrate de que esta ruta es correcta
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]  // Importar ReactiveFormsModule aquí
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Agrega Router aquí
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }
      this.authService.register(username, password).subscribe(
        () => {
          this.successMessage = 'Usuario registrado exitosamente';
          this.registerForm.reset();
          this.router.navigate(['/login']); // Redirige al login después de un registro exitoso
        },
        (error) => {
          this.errorMessage = error.error.message || 'Error al registrar el usuario'; // Muestra el mensaje de error específico
        }
      );
    }
  }
}
