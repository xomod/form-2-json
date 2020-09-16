import { Message } from "@material-ui/icons";
import React from "react";
import { Field } from "../..";

import ArrayInput from "./ArrayInput";
import BooleanInput from "./BooleanInput";
import NumberInput from "./NumberInput";
import StringInput from "./StringInput";

const FieldInput = ({ field, onChange }: { field: Field, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {

    if (field.type === "number")
        return <NumberInput field={field} onChange={onChange} />
    if (field.type === "string")
        return <StringInput field={field} onChange={onChange} />
    if (field.type === "boolean")
        return <BooleanInput field={field} onChange={onChange} />
    if (field.type === "array")
        return <ArrayInput field={field} onChange={onChange} />

    return <Message>Something went wrong...</Message>
}

export default FieldInput;