import { Paper, Text, Button, Title } from "@mantine/core";
import { ICardProps } from "./types";
import classes from "./styles.module.css";

const UiCard = ({ image, title, category }: ICardProps) => {
  return (
    <Paper
      p="xl"
      shadow="md"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
};

export default UiCard;
