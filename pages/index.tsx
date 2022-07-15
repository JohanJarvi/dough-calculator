import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { Quantities } from "../components/Quantities/Quantities";
import { Ingredients } from "../types.d";
import { FlourQuantities } from "../components/FlourQuantities/FlourQuantities";
import { Box, Grid, Switch, TextField, Typography } from "@mui/material";

const Home: NextPage = () => {
  const [desiredDoughHydration, setDesiredDoughHydration] = useState(0);
  const [levainHydration, setLevainHydration] = useState(0);
  const [desiredFlour, setDesiredFlour] = useState(0);
  const [desiredSalt, setDesiredSalt] = useState(0);
  const [desiredStarter, setDesiredStarter] = useState(0);
  const [yeastBoost, setYeastBoost] = useState(false);
  const [recipe, setRecipe] = useState<Ingredients>();

  const convertInputStringToPercentage = (input: string): number =>
    parseFloat(input) / 100;

  const updateDesiredFlour = (event: ChangeEvent<HTMLInputElement>) =>
    setDesiredFlour(parseFloat(event.target.value));

  const updateDesiredHydration = (event: ChangeEvent<HTMLInputElement>) =>
    setDesiredDoughHydration(
      convertInputStringToPercentage(event.target.value)
    );

  const updateCurrentLevainHydration = (event: ChangeEvent<HTMLInputElement>) =>
    setLevainHydration(convertInputStringToPercentage(event.target.value));

  const updateDesiredSalt = (event: ChangeEvent<HTMLInputElement>) =>
    setDesiredSalt(convertInputStringToPercentage(event.target.value));

  const updateDesiredStarter = (event: ChangeEvent<HTMLInputElement>) =>
    setDesiredStarter(convertInputStringToPercentage(event.target.value));

  const updateYeastBoostPreference = (event: ChangeEvent<HTMLInputElement>) =>
    setYeastBoost(event.target.checked);

  const handleCalculatedQuantities = (ingredients: Ingredients) =>
    setRecipe(ingredients);

  return (
    <>
      <Head>
        <title>Sourdough Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ backgroundColor: "secondary.main" }} padding={2}>
        <Typography variant="h2" marginBottom={2}>
          Sourdough Calculator
        </Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item>
            <TextField
              id="desired-flour"
              label="Desired total flour (g)"
              variant="outlined"
              onChange={updateDesiredFlour}
            />
          </Grid>
          <Grid item>
            <TextField
              id="desired-dough-hydration"
              label="Desired dough hydration (%)"
              variant="outlined"
              onChange={updateDesiredHydration}
            />
          </Grid>
          <Grid item>
            <TextField
              id="current-levain-hydration"
              label="Target levain hydration (%)"
              variant="outlined"
              onChange={updateCurrentLevainHydration}
            />
          </Grid>
          <Grid item>
            <TextField
              id="desired-salt"
              label="Desired salt (%)"
              variant="outlined"
              onChange={updateDesiredSalt}
            />
          </Grid>
          <Grid item>
            <TextField
              id="desired-levain"
              label="Desired levain amount (%)"
              variant="outlined"
              onChange={updateDesiredStarter}
            />
          </Grid>
          <Grid item>
            <Typography>Yeast boost desired?</Typography>
            <Switch
              checked={yeastBoost}
              onChange={updateYeastBoostPreference}
            />
          </Grid>
        </Grid>
      </Box>
      <Quantities
        desiredTotalFlour={desiredFlour}
        desiredDoughHydration={desiredDoughHydration}
        desiredLevainAmount={desiredStarter}
        currentLevainHydration={levainHydration}
        desiredSalt={desiredSalt}
        yeastBoost={yeastBoost}
        calculatedQuantities={handleCalculatedQuantities}
      />
      <FlourQuantities flour={recipe?.flour || 0} />
    </>
  );
};

export default Home;
