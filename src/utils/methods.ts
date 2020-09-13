import { Field } from "../components/core";

export function makeTarget(label: Field["label"]) {
    return label.toLowerCase().replace(/ /g, "_"); // eg. First name => first_name
    
}

export function makeJSON(fields: Field[]) {
    const json: {[key: string]: Field["value"]} = {};

    fields.forEach(field => {
        json[field.target] = field.value;
    });

    return json;
}