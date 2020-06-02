import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  pageTitle = 'Contact Detail';
  errorMessage = '';
  contact: Contact | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getContact(id);
    }
  }

  getContact(id: number) {
    this.contactService.getContact(id).subscribe(
      contact => this.contact = contact,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/contacts']);
  }

}
