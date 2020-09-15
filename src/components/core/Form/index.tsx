import React, { useState } from 'react';
import { Field, FIELD_TYPE_DEFAULTS_MAP } from "../index";
import { IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Flex from '../../utils/Flex';
import CopyForm from './CopyForm';
import { NewFieldForm } from './NewFieldForm';
import FieldInput from './FieldInputs';

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
  overwriteFields: (value: Field[]) => void;
}

function Form(props: FormProps ) {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState<Field["type"]>("string");
  const classes = useStyles();

  const handleChange = (target: Field["target"]) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value ?? "";
    props.setField(target, value);
  }

  const handleNewFieldValueChange = (event: any) => setNewFieldName(event?.target?.value ?? "")
  const handleFieldAddition = () => {
    if(newFieldName && newFieldType && !props.fields.find(field => field.target === newFieldName)) {
      props.addField(newFieldName, newFieldType, FIELD_TYPE_DEFAULTS_MAP[newFieldType]);
      setNewFieldName("");
    }
  }

  const handleNewFieldTypeChange = (event: any) => {
    setNewFieldType(event?.target?.value ?? "string");
  };

  return (
    <div style={{width: "30%", backgroundColor: "#eee", padding: "20px 30px", flex: 1, height: "calc(100vh - 104px)"}}>
      <Flex alignItems="center" justifyContent="space-between">
      <Typography variant="h4">Form</Typography>
        <CopyForm fields={props.fields} overwriteFields={props.overwriteFields} />
      </Flex>
    <form className={classes.root} noValidate autoComplete="off">
      {/* <TextField value={props.firstNameValue} onChange={handleFirstNameValueChange} id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <Flex flexDirection="column" width="100%">
        {
          props.fields.map(field => {
            return <Flex alignItems="center" justifyContent="space-between" width="100%">
              <FieldInput field={field} onChange={handleChange(field.target)} />
              {/* <TextField type={field.type === "number" ? "number" : "text"} style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px", width: "85%"}} value={field.value} onChange={handleChange(field.target)} id={field.target} key={field.target} label={field.label} variant="outlined" /> */}
              <IconButton aria-label="delete" onClick={() => props.removeField(field.target)}><DeleteIcon /></IconButton>
            </Flex>
          })
        }
      </Flex>
    </form>

      <NewFieldForm newFieldName={newFieldName} handleNewFieldValueChange={handleNewFieldValueChange} newFieldType={newFieldType} handleNewFieldTypeChange={handleNewFieldTypeChange} handleFieldAddition={handleFieldAddition} />

    </div>
  );
}

export default Form;
