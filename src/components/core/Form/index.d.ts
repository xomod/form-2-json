import { Field } from "../index.d";

export type FormProps = {
    fields: Field[];
    getField: (target: Field["target"]) => Field | undefined;
    setField: (target: Field["target"], value: Field["value"]) => void;
    addField: (label: Field["label"], type: Field["type"], initialValue?: Field["value"]) => void;
    removeField: (target: Field["target"]) => void;
    overwriteFields: (value: Field[]) => void;
}