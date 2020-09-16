import { Button, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import React from 'react';
import { Field } from '..';
import copy from "copy-to-clipboard";
import { makeJSON } from '../../../utils/methods';
import { useLittera } from 'react-littera';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  pre: {
    padding: "12px 18px",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    position: "relative",
    overflow: "auto",
    fontSize: "1.3rem",
  },
  root: { width: "30%", padding: "20px 30px", paddingTop: "32px", flex: 1, height: "100%", maxHeight: "95vh", position: "relative" }
}))

const translations = {
  copy: {
    en_US: "Copy",
    pl_PL: "Skopiuj",
    de_DE: "Einfügen"
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

function Output(props: {fields: Field[]}) {
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

  return (
    <div className={classes.root}>
      <Typography variant="h4">{translated.title}</Typography>
      <pre className={classes.pre}>{JSON.stringify(makeJSON(props.fields), null, 2)}</pre>
      <Button variant="outlined" onClick={handleCopy}>{translated.copy}</Button>
    </div>
  );
}

export default Output;