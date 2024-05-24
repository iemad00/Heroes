import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array-input',
  templateUrl: './form-array-input.component.html',
  styleUrls: ['./form-array-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormArrayInputComponent {
  @Input() formArray!: any;
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() placeholder!: string;
  @Input() maxItems: number = 5;

  @Output() remove = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();

  addItem() {
    this.add.emit();
  }

  removeItem(index: number) {
    this.remove.emit(index);
  }
}
