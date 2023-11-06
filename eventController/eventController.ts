import express, { Express, Request, Response } from 'express';
import { createNewEvent } from '../eventModel/eventModel';



async function createEvent(req: Request, res: Response) {
    try {
      const { eventName, eventDescription, date} = req.body

      const sentEventData = {
        event_name: eventName,
        event_description: eventDescription,
        Date: date,
      }

      await createNewEvent(sentEventData)

      res.status(201).send("Event created");
    } catch (error: any) {
      res.status(409).send(`Failed to create account: ${error.message}`);
    }
  }

export {createEvent}