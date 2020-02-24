import { Column, Entity, Generated } from 'typeorm';

@Entity('User')
export default class User {
  constructor(
    email: string,
    id?: string,
    firstName?: string,
    lastName?: string,
    createdDate?: Date,
    updatedDate?: Date,
    organization?: string,
  ) {
    this.email = email;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.organization = organization;
  }

  @Generated('uuid')
  id: string;

  @Column({ name: 'Email', unique: true })
  email: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @Column({ name: 'CreatedDate', nullable: true })
  createdDate: Date;

  @Column({ name: 'UpdatedDate', nullable: true })
  updatedDate: Date;

  // Todo: will be replaced by One-One relation
  @Column({ name: 'Organization' })
  organization: string;
}
