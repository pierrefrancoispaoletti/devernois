import { Grid } from "@mui/material";
import React from "react";
import { diffTimeOfTheDay, getTimeDiff } from "../../utils/functions";

const HoursSelector = ({ label, state, handleChangeTextInput }) => {
  const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  return (
    <Grid
      sx={{
        width: "100%",
        padding: "12px",
        margin: "10px auto",
        display: "flex",
        justifyContent: "center",
      }}
      container
      textAlign="center"
      rowSpacing={1}
      columnSpacing={3}
    >
      {labels.map((day) => (
        <Grid
          key={day}
          sx={{ border: "1px solid black", padding: "12px" }}
          item
          xs={4}
        >
          <h4
            style={{
              textTransform: "uppercase",
              textDecoration: "underline",
            }}
          >
            {day}
          </h4>

          <h5>
            Total Jour:{" "}
            {diffTimeOfTheDay(
              state?.[label]?.[day]?.times?.ma,
              state?.[label]?.[day]?.times?.md,
              state?.[label]?.[day]?.times?.ama,
              state?.[label]?.[day]?.times?.amd
            )}
            {" H"}
          </h5>
          <div
            style={{
              margin: "5px 0",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Matin
            <div>
              <input
                id="ma"
                type="time"
                name={day}
                value={state?.[label]?.[day]?.times?.ma}
                onChange={(e) => handleChangeTextInput(e, label)}
              />
              <input
                id="md"
                type="time"
                name={day}
                value={state?.[label]?.[day]?.times?.md}
                onChange={(e) => handleChangeTextInput(e, label)}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Aprés-midi
            <div>
              <input
                id="ama"
                type="time"
                name={day}
                value={state?.[label]?.[day]?.times?.ama}
                onChange={(e) => handleChangeTextInput(e, label)}
              />
              <input
                id="amd"
                type="time"
                name={day}
                value={state?.[label]?.[day]?.times?.amd}
                onChange={(e) => handleChangeTextInput(e, label)}
              />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default HoursSelector;
