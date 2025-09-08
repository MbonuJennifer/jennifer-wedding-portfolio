import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  eventType: string;
  date: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createContactForm();
  }

  private createContactForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      eventType: ['', [Validators.required]],
      date: ['', [
        Validators.required,
        this.futureDateValidator
      ]],
      message: ['', [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]]
    });
  }
  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { pastDate: true };
    }
    
    return null;
  }
  get formControls(): { [key in keyof ContactForm]: AbstractControl } {
    return {
      name: this.contactForm.get('name')!,
      email: this.contactForm.get('email')!,
      eventType: this.contactForm.get('eventType')!,
      date: this.contactForm.get('date')!,
      message: this.contactForm.get('message')!
    };
  }
  hasError(controlName: keyof ContactForm, errorType?: string): boolean {
    const control = this.formControls[controlName];
    
    if (!control) return false;
    
    if (errorType) {
      return (control.touched || this.submitted) && control.hasError(errorType);
    }
    
    return (control.touched || this.submitted) && control.invalid;
  }
  getErrorMessage(controlName: keyof ContactForm): string {
    const control = this.formControls[controlName];
    const errors = control?.errors;
    
    if (!errors) return '';
    
    if (errors['required']) return 'This field is required';
    if (errors['email'] || errors['pattern']) return 'Please enter a valid email address';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
    if (errors['pastDate']) return 'Please select a future date';
    
    return 'Invalid input';
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    
    this.markAllFieldsAsTouched();
    
    if (this.contactForm.invalid) {
      this.scrollToFirstInvalidField();
      return;
    }
    
    this.isLoading = true;
    
    try {
      await this.simulateApiCall();    
      this.successMessage = '✅ Your message has been sent successfully! I\'ll get back to you within 24 hours.';
      this.resetForm();
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
      
    } catch (error) {
      this.successMessage = '❌ Sorry, there was an error sending your message. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private async simulateApiCall(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data submitted:', this.contactForm.value);
        resolve();
      }, 1500);
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.formControls).forEach(key => {
      this.formControls[key as keyof ContactForm].markAsTouched();
    });
  }

  private scrollToFirstInvalidField(): void {
    const firstInvalidElement = document.querySelector('.is-invalid');
    if (firstInvalidElement) {
      firstInvalidElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
  }

  clearForm(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.successMessage = '';
  }
}