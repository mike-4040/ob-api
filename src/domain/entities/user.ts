import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export default class User {
  constructor(
    email: string,
    firstName?: string,
    lastName?: string,
    createdBy?: string,
    updatedBy?: string,
    organization?: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.organization = organization;
  }

  @PrimaryColumn({ name: 'Email' })
  email: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @Column({ name: 'CreatedBy', nullable: true })
  createdBy: string;

  @Column({ name: 'UpdatedBy', nullable: true })
  updatedBy: string;

  // Todo: will be replaced by One-One relation
  @Column({ name: 'Organization' })
  organization: string;
}
