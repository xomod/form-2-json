import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Flex from '../../utils/Flex';
import MenuItem from '@material-ui/core/MenuItem';
import { FIELD_TYPE_OPTIONS } from "../";
import { ITranslationsPreset, useLittera } from 'react-littera';

const translations = (preset: ITranslationsPreset) => ({
    label: {
        en_US: "Field label",
        pl_PL: "Etykieta pola",
        de_DE: "Feldbezeichnung",
    },
    type: {
        en_US: "Field type",
        pl_PL: "Typ pola",
        de_DE: "Feldtyp",
    },
    submit: {
        en_US: "Add field",
        pl_PL: "Dodaj pole",
        de_DE: "Feld hinzufügen",
    },
    string: preset.string,
    number: preset.number,
    boolean: preset.boolean,
    array: preset.array,
})

type NewFieldFormProps = {
    newFieldName: string;
    handleNewFieldValueChange: (event: any) => void;
    newFieldType: string;
    handleNewFieldTypeChange: (event: any) => void;
    handleFieldAddition: () => void;
};

export function NewFieldForm({ newFieldName, handleNewFieldTypeChange, handleNewFieldValueChange, handleFieldAddition, newFieldType }: NewFieldFormProps) {
    const translated = useLittera(translations);

    return <Flex alignItems="center" style={{ backgroundColor: "#eee", padding: "10px 0" }} justifyContent="flex-start" width="100%">
        <TextField color="primary" label={translated.label} style={{ flex: 2 }} value={newFieldName} variant="filled" onChange={handleNewFieldValueChange} />


        <TextField
            style={{ flex: 1, margin: "0 10px" }}
            id="standard-select-type"
            select
            label={translated.type}
            value={newFieldType}
            onChange={handleNewFieldTypeChange}
            variant="filled"
            color="primary"
        >
            {FIELD_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {translated[option.value]}
                </MenuItem>
            ))}
        </TextField>

        <Button color="primary" style={{ height: "56px", flex: 1 }} variant="outlined" onClick={handleFieldAddition}>{translated.submit}</Button>
    </Flex>;
}
