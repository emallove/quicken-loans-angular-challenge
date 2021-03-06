import { Component, OnInit } from '@angular/core';

import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  pageTitle = 'Contact List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredContacts = this.listFilter ? this.performFilter(this.listFilter) : this.contacts;
  }

  filteredContacts: Contact[] = [];
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }


  performFilter(filterBy: string): Contact[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.contacts.filter((contact: Contact) => contact.firstName);
      // contact.contactName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      contacts => {
        this.contacts = contacts;
        this.filteredContacts = this.contacts;
      },
      error => this.errorMessage = <any>error
    );
  }
}
