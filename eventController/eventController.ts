import express, { Express, Request, Response } from 'express';
import { createNewEvent } from '../eventModel/eventModel';
import { getUser } from '../userModel/userModel';



async function createEvent(req: Request, res: Response) {
    try {
      const { eventName, eventDescription, date, invitees} = req.body

      console.log(invitees);
      

      const sentEventData = {
        event_name: eventName,
        event_description: eventDescription,
        Date: date,
      }

      console.log(sentEventData)

      const responseID = await createNewEvent(sentEventData);

      let userIdArray = [];
      let userEmailArray = [];

      for(let i = 0; i < invitees.length; i++ ){
        let resultId = await getUser(invitees[i]);
        userIdArray.push(resultId?.id);
        userEmailArray.push(resultId?.email)
      }


      res.status(201).send("Event created");
    } catch (error: any) {
      res.status(409).send(`Failed to create event: ${error.message}`);
    }
  }

export {createEvent}