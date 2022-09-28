import moment from "moment";
export const findPartsOfForm = (labelName, indexes) => {
  return indexes.filter((element) => {
    if (element.LABEL.includes(labelName)) {
      return element;
    }
  });
};
export const getlabelList = (indexes) => {
  return new Set(indexes.map((element) => element.LABEL.split("|")[0].trim()));
};

export const convertObjectToArrayOfObject = (obj) => {
  return (
    obj &&
    Object.entries(obj).map((entry) =>
      Object.assign({}, { id: entry[0], label: entry[1] })
    )
  );
};

export const getDefaultProps = (props) => {
  return {
    options: props,
    getOptionLabel: (option) => {
      return option?.label ?? "";
    },
  };
};

export const getTimeDiff = (startTime, endTime) => {
  let start = moment(startTime, "HH:mm");
  let end = moment(endTime, "HH:mm");

  const minute = 0.0166667;

  const duration = moment.duration(end.diff(start));
  const hours = parseInt(duration.asHours());

  return Number(hours + duration.minutes() * minute).toFixed(2);
};

export const diffTimeOfTheDay = (ma, md, ama, amd) => {
  const computeDiffTime =
    Number(getTimeDiff(ma, md)) + Number(getTimeDiff(ama, amd));

  if (!isNaN(computeDiffTime)) {
    return computeDiffTime;
  } else {
    return 0;
  }
};

export const getValueFromId = (id, formdatas, shortlabel) => {
  const label = formdatas
    .map((element) => {
      return element
        .map((el) => {
          if (el.SHORT_LABEL && el.SHORT_LABEL === shortlabel) {
            return el["VALEURS"][id];
          }
        })
        .filter((el) => el !== undefined);
    })
    .filter((el) => el.length && el)
    .join("")
    .toString();
  return label;
};
