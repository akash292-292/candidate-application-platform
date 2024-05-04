import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Typography, Box, styled, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const DialogCard = ({ jobData, open, handleClose }) => {
  const { companyName, jdLink, jobDetailsFromCompany, jobRole, location, logoUrl, maxExp, maxJdSalary, minExp, minJdSalary, salaryCurrencyCode } = jobData;

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ maxWidth: 345, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
        <StyledCardHeader
          title={companyName}
          subheader={jobRole}
          avatar={
            logoUrl && (
              <Box component="img" src={logoUrl} alt={`${companyName} Logo`} sx={{ width: '50px', height: '50px', marginRight: '10px' }} />
            )
          }
        />
        <hr />
        <CardContent>
          <Typography variant="body2">
            <b>Location:</b> {location}
          </Typography>
          <Typography variant="body2" paddingTop={'4px'} paddingBottom={'4px'}>
            <b>Estimated Salary:</b> {salaryCurrencyCode} {!minJdSalary ? "" : minJdSalary + " -"} {!maxJdSalary ? "Not Given" : maxJdSalary + "K"}
          </Typography>
          <Typography variant="body2">
            <b>Job Description:</b> {jobDetailsFromCompany}
          </Typography>
          {minExp || maxExp ? (
            <Typography variant="body2" paddingTop={'4px'} paddingBottom={'4px'}>
              <b>Experience:</b> {!minExp ? "" : minExp + (maxExp ? " - " : "")}{!maxExp ? "" : maxExp} years
            </Typography>
          ) : (
            <Typography variant="body2" paddingTop={'4px'} paddingBottom={'4px'}>
              <b>Experience:</b> Not Mentioned
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButton size="small" href={jdLink}>
            Easy Apply
          </StyledButton>
        </CardActions>
      </Card>
    </Dialog>
  );
};

const JobCard = ({ jobData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', borderRadius: '10px' }}>
        <StyledCardHeader
          title={jobData.companyName}
          subheader={jobData.jobRole}
          avatar={
            jobData.logoUrl && (
              <Box component="img" src={jobData.logoUrl} alt={`${jobData.companyName} Logo`} sx={{ width: '50px', height: '50px', marginRight: '10px' }} />
            )
          }
        />
        <hr />
        <CardContent>
          <Typography variant="body2">
            <b>Location:</b> {jobData.location}
          </Typography>
          <Typography variant="body2" paddingTop={'4px'} paddingBottom={'4px'}>
            <b>Estimated Salary:</b> {jobData.salaryCurrencyCode} {!jobData.minJdSalary ? "" : jobData.minJdSalary + " -"} {!jobData.maxJdSalary ? "Not Given" : jobData.maxJdSalary + "K"}
          </Typography>
          <Typography variant="body2" sx={{ WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }}>
            <b>Job Description:</b> {jobData.jobDetailsFromCompany}
          </Typography>
          <p onClick={handleOpen} style={{ cursor: 'pointer', fontSize: '12px' }}>
            <b>View More...</b>
          </p>
          {jobData.minExp || jobData.maxExp ? (
            <Typography variant="body2" paddingTop={'4px'} paddingBottom={'4px'}>
              <b>Experience:</b> {!jobData.minExp ? "" : jobData.minExp + (jobData.maxExp ? " - " : "")}{!jobData.maxExp ? "" : jobData.maxExp} years
            </Typography>
          ) : (
            <Typography variant="body2" paddingTop={'4px'} paddingBottom={'4px'}>
              <b>Experience:</b> Not Mentioned
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButton size="small" href={jobData.jdLink}>
            Easy Apply
          </StyledButton>
        </CardActions>
      </Card>
      <DialogCard jobData={jobData} open={open} handleClose={handleClose} />
    </>
  );
};

export default JobCard;
