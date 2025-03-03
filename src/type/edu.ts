export interface ClassSchema {
  _id: string;
  name: string;
  category:
    | "applicator_class"
    | "master_class"
    | "plaster_class"
    | "vintage_class"
    | "one_day_class";
  startDate: string;
  endDate: string;
  schedule: string;
  fee: number;
  location: string;
  image?: string;
  detailImage?: string;
  details: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
    }>;
    style: string;
  }>;
  _createdAt?: string;
}

export interface Course {
  _id: string;
  name: string;
  description: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
    }>;
    style: string;
  }>;
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

// Sanity 원본 스키마 타입 (참조용)
export interface SanityClassSchema {
  _type: "classSchema";
  name: string;
  category:
    | "applicator_class"
    | "master_class"
    | "plaster_class"
    | "vintage_class"
    | "one_day_class";
  image: {
    _type: "image";
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  detailImage?: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  details: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
    }>;
    style: string;
  }>;
  startDate: string;
  endDate: string;
  schedule: string;
  location: string;
  fee: number;
}

export interface SanityCourse {
  _type: "course";
  name: string;
  description: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
    }>;
    style: string;
  }>;
  classes: Array<{
    _type: "reference";
    _ref: string;
  }>;
}

export interface SanityEduReservation {
  _type: "edu-reservation";
  userName: string;
  email: string;
  phone: string;
  company: string;
  class: {
    _type: "reference";
    _ref: string;
  };
  status: "pending" | "confirmed" | "cancelled";
}
