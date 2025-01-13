/* eslint-disable react/prop-types */
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
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useProductStore } from "../Store/ProductStore.js";
import { useState } from "react";

function ProductCard({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleOpen = () => {
    setUpdatedProduct(product);
    onOpen();
  };

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

  const handleUpdate = async (id, updatedProductDetails) => {
    updateProduct(id, updatedProductDetails);
    onClose();
  };

  return (
    <Card
      maxW={"sm"}
      transition="all 0.3"
      _hover={{ transform: "translateY( -5px)", shadow: "xl" }}
    >
      <CardBody>
        <Image
          src={product.image}
          alt={product.name}
          borderRadius={"lg"}
          boxSize={"xs"}
          objectFit={"cover"}
          justifySelf={"center"}
        />
        <Stack mt={6} spacing={3}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {product.name}
          </Text>
          <Text fontSize={"xl"}>₹ {product.price}</Text>
          <Divider />
          <Box display={"flex"} flexDirection={"row"} gap={4}>
            <Button
              size={"sm"}
              variant={"solid"}
              colorScheme="blue"
              onClick={handleOpen}
            >
              <FaRegEdit />
            </Button>
            <Button
              size={"sm"}
              variant={"solid"}
              colorScheme="red"
              onClick={() => handleDelete(product._id)}
            >
              <MdDeleteOutline />
            </Button>
          </Box>
        </Stack>
      </CardBody>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product ImageURL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={4}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default ProductCard;
