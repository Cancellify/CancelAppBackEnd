import express, { Express, Request, Response } from 'express';
import { createAttendance, createNewEvent } from '../eventModel/eventModel';
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

      console.log(sentEventData)

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

export {createEvent}