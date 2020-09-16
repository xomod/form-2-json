import { IconButton } from "@material-ui/core";
import React from "react";
import { Field } from "..";
import Flex from "../../utils/Flex";
import copy from "copy-to-clipboard";
import { tryPasteJSON } from "../../../utils/methods";
import { useSnackbar } from "notistack";

import CopyIcon from '@material-ui/icons/FileCopy';
import PasteIcon from '@material-ui/icons/Assignment';
import { useLittera } from "react-littera";

const translations = {
    copySuccess: {
        en_US: "Form template copied to clipboard",
        pl_PL: "Szablon formularza skopiowany do schowka",
        de_DE: "Formularvorlage in Zwischenablage kopiert",
    },
    copyError: {
        en_US: "Couldn't copy to clipboard",
        pl_PL: "Nie udało się skopiować do schowka",
        de_DE: "In die Zwischenablage konnte nicht kopiert werden",
    },
    pasteSuccess: {
        en_US: "Form template pasted from clipboard",
        pl_PL: "Szablon formularza wklejony ze schowka",
        de_DE: "Formularvorlage aus der Zwischenablage eingefügt",
    },
    pasteError: {
        en_US: "Couldn't paste from clipboard",
        pl_PL: "Nie udało się wkleić ze schowka",
        de_DE: "Konnte nicht aus der Zwischenablage eingefügt werden",
    },
}

const CopyForm = (props: { fields: Field[], overwriteFields: (value: Field[]) => void }) => {
    const translated = useLittera(translations);
    const { enqueueSnackbar } = useSnackbar();

    const handleCopy = () => {
        try {
            copy(JSON.stringify(props.fields));
            enqueueSnackbar(translated.copySuccess, { variant: 'info' });
        } catch (err) {
            enqueueSnackbar(translated.copyError, { variant: 'error' });
        }
    }

    const handlePaste = async () => {
        const value = await tryPasteJSON();

        if (value !== null && Array.isArray(value)) {
            props.overwriteFields(value);
            enqueueSnackbar(translated.pasteSuccess, { variant: 'info' });
        } else {
            enqueueSnackbar(translated.pasteError, { variant: 'error' });
        }
    }

    return <Flex alignItems="center" justifyContent="flex-end">
        <IconButton onClick={handleCopy} color="primary" ><CopyIcon /></IconButton>
        <IconButton onClick={handlePaste} color="primary"><PasteIcon /></IconButton>
    </Flex>
}



export default CopyForm;