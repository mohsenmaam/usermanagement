/**
 * User Type Definitions
 */

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address?: Partial<Address>;
  company?: Partial<Company>;
}

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: Partial<Address>;
  company?: Partial<Company>;
}

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  companyName: string;
}
