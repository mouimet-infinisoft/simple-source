import { defaultModelContact } from '../src/apps/Contacts/Contacts';

interface ContactInfo extends Omit<typeof defaultModelContact, 'thumb'> {
  thumb?: string; // Optional since it might not be relevant for the agreement
}

export function generateBusinessAgreement(contact: ContactInfo): string {
  const agreementText = `Business Agreement

This agreement is made between ${contact.name} ("The Client") and [Your Company Name].

1. Purpose
The purpose of this agreement is to establish a business relationship between the client and [Your Company Name].

2. Scope of Work
[Your Company Name] will provide the following services: [List Services Here].

3. Payment Terms
[Specify Payment Terms Here]

4. Confidentiality
Both parties agree to maintain confidentiality of all proprietary information.

5. Signature
_____________________________
(place for electronic signature)

Date: _________________________

Client Contact Information:
Name: ${contact.name}
Address: ${contact.address}
Phone: ${contact.phones.join(', ')}
Email: ${contact.emails.join(', ')}
Job Title: ${contact.jobtitle}

Please review the terms above and sign where indicated.`;
  return agreementText;
}

// Example usage:
// const contact: ContactInfo = {
//   name: 'John Doe',
//   contact: '123-456-7890',
//   phones: ['123-456-7890'],
//   address: '123 Main St, Anytown, AT 12345',
//   jobtitle: 'CEO',
//   emails: ['j.doe@example.com']
// };
// const agreement = generateBusinessAgreement(contact);
// console.log(agreement);
