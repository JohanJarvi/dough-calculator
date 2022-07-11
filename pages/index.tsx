import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Quantities } from "../components/Quantities/Quantities";
import { CalculatorInputs, Ingredients } from "../types.d";
import { FlourQuantities } from "../components/FlourQuantities/FlourQuantities";
import {
  Box,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";

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
    <Container maxW="4xl">
      <Head>
        <title>Sourdough Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" size="2xl" m={4}>
        Sourdough Calculator
      </Heading>
      <SimpleGrid minChildWidth="200px" spacing={4} m={4}>
        <Box>
          <Text mb={2}>Desired total flour (g):</Text>
          <Input type="number" onChange={updateDesiredFlour} />
        </Box>
        <Box>
          <Text mb={2}>Desired dough hydration (%):</Text>
          <Input type="number" onChange={updateDesiredHydration} />
        </Box>
        <Box>
          <Text mb={2}>Current levain hydration (%):</Text>
          <Input type="number" onChange={updateCurrentLevainHydration} />
        </Box>
        <Box>
          <Text mb={2}>Desired salt (%):</Text>
          <Input type="number" onChange={updateDesiredSalt} />
        </Box>
        <Box>
          <Text mb={2}>Desired levain (%):</Text>
          <Input type="number" onChange={updateDesiredStarter} />
        </Box>
        <Box>
          <Text mb={2}>Boost with instant yeast?</Text>
          <Switch onChange={updateYeastBoostPreference}></Switch>
        </Box>
      </SimpleGrid>
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
    </Container>
  );
};

export default Home;
