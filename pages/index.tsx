import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { TitledInput } from "../components/TitledInput/TitledInput";
import { Quantities } from "../components/Quantities/Quantities";
import styles from "../styles/Home.module.css";
import { Ingredients } from "../types";
import { FlourQuantities } from "../components/FlourQuantities/FlourQuantities";

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

  const updateDesiredHydration = (input: string) =>
    setDesiredDoughHydration(convertInputStringToPercentage(input));

  const updateCurrentLevainHydration = (input: string) =>
    setLevainHydration(convertInputStringToPercentage(input));

  const updateDesiredFlour = (input: string) =>
    setDesiredFlour(parseFloat(input));

  const updateDesiredSalt = (input: string) =>
    setDesiredSalt(convertInputStringToPercentage(input));

  const updateDesiredStarter = (input: string) =>
    setDesiredStarter(convertInputStringToPercentage(input));

  const updateYeastBoostPreference = (input: boolean) => setYeastBoost(input);

  const handleCalculatedQuantities = (ingredients: Ingredients) =>
    setRecipe(ingredients);

  return (
    <div>
      <Head>
        <title>Sourdough Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Sourdough Calculator</h1>
      <div className={styles.container}>
        <TitledInput
          title="Desired Dough Hydration (%)"
          valueUpdated={updateDesiredHydration}
          min="0"
          max="100"
        />
        <TitledInput
          title="Current Levain Hydration (%)"
          valueUpdated={updateCurrentLevainHydration}
          min="0"
          max="200"
        />
        <TitledInput
          title="Desired additional flour (g)"
          valueUpdated={updateDesiredFlour}
        />
        <TitledInput
          title="Desired salt (%)"
          valueUpdated={updateDesiredSalt}
        />
        <TitledInput
          title="Desired Levain (%)"
          valueUpdated={updateDesiredStarter}
          min="0"
          max="100"
        />
        <TitledInput
          title="Yeast Boost?"
          type="checkbox"
          valueUpdated={updateYeastBoostPreference}
        />
      </div>
      <Quantities
        desiredTotalFlour={desiredFlour}
        desiredDoughHydration={desiredDoughHydration}
        desiredLevainAmount={desiredStarter}
        currentLevainHydration={levainHydration}
        desiredSalt={desiredSalt}
        yeastBoost={yeastBoost}
        calculatedQuantities={handleCalculatedQuantities}
      />
      <div className={styles.item}>
        <FlourQuantities flour={recipe?.flour || 0} />
      </div>
    </div>
  );
};

export default Home;
