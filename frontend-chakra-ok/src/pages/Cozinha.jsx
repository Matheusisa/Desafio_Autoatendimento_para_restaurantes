import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Stack,
  useToast,
} from "@chakra-ui/react";

export default function Cozinha() {
  const [pedidos, setPedidos] = useState([]);
  const toast = useToast();

  const carregarPedidos = () => {
    fetch("http://localhost:3000/pedidos")
      .then((res) => res.json())
      .then(setPedidos)
      .catch(() =>
        toast({
          title: "Erro ao carregar pedidos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const marcarComoPronto = (id) => {
    fetch(`http://localhost:3000/pedidos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Pronto" }),
    })
      .then(() => {
        toast({
          title: "Pedido marcado como pronto.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        carregarPedidos();
      })
      .catch(() =>
        toast({
          title: "Erro ao atualizar pedido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.lg">
        <Heading mb={6} textAlign="center" color="orange.500">
          Pedidos na Cozinha 🍳
        </Heading>

        {pedidos.length === 0 ? (
          <Text textAlign="center" color="gray.500">
            Nenhum pedido disponível.
          </Text>
        ) : (
          <VStack spacing={5} align="stretch">
            {pedidos.map((pedido) => (
              <Box
                key={pedido.id}
                bg="white"
                shadow="md"
                p={5}
                rounded="md"
                borderLeft="6px solid"
                borderColor={pedido.status === "Pronto" ? "green.400" : "orange.400"}
              >
                <Stack justify="space-between" direction={["column", "row"]} align="start">
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={1}>
                      Pedido #{pedido.id}
                    </Text>
                    <Badge
                      colorScheme={pedido.status === "Pronto" ? "green" : "orange"}
                      mb={2}
                    >
                      {pedido.status}
                    </Badge>

                    <VStack align="start" spacing={1}>
                      {pedido.itens.map((item, index) => (
                        <Text key={index}>
                          {item.qtd}x {item.nome}
                        </Text>
                      ))}
                    </VStack>
                  </Box>

                  {pedido.status !== "Pronto" && (
                    <Button
                      colorScheme="green"
                      onClick={() => marcarComoPronto(pedido.id)}
                      mt={[3, 0]}
                      alignSelf={["center", "flex-end"]}
                    >
                      Marcar como pronto
                    </Button>
                  )}
                </Stack>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  );
}
