import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import SearchIcon from "@mui/icons-material/Search";

export default function CommonEntityHeader() {
  return (
    <div>
      <MainLayout>
        {/* MAIN OUTER BOX */}

        <Box
          sx={{
            width: "100%",

            height: 745,
            gap: "1px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* LEFT BOX */}
          <Box
            sx={{
              height: "107vh",
              width: "40vh",
              border: "6px",
              borderRadius: "3px",
              backgroundColor: "white",
              borderTopLeftRadius: "17px",
              borderBottomLeftRadius: "19px",
            }}
          >
            {/* BOX FOR NAME AND ID IN LEADS */}
            <Box
              sx={{
                height: "38vh",
                width: "50vh",
                border: "6px",
                borderRadius: "3px",

                backgroundColor: "white",
              }}
            >
              <Typography sx={{ p: 2 }}>
                {" "}
                <b>Leads</b>
              </Typography>

              {/* BOX FOR BUTTON AND NAME */}

              <Box
                sx={{
                  opacity: 1,
                  backgroundColor: "white",
                  mx: 2,
                  width: 288,
                  height: 77,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* BOX FOR  SQUARE BUTTON  */}
                <Box
                  sx={{
                    width: 72,
                    height: 72,

                    backgroundColor: "#D9D9D9",

                    borderRadius: "12px",
                  }}
                ></Box>

                {/* BOX FOR NAME */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: " 600",
                      fontStyle: "semibold",
                      fontSize: "20px",
                      lineHeight: "30px",
                      verticalAlign: "middle",
                      color: "#33475B",
                    }}
                  >
                    Jane Cooper
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: " 300",
                      fontStyle: "light",
                      fontSize: "14px",
                      lineHeight: "24px",
                      verticalAlign: "middle",
                      color: "#33475B",
                    }}
                  >
                    SalesPerson
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: " 400",
                      fontStyle: "regular",
                      fontSize: "14px",
                      lineHeight: "24px",
                      verticalAlign: "middle",
                      color: "#33475B",
                    }}
                  >
                    janecooper@gmail.com
                  </Typography>
                </Box>
              </Box>

              {/* ENTITY ACTION BOXES */}

              <Box
                sx={{
                  width: 288,
                  height: 71,
                  justifyContent: "spacebetween",
                  borderRadius: "8px",
                  paddingTop: "10px",
                  paddingRight: "8px",
                  backgroundColor:' #F7F7FA',
                  // backgroundColor: "pink",

                  paddingBottom: "8px",
                  paddingLeft: "8px",
                  mx: 2,
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* BOX FOR NOTE */}

                <Box
                  sx={{
                    width: "55px",
                    height: "60px",
                    border: "1px solid black",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<NoteAltOutlinedIcon />}
                    sx={{
                      border: 3,
                      borderRadius: 2,
                      textTransform: "none",
                      borderColor: " #F7F7FA",
                    }}
                  ></Button>

                  <Typography
                    sx={{
                      color: " #33475B",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "15px",

                      lineHeight: "18px",

                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    Note
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* BOX FOR  ABOUT LEAD  */}
            <Box
              sx={{
                width: "20vh",
                height: "17px",
              }}
            >
              <Typography
                sx={{
                  color: " #33475B",

                  fontWeight: 700,
                  fontStyle: "Bold",
                  fontSize: "14px",
                  mx: 2,
                  lineHeight: "100%",

                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                About this lead
              </Typography>
            </Box>

            {/*BOX FOR CUSTOMER DETAIL */}

            <Box
              sx={{
                width: "50vh",
                height: "70vh",

                mt: "3px",
              }}
            >
              {/* EMAIL */}
              <Box
                sx={{
                  width: 288,
                  height: 50,
                  mt: 3,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Email
                  </Typography>
                </Box>

                {/* MAIL ID */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    janecooper@gmail.com
                  </Typography>
                </Box>
              </Box>

              {/* FIRST NAME*/}

              <Box
                sx={{
                  width: 288,
                  height: 50,

                  mt: 2,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    First Name
                  </Typography>
                </Box>

                {/* NAME DETAIL */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Jane
                  </Typography>
                </Box>
              </Box>

              {/* LAST NAME */}

              <Box
                sx={{
                  width: 288,
                  height: 50,

                  mt: 2,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Last Name
                  </Typography>
                </Box>

                {/* NAME DETAIL */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Cooper
                  </Typography>
                </Box>
              </Box>

              {/* PHONE */}

              <Box
                sx={{
                  width: 288,
                  height: 50,

                  mt: 2,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Phone Number
                  </Typography>
                </Box>

                {/* NUMBER */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    078 5432 8505
                  </Typography>
                </Box>
              </Box>

              {/* LEAD STATUS */}

              <Box
                sx={{
                  width: 288,
                  height: 50,

                  mt: 2,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Lead Status
                  </Typography>
                </Box>

                {/*  */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    New
                  </Typography>
                </Box>
              </Box>

              {/* JOB TITLE */}

              <Box
                sx={{
                  width: 288,
                  height: 50,

                  mt: 2,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Job Title
                  </Typography>
                </Box>

                {/*  */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Salesperson
                  </Typography>
                </Box>
              </Box>

              {/* DATE */}

              <Box
                sx={{
                  width: 288,
                  height: 50,

                  mt: 2,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #516F90",

                      fontWeight: 400,
                      fontStyle: "Regular",
                      fontSize: "13px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    Created Date
                  </Typography>
                </Box>

                {/*  */}

                <Box
                  sx={{
                    width: 288,
                    height: 25,
                  }}
                >
                  <Typography
                    sx={{
                      color: " #1E1E1E",

                      fontWeight: 400,
                      fontStyle: "medium",
                      fontSize: "15px",

                      lineHeight: "24px",

                      verticalAlign: "middle",
                    }}
                  >
                    04/08/2025 2:31 PM GMT+5:30
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/*MIDDLE PORTION*/}

          <Box
            sx={{
              width: 730,
              height: 770,
              backgroundColor: "white",
            }}
          >
            {/* OUTER BOX FOR SEARCH AND BUTTON */}
            <Box
              sx={{
                width: "700px",
                height: "45px",
                justifyContent: "spacebetween",
                paddingTop: "5px",
                paddingRight: "16px",
                paddingBottom: "5px",
                paddingLeft: "16px",

                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
              {/* SEARCH BOX */}

              <TextField
                fullWidth
                placeholder="Search activities"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    backgroundColor: "#F9F9FB",
                  },
                  "& fieldset": {
                    border: "1px solid #DDDFE9",
                    borderRadius: "8px",
                  },
                }}
              />

              <Button
                sx={{
                  width: "150px",
                  bgcolor: "#5A45E5",
                  color: "#fff",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#4C39D2",
                  },
                }}
              >
                Convert
              </Button>
            </Box>
          </Box>

          {/* RIGHT PORTION BOX*/}
          <Box
            sx={{
              width: 328,
              height: 744,
              gap: "1px",

              borderTopRightRadius: "12px",
              backgroundColor: "white",
            }}
          >
            {/* BOX FOR AI AND ATTACHMENTSS */}

            <Box
              sx={{
                width: 288,
                height: 280,
                gap: "16px",
              }}
            >
              {/* BOX FOR AI */}

              <Box
                sx={{
                  width: 250,
                  height: 140,
                  gap: "8px",
                  padding: "16px",
                  borderRadius: "8px",
                  borderWidth: "1px",
                  border: "1px solid #5948DB",
                  mt: 1,
                  backgroundColor: " #F7F7FA",
                }}
              >
                {/* BOX FOR LEAD SUMMARY */}
                <Box
                  sx={{
                    width: 250,
                    height: 24,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,

                      fontSize: "14px",

                      color: " #5948DB",
                    }}
                  >
                    {" "}
                    AI Lead Summary
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 500,

                      fontSize: "14px",

                      lineHeight: "24px",
                      mt: 2,
                    }}
                  >
                    There are no activities associated with this lead and
                    further details are needed to provide a comprehensive
                    summary.
                  </Typography>
                </Box>
              </Box>

              {/* BOX FOR ATTACHMENTS */}

              <Box
                sx={{
                  width: 288,
                  height: 73,

                  mt: 2,
                }}
              >
                {/* ATTACHMENTS HEADER */}
                <Box
                  sx={{
                    width: 288,
                    height: 17,
                    display: "flex",
                    // justifyContent: 'spacebetween',
                  }}
                >
                  <Box
                    sx={{
                      width: 250,
                      height: 17,
                    }}
                  >
                    <Typography
                      sx={{
                        mx: 2,

                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      Attachments
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 50,
                      height: 17,
                    }}
                  >
                    <Typography
                      sx={{
                        mx: 1,
                        fontWeight: 600,

                        fontSize: "12px",
                        color: "#5948DB",
                      }}
                    >
                      + Add
                    </Typography>
                  </Box>
                </Box>

                {/* DETAILOF ATTACHMENTS*/}

                <Box
                  sx={{
                    width: 288,
                    height: 48,
                    mt: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,

                      fontSize: "13px",
                      color: "#516F90",
                    }}
                  >
                    See the files attached to your activities or uploaded to
                    this record.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </MainLayout>
    </div>
  );
}
