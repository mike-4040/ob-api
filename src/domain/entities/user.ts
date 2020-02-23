import { Column, Entity, Generated } from 'typeorm';

@Entity('User')
export default class User {
  constructor(
    email: string,
    id?: string,
    firstName?: string,
    lastName?: string,
    createdBy?: Date,
    updatedBy?: Date,
    organization?: string,
  ) {
    this.email = email;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
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
  createdBy: Date;

  @Column({ name: 'UpdatedDate', nullable: true })
  updatedBy: Date;

  // Todo: will be replaced by One-One relation
  @Column({ name: 'Organization' })
  organization: string;
}
