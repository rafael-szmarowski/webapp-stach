import React, { useState } from "react";

import { CardText, Badge, Col, Row } from "reactstrap";
import DatePicker from "react-datepicker";
import { addMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function HoursTab({
  shopDetails,
  setDate,
  date,
  startDate,
  chosenVar,
  setChosenVar,
  chosenHour,
  setChosenHour,
  chosenCompleteDate,
}) {
  const [dateToCompare, setDateToCompare] = useState(
    chosenCompleteDate || addMinutes(new Date(), -30)
  );
  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  let hoursTab;
  let hoursArr = [];
  let appointmentTime = [];
  let appointDate = [];

  for (let z = 0; z < shopDetails.appointments.length; z++) {
    let zeroD = "";
    let zeroM = "";

    let startTime = new Date(shopDetails.appointments[z].startDate);
    let hourApp = startTime.getHours() - 1;
    let minuteApp = startTime.getMinutes();

    minuteApp = minuteApp < 10 ? "0" + minuteApp : minuteApp;
    let formatedTime = hourApp + ":" + minuteApp;
    appointmentTime.push(formatedTime);

    if (startTime.getDate() < 10) {
      zeroD = "0";
    }
    if (startTime.getMonth() < 10) {
      zeroM = "0";
    }
    let formatedDate =
      zeroD +
      startTime.getDate() +
      "-" +
      zeroM +
      (startTime.getMonth() + 1) +
      "-" +
      startTime.getFullYear();
    appointDate.push(formatedDate);
  }

  const handleConfirm = (choice) => {
    setDate(choice);
    setDateToCompare(choice);
    var zeroDay = "";
    var zeroMonth = "";

    if (choice.getDate() < 10) {
      zeroDay = "0";
    }
    if (choice.getMonth() < 10) {
      zeroMonth = "0";
    }

    let dateToSetter = null;
    dateToSetter =
      zeroDay +
      choice.getDate() +
      "-" +
      zeroMonth +
      (choice.getMonth() + 1) +
      "-" +
      choice.getFullYear();
    setChosenVar(dateToSetter);
  };
  console.log("chosenVar", chosenVar);

  if (chosenVar) {
    let dateGoodFormat =
      chosenVar.split("-")[2] +
      "-" +
      chosenVar.split("-")[1] +
      "-" +
      chosenVar.split("-")[0];
    let chosenDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][new Date(dateGoodFormat).getDay()];

    let filteredSchedule = shopDetails.schedule.filter(
      (e) => e.dayOfTheWeek === chosenDay
    );

    if (filteredSchedule.length !== 0) {
      for (
        let i = filteredSchedule[0].openingHours;
        i <= filteredSchedule[0].closingHours;
        i += 30
      ) {
        hoursArr.push(i);

        let nowHours = new Date().getHours();
        let nowMinutes = new Date().getMinutes();

        let nowTotalTime = nowHours * 60 + nowMinutes + 20;
        console.log("chosen Date", dateToCompare);
        console.log("date actuelle", new Date());
        hoursTab = hoursArr.map((hour, i) => {
          var color = "#FFCD41";
          let disabled = false;
          if (nowTotalTime > hour && dateToCompare < new Date()) {
            color = "grey";
            disabled = true;
          }
          if (chosenHour === hour) {
            color = "#4280AB";
          }
          let interTab = [];

          let isFull = 0;
          for (let y = 0; y < appointmentTime.length; y++) {
            if (
              appointmentTime[y] === convertMinsToTime(hour) &&
              chosenVar === appointDate[y]
            ) {
              isFull++;
            }
          }

          if (isFull >= shopDetails.shopEmployees.length) {
            interTab.push(
              <Badge
                disabled={disabled}
                value={hour}
                key={i}
                style={{
                  padding: 10,
                  margin: 5,
                  backgroundColor: "grey",
                  borderRadius: 8,
                  width: 70,
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: 18 }}>
                  {convertMinsToTime(hour)}
                </div>
              </Badge>
            );
          } else {
            interTab.push(
              <Badge
                onClick={() => {
                  setChosenHour(hour);
                }}
                value={hour}
                key={i}
                style={{
                  padding: 10,
                  margin: 5,
                  backgroundColor: `${color}`,
                  borderRadius: 8,
                  width: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  {convertMinsToTime(hour)}
                </div>
              </Badge>
            );
          }
          return interTab;
        });
      }
    } else {
      hoursTab = <CardText>Pas de dispo ou choisir une autre date</CardText>;
    }
  }
  return (
    <CardText>
      Choix de la date et de l'heure (Veuillez obligatoirement sélectionner une
      date pour afficher les horaires) :
      <Row>
        <Col xs={{ size: 12 }} className="mb-4 mt-4">
          <DatePicker
            startDate={startDate}
            minDate={startDate}
            selected={date}
            onChange={(date) => handleConfirm(date)}
            dateFormat="dd/MM/yyyy"
            locale="fr"
          />
        </Col>
      </Row>{" "}
      {hoursTab}
    </CardText>
  );
}
