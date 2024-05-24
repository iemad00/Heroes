import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent {
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
    agree: new FormControl(false, Validators.requiredTrue),
  });;


  isValid(formControl: AbstractControl){
    return !(!formControl.valid && formControl.touched);
  }

  get powers(): FormArray {
    return this.signUpForm.get('powers') as FormArray;
  }

  isPasswordMatch() {
    return !(this.signUpForm.controls['confirmPassword'].touched && this.signUpForm.value.confirmPassword !== this.signUpForm.value.password);
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

  signUp(){

  }
}
