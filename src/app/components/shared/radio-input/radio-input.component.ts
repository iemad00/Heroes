import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class RadioInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = '';
}
