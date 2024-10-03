import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Sujeto para el estado de inicio de sesión

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        this.saveToken(response.token); // Guarda el token recibido
        this.isLoggedInSubject.next(true); // Actualiza el estado de inicio de sesión
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false); // Actualiza el estado de inicio de sesión
    this.router.navigate(['/login']); // Redirige al login
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Devuelve true si hay un token
  }

  // Método para observar el estado de inicio de sesión
  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
