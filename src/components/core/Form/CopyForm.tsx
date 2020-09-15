import { IconButton } from "@material-ui/core";
import React from "react";
import { Field } from "..";
import Flex from "../../utils/Flex";
import copy from "copy-to-clipboard";
import { tryPasteJSON } from "../../../utils/methods";
import { useSnackbar } from "notistack";

import CopyIcon from '@material-ui/icons/FileCopy';
import PasteIcon from '@material-ui/icons/Assignment';

const CopyForm = (props: { fields: Field[], overwriteFields: (value: Field[]) => void }) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleCopy = () => {
        try {
            copy(JSON.stringify(props.fields));
            enqueueSnackbar("Form template copied to clipboard", { variant: 'info' });
        } catch (err) {
            enqueueSnackbar("Couldn't copy to clipboard", { variant: 'error' });
        }
    }

    const handlePaste = async () => {
        const value = await tryPasteJSON();

        if (value !== null && Array.isArray(value)) {
            props.overwriteFields(value);
            enqueueSnackbar("Form template pasted from clipboard", { variant: 'info' });
        } else {
            enqueueSnackbar("Couldn't paste from clipboard", { variant: 'error' });
        }
    }

    return <Flex alignItems="center" justifyContent="flex-end">
        <IconButton onClick={handleCopy} ><CopyIcon /></IconButton>
        <IconButton onClick={handlePaste}><PasteIcon /></IconButton>
    </Flex>
}



export default CopyForm;