export type Ingredients = {
    flour: number;
    water: number;
    salt: number;
    levain: number;
    instantYeast?: number;
}

export enum CalculatorInputs {
    TotalFlour = "total_flour",
    DoughHydration,
    LevainHydration,
    Salt,
    Levain,
    Yeast
}