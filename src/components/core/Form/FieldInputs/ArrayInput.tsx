import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import React from "react";
import { useLittera } from "react-littera";
import { Field } from "../../index.d";

const filter = createFilterOptions<OptionType>();

const translations = {
    add: (value: string) => ({
        en_US: `Add '${value}'`,
        pl_PL: `Dodaj '${value}'`,
        de_DE: `'${value}' hinzufügen`
    }),
}

const ArrayInput = ({ field, onChange }: { field: Field, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const translated = useLittera(translations);

    return <Autocomplete
        multiple
        onChange={(event, newValue: Array<any>) => {
            const newValues = newValue.map(nv => typeof nv !== "string" ? nv.inputValue : nv);
            onChange({ target: { value: newValues } } as unknown as React.ChangeEvent<HTMLInputElement>)
        }}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
                filtered.push({
                    inputValue: params.inputValue,
                    title: translated.add(params.inputValue),
                });
            }

            return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        defaultValue={(((field.value as Array<any>).map(v => ({ inputValue: v, title: v.toString() }))) ?? []) as OptionType[]}
        options={(((field.value as Array<any>).map(v => ({ inputValue: v, title: v.toString() }))) ?? []) as OptionType[]}
        style={{ marginTop: "20px", marginBottom: "20px", marginRight: "10px", width: "85%" }}
        getOptionLabel={(option) => option.inputValue?.toString() ?? option?.toString() ?? ""}
        renderOption={(option) => option.title}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label={field.label} variant="outlined" />
        )}
    />
}

interface OptionType {
    inputValue?: string;
    title: string;
}

export default ArrayInput;