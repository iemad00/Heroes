import { CommonModule } from '@angular/common';
import { Component, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { FormArrayInputComponent } from '../form-array-input/form-array-input.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { HeroService } from 'src/app/services/hero.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateHero } from 'src/app/states/hero/hero.actions';

@Component({
  selector: 'app-create-hero-form',
  templateUrl: './create-hero-form.component.html',
  styleUrls: ['./create-hero-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, FormArrayInputComponent, RadioInputComponent]
})
export class CreateHeroFormComponent {
  loading: boolean = false;

  signUpForm: FormGroup = new FormGroup({
    heroName: new FormControl('', [Validators.minLength(4), Validators.required]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.@$!%*#?&^_-]).{8,}/)]),
    confirmPassword: new FormControl('', Validators.required),
    powers: new FormArray([
      this.createPower()
    ]),
  });

  constructor(private heroService: HeroService,
    private router: Router,
    private store: Store,
    @Optional() private dialogRef: MatDialogRef<CreateHeroFormComponent>,
    private toastr: ToastrService){}

  isValid(formControl: AbstractControl){
    return !(!formControl.valid && formControl.touched);
  }

  get powers(): FormArray {
    return this.signUpForm.get('powers') as FormArray;
  }

  isPasswordMatch() {
    return this.signUpForm.controls['password'].value === this.signUpForm.controls['confirmPassword'].value;
  }


  createPower(): FormGroup {
    return new FormGroup({
      power: new FormControl('', Validators.required)
    });
  }

  addPower(): void {
    this.powers.push(this.createPower());
  }

  removePower(index: number): void {
    this.powers.removeAt(index);
  }

  isFormValid(){
    return this.signUpForm.valid && (this.signUpForm.value.password == this.signUpForm.value.confirmPassword)
  }

  submit(){
    this.loading = true;
    const dto = { ...this.signUpForm.value }
    const credentials = {
      email: dto.email,
      password: dto.password
    }

    // Modify the data before sending it to service
    delete dto.confirmPassword;
    delete dto.email;
    delete dto.password;
    dto.powers = dto.powers.map((powerObj: { power: any; }) => powerObj.power);

    this.store.dispatch(new CreateHero(dto, credentials as IUser)).subscribe(
      res => {
        this.loading = false;

        if (this.dialogRef) // if admin creates the hero
          this.dialogRef.close();
        else  // if user registers
          this.router.navigate(['/login']);

      },
      err => {
        this.loading = false;
      }
    );


  }
}
