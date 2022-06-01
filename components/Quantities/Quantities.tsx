import { useEffect, useState } from "react";

export const Quantities = (props: {
  desiredTotalFlour: number;
  desiredDoughHydration: number;
  desiredLevainAmount: number;
  currentLevainHydration: number;
  desiredSalt: number;
  yeastBoost?: boolean;
}) => {
  const [flour, setFlour] = useState(0);
  const [water, setWater] = useState(0);
  const [salt, setSalt] = useState("");
  const [levain, setLevain] = useState(0);
  const [instantYeast, setInstantYeast] = useState("");

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
      const levainAmountInGrams = calculateLevainAmount(
        desiredTotalFlour,
        desiredLevainAmount
      );
      const waterContentOfLevain =
        levainAmountInGrams * (0.5 * currentLevainHydration);

      return Math.floor(flour * desiredDoughHydration - waterContentOfLevain);
    };

    const calculateSaltAmount = (
      desiredTotalFlour: number,
      desiredSalt: number
    ): number => desiredTotalFlour * desiredSalt;

    setFlour(
      calculateFlourAmount(
        props.desiredTotalFlour,
        props.desiredLevainAmount,
        props.currentLevainHydration
      )
    );

    setWater(
      calculateWaterAmount(
        props.desiredTotalFlour,
        props.desiredDoughHydration,
        props.desiredLevainAmount,
        props.currentLevainHydration
      )
    );

    setSalt(
      calculateSaltAmount(props.desiredTotalFlour, props.desiredSalt).toFixed(1)
    );

    setLevain(
      calculateLevainAmount(props.desiredTotalFlour, props.desiredLevainAmount)
    );

    setInstantYeast((props.desiredTotalFlour * 0.002).toFixed(1));
  }, [
    flour,
    props.desiredTotalFlour,
    props.desiredDoughHydration,
    props.desiredLevainAmount,
    props.currentLevainHydration,
    props.desiredSalt,
  ]);

  return (
    <div>
      <p>Flour: {flour + "g" || "Additional parameters required"}</p>
      <p>
        Water:{" "}
        {water >= 0
          ? water + "g" || "Additional parameters required"
          : "Your levain is already too hydrated to get water amount, please lower levain hydration if you wish to have such a low dough hydration."}
      </p>
      <p>Salt: {salt + "g" || "Additional parameters required"}</p>
      <p>Levain: {levain + "g" || "Additional parameters required"}</p>
      {props.yeastBoost ? (
        <p>
          Instant yeast:{" "}
          {instantYeast + "g" || "Additional parameters required"}
        </p>
      ) : null}
    </div>
  );
};
