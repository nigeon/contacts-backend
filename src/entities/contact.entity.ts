import { Basic } from './basic.entity';
import { Entity, Column } from 'typeorm';
import { IsString, IsEmail, IsDefined, IsIn } from 'class-validator';
import { IsEmailAlreadyExist } from '../lib/validation/IsEmailAlreadyExist';

export enum Status {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

@Entity()
export class Contact extends Basic {

  @Column()
  @IsDefined()
  @IsString()
  firstname: string;

  @Column()
  @IsDefined()
  @IsString()
  lastname: string;

  @Column({ unique: true, length: 100 })
  @IsEmail()
  @IsEmailAlreadyExist({
    message: 'User $value already exists. Please, choose another email.',
  })
  @IsDefined()
  email: string;

  @Column({ nullable: true })
  @IsString()
  @IsDefined()
  phone: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  @IsIn([Status.ACTIVE, Status.DELETED])
  status: Status;
}
