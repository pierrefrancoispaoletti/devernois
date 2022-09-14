const setDayDate = () => {
  return new Date().toISOString().split("T")[0];
};
// on initialise ici toutes les valeurs de depart de l'objet qui va dezterminer le state
export const initialStateConfigObject = {
  "Type de document": {
    hidden: true,
    "Type de document": {
      hidden: true,
      value: "",
      label: "Type de document",
    },
  },
  Document: {
    hidden: true,
    Document: {
      hidden: true,
      value: "",
      label: "Document",
    },
  },
  currentUser: { userid: "" },
  "Demande de contrat": {
    Civilité: {
      type: "text",
      value: "",
      disabled: false,
      label: "Civilité",
    },
    Prénom: { type: "text", value: "", hidden: false, label: "Prénom" },
    "Nom d'usage": {
      type: "text",
      value: "",
      hidden: false,
      label: "Nom d'usage",
    },
    "Nom Naissance": {
      type: "text",
      value: "",
      hidden: false,
      label: "Nom Naissance",
    },
    "Date naissance": {
      type: "date",
      value: setDayDate(),
      hidden: false,
      label: "Date naissance",
    },
    "N° de sécurité sociale": {
      type: "text",
      value: "",
      hidden: false,
      label: "N° de sécurité sociale",
    },
    "Clé SS": {
      type: "text",
      value: "",
      hidden: false,
      label: "Clé SS",
    },
    Adresse: {
      type: "text",
      value: "",
      hidden: false,
      label: "Adresse",
    },
    "Complément d'adresse": {
      type: "text",
      value: "",
      hidden: false,
      label: "Complément d'adresse",
    },
    CP: {
      type: "text",
      value: "",
      hidden: false,
      label: "CP",
    },
    Ville: {
      type: "text",
      value: "",
      hidden: false,
      label: "Ville",
    },
    "Date début contrat": {
      type: "date",
      value: setDayDate(),
      hidden: false,
      label: "Date début contrat",
    },
    "Heure début": {
      type: "text",
      value: "",
      hidden: false,
    },
    Boutique: {
      type: "text",
      value: "",
      hidden: false,
      label: "Boutique",
    },
    "Nom personne absente": {
      type: "text",
      value: "",
      hidden: false,
      label: "Nom personne absente",
    },
    "Motif absence": {
      type: "text",
      value: "",
      hidden: false,
      label: "Motif absence",
    },
    "Date fin contrat": {
      type: "date",
      value: setDayDate(),
      hidden: false,
      label: "Date fin contrat",
    },
    "Volume hébdo": {
      type: "number",
      value: "",
      hidden: false,
      disabled: true,
      label: "Volume hébdo",
    },
    Lundi: {
      type: "number",
      value: "",
      hidden: false,
      label: "Lundi",
    },

    Mardi: {
      type: "number",
      value: "",
      hidden: false,
      label: "Mardi",
    },
    Mercredi: {
      type: "number",
      value: "",
      hidden: false,
      label: "Mercredi",
    },
    Jeudi: {
      type: "number",
      value: "",
      hidden: false,
      label: "Jeudi",
    },
    Vendredi: {
      type: "number",
      value: "",
      hidden: false,
      label: "Vendredi",
    },
    Samedi: {
      type: "number",
      value: "",
      hidden: false,
      label: "Samedi",
    },
    Dimanche: {
      type: "number",
      value: "",
      hidden: false,
      label: "Dimanche",
    },
    "Date demande": {
      type: "date",
      value: setDayDate(),
      hidden: false,
      label: "Date demande",
    },
    "Adresse Mail": {
      type: "text",
      value: "",
      hidden: false,
      label: "Adresse Mail",
    },
  },
};
