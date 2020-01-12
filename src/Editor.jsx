import React, { useState } from 'react';
import { makeStyles, Button, Grid, Container, Paper, Box, TextField } from '@material-ui/core';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const useStyles = makeStyles(theme => ({
  icon: {
    background: 'green',
    height: 100,
    textAlign: 'center',
    padding: 10,
  },
  attack: {
    background: 'red',
    height: 100,
    textAlign: 'center',
    padding: 10,
  },
  health: {
    background: 'blue',
    height: 100,
    textAlign: 'center',
    padding: 10,
  },
  image: {
    height: 500,
  },
  description: {
    background: 'gray',
    height: 100,
    textAlign: 'center',
    padding: 10,
  },
  name: {
    background: 'gray',
    height: 100,
    textAlign: 'center',
    padding: 10,
    fontSize: 'vw',
  },
  formField: {
    width: '80%',
    height: 50,
    align: 'center',
    padding: 10,
  },
  formText: {
    width: '100%',
    height: '100%',
  }
}));

const Editor = () => {
  console.log(html2canvas);
  const classes = useStyles();
  const [name, setName] = useState([]);
  const [cost, setCost] = useState([]);
  const [description, setDescription] = useState([]);
  const [type, setType] = useState([]);
  const [image, setImage] = useState([]);
  const [attack, setAttack] = useState([]);
  const [health, setHealth] = useState([]);

  const onSave = () => {
    html2canvas(document.getElementById('card')).then(function (canvas) {
      const newImage = canvas.toDataURL('image/png');
      saveAs(newImage, `${name}.png`)
    });
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container
              direction='row'
              justify="center"
              alignItems="center"
              spacing={0}
        >
          <Grid item xs={6}>
              <div className={classes.formField}>
                <TextField id="card-name" label="Name" variant="filled" className={classes.formText}
                           onChange={event => setName(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <TextField id="card-cost" label="Cost" variant="filled" className={classes.formText}
                           onChange={event => setCost(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <TextField id="card-type" label="Type" variant="filled" className={classes.formText}
                           onChange={event => setType(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <TextField id="card-image" label="Image URL" variant="filled" className={classes.formText}
                           onChange={event => setImage(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <TextField id="card-description" label="Description" variant="filled" className={classes.formText}
                           onChange={event => setDescription(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <TextField id="card-attack" label="Attack" variant="filled" className={classes.formText}
                           onChange={event => setAttack(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <TextField id="card-health" label="Health" variant="filled" className={classes.formText}
                           onChange={event => setHealth(event.target.value)}/>
              </div>
              <div className={classes.formField}>
                <Button variant="contained" color="primary" id="download" onClick={onSave}>
                  Save
                </Button>
              </div>
          </Grid>
          <Grid item xs={6} id="card">
              <Grid container>
                <Grid item xs={3} className={classes.icon}>
                  <div>
                    {cost}
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.name}>
                  <div>
                    {name}
                  </div>
                </Grid>
                <Grid item xs={3} className={classes.icon}>
                  <div>
                    {type}
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.image} style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}>
                </Grid>
                <Grid item xs={3} className={classes.attack}>
                  <div>
                    {attack}
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.description}>
                  <div>
                    {description}
                  </div>
                </Grid>
                <Grid item xs={3} className={classes.health}>
                  <div>
                    {health}
                  </div>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Editor;
