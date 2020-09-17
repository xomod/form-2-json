import { TextField } from "@material-ui/core";
import React from "react";
import { Field } from "../../index.d";

const NumberInput = ({ field, onChange }: { field: Field, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {

    return <TextField type={"number"} style={{ marginTop: "20px", marginBottom: "20px", marginRight: "10px", width: "85%" }} value={field.value} onChange={onChange} id={field.target} key={field.target} label={field.label} variant="outlined" />
}

export default NumberInput;