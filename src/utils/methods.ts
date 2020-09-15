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

export const tryPasteJSON = async (): Promise<Field[] | null> => {
    const raw_content = await navigator.clipboard.readText();

    try {
        const content = JSON.parse(raw_content) as Field[];
        return content;
    } catch (err) {
        console.error(err)
        return null;
    }
}