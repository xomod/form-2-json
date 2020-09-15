import React, { useState } from 'react';
import Flex from '../utils/Flex';
import Form from './Form';
import Output from './Output';
import { makeStyles } from "@material-ui/core/styles"
import { makeTarget } from "../../utils/methods";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: `${window.innerHeight - 64}px`
    }
}))

export type Field = { value: string | number, target: string, label: string, type: "string" | "number" }

const INITIAL_STATE: Field[] = [
    { value: "Foo", target: "first_name", label: "First name", type: "string" },
    { value: "Bar", target: "last_name", label: "Last name", type: "string" },
    { value: "https://lol.com/url.jpg", target: "image", label: "Image", type: "string" },
    { value: 18, target: "age", label: "Age", type: "number" }
]

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
