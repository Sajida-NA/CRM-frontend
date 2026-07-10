


import { DatePicker } from "@mui/x-date-pickers";

export default function CommonDatePicker(props) {
  return (
    <DatePicker
      {...props}
      slotProps={{
        textField: {
          size: "small",
          sx: {
            width: 180,
          },
        },
      }}
    />
  );
}