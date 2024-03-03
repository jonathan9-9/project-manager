import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";

type Props = {
  name: string;
  status: string;
  description: string;
};

const UserStoryAccordion = ({ name, status, description }: Props) => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="0px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left" textColor="white">
              {name}
            </Text>

            <Text className="text-white">{status}</Text>

            <AccordionIcon color="white" />
          </AccordionButton>
        </h2>
        <AccordionPanel textColor="white">{description}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryAccordion;
