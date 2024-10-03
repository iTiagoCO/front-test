import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-verify',
  templateUrl: './file-verify.component.html',
  styleUrls: ['./file-verify.component.css']
})
export class FileVerifyComponent implements OnInit {

  files: any[] = [];
  selectedFileId: number | null = null;
  publicKey: string = '';
  verificationResult: string = '';
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

  onVerify(): void {
    if (this.selectedFileId && this.publicKey) {
      this.fileService.verifySignature(this.selectedFileId, this.publicKey).subscribe(
        (response: any) => {
          this.verificationResult = response.message;
          this.publicKey = '';
        },
        (error) => {
          this.errorMessage = 'Error al verificar la firma';
        }
      );
    }
  }
}
