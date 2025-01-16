"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, TextField, Button, Alert, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput} from "@mui/material";
import { styled } from "@mui/system";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#FADADD",
});

const StyledForm = styled("form")({
  width: "80%",
  maxWidth: "520px",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid #1E3A8A",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#ffffff",
  textAlign: "center",
  display: "flex", 
  flexDirection: "column", 
  gap: "10px", 
});

export default function MeetingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formStatus, setFormStatus] = useState({ success: false, error: "" });
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [personName, setPersonName] = React.useState([]);

  const handleChangeName = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onSubmit = (data) => {
    const formData = {
        date, startTime, endTime
    };
    console.log(formData)
    // link to cal
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
  PaperProps: {
      style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      },
  },
  };

// Sample participants
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer>
      <Typography variant="h3" style={{ fontFamily: 'Poppins, sans-serif' }} gutterBottom color="black">
        Schedule Meeting
      </Typography>
        {formStatus.success && (
          <Alert severity="success" style={{ marginBottom: "16px" }}>
            Form submitted successfully
          </Alert>
        )}
        {formStatus.error && (
          <Alert severity="error" style={{ marginBottom: "16px" }}>
            {formStatus.error}
          </Alert>
        )}

        <StyledForm onSubmit={handleSubmit(onSubmit)}>

          <TextField
          label="Meeting Title"
          type="text"
          error={!!errors.taskTitle}
          helperText={errors.taskTitle?.message}
          fullWidth
          {...register("meetingTitle", {
            required: "Please provide a meeting title",
            minLength: {
              value: 1,
              message: "Meeting title cannot be empty",
            },
            pattern: {
              value: /^[a-zA-Z0-9_.-\s]*$/,
              message: "Invalid characters used",
            },
          })}
          style={{ marginBottom: "16px" }}
      />

      {/* Meeting Description */}
      <TextField
        label="Meeting Description"
        type="text"
        multiline
        rows={4}
        {...register("meetingDescription", {
        })}
        error={!!errors.taskDescription}
        helperText={errors.taskDescription?.message}
        fullWidth
        style={{ marginBottom: "16px" }}
      />

      {/* Participants */}
      <FormControl fullWidth style={{ marginBottom: "16px" }}>
        <InputLabel id="demo-multiple-checkbox-label">Participants</InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChangeName}
            input={<OutlinedInput label="Assignees" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            >
            {names.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={personName.includes(name)} />
                <ListItemText primary={name} />
                </MenuItem>
            ))}
            </Select>
      </FormControl>

      {/* Date */}
      <DemoContainer components={['DatePicker']}>
            <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            />
          </DemoContainer>

        {/* Start Time */}
    <Box display="flex" gap="16px" marginTop="16px">
        <DemoContainer components={['TimePicker']}>
        <TimePicker
        label="Select Start Time"
        value={startTime}
        onChange={(newValue) => setStartTime(newValue)}
        />
        </DemoContainer>

        {/* End Time */}
        <DemoContainer components={['TimePicker']}>
        <TimePicker
        label="Select End Time"
        value={endTime}
        onChange={(newValue) => setEndTime(newValue)}
        />
        </DemoContainer>
    </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
            backgroundColor: "#FADADD", // Light pink button color
            "&:hover": {
              backgroundColor: "#FFA6B9", // Slightly darker pink on hover
            },
            color: "#000", // Text color
            marginTop: "16px"
          }}
      >
        Add Meeting
      </Button>

        </StyledForm>
      </FormContainer>
      </LocalizationProvider>
    </>
  );
}
