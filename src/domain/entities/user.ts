import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEmail, Length } from 'class-validator';

@Entity('User')
export default class User {
  constructor(
    email: string,
    password: string,
    id?: string,
    firstName?: string,
    lastName?: string,
    createdDate?: Date,
    updatedDate?: Date,
    organization?: string
  ) {
    this.email = email;
    this.id = id;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.organization = organization;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'Email', unique: true })
  @IsEmail()
  email: string;

  @Column({ name: 'Password' })
  @Length(8, 40)
  password: string;

  @Column({ name: 'FirstName' })
  @Length(1, 30)
  firstName: string;

  @Column({ name: 'LastName' })
  @Length(1, 30)
  lastName: string;

  @Column({ name: 'CreatedDate', nullable: true })
  @IsDate()
  createdDate: Date;

  @Column({ name: 'UpdatedDate', nullable: true })
  @IsDate()
  updatedDate: Date;

  // Todo: will be replaced by One-One relation
  @Column({ name: 'Organization' })
  organization: string;
}
