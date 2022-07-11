import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export const FlourQuantities = (props: { flour: number }) => {
  return (
    <Container maxW="4xl">
      <Heading mb={4} as="h2" size="lg" alignSelf="center">
        Country bread
      </Heading>
      <SimpleGrid columns={[1, 2, 3]}>
        <Text>White Flour: {Math.round(props.flour * 0.8)}</Text>
        <Text>Whole Wheat Flour: {Math.round(props.flour * 0.15)}</Text>
        <Text>Rye Flour: {Math.round(props.flour * 0.05)}</Text>
      </SimpleGrid>
    </Container>
  );
};
