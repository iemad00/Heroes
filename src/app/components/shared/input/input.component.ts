import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class InputComponent {
  @Input() formGroup?: FormGroup;
  @Input() controlName?: string;
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
}
