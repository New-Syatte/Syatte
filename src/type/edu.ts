export type Edu = {
  _id: string;
  eduName: string;
  eduDescription: string;
  eduImage: string;
  eduStartDate: string;
  deuEndDate: string;
  eduType: string;
  count: number;
  money: number;
};

export interface Course {
  _id: string;
  category: string;
  name: string;
  startDate: string;
  endDate: string;
  schedule: string;
  fee: number;
  image?: string;
  detailImage?: string;
  location?: string;
}
