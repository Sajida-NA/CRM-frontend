import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Box,
  IconButton,
  TableRow,
  TableCell,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";

import PageHeader from "../../../Components/common/PageHeader";
import FilterSection from "../../../Components/common/FilterSection";
import SelectField from "../../../Components/common/SelectField";
import DataTable from "../../../Components/common/DataTable";
import MainLayout from "../../../layout/MainLayout";
import CommonButton from "../../../Components/common/CommonButton";
import CreateDealsDrawer from "../components/CreateDealsDrawer";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";
import SearchSection from "../../../Components/common/SearchSection";

import api from "../../../services/api";

function DealsList() {
  // =================================================
  // NAVIGATION
  // =================================================

  const navigate = useNavigate();
  const location = useLocation();

  // Lead ID received from Lead Convert
  const convertLeadId =
    location.state?.convertLeadId || "";

  // =================================================
  // STATES
  // =================================================

  const [page, setPage] = useState(1);

  const [dealStage, setDealStage] = useState("");

  // Deal stages from backend
  const [dealStageOptions, setDealStageOptions] =
    useState([]);

  // Deal Owner filter
  const [dealOwner, setDealOwner] = useState("");

  // Close Date
  const [closeDate, setCloseDate] = useState("");

  // Created Date
  const [createdDate, setCreatedDate] = useState("");

  const [openDrawer, setOpenDrawer] = useState(false);

  // Selected deal for edit
  const [editDeal, setEditDeal] = useState(null);

  const [search, setSearch] = useState("");

  // Backend deals
  const [dealsData, setDealsData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =================================================
  // GET DEALS
  // =================================================

  const fetchDeals = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await api.get("/deals/");

      console.log("DEALS RESPONSE:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setDealsData(data);
    } catch (error) {
      console.error(
        "Deals API Error:",
        error,
      );

      console.error(
        "Status:",
        error.response?.status,
      );

      console.error(
        "Data:",
        error.response?.data,
      );

      setError(
        error.response?.data?.detail ||
          "Failed to load deals.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  // GET DEAL STAGES FROM BACKEND
  // =================================================

  const fetchDealStages = async () => {
    try {
      const response = await api.get(
        "/deals/stages/",
      );

      console.log(
        "DEAL STAGES RESPONSE:",
        response.data,
      );

      const stages = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setDealStageOptions(stages);
    } catch (error) {
      console.error(
        "Deal Stage API Error:",
        error,
      );
    }
  };

  // =================================================
  // LOAD DATA WHEN PAGE OPENS
  // =================================================

  useEffect(() => {
    fetchDeals();
    fetchDealStages();
  }, []);

  // =================================================
  // OPEN DRAWER AFTER LEAD CONVERSION
  // =================================================

  useEffect(() => {
    if (
      convertLeadId !== null &&
      convertLeadId !== undefined &&
      convertLeadId !== ""
    ) {
      console.log(
        "Lead converted to Deal. Lead ID:",
        convertLeadId,
      );

      // Make sure this is CREATE mode
      setEditDeal(null);

      // Automatically open Create Deal drawer
      setOpenDrawer(true);
    }
  }, [convertLeadId]);

  // =================================================
  // DELETE DEAL
  // =================================================

  const handleDelete = async (deal) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${deal.deal_name}"?`,
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/deals/${deal.id}/`,
      );

      await fetchDeals();
    } catch (error) {
      console.error(
        "Delete Deal Error:",
        error.response?.data || error,
      );
    }
  };

  // =================================================
  // EDIT DEAL
  // =================================================

  const handleEdit = (deal) => {
    console.log(
      "EDIT DEAL:",
      deal,
    );

    setEditDeal(deal);

    setOpenDrawer(true);
  };

  // =================================================
  // CREATE DEAL
  // =================================================

  const handleCreate = () => {
    setEditDeal(null);

    setOpenDrawer(true);
  };

  // =================================================
  // CLOSE DRAWER
  // =================================================

  const handleCloseDrawer = () => {
    setOpenDrawer(false);

    setEditDeal(null);

    // Clear convertLeadId from browser history
    // so refreshing / visiting Deals does not
    // reopen the drawer automatically.
    if (
      location.state?.convertLeadId
    ) {
      navigate("/dealslist", {
        replace: true,
        state: {},
      });
    }
  };

  // =================================================
  // FILTER DEALS
  // =================================================

  const filteredDeals = dealsData.filter(
    (deal) => {
      const searchText =
        search.trim().toLowerCase();

      // -------------------------------------------------
      // CLOSE DATE SEARCH
      // -------------------------------------------------

      const closeDateValue =
        deal.close_date
          ? dayjs(deal.close_date)
          : null;

      const closeDateFormats =
        closeDateValue
          ? [
              closeDateValue.format(
                "YYYY-MM-DD",
              ),

              closeDateValue.format(
                "DD-MM-YYYY",
              ),

              closeDateValue.format(
                "DD/MM/YYYY",
              ),

              closeDateValue.format(
                "MM-DD-YYYY",
              ),

              closeDateValue.format(
                "MM/DD/YYYY",
              ),

              closeDateValue
                .format("DD MMM YYYY")
                .toLowerCase(),

              closeDateValue
                .format("MMM DD, YYYY")
                .toLowerCase(),
            ]
          : [];

      const matchesCloseDateSearch =
        closeDateFormats.some(
          (date) =>
            date.includes(searchText),
        );

      // -------------------------------------------------
      // SEARCH
      // -------------------------------------------------

      const matchesSearch =
        !searchText ||
        deal.deal_name
          ?.toLowerCase()
          .includes(searchText) ||
        deal.lead_name
          ?.toLowerCase()
          .includes(searchText) ||
        (Array.isArray(deal.deal_owners) &&
          deal.deal_owners.some(
            (owner) =>
              owner
                ?.toLowerCase()
                .includes(searchText),
          )) ||
        matchesCloseDateSearch;

      // -------------------------------------------------
      // DEAL STAGE
      // -------------------------------------------------

      const matchesStage =
        !dealStage ||
        deal.deal_stage === dealStage;

      // -------------------------------------------------
      // DEAL OWNER
      // -------------------------------------------------

      /*
       * Backend now returns:
       *
       * deal_owners: [
       *   "Sajid Jubi",
       *   "Riya Mehwish"
       * ]
       *
       * So the filter checks whether the selected
       * owner exists inside the deal_owners array.
       */

      const matchesOwner =
        !dealOwner ||
        (Array.isArray(deal.deal_owners) &&
          deal.deal_owners.includes(
            dealOwner,
          ));

      // -------------------------------------------------
      // CLOSE DATE FILTER
      // -------------------------------------------------

      const matchesCloseDate =
        !closeDate ||
        (deal.close_date &&
          dayjs(
            deal.close_date,
          ).format(
            "YYYY-MM-DD",
          ) === closeDate);

      // -------------------------------------------------
      // CREATED DATE FILTER
      // -------------------------------------------------

      const matchesCreatedDate =
        !createdDate ||
        (deal.created_date &&
          dayjs(
            deal.created_date,
          ).format(
            "YYYY-MM-DD",
          ) === createdDate);

      return (
        matchesSearch &&
        matchesStage &&
        matchesOwner &&
        matchesCloseDate &&
        matchesCreatedDate
      );
    },
  );

 
  

  const dealOwnerOptions = [
    ...new Set(
      dealsData.flatMap(
        (deal) =>
          Array.isArray(
            deal.deal_owners,
          )
            ? deal.deal_owners
            : [],
      ),
    ),
  ];

  // =================================================
  // UI
  // =================================================

  return (
    <MainLayout>
      <Box
        sx={{
          maxWidth: "1000",
          margin: "0 auto",
          marginTop: "5px",
          padding: "5px",
          bgcolor:
            "background.default",
          borderRadius: "10px",
          boxShadow: "3px",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <Box
          sx={{
            p: 2,
            height: "12vh",
            boxShadow: "4px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor:
              "background.paper",
            marginBottom: "3px",
            borderTopLeftRadius:
              "12px",
            borderTopRightRadius:
              "12px",
          }}
        >
          <PageHeader
            title="Deals"
            actions={
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                {/* IMPORT */}

                <CommonButton variant="outlined">
                  Import
                </CommonButton>

                {/* CREATE */}

                <CommonButton
                  onClick={
                    handleCreate
                  }
                >
                  Create
                </CommonButton>
              </Box>
            }
          />

          {/* =================================================
              DEAL DRAWER
          ================================================= */}

          <CreateDealsDrawer
            open={openDrawer}
            deal={editDeal}
            leadId={convertLeadId}
            onClose={
              handleCloseDrawer
            }
            onDealSaved={
              fetchDeals
            }
          />
        </Box>

        {/* =================================================
            SEARCH + PAGINATION
        ================================================= */}

        <Box
          sx={{
            p: 2,
            boxShadow: "4px",
            border: "1px solid #ddd",
            backgroundColor:
              "background.paper",
            height: "12vh",
            marginTop: "4px",
            transform:
              "translateY(-5px)",
          }}
        >
          <SearchSection
            placeholder={
              "Search Deal Name,Lead Name,Close Date"
            }
            page={page}
            totalPages={68}
            onPageChange={
              setPage
            }
            searchValue={search}
            onSearchChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
          />
        </Box>

        {/* =================================================
            FILTERS
        ================================================= */}

        <FilterSection>
          {/* DEAL OWNER */}

          <SelectField
            placeholder="Deal Owner"
            options={
              dealOwnerOptions
            }
            value={dealOwner}
            onChange={(e) =>
              setDealOwner(
                e.target.value,
              )
            }
          />

          {/* DEAL STAGE */}

          <SelectField
            placeholder="Deal Stage"
            options={dealStageOptions.map(
              (stage) =>
                stage.label,
            )}
            value={dealStage}
            onChange={(e) =>
              setDealStage(
                e.target.value,
              )
            }
          />

          {/* CLOSE DATE */}

          <CommonDatePicker
            label="Close Date"
            value={
              closeDate
                ? dayjs(
                    closeDate,
                  )
                : null
            }
            onChange={(
              newValue,
            ) =>
              setCloseDate(
                newValue
                  ? newValue.format(
                      "YYYY-MM-DD",
                    )
                  : "",
              )
            }
          />

          {/* CREATED DATE */}

          <CommonDatePicker
            label="Created Date"
            value={
              createdDate
                ? dayjs(
                    createdDate,
                  )
                : null
            }
            onChange={(
              newValue,
            ) =>
              setCreatedDate(
                newValue
                  ? newValue.format(
                      "YYYY-MM-DD",
                    )
                  : "",
              )
            }
          />

          <Box
            sx={{
              flexGrow: 1,
            }}
          />
        </FilterSection>

        {/* =================================================
            DEALS TABLE
        ================================================= */}

        <DataTable
          columns={[
            <CommonCheckbox
              size="medium"
              key="select"
            />,

            "DEAL NAME",

            "LEAD NAME",

            "DEAL STAGE",

            "CLOSE DATE",

            "DEAL OWNER",

            "AMOUNT",

            "ACTIONS",
          ]}
        >
          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
              >
                Loading...
              </TableCell>
            </TableRow>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading &&
            error && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                >
                  {error}
                </TableCell>
              </TableRow>
            )}

          {/* =================================================
              NO DATA
          ================================================= */}

          {!loading &&
            !error &&
            filteredDeals.length ===
              0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                >
                  No deals found.
                </TableCell>
              </TableRow>
            )}

          {/* =================================================
              DEAL DATA
          ================================================= */}

          {!loading &&
            !error &&
            filteredDeals.map(
              (deal) => (
                <TableRow
                  key={deal.id}
                >
                  {/* CHECKBOX */}

                  <TableCell>
                    <CommonCheckbox
                      size="medium"
                    />
                  </TableCell>

                  {/* DEAL NAME */}

                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        cursor:
                          "pointer",
                        color:
                          "primary.main",
                        fontWeight: 500,
                      }}
                      onClick={() =>
                        navigate(
                          `/deals/${deal.id}/activities`,
                        )
                      }
                    >
                      {
                        deal.deal_name
                      }
                    </Box>
                  </TableCell>

                  {/* LEAD NAME */}

                  <TableCell>
                    {
                      deal.lead_name
                    }
                  </TableCell>

                  {/* DEAL STAGE */}

                  <TableCell>
                    {
                      deal.deal_stage
                    }
                  </TableCell>

                  {/* CLOSE DATE */}

                  <TableCell>
                    {
                      deal.close_date
                    }
                  </TableCell>

                  {/* DEAL OWNER */}

                  <TableCell>
                    {Array.isArray(
                      deal.deal_owners,
                    )
                      ? deal.deal_owners.join(
                          ", ",
                        )
                      : "-"}
                  </TableCell>

                  {/* AMOUNT */}

                  <TableCell>
                    $
                    {Number(
                      deal.amount,
                    ).toLocaleString()}
                  </TableCell>

                  {/* ACTIONS */}

                  <TableCell>
                    {/* EDIT */}

                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(
                          deal,
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    {/* DELETE */}

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          deal,
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}
        </DataTable>
      </Box>
    </MainLayout>
  );
}

export default DealsList;
