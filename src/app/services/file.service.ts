import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080/files';

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  signFile(fileId: number, privateKey: string) {
    return this.http.post(`${this.baseUrl}/sign/${fileId}`, { privateKey }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  verifySignature(fileId: number, publicKey: string) {
    return this.http.post(`${this.baseUrl}/verify/${fileId}`, { publicKey }, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  // Dentro de FileService

  getFiles(): Observable<any[]> { // Asegúrate de que el tipo sea un arreglo
    return this.http.get<any[]>(`${this.baseUrl}/files`); // Ajusta la ruta según tu API
  }
}
