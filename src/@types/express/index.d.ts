declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }

  export interface Response {
    io: {
      in(room: string | string[]): {
        emit: (ev: string, ...args: any[]) => void;
      };
    };
  }
}
