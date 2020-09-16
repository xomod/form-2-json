import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useLittera } from "react-littera";
import { Field } from "../..";

const translations = {
    true: {
        en_US: "Yes",
        pl_PL: "Tak",
        de_DE: "Ja"
    },
    false: {
        en_US: "No",
        pl_PL: "Nie",
        de_DE: "Nein"
    },
}

const BooleanInput = ({ field, onChange }: { field: Field, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const translated = useLittera(translations);

    return <TextField
        style={{ marginTop: "20px", marginBottom: "20px", marginRight: "10px", width: "85%" }}
        select
        label={field.label}
        value={field.value}
        onChange={onChange}
        variant="outlined"
    >
        {[{ value: "true", label: "True" }, { value: "false", label: "False" }].map((val: { value: string, label: string }) => (
            <MenuItem key={val.label} value={val.value}>
                {translated[val.value as "true" | "false"]}
            </MenuItem>
        ))}
    </TextField>;
}

export default BooleanInput;