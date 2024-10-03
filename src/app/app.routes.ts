import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileSignComponent } from './components/file-sign/file-sign.component';
import { FileVerifyComponent } from './components/file-verify/file-verify.component';
import { KeyGenerationComponent } from './components/key-generation/key-generation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'sign', component: FileSignComponent },
  { path: 'verify', component: FileVerifyComponent },
  { path: 'generate-key', component: KeyGenerationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}  // Asegúrate de que esto sea una declaración exportada
