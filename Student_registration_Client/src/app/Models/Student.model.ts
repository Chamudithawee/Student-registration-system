export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    nic: string;
    dateOfBirth?: Date;
    address?: string;
    imagePath: string;
    [key: string]: any;
  }
  