import { DatePicker } from "@mui/x-date-pickers";

export default function CommonDatePicker({ slotProps, ...props }) {
  return (
    <DatePicker
      {...props}
      slotProps={{
        ...slotProps,
        textField: {
          ...slotProps?.textField,
          size: "small",
          sx: {
            width: 180,
            ...slotProps?.textField?.sx,
          },
        },
      }}
    />
  );
}
