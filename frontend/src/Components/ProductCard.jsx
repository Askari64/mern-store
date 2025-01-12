import { Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react'

// eslint-disable-next-line react/prop-types
function ProductCard({productImgURL, productName, productPrice}) {
  return (
    <Card maxW={'sm'}>
      <CardBody>
      <Image src={productImgURL} alt={productName} borderRadius={'lg'} />
      <Stack direction={'row'}  mt={6} spacing={3}>
        <Heading>{productName}</Heading>
        <p>{productPrice}</p>
      </Stack>
      </CardBody>
    </Card>
  )
}

export default ProductCard