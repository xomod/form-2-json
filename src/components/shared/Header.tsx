import React from 'react';
import { useLittera, useLitteraMethods } from "react-littera";
import { Typography, TextField, MenuItem } from "@material-ui/core"
import Flex from "../utils/Flex";

const translations = {
    title: {
        en_US: "form-2-json", //"Form to JSON",
        pl_PL: "form-2-json", //"Formularz do JSON",
        de_DE: "form-2-json", //"Formular zur JSON"
    },
    language: {
        en_US: "Language",
        pl_PL: "Język",
        de_DE: "Sprache"
    },
    en_US: {
        en_US: "English",
        pl_PL: "Angielski",
        de_DE: "Englisch"
    },
    de_DE: {
        en_US: "German",
        pl_PL: "Niemiecki",
        de_DE: "Deutsch"
    },
    pl_PL: {
        en_US: "Polish",
        pl_PL: "Polski",
        de_DE: "Polnisch"
    },
};

function Core() {
    const translated = useLittera(translations);
    const { locale, locales, setLocale } = useLitteraMethods();

    const handleLocaleChange = (event: any) => {
        setLocale(event?.target?.value ?? locale);
    }

    return (
        <div style={{ flex: 1, backgroundColor: "#eee", padding: "10px 20px" }}>
            <Flex justifyContent="space-between" alignItems="center">
                <Typography variant="h4" style={{ opacity: 0.15, fontWeight: "bold" }} gutterBottom>{translated.title.toLowerCase()}</Typography>
                <Flex>
                    <TextField
                        style={{flex: 1, margin: "0 10px"}}
                        id="standard-select-type"
                        select
                        label={translated.language}
                        value={locale}
                        onChange={handleLocaleChange}
                        variant="outlined"
                    >
                        {locales.map((loc: any) => (
                            <MenuItem key={loc} value={loc}>
                                {translated[loc as "en_US" | "de_DE" | "pl_PL"]}
                            </MenuItem>
                        ))}
                    </TextField>
                </Flex>
            </Flex>
        </div>
    );
}

export default Core;
