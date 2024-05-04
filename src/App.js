import { TextField, Button } from "@mui/material";
import Home from "./components/Home";
import { useState } from "react";

let initialFilters = { companyName: null, location: null, minExp: null, jobRole: null, minJdSalary: null };

// {
//   "jdUid": "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
//   "jdLink": "https://weekday.works",
//   "jobDetailsFromCompany": "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
//   "maxJdSalary": 61,
//   "minJdSalary": null,
//   "salaryCurrencyCode": "USD",
//   "location": "delhi ncr",
//   "minExp": 3,
//   "maxExp": 6,
//   "jobRole": "frontend",
//   "companyName": "Dropbox",
//   "logoUrl": "https://logo.clearbit.com/dropbox.com"
// }

function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ ...initialFilters });
  const [search, setSearch] = useState(true);

  const applyFilters = () => {
    setShowFilters(false);
    setSearch(true);
  }

  return (
    <>
      {
        showFilters && (
          <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="filters" style={{ width: '80vw', display: 'flex', flexDirection: 'column' }}>
              {/* Company Name Filter */}
              <br />
              <TextField
                label="Company Name"
                variant="outlined"
                size="small"
                type="text"
                id="companyName"
                name="companyName"
                value={filters.companyName || ''}
                onChange={(e) => { setFilters({ ...filters, companyName: e.target.value }) }}
                placeholder="Search by company"
                fullWidth
              />
              <br />

              {/* Location Filter */}
              <TextField
                label="Location"
                variant="outlined"
                type="text"
                size="small"
                id="location"
                name="location"
                value={filters.location || ''}
                onChange={(e) => { setFilters({ ...filters, location: e.target.value }) }}
                placeholder="Search by location"
                fullWidth
              />

              <br />


              <TextField
                label="Job Role"
                variant="outlined"
                size="small"
                type="text"
                id="jobRole"
                name="jobRole"
                value={filters.jobRole || ''}
                onChange={(e) => { setFilters({ ...filters, jobRole: e.target.value }) }}
                placeholder="Job Role"
                fullWidth
              />

              <br />

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                <TextField
                  label="Minimum Experience (Years)"
                  variant="outlined"
                  size="small"
                  type="number"
                  id="minExp"
                  name="minExp"
                  value={filters.minExp || ''}
                  onChange={(e) => { setFilters({ ...filters, minExp: parseInt(e.target.value) }) }}
                  placeholder="Min experience"
                  sx={{ width: '30vw' }}
                />

                <TextField
                  label="Min Base Salary"
                  variant="outlined"
                  size="small"
                  type="number"
                  id="minSalary"
                  name="minSalary"
                  value={filters.minJdSalary || ''}
                  onChange={(e) => { setFilters({ ...filters, minJdSalary: parseInt(e.target.value) }) }}
                  placeholder="Min Base Salary"
                  sx={{ width: '30vw' }}
                />
              </div>

              <br />

              <Button variant="contained" color="primary" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )
      }

      {
        !showFilters && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
            <Button variant="contained" color="primary" onClick={() => { setShowFilters(true); setSearch(false); }}>
              Add filters
            </Button>
          </div>
        )
      }

      {search && <Home filters={filters} />}
    </>
  );
}

export default App;
