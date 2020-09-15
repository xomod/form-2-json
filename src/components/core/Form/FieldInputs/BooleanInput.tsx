import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { Field } from "../..";

const BooleanInput = ({ field, onChange }: { field: Field, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {

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
                {val.label}
            </MenuItem>
        ))}
    </TextField>;
}

export default BooleanInput;