import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contact } from './contact';

export class ContactData implements InMemoryDbService {

  createDb() {
    const contacts: Contact[] = [
      {
        "_id": "5de91c005b98615393e74931",
        "id": 0,
        "firstName": "Browning",
        "lastName": "Graham",
        "company": "MELBACOR",
        "email": "browninggraham@melbacor.com",
        "phone": "+1 (906) 585-2525",
        "address": "920 Hastings Street, Roosevelt, Puerto Rico, 5573"
      },
      {
        "_id": "5de91c00d6b4d04e96ef44da",
        "id": 1,
        "firstName": "Mcmahon",
        "lastName": "Fulton",
        "company": "ILLUMITY",
        "email": "mcmahonfulton@illumity.com",
        "phone": "+1 (814) 489-3373",
        "address": "676 Bainbridge Street, Abrams, Mississippi, 2652"
      },
      {
        "_id": "5de91c007e02a7eb64124760",
        "id": 2,
        "firstName": "Susan",
        "lastName": "Dyer",
        "company": "ZAGGLE",
        "email": "susandyer@zaggle.com",
        "phone": "+1 (940) 547-2965",
        "address": "853 Decatur Street, Waumandee, Nevada, 7107"
      },
      {
        "_id": "5de91c002229191af175899d",
        "id": 3,
        "firstName": "Becker",
        "lastName": "Gibson",
        "company": "SKINSERVE",
        "email": "beckergibson@skinserve.com",
        "phone": "+1 (908) 466-2681",
        "address": "995 Banner Avenue, Wollochet, Federated States Of Micronesia, 2706"
      },
      {
        "_id": "5de91c000dd0867e858c4a8e",
        "id": 4,
        "firstName": "Sparks",
        "lastName": "Bullock",
        "company": "COMBOGENE",
        "email": "sparksbullock@combogene.com",
        "phone": "+1 (922) 456-2177",
        "address": "267 Chestnut Street, Waterview, Maryland, 1246"
      }
    ];

    return { contacts };
  }
}
