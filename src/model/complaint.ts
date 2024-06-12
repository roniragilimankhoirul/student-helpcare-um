export interface Complaint {
  id?: string;
  id_user: string;
  description: string;
  is_responded?: boolean;
  comment?: string;
  created_at?: string;
  updated_at?: string;
}
