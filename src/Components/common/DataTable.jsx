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
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "text.primary",
                  bgcolor: "grey.100",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  py: 1.75,
                  px: 2,
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
