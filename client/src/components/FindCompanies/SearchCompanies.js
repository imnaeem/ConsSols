import { React } from "react";

import { Stack, Box, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import { useFormik, FastField, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import {
  companyEmployees,
  companyRate,
} from "../CompanyDashboard/EditCompany/Dropdowns";
import { getSearchedCompanies } from "../../actions/companies";

const SearchCompanies = () => {
  const dispatch = useDispatch();
  const formikbag = useFormik({
    initialValues: {
      employees: "",
      rate: "",
      featured: false,
    },

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        dispatch(getSearchedCompanies(values))
          .then((res) => {
            if (res) {
            } else {
              resetForm();
            }
            setSubmitting(false);
          })
          .catch(() => {
            setSubmitting(false);
          });
      }, 400);
    },
  });
  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
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
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack direction="row" spacing={2} flex={4}>
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
                    <MenuItem value={true}>Featured</MenuItem>
                    <MenuItem value={false}>All</MenuItem>
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
                <Box flex={2}></Box>
                <Box flex={1}>
                  <LoadingButton
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SearchIcon />}
                    loadingPosition="end"
                    fullWidth
                  >
                    {isSubmitting ? "Searching" : "Search"}
                  </LoadingButton>
                </Box>
              </Stack>
            </FormikProvider>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SearchCompanies;
