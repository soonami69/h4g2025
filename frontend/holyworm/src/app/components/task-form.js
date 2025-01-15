"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, TextField, Button, Alert, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput} from "@mui/material";
import { styled } from "@mui/system";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
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
  maxWidth: "400px",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid #1E3A8A",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#ffffff",
  textAlign: "center",
  display: "flex", 
  flexDirection: "column", 
  gap: "16px", 
});

export default function TaskForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formStatus, setFormStatus] = useState({ success: false, error: "" });

  const onSubmit = (data) => {
    console.log("hi")
    // link to cal
  };

  const [value, setValue] = React.useState(dayjs('2024-01-17'));

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

// Sample assignees
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

  const [priority, setPriority] = React.useState('');
  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer>
      <Typography variant="h3" style={{ fontFamily: 'Poppins, sans-serif' }} gutterBottom color="black">
        Schedule Task
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
          label="Task Title"
          type="text"
          error={!!errors.taskTitle}
          helperText={errors.taskTitle?.message}
          fullWidth
          {...register("taskTitle", {
            required: "Please provide a task title",
            minLength: {
              value: 1,
              message: "Task title cannot be empty",
            },
            pattern: {
              value: /^[a-zA-Z0-9_.-\s]*$/,
              message: "Invalid characters used",
            },
          })}
          style={{ marginBottom: "16px" }}
      />

      {/* Task Description */}
      <TextField
        label="Task Description"
        type="text"
        multiline
        rows={4}
        {...register("taskDescription", {
        })}
        error={!!errors.taskDescription}
        helperText={errors.taskDescription?.message}
        fullWidth
        style={{ marginBottom: "16px" }}
      />

      {/* Assignee */}
      <FormControl fullWidth style={{ marginBottom: "16px" }}>
        <InputLabel id="demo-multiple-checkbox-label">Assignees</InputLabel>
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

      {/* Priority */}
      <FormControl fullWidth style={{ marginBottom: "16px", m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          default=""
          label="Age"
          onChange={handleChangePriority}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
        {errors.priority && <p style={{ color: 'red', marginTop: 5 }}>{errors.priority.message}</p>}
      </FormControl>

      {/* Deadline */}
      <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
            label="Deadline"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>

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
          }}
      >
        Add Task
      </Button>

        </StyledForm>
      </FormContainer>
      </LocalizationProvider>
    </>
  );
}
