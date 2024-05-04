import axios from 'axios';

export const getData = async (body, filters) => {
  console.log(filters);
  const data = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', body);
  console.log(data);
  
  const filteredJobs = data.data.jdList.filter((job) => {
    let match = true;

    // Filter by company name (case-insensitive)
    if (filters.companyName && !job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) {
      match = false;
    }

    // Filter by location (case-insensitive)
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      match = false;
    }

    // Filter by minimum experience
    if (filters.minExp && job.minExp < filters.minExp) {
      match = false;
    }

    // Filter by job role (case-insensitive)
    if (filters.jobRole && job.jobRole.toLowerCase() !== filters.jobRole.toLowerCase()) {
      match = false;
    }

    // Filter by minimum salary
    if (filters.minJdSalary && job.minJdSalary && job.minJdSalary < filters.minJdSalary) {
      match = false;
    }

    return match;
  });

  return filteredJobs;
}

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