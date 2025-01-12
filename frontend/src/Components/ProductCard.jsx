import {
  Card,
  CardBody,
  Divider,
  Image,
  Text,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function ProductCard({ productImgURL, productName, productPrice }) {
  return (
    <Card
      maxW={"sm"}
      transition="all 0.3"
      _hover={{ transform: "translateY( -5px)", shadow: "xl" }}
    >
      <CardBody>
        <Image
          src={productImgURL}
          alt={productName}
          borderRadius={"lg"}
          boxSize={"xs"}
          objectFit={"cover"}
          justifySelf={"center"}
        />
        <Stack mt={6} spacing={3}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {productName}
          </Text>
          <Text fontSize={"xl"}>₹ {productPrice}</Text>
          <Divider />
          <Box display={"flex"} flexDirection={"row"} gap={4}>
            <Button size={"sm"} variant={"solid"} colorScheme="blue">
              <FaRegEdit />
            </Button>
            <Button size={"sm"} variant={"solid"} colorScheme="red">
              <MdDeleteOutline />
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
