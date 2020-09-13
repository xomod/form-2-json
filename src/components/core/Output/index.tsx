import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Field } from '..';
import copy from "copy-to-clipboard";
import { makeJSON } from '../../../utils/methods';

const useStyles = makeStyles((theme) => ({
  pre: {
    padding: "12px 18px",
    backgroundColor: "#f4f4f4",
    borderRadius: 16
  }
}))

function Output(props: {fields: Field[]}) {
  const classes = useStyles();

  const handleCopy = () => {
    copy(JSON.stringify(props.fields, null, 2));
  }

  return (
    <div style={{width: "30%", padding: "20px 30px", flex: 1, height: "100%"}}>
      <Typography variant="h4">Output</Typography>
      {/* <p>{props.firstNameValue}</p> */}
      {/* {
        props.fields.map(field => <p key={field.target}>{field.target}: {field.value}</p>)
      } */}
      <pre className={classes.pre}>{JSON.stringify(makeJSON(props.fields), null, 2)}</pre>
      <Button variant="contained" onClick={handleCopy}>Copy</Button>
    </div>
  );
}

export default Output;