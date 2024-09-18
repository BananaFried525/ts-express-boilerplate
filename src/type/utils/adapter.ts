import { Request, Response } from 'express';

export type Controller = <T>(req: Request) => Promise<T>
export type ControllerAdapter = (req: Request, res: Response) => Promise<any>