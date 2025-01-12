import {
  Card,
  CardBody,
  Divider,
  Image,
  Text,
  Stack,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useProductStore } from "../Store/ProductStore.js";

// eslint-disable-next-line react/prop-types
function ProductCard({ productImgURL, productName, productPrice, productID }) {
  const { deleteProduct } = useProductStore();
  const toast = useToast();

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success === true) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
            <Button
              size={"sm"}
              variant={"solid"}
              colorScheme="red"
              onClick={() => handleDelete(productID)}
            >
              <MdDeleteOutline />
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
