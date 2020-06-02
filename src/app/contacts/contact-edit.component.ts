import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Contact } from './contact';
import { ContactService } from './contact.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './contact-edit.component.html'
})
export class ContactEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Contact Edit';
  errorMessage: string;
  contactForm: FormGroup;

  contact: Contact;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.contactForm.get('firstName');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      firstName: {
        required: 'First Name is required.',
        minlength: 'First Name must be at least three characters.',
        maxlength: 'First Name cannot exceed 50 characters.'
      },
      lastName: {
        required: 'Last Name is required.'
      },
      company: {
        range: 'Fill in the blank'
      },
      email: {
        range: 'Looking for something along the lines of bart@simpsons.com.',
        patterns: "Nope"
      },
      phone: {
        range: 'Looking for something along the lines of 867-5309.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]
      ],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', Validators.required],
      // tags: this.fb.array([]),
      address: ''
    });

    // Read the contact Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getContact(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.contactForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.contactForm);
    });
  }

  addTag(): void {
    // this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    // this.tags.removeAt(index);
    // this.tags.markAsDirty();
  }

  getContact(id: number): void {
    this.contactService.getContact(id)
      .subscribe(
        (contact: Contact) => this.displayContact(contact),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayContact(contact: Contact): void {
    if (this.contactForm) {
      this.contactForm.reset();
    }
    this.contact = contact;

    if (this.contact.id === 0) {
      this.pageTitle = 'Add Contact';
    } else {
      this.pageTitle = `Edit Contact: ${this.contact.firstName}`;
    }

    // Update the data on the form
    this.contactForm.patchValue({
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      company: this.contact.company,
      email: this.contact.email,
      phone: this.contact.phone,
      address: this.contact.address
    });
    // this.contactForm.setControl('tags', this.fb.array(this.contact.tags || []));
  }

  deleteContact(): void {
    if (this.contact.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the contact: ${this.contact.firstName}?`)) {
        this.contactService.deleteContact(this.contact.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveContact(): void {
    if (this.contactForm.valid) {
      if (this.contactForm.dirty) {
        const p = { ...this.contact, ...this.contactForm.value };

        if (p.id === 0) {
          this.contactService.createContact(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.contactService.updateContact(p)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.contactForm.reset();
    this.router.navigate(['/contacts']);
  }
}
