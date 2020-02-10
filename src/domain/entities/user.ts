import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export default class User {
  constructor(
    userName?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    createdBy?: string,
    updatedBy?: string,
    organization?: string,
  ) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.organization = organization;
  }

  @PrimaryColumn({ name: 'UserName' })
  userName: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Organization' })
  organization: string;

  @Column({ name: 'CreatedBy', nullable: true })
  createdBy: string;

  @Column({ name: 'UpdatedBy', nullable: true })
  updatedBy: string;
}
