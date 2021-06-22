export interface AddTaskReqBody {
  user_id: string;
  description: string;
  due_date: Date;
  minutes_to_complete: number;
  is_important: boolean;
  list_id: number;
}
