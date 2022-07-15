import { Box, Grid, Typography } from "@mui/material";

export const FlourQuantities = (props: { flour: number }) => {
  return (
    <Box padding={2} sx={{ backgroundColor: "secondary.main" }}>
      <Typography variant="h4">Country bread</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>White Flour: {Math.round(props.flour * 0.8)}</Typography>
        </Grid>
        <Grid item>
          <Typography>
            Whole Wheat Flour: {Math.round(props.flour * 0.15)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Rye Flour: {Math.round(props.flour * 0.05)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
