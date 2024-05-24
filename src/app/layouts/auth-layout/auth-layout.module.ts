import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { RegisterComponent } from 'src/app/components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/components/shared/input/input.component';
import { FormArrayInputComponent } from "../../components/shared/form-array-input/form-array-input.component";
import { RadioInputComponent } from 'src/app/components/shared/radio-input/radio-input.component';



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputComponent,
        FormArrayInputComponent,
        RadioInputComponent
    ]
})
export class AuthLayoutModule { }
