import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
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

  const getLevainRecipeBlurb = (): any => {
    const flour = levain * 0.4;
    const water = flour;
    return (
      <Text>
        Combine {levain - (water + flour)}g of starter with {water}g of water
        and stir that together.
        <br />
        <br />
        Once milky add in {flour}g of flour and stir until a thick fully
        combined paste is formed.
        <br />
        <br />
        That&apos;s it!
      </Text>
    );
  };

  return (
    <Container>
      <Heading as="h2" size="lg" mb={4}>
        Base Recipe:
      </Heading>
      <Text mb={4}>
        <strong>Flour:</strong> {flour ?? "Additional parameters required"}
      </Text>
      <Text mb={4}>
        <strong>Water:</strong>{" "}
        {water >= 0
          ? water ?? "Additional parameters required"
          : "Your levain is already too hydrated to get water amount, please lower levain hydration if you wish to have such a low dough hydration."}
      </Text>
      <Text mb={4}>
        <strong>Salt:</strong> {salt ?? "Additional parameters required"}
      </Text>
      <Flex mb={4}>
        <Text>
          <strong>Levain:</strong> {levain ?? "Additional parameters required"}
        </Text>

        <Popover>
          <PopoverTrigger>
            <Button ml={4} size="xs">
              Click for Levain Recipe
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <strong>How to build your levain</strong>
            </PopoverHeader>
            <PopoverBody>{getLevainRecipeBlurb()}</PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      {props.yeastBoost ? (
        <Text mb={4}>
          <strong>Instant yeast:</strong>{" "}
          {instantYeast ?? "Additional parameters required"}
        </Text>
      ) : null}
      <Divider mb={4} />
      <Text mb={4}>
        <strong>Total dough weight:</strong> {totalWeight}
      </Text>
    </Container>
  );
};
