import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function DataTable({ columns, children }) {
  return (
    <TableContainer
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Table
        sx={{
          "& .MuiTableHead-root .MuiTableCell-root": {
            fontSize: "15px",
            fontWeight: 500,
          },
          "& .MuiTableBody-root .MuiTableCell-root": {
            fontSize: "14px",
            fontWeight: 400,
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 500,
                  fontSize: 15,
                  color: "#F8FAFC",
                  bgcolor: "primary.main",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  p: 2,
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
