export interface ClassSchema {
  _id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  schedule: string;
  fee: number;
  location: string;
  image?: string;
  detailImage?: string;
  details: any[];
}

export interface Course {
  _id: string;
  name: string;
  description: any[];
  classes: ClassSchema[];
}

export interface EduReservation {
  userName: string;
  email?: string;
  phone: string;
  company: string;
  class: ClassSchema;
  status: "pending" | "confirmed" | "cancelled";
}
