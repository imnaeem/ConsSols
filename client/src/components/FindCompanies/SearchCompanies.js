import { React, useState } from "react";
import { Stack, Box, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import { useFormik, FastField, FormikProvider } from "formik";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useDispatch } from "react-redux";
import {
  companyEmployees,
  companyRate,
} from "../CompanyDashboard/EditCompany/Dropdowns";
import { getSearchedCompanies } from "../../actions/companies";

const SearchCompanies = () => {
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);

  const formikbag = useFormik({
    initialValues: {
      employees: "all",
      rate: "all",
      featured: false,
    },
    onSubmit: (values, { setSubmitting }) => {
      if (values.employees === "all") {
        values = { ...values, employees: "" };
      }
      if (values.rate === "all") {
        values = { ...values, rate: "" };
      }

      setTimeout(() => {
        if (reset) {
          dispatch(
            getSearchedCompanies({
              employees: "",
              rate: "",
              featured: false,
            })
          ).then(() => {
            resetForm();
            setReset(() => false);
          });
        } else {
          dispatch(getSearchedCompanies(values))
            .then((res) => {
              setSubmitting(false);
            })
            .catch(() => {
              setSubmitting(false);
            });
        }
      }, 200);
    },
  });
  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    submitForm,
    resetForm,
  } = formikbag;
  return (
    <Box>
      <Box>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Box
            sx={{
              "& > :not(style)": { margin: "8px 0px" },
            }}
          >
            <FormikProvider value={formikbag}>
              <Stack
                direction={{
                  xs: "column",
                  lg: "row",
                }}
                alignItems={{
                  xs: "stretch",
                  lg: "center",
                }}
                spacing={{
                  xs: 1,
                  lg: 0,
                }}
              >
                <Stack
                  flex={2.5}
                  direction={{
                    xs: "column",
                    lg: "row",
                  }}
                  spacing={2}
                >
                  <FastField
                    as={TextField}
                    select
                    id="featured"
                    label="Companies"
                    value={values.featured}
                    onChange={handleChange("featured")}
                    onBlur={handleBlur("featured")}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value={false}>All</MenuItem>
                    <MenuItem value={true}>Featured</MenuItem>
                  </FastField>
                  <FastField
                    as={TextField}
                    select
                    id="employees"
                    label="Employees"
                    value={values.employees}
                    onChange={handleChange("employees")}
                    onBlur={handleBlur("employees")}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    {companyEmployees.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </FastField>
                  <FastField
                    as={TextField}
                    select
                    id="rate"
                    label="Rate"
                    value={values.rate}
                    onChange={handleChange("rate")}
                    onBlur={handleBlur("rate")}
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    {companyRate.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </FastField>
                </Stack>
                <Box flex={1}></Box>

                <Stack
                  flex={1}
                  direction={{
                    xs: "column-reverse",
                    lg: "row",
                  }}
                  spacing={1.5}
                  justifyContent="flex-end"
                >
                  <LoadingButton
                    disabled={
                      reset ||
                      JSON.stringify(values) ===
                        JSON.stringify({
                          employees: "all",
                          rate: "all",
                          featured: false,
                        })
                    }
                    loading={reset}
                    variant="outlined"
                    size="large"
                    endIcon={<RestartAltIcon />}
                    loadingPosition="end"
                    fullWidth
                    onClick={() => {
                      setReset(() => true);
                      submitForm();
                    }}
                  >
                    Reset
                  </LoadingButton>

                  <LoadingButton
                    disabled={isSubmitting && !reset}
                    loading={isSubmitting && !reset}
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SearchIcon />}
                    loadingPosition="end"
                    fullWidth
                  >
                    Search
                  </LoadingButton>
                </Stack>
              </Stack>
            </FormikProvider>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SearchCompanies;
