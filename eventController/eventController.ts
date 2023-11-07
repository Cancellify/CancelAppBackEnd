import express, { Express, Request, Response } from 'express';
import { createAttendance, createNewEvent, getEvents, getEventDetails } from '../eventModel/eventModel';
import { getUser } from '../userModel/userModel';
import { sendMail, mailOptions, transporter } from '../sendmail';



async function createEvent(req: Request, res: Response) {
    try {
      const { eventName, eventDescription, date, invitees, creator} = req.body

      const sentEventData = {
        event_name: eventName,
        event_description: eventDescription,
        Date: date,
      }

      
      const responseID = await createNewEvent(sentEventData);


      let userIdArray:any = [];
      let userEmailArray:any = [];

      for(let i = 0; i < invitees.length; i++ ){
        let resultId = await getUser(invitees[i]);
        userIdArray.push(resultId?.id);
        userEmailArray.push(resultId?.email)
      }

      for(let i = 0; i < userIdArray.length; i++ ){
        let inviteObj = {
          eventId : responseID,
          userId: userIdArray[i],
          attendance: false,
          secret: true
        }
        await createAttendance(inviteObj);
      }

      let creatorId = await getUser(creator);
      let creatorAttend = {
        eventId : responseID,
        userId: creatorId?.id,
        attendance: true,
        secret: true
      }
      
      await createAttendance(creatorAttend);

      mailOptions.to = userEmailArray

      sendMail(transporter, mailOptions);

      


      res.status(201).send("Event created");
    } catch (error: any) {
      res.status(409).send(`Failed to create event: ${error.message}`);
    }
  }

  async function getAllEvents(req: Request, res: Response) {
    try{
      let { id } = req.body;

      id = Number(id)

      const data = await getEvents(id);

      let eventDetails = [];

      for(let i =0; i < data.length; i ++){
        let allDetails = await getEventDetails(data[i].eventId);
        eventDetails.push(allDetails);
      }


      console.log(eventDetails);
      console.log(data);

      res.status(201).send("events fetched");
    } catch (error: any) {
      res.status(409).send(`Failed to create event: ${error.message}`);
    }
  }
  

export {createEvent, getAllEvents}