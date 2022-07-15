import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/help";
import { useEffect, useState } from "react";
import { Ingredients } from "../../types";

export const Quantities = (props: {
  desiredTotalFlour: number;
  desiredDoughHydration: number;
  desiredLevainAmount: number;
  currentLevainHydration: number;
  desiredSalt: number;
  yeastBoost?: boolean;
  calculatedQuantities?: Function;
}) => {
  const [flour, setFlour] = useState(0);
  const [water, setWater] = useState(0);
  const [salt, setSalt] = useState("");
  const [levain, setLevain] = useState(0);
  const [instantYeast, setInstantYeast] = useState("");
  const [recipe, setRecipe] = useState<Ingredients>();
  const [totalWeight, setTotalWeight] = useState(0);
  const [levainDialogOpen, setLevainDialogOpen] = useState(false);

  useEffect(() => {
    const calculateLevainAmount = (
      desiredTotalFlour: number,
      desiredLevainAmount: number
    ): number => desiredTotalFlour * desiredLevainAmount;

    const calculateFlourAmount = (
      desiredTotalFlour: number,
      desiredLevainAmount: number,
      currentLevainHydration: number
    ): number => {
      const levainAmountInGrams = calculateLevainAmount(
        desiredTotalFlour,
        desiredLevainAmount
      );
      const waterContentOfLevain =
        levainAmountInGrams * (0.5 * currentLevainHydration);
      const flourContentOfLevain = levainAmountInGrams - waterContentOfLevain;
      return Math.floor(desiredTotalFlour - flourContentOfLevain);
    };

    const calculateWaterAmount = (
      desiredTotalFlour: number,
      desiredDoughHydration: number,
      desiredLevainAmount: number,
      currentLevainHydration: number
    ) => {
      const desiredWaterInDough = desiredTotalFlour * desiredDoughHydration;
      const levainAmountInGrams = calculateLevainAmount(
        desiredTotalFlour,
        desiredLevainAmount
      );
      const waterContentOfLevain =
        levainAmountInGrams * (0.5 * currentLevainHydration);

      return Math.floor(desiredWaterInDough - waterContentOfLevain);
    };

    const calculateSaltAmount = (
      desiredTotalFlour: number,
      desiredSalt: number
    ): number => desiredTotalFlour * desiredSalt;

    const createRecipe = (
      flour: number,
      water: number,
      salt: number,
      levain: number,
      instantYeast?: number
    ): Ingredients => ({
      flour,
      water,
      salt,
      levain,
      instantYeast,
    });

    const flourAmount = calculateFlourAmount(
      props.desiredTotalFlour,
      props.desiredLevainAmount,
      props.currentLevainHydration
    );

    setFlour(flourAmount);

    const waterAmount = calculateWaterAmount(
      props.desiredTotalFlour,
      props.desiredDoughHydration,
      props.desiredLevainAmount,
      props.currentLevainHydration
    );

    setWater(waterAmount);

    const saltAmount = calculateSaltAmount(
      props.desiredTotalFlour,
      props.desiredSalt
    ).toFixed(1);

    setSalt(saltAmount);

    const levainAmount = calculateLevainAmount(
      props.desiredTotalFlour,
      props.desiredLevainAmount
    );

    setLevain(Math.floor(levainAmount));

    const instantYeastAmount = (props.desiredTotalFlour * 0.002).toFixed(1);

    setInstantYeast(instantYeastAmount);

    setTotalWeight(
      Math.floor(
        flourAmount +
          waterAmount +
          levainAmount +
          parseFloat(saltAmount) +
          parseFloat(instantYeastAmount)
      )
    );

    setRecipe(
      createRecipe(
        flourAmount,
        waterAmount,
        parseFloat(saltAmount),
        levainAmount,
        parseFloat(instantYeastAmount)
      )
    );
  }, [
    props.desiredTotalFlour,
    props.desiredDoughHydration,
    props.desiredLevainAmount,
    props.currentLevainHydration,
    props.desiredSalt,
  ]);

  useEffect(() => {
    if (props.calculatedQuantities) {
      props.calculatedQuantities(recipe);
    }
  }, [props, recipe]);

  const handleCloseLevainDialog = () => setLevainDialogOpen(false);

  const getLevainRecipeBlurb = (): any => {
    const flour = levain * 0.4;
    const water = flour;
    return (
      <Container>
        <Box marginBottom={2}>
          <Typography>
            <strong>Flour: </strong>
            {flour}g
          </Typography>
          <Typography>
            <strong>Water: </strong>
            {water}g
          </Typography>
          <Typography>
            <strong>Starter: </strong>
            {levain - (water + flour)}g
          </Typography>
        </Box>
        <Divider light />
        <Box marginTop={2} marginBottom={2}>
          <Typography>
            Combine {levain - (water + flour)}g of starter with {water}g of
            water and stir that together.
            <br />
            <br />
            Once milky add in {flour}g of flour and stir until a thick fully
            combined paste is formed.
            <br />
            <br />
            That&apos;s it!
          </Typography>
        </Box>
      </Container>
    );
  };

  return (
    <Container>
      <Box marginBottom={2}>
        <Typography variant="h4">Base recipe</Typography>
        <Typography variant="h6" marginBottom={2}>
          Recipe is all in grams
        </Typography>
        <Typography>
          <strong>Flour:</strong>{" "}
          {flour ? `${flour}g` : "Additional parameters required"}
        </Typography>
        <Typography>
          <strong>Water:</strong>{" "}
          {water >= 0
            ? water
              ? `${water}g`
              : "Additional parameters required"
            : "Your levain is already too hydrated to get water amount, please lower levain hydration if you wish to have such a low dough hydration."}
        </Typography>
        <Typography>
          <strong>Salt:</strong>{" "}
          {salt ? `${salt}g` : "Additional parameters required"}
        </Typography>
        <Typography display="inline">
          <strong>Levain:</strong>{" "}
          {levain ? `${levain}g` : "Additional parameters required"}
        </Typography>
        <IconButton onClick={() => setLevainDialogOpen(true)}>
          <HelpIcon fontSize="small" />
        </IconButton>
        {props.yeastBoost ? (
          <Typography>
            <strong>Instant yeast:</strong>{" "}
            {instantYeast
              ? `${instantYeast}g`
              : "Additional parameters required"}
          </Typography>
        ) : null}
      </Box>
      <Divider light />
      <Typography marginBottom={2} marginTop={2}>
        <strong>Total dough weight:</strong> {totalWeight}
        {"g"}
      </Typography>
      <Dialog onClose={handleCloseLevainDialog} open={levainDialogOpen}>
        <DialogTitle>How to build your levain</DialogTitle>
        {getLevainRecipeBlurb()}
      </Dialog>
    </Container>
  );
};
