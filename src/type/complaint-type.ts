export interface CreateComplaintRequest {
  // id_user: string;
  // complaint_type: string;
  description: string;
}


export interface UpdateComplaintRequest {
  // id_user: string;
  // complaint_type: string;
  id:string,
  comment: string;
}
