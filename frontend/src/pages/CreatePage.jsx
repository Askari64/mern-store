import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../Store/ProductStore";

function CreatePage() {
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(addProduct);
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
    setAddProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"md"} textAlign={"center"} mb={8}>
          Create a new Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={addProduct.name}
              onChange={(e) =>
                setAddProduct({ ...addProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="Price"
              type="number"
              value={addProduct.price}
              onChange={(e) =>
                setAddProduct({ ...addProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="Image"
              value={addProduct.image}
              onChange={(e) =>
                setAddProduct({ ...addProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
