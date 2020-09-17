import React, { useState } from 'react';
import Flex from '../utils/Flex';
import Form from './Form';
import Output from './Output';
import { makeStyles } from "@material-ui/styles"
import { makeTarget } from "../../utils/methods";

import StringIcon from "@material-ui/icons/TextFields";
import NumberIcon from "@material-ui/icons/Dialpad";
import BooleanIcon from "@material-ui/icons/Cached";
import ArrayIcon from "@material-ui/icons/Reorder";

import { Field, FieldTypeDefault, FieldTypeIcons, FieldTypeOption } from "./index.d";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        height: `calc(100vh - 76px)`,
    }
}))



const INITIAL_STATE: Field[] = [
    { value: "Foo", target: "first_name", label: "First name", type: "string" },
    { value: "Bar", target: "last_name", label: "Last name", type: "string" },
    { value: "https://lol.com/url.jpg", target: "image", label: "Image", type: "string" },
    { value: 18, target: "age", label: "Age", type: "number" },
    { value: true, target: "bored", label: "Bored", type: "boolean" },
    { value: ["01", "02"], target: "labs", label: "Labs", type: "array" },
]

export const FIELD_TYPE_OPTIONS: FieldTypeOption[] = [
    {
        value: 'string',
        label: 'Text',
    },
    {
        value: 'number',
        label: 'Number',
    },
    {
        value: "boolean",
        label: "Boolean"
    },
    {
        value: "array",
        label: "Array"
    }
];

const defaultTypeIconProps = {
    size: "16px",
    style: { marginRight: "10px" }
}
export const FIELD_TYPE_ICONS: FieldTypeIcons = {
    string: <StringIcon     {...defaultTypeIconProps} />,
    number: <NumberIcon     {...defaultTypeIconProps} />,
    boolean: <BooleanIcon    {...defaultTypeIconProps} />,
    array: <ArrayIcon      {...defaultTypeIconProps} />
}

export const FIELD_TYPE_DEFAULTS_MAP: FieldTypeDefault = {
    boolean: false,
    number: 0,
    string: "",
    array: [],
}

function Core() {
    const classes = useStyles();
    const [fields, setFields] = useState(INITIAL_STATE);
    
    const getField = (target: Field["target"]) => {
        return fields.find(field => field.target === target);
     }
     const setField = (target: Field["target"], value: Field["value"]) => {
        setFields(_fields => 
            _fields.map(field => field.target === target ? {...field, value} : field)
        )
    }
    const addField = (label: Field["label"], type: Field["type"], initialValue: Field["value"] = "") => {
        setFields(_fields => {
            if(_fields.find(field => makeTarget(label) === field.target)) {
                alert("Field already exists!");
                return _fields;
            }

            return ([..._fields, { label, target: makeTarget(label), value: initialValue, type }])
        } );
    }
    const removeField = (target: Field["target"]) => {
        setFields(_fields => _fields.filter(field => field.target !== target));
    }
    const overwriteFields = (value: Field[]) => {
        setFields(value);
    }

    return (
        <div className={classes.root}>
            <Flex alignItems="flex-start" height="100%">
                <Form fields={fields} setField={setField} getField={getField} addField={addField} removeField={removeField} overwriteFields={overwriteFields} />
                <Output fields={fields} />
            </Flex>
        </div>
    );
}

export default Core;
