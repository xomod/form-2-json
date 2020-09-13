import React, { useState } from 'react';
import Flex from '../utils/Flex';
import { useLittera } from "react-littera";
import { Typography } from "@material-ui/core"

const translations = {
    title: {
        en_US: "Form to JSON",
        pl_PL: "Formularz do JSON",
        de_DE: "Formular zur JSON"
    }
};

function Core() {
    const translated = useLittera(translations);

    return (
        <div style={{height: "64px", flex: 1, backgroundColor: "#eee", padding: "0 20px"}}>
            <Typography variant="h3" gutterBottom>{translated.title}</Typography>
        </div>
    );
}

export default Core;
