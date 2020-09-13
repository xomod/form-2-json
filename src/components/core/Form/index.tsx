import React, { useState } from 'react';
import { Field } from "../index";
import { Button, IconButton, Input, TextField, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Flex from '../../utils/Flex';
import MenuItem from '@material-ui/core/MenuItem';

const typeSelectionOptions = [
  {
    value: 'string',
    label: 'Text',
  },
  {
    value: 'number',
    label: 'Number',
  },
];
  
const useStyles = makeStyles((theme) => ({
  root: {

  },
}));


type FormProps = { 
  fields:   Field[];
  getField: (target: Field["target"]) => Field | undefined;
  setField: (target: Field["target"], value: Field["value"]) => void;
  addField: (label: Field["label"], type: Field["type"], initialValue?: Field["value"]) => void;
  removeField: (target: Field["target"]) => void;
}

function Form(props: FormProps ) {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState<Field["type"]>("string");
  const classes = useStyles();

  const handleChange = (target: Field["target"]) => (event: any) => {
    const value = event?.target?.value ?? "";
    props.setField(target, value);
  }

  const handleNewFieldValueChange = (event: any) => setNewFieldName(event?.target?.value ?? "")
  const handleFieldAddition = () => {
    if(newFieldName && newFieldType && !props.fields.find(field => field.target === newFieldName)) {
      props.addField(newFieldName, newFieldType, getInitialValueByType(newFieldType));
      setNewFieldName("");
    }
  }

  const handleNewFieldTypeChange = (event: any) => {
    setNewFieldType(event?.target?.value ?? "string");
  };

  return (
    <div style={{width: "30%", backgroundColor: "#eee", padding: "20px 30px", flex: 1, height: "calc(100vh - 104px)"}}>
    <Typography variant="h4">Form</Typography>
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField value={props.firstNameValue} onChange={handleFirstNameValueChange} id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <Flex flexDirection="column" width="100%">
        {
          props.fields.map(field => {
            return <Flex alignItems="center" justifyContent="space-between" width="100%">
              <TextField type={field.type === "number" ? "number" : "text"} style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px", width: "85%"}} value={field.value} onChange={handleChange(field.target)} id={field.target} key={field.target} label={field.label} variant="outlined" />
              <IconButton aria-label="delete" onClick={() => props.removeField(field.target)}><DeleteIcon /></IconButton>
            </Flex>
          })
        }
      </Flex>
    </form>

    <Flex alignItems="center" justifyContent="flex-start" width="100%" >
      <TextField label="New field label" style={{flex: 2}} value={newFieldName} variant="filled" onChange={handleNewFieldValueChange} />
      
      
      <TextField
        style={{flex: 1, margin: "0 10px"}}
        id="standard-select-type"
        select
        label="Field type"
        value={newFieldType}
        onChange={handleNewFieldTypeChange}
        variant="filled"
      >
        {typeSelectionOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <Button style={{height: "56px", flex: 1}} variant="outlined" onClick={handleFieldAddition}>Add field</Button>
    </Flex>

    </div>
  );
}

function getInitialValueByType(type: Field["type"]) {
  if(type === "number") return 0;

  return ""; // For "string" option.
}

export default Form;
