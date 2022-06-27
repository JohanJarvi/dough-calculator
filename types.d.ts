export type Ingredients = {
    flour: number;
    water: number;
    salt: number;
    levain: number;
    instantYeast?: number;
}

export enum CalculatorInputs {
    TotalFlour,
    DoughHydration,
    LevainHydration,
    Salt,
    Levain,
    Yeast
}