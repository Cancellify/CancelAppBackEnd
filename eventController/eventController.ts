import express, { Express, Request, Response } from 'express';
import { createAttendance, createNewEvent, getEvents, getEventDetails } from '../eventModel/eventModel';
import { getUser } from '../userModel/userModel';
import { sendMail, mailOptions, transporter } from '../sendmail';
const moment: any = require('moment');


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

      let humanReadableDate: any = moment(date).format("MMM Do YY");

      mailOptions.to = userEmailArray
      mailOptions.html = `You have been invited to ${eventName} by ${creator} on ${humanReadableDate}.
                            Please go to Cancellify to set your attendance to coming if you would like to attend.
                          <br/>
                          Best Regards, 
                          <br/>
                          Cancellify Team`

      if(userEmailArray.length > 0){
      sendMail(transporter, mailOptions);
      }
      


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

      let eventArray:any = [];
      for(let i = 0; i < data.length; i++){
      for(let j = 0; j < eventDetails.length; j++){
        if(data[i].eventId === eventDetails[j][0].id){
          let eventObj = {
            attendance: data[i].attendance,
            eventName: eventDetails[j][0].event_name,
            eventDescription: eventDetails[j][0].event_description,
            date: eventDetails[j][0].Date,
            secret: data[i].secret,
          }
          eventArray.push(eventObj);
        }
      }
    }

      res.status(201).send(eventArray);
    } catch (error: any) {
      res.status(409).send(`Failed to create event: ${error.message}`);
    }
  }
  

export {createEvent, getAllEvents}