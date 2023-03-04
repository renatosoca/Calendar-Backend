import dayjs from "dayjs";

const isDate = (value) => {
  if (!value) {
    return false;
  }

  const fecha = dayjs(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
}

export default isDate;