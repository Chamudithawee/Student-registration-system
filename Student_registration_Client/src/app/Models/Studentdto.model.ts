export interface Studentdto {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    nic: string;
    dateOfBirth?: Date;
    address?: string;
    [key: string]: any;
  }
  