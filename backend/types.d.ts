// delacartion file as user id is not available in the request
declare namespace Express {
    interface Request {
        userId?: string;
    }
}

  