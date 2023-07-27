import { Request, Response } from 'express';

export const getIndex = (req: Request, res: Response) => {
  // Test JSON data
  const data = {
    message: 'Hello, EventPro Solutions!',
    someData: 'Some additional data',
  };

  // Send the JSON response
  res.json(data);
};