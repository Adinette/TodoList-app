interface ITimeStamp {
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

interface IUser extends ITimeStamp {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

interface ITask extends ITimeStamp {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface IStatusTask extends ITimeStamp {
  id: string;
  status: string;
}

export type { IUser, ITask, IStatusTask };
