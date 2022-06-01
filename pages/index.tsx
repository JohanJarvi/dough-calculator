import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { TitledInput } from "../components/TitledInput/TitledInput";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [doughHydration, setDoughHydration] = useState(0);
  const [levainHydration, setLevainHydration] = useState(0);
  const [desiredFlour, setDesiredFlour] = useState(0);
  const [desiredSalt, setDesiredSalt] = useState(0);
  const [desiredStarter, setDesiredStarter] = useState(0);
  const [yeastBoost, setYeastBoost] = useState(false);

  const convertInputStringToPercentage = (input: string): number =>
    parseFloat(input) / 100;

  const updateDesiredHydration = (input: string): void => {
    setDoughHydration(convertInputStringToPercentage(input));
  };

  const updateCurrentLevainHydration = (input: string): void => {
    setLevainHydration(convertInputStringToPercentage(input));
  };

  const updateDesiredFlour = (input: string): void => {
    setDesiredFlour(parseFloat(input));
  };

  const updateDesiredSalt = (input: string): void => {
    setDesiredSalt(convertInputStringToPercentage(input));
  };

  const updateDesiredStarter = (input: string): void => {
    setDesiredStarter(convertInputStringToPercentage(input));
  };

  const updateYeastBoostPreference = (input: boolean): void => {
    console.log("What was the input", input);
    setYeastBoost(input);
  };

  return (
    <div>
      <Head>
        <title>Dough Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Dough Calculator</h1>
      <p>Dough Hydration: {doughHydration}</p>
      <p>Levain Hydration: {levainHydration}</p>
      <p>Flour: {desiredFlour}</p>
      <p>Salt: {desiredSalt}</p>
      <p>Starter: {desiredStarter}</p>
      <p>Yeast Boost: {yeastBoost.toString()}</p>
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
          max="100"
        />
        <TitledInput
          title="Desired total flour (g)"
          valueUpdated={updateDesiredFlour}
        />
        <TitledInput
          title="Desired salt (%)"
          valueUpdated={updateDesiredSalt}
        />
        <TitledInput
          title="Desired starter (%)"
          valueUpdated={updateDesiredStarter}
        />
        <TitledInput
          title="Yeast Boost?"
          type="checkbox"
          valueUpdated={updateYeastBoostPreference}
        />
      </div>
    </div>
  );
};

export default Home;
