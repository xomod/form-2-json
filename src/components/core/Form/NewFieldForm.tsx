import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Flex from '../../utils/Flex';
import MenuItem from '@material-ui/core/MenuItem';
import { FIELD_TYPE_OPTIONS } from "../";

export function NewFieldForm({ newFieldName, handleNewFieldTypeChange, handleNewFieldValueChange, handleFieldAddition, newFieldType }: { newFieldName: string; handleNewFieldValueChange: (event: any) => void; newFieldType: string; handleNewFieldTypeChange: (event: any) => void; handleFieldAddition: () => void; }) {
    return <Flex alignItems="center" justifyContent="flex-start" width="100%">
        <TextField label="New field label" style={{ flex: 2 }} value={newFieldName} variant="filled" onChange={handleNewFieldValueChange} />


        <TextField
            style={{ flex: 1, margin: "0 10px" }}
            id="standard-select-type"
            select
            label="Field type"
            value={newFieldType}
            onChange={handleNewFieldTypeChange}
            variant="filled"
        >
            {FIELD_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>

        <Button style={{ height: "56px", flex: 1 }} variant="outlined" onClick={handleFieldAddition}>Add field</Button>
    </Flex>;
}
