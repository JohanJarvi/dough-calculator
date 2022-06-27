import { useEffect, useState } from "react";
import { Ingredients } from "../../types";
import styles from "./Quantities.module.css";

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

  const showHowToBuildLevainAlert = () => {
    const flour = levain * 0.4;
    const water = flour;
    alert(
      `Levain - flour: ${flour}, water: ${water}, starter = ${
        levain - (water + flour)
      }`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Base recipe</div>
      <div className={styles.item}>
        <span className={styles.descriptor}>Flour:</span>{" "}
        {flour ?? "Additional parameters required"}
      </div>
      <div className={styles.item}>
        <span className={styles.descriptor}>Water:</span>{" "}
        {water >= 0
          ? water ?? "Additional parameters required"
          : "Your levain is already too hydrated to get water amount, please lower levain hydration if you wish to have such a low dough hydration."}
      </div>
      <div className={styles.item}>
        <span className={styles.descriptor}>Salt:</span>{" "}
        {salt || "Additional parameters required"}
      </div>
      <div className={styles.item}>
        <span className={styles.descriptor}>Levain:</span>{" "}
        {levain || "Additional parameters required"}
        <button className={styles.button} onClick={showHowToBuildLevainAlert}>
          Click for Levain recipe
        </button>
      </div>
      {props.yeastBoost ? (
        <div className={styles.item}>
          <span className={styles.descriptor}>Instant yeast:</span>{" "}
          {instantYeast || "Additional parameters required"}
        </div>
      ) : null}
      <div className={styles.item}>
        <span className={styles.descriptor}>Total Dough Weight:</span>{" "}
        {totalWeight}
      </div>
    </div>
  );
};
