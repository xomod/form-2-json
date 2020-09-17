import React, { useState } from 'react';
import { FIELD_TYPE_DEFAULTS_MAP, FIELD_TYPE_ICONS } from "../index";
import { Field } from "../index.d";
import { FormProps } from "./index.d";
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Flex from '../../utils/Flex';
import CopyForm from './CopyForm';
import { NewFieldForm } from './NewFieldForm';
import FieldInput from './FieldInputs';
import { ITranslationsPreset, useLittera } from 'react-littera';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    padding: "20px 30px",
    flex: 1,
    height: "calc(100vh - 104px)",
  },
  fieldRoot: {
    "&> span": {
      opacity: 0,
      transition: "opacity 255ms ease"
    },
    "&:hover": {
      "&> span": {
        opacity: 1,
        transition: "opacity 255ms ease"
      }
    }
  },
  form: {
    flex: 1,
    overflowY: "scroll"
  }
}));

const translations = (preset: ITranslationsPreset) => ({
  title: {
    en_US: "Form",
    pl_PL: "Formularz",
    de_DE: "Formular",
  },
  string: preset.string,
  number: preset.number,
  boolean: preset.boolean,
  array: preset.array,
})

function Form(props: FormProps) {
  const classes = useStyles();
  const translated = useLittera(translations)

  // Field addition variables.
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState<Field["type"]>("string");


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
    <Flex flexDirection="column" justifyContent="space-between" className={classes.root}>
      <Flex alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{translated.title}</Typography>
        <CopyForm fields={props.fields} overwriteFields={props.overwriteFields} />
      </Flex>
      <form className={classes.form} noValidate autoComplete="off">
      <Flex flexDirection="column" width="100%">
        {
          props.fields.map(field => {
            return <Flex className={classes.fieldRoot} key={field.label + field.target} alignItems="center" justifyContent="space-between" width="100%">
              <Tooltip title={translated[field.type]}>{FIELD_TYPE_ICONS[field.type]}</Tooltip>
              <FieldInput field={field} onChange={handleChange(field.target)} />
              <span><IconButton aria-label="delete" onClick={() => props.removeField(field.target)}><DeleteIcon /></IconButton></span>
            </Flex>
          })
        }
      </Flex>
    </form>

      <NewFieldForm newFieldName={newFieldName} handleNewFieldValueChange={handleNewFieldValueChange} newFieldType={newFieldType} handleNewFieldTypeChange={handleNewFieldTypeChange} handleFieldAddition={handleFieldAddition} />

    </Flex>
  );
}

export default Form;
