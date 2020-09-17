import { Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import React from 'react';
import { Field } from '../index.d';
import { useOutputs } from './useOutputs';
import copy from "copy-to-clipboard";
import { makeJSON } from '../../../utils/methods';
import { useLittera } from 'react-littera';
import { useSnackbar } from 'notistack';
import Flex from '../../utils/Flex';
import TrashIcon from "@material-ui/icons/Delete"

function Output(props: { fields: Field[] }) {
  const { value: outputs, add: addOutput, remove: removeOutput } = useOutputs();

  const translated = useLittera(translations);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = () => {
    try {
      const output = JSON.stringify(makeJSON(props.fields), null, 2);

      if (output && JSON.parse(output)) {
        copy(output);
        enqueueSnackbar(translated.copySuccess, { variant: 'info' });
      } else {
        enqueueSnackbar(translated.copyError, { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar(err.message || translated.copyError, { variant: 'error' });
    }
  }

  const handleAddOutput = () => {
    addOutput({ title: "New draft", content: getParsedOutput() });
  }

  const getParsedOutput = () => {
    try {
      return JSON.parse(JSON.stringify(makeJSON(props.fields), null, 2));
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4">{translated.title}</Typography>
      <pre className={classes.pre}>{JSON.stringify(makeJSON(props.fields), null, 2)}</pre>
      <Flex justifyContent="flex-start" alignItems="center">
        <Button variant="outlined" onClick={handleCopy}>{translated.copy}</Button>
        <Button variant="outlined" onClick={handleAddOutput}>{translated.save}</Button>
      </Flex>
      <Flex width="100%" flexDirection="column-reverse" alignItems="center" justifyContent="flex-start" className={classes.outputsRoot}>
        {
          outputs?.map((op, index) =>
            <div style={{ width: "100%" }}>
              <Flex alignItems="center" justifyContent="space-between" width="100%">
                <Typography variant="h6">{op.title}</Typography>
                <IconButton onClick={() => removeOutput(index)}><TrashIcon /></IconButton>
              </Flex>
              <pre key={JSON.stringify(op.content, null, 2)} className={classes.pre}>{JSON.stringify(op.content, null, 2)}</pre>
            </div>
          )
        }
      </Flex>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  pre: {
    padding: "12px 18px",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    position: "relative",
    overflow: "auto",
    fontSize: "1.3rem",
  },
  root: { width: "30%", padding: "20px 30px", paddingTop: "32px", flex: 1, height: "100%", maxHeight: "95vh", position: "relative" },
  outputsRoot: { position: "relative", marginTop: "5%", maxHeight: "100%", overflowY: "scroll" }
}))

const translations = {
  copy: {
    en_US: "Copy",
    pl_PL: "Skopiuj",
    de_DE: "Einfügen"
  },
  save: {
    en_US: "Save",
    pl_PL: "Zapisz",
    de_DE: "Speichern"
  },
  title: {
    en_US: "Result",
    pl_PL: "Wynik",
    de_DE: "Ergebnis"
  },
  copySuccess: {
    en_US: "JSON copied to clipboard",
    pl_PL: "JSON skopiowany do schowka",
    de_DE: "JSON in Zwischenablage kopiert",
  },
  copyError: {
    en_US: "Couldn't copy to clipboard",
    pl_PL: "Nie udało się skopiować do schowka",
    de_DE: "In die Zwischenablage konnte nicht kopiert werden",
  },
}

export default Output;