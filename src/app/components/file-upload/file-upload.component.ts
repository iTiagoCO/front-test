// file-upload.component.ts

import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fileService: FileService) {}

  // Método para manejar la selección del archivo
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Método para subir el archivo
  onUpload(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        () => {
          this.successMessage = 'Archivo subido exitosamente';
          this.selectedFile = null;
        },
        (error) => {
          this.errorMessage = 'Error al subir el archivo';
        }
      );
    }
  }
}
