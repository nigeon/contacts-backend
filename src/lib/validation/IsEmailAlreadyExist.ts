import {registerDecorator, ValidationOptions, ValidatorConstraint,
ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import { getManager, Repository, SelectQueryBuilder } from 'typeorm';

import { Contact } from '../../entities/contact.entity';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

  validate(email: string, args: ValidationArguments) {
    const contactRepository: Repository<Contact> = getManager().getRepository(Contact);
    const u = contactRepository.create(args.object);

    const temp: SelectQueryBuilder<Contact> = contactRepository
      .createQueryBuilder('contact')
      .where('email = :email', { email });

    if (u.id) {
      temp.andWhere('id <> :id', { id: u.id });
    }

    return temp.getOne().then((contact: Contact) => {
      if (contact) return false;
      return true;
    });
  }

}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
