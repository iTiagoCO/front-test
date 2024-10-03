import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-sign',
  templateUrl: './file-sign.component.html',
  styleUrls: ['./file-sign.component.css']
})
export class FileSignComponent implements OnInit {

  files: any[] = [];
  selectedFileId: number | null = null;
  privateKey: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.getFiles().subscribe(
      (data: any[]) => {
        this.files = data;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los archivos';
      }
    );
  }

  onSign(): void {
    if (this.selectedFileId && this.privateKey) {
      this.fileService.signFile(this.selectedFileId, this.privateKey).subscribe(
        () => {
          this.successMessage = 'Archivo firmado exitosamente';
          this.privateKey = '';
        },
        (error) => {
          this.errorMessage = 'Error al firmar el archivo';
        }
      );
    }
  }
}
