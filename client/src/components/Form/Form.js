import {
  Box,
  FormControl,
  TextField,
  Stack,
  Button,
  Container,
  Autocomplete,
  Snackbar,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  convertObjectToArrayOfObject,
  diffTimeOfTheDay,
} from "../../utils/functions";
import { initialStateConfigObject } from "../../config/configInitialState";

import MuiAlert from "@mui/material/Alert";
import HoursSelector from "../HoursSelector/HoursSelector";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Form = ({ labels, datas, state, setState, collId }) => {
  const [message, setMessage] = useState({});
  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// Envoi des données //////////////////////////////////
  /////

  const dayArray = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const axiosCall = async () => {
    const response = await axios({
      method: "POST",
      url: `traitement.php/?Coll_Id=${collId}`,
      data: state,
    });

    if (response.data.status === "OK") {
      setMessage({});
      setMessage({
        message: "Votre demande à été soumise avec succés",
        status: "success",
      });
      setTimeout(() => {
        setMessage({});
      }, 7000);
      setState({ ...initialStateConfigObject });
    } else {
      setMessage({
        message:
          "il y à eu une erreur lors de la soumission de votre formulaire",
        status: "error",
      });
      setTimeout(() => {
        setMessage("");
      }, 7000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosCall();
  };
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  //// Fonctions de modification de l'etat du formulaire ////
  const handleChangeTextInput = useCallback(
    (e, label) => {
      const { value, name, id } = e.target;
      if (!dayArray.includes(name)) {
        setState({
          ...state,
          [label]: {
            ...state[label],
            [name]: { ...state[label][name], value },
          },
        });
      }
      if (dayArray.includes(name)) {
        setState({
          ...state,
          [label]: {
            ...state[label],
            [name]: {
              ...state[label][name],
              times: {
                ...state[label][name]["times"],
                [id]: value,
              },
            },
          },
        });
      }
    },
    [setState, state]
  );

  const handleChangeSelectInput = useCallback(
    (e, label, newValue, ligne) => {
      const { id } = e.target;
      const shortLabel = id.split("__")[1];
      setState({
        ...state,
        [label]: {
          ...state[label],
          [shortLabel]: { ...state[label][shortLabel], value: newValue },
        },
      });
    },
    [setState, state]
  );

  const handleCloseAlertMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage({});
  };

  useEffect(() => {
    const amounts = [
      state["Demande de contrat"].Lundi.times,
      state["Demande de contrat"].Mardi.times,
      state["Demande de contrat"].Mercredi.times,
      state["Demande de contrat"].Jeudi.times,
      state["Demande de contrat"].Vendredi.times,
      state["Demande de contrat"].Samedi.times,
      state["Demande de contrat"].Dimanche.times,
    ];

    const totalAmounts = amounts.reduce(
      (acc, amt) => acc + diffTimeOfTheDay(amt.ma, amt.md, amt.ama, amt.amd),
      0
    );
    setState({
      ...state,
      "Demande de contrat": {
        ...state["Demande de contrat"],
        "Volume hébdo": {
          ...state["Demande de contrat"]["Volume hébdo"],
          value: totalAmounts,
        },
      },
    });
  }, [
    state["Demande de contrat"].Lundi.times,
    state["Demande de contrat"].Mardi.times,
    state["Demande de contrat"].Mercredi.times,
    state["Demande de contrat"].Jeudi.times,
    state["Demande de contrat"].Vendredi.times,
    state["Demande de contrat"].Samedi.times,
    state["Demande de contrat"].Dimanche.times,
  ]);

  return (
    <Box
      component="form"
      sx={{ border: "1px solid black", padding: "1.3em", margin: "5% 15%" }}
      onSubmit={handleSubmit}
    >
      {Object.keys(message).length > 0 && (
        <Snackbar
          open={Object.keys(message).length > 0 ? true : false}
          autoHideDuration={6000}
          onClose={handleCloseAlertMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseAlertMessage}
            severity={message.status}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      )}
      {labels.map((label, index) => {
        const currentData = datas[index];
        return (
          <Stack key={label + "-" + index} spacing={4}>
            <h2
              style={{
                display: state?.[label]?.hidden ? "none" : "",
                backgroundColor: "#1D9E90",
                padding: "12px",
                height: "",
                color: "white",
                borderRadius: "30px",
              }}
            >
              {label}
            </h2>
            {currentData.map((data) => {
              let {
                SHORT_LABEL: shortLabel,
                VALEURS: valeurs,
                COLUMN: column,
                TYPE: type,
                MANDATORY: required,
              } = data;

              if (required) {
                required = true;
              } else {
                required = false;
              }

              const newValeurs = convertObjectToArrayOfObject(valeurs);

              const defaultProps = {
                options: newValeurs,
                getOptionLabel: (option) => {
                  return option?.label ?? "";
                },
              };

              return (
                !dayArray.includes(state?.[label]?.[shortLabel]?.label) && (
                  <FormControl
                    key={label + "-" + shortLabel}
                    required={required}
                    sx={{
                      display: state?.[label]?.[shortLabel]?.hidden
                        ? "none"
                        : "",
                    }}
                  >
                    {valeurs &&
                    type !== "VENTILATION_HT" &&
                    Object.keys(valeurs).length > 0 ? (
                      <>
                        <Autocomplete
                          {...defaultProps}
                          id={`${column}__${shortLabel}__`}
                          value={state?.[label]?.[shortLabel]?.value ?? ""}
                          onChange={(e, newValue) =>
                            handleChangeSelectInput(e, label, newValue)
                          }
                          disableClearable
                          disabled={
                            state?.[label]?.[shortLabel]?.disabled ?? false
                          }
                          renderInput={(params) => {
                            return (
                              <TextField
                                error={
                                  state?.[label]?.[shortLabel]?.error ?? false
                                }
                                {...params}
                                label={
                                  state?.[label]?.[shortLabel]?.label ??
                                  shortLabel
                                }
                                variant="filled"
                                required={required}
                                size="small"
                              />
                            );
                          }}
                        />
                      </>
                    ) : type !== "VENTILATION_HT" ? (
                      <>
                        <TextField
                          disabled={
                            state?.[label]?.[shortLabel]?.disabled ?? false
                          }
                          type={state?.[label]?.[shortLabel]?.type}
                          id={column}
                          name={shortLabel}
                          label={
                            state?.[label]?.[shortLabel]?.label ?? shortLabel
                          }
                          required={required}
                          inputProps={
                            state?.[label]?.[shortLabel]?.type === "date"
                              ? {
                                  min: state?.[label]?.[shortLabel]?.min,
                                }
                              : {}
                          }
                          value={
                            shortLabel !== "Total Articles Prestations HT"
                              ? state?.[label]?.[shortLabel]?.value
                              : ""
                          }
                          onChange={(e) => handleChangeTextInput(e, label)}
                        />
                        {state?.[label]?.[shortLabel]?.label ===
                          "Volume hébdo" && (
                          <HoursSelector
                            label={label}
                            state={state}
                            handleChangeTextInput={handleChangeTextInput}
                          />
                        )}
                      </>
                    ) : (
                      <Container
                        sx={{
                          width: "80%",
                          justifyContent: "stretch",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      />
                    )}
                  </FormControl>
                )
              );
            })}
          </Stack>
        );
      })}

      <Container
        sx={{ marginTop: "2em", display: "flex", justifyContent: "center" }}
      >
        <Button size="large" variant="contained" color="success" type="submit">
          <CheckIcon />
          Soumettre
        </Button>
      </Container>
    </Box>
  );
};

export default Form;
