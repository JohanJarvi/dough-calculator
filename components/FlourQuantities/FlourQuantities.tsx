export const FlourQuantities = (props: { flour: number }) => {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ fontWeight: "bold" }}>Country Bread</div>
      <p>White Flour: {Math.round(props.flour * 0.8)}</p>
      <p>Whole Wheat Flour: {Math.round(props.flour * 0.15)}</p>
      <p>Rye Flour: {Math.round(props.flour * 0.05)}</p>
    </div>
  );
};
