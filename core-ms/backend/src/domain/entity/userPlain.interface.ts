import { UserEmail } from '../value-objects/userEmail';
import { Document } from '../value-objects/document';

export interface UserPlainObjectInterface {
  email: UserEmail;
  name: string;
  surname: string;
  document: Document;
}
