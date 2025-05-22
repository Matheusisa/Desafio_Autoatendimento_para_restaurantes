import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  Text,
  useToast,
  VStack,
  Grid,
  Image,
} from "@chakra-ui/react";

export default function Pedido() {
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then(setProdutos)
      .catch(() => {
        toast({
          title: "Erro ao carregar produtos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  const adicionarAoPedido = (produto) => {
    setPedido((prev) => {
      const itemExistente = prev.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      } else {
        return [...prev, { ...produto, qtd: 1 }];
      }
    });
  };

  const removerItem = (id) => {
    setPedido((prev) => prev.filter((item) => item.id !== id));
  };

  const enviarPedido = () => {
    if (pedido.length === 0) {
      toast({
        title: "Adicione itens antes de enviar.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens: pedido, status: "Recebido" }),
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "Pedido enviado com sucesso!",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
        setPedido([]);
      })
      .catch(() => {
        toast({
          title: "Erro ao enviar pedido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.md">
        <Heading mb={6} textAlign="center" color="teal.600">
          Monte seu pedido 🍔
        </Heading>

        <Grid templateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap={5} mb={8}>
          {produtos.map((p) => (
            <Box
              key={p.id}
              p={4}
              bg="white"
              rounded="xl"
              shadow="md"
              textAlign="center"
              _hover={{ shadow: "lg", transform: "scale(1.02)" }}
              transition="0.2s"
            >
              <Text fontSize="3xl">{p.imagem}</Text>
              <Text fontWeight="bold">{p.nome}</Text>
              <Text fontSize="sm" color="gray.600">
                R$ {p.preco.toFixed(2)}
              </Text>
              <Button
                mt={2}
                size="sm"
                colorScheme="teal"
                onClick={() => adicionarAoPedido(p)}
              >
                Adicionar
              </Button>
            </Box>
          ))}
        </Grid>

        <Heading size="md" mb={3}>
          Seu Pedido
        </Heading>

        {pedido.length === 0 ? (
          <Text color="gray.500">Nenhum item adicionado.</Text>
        ) : (
          <VStack align="stretch" spacing={3} mb={4}>
            {pedido.map((item) => (
              <Box
                key={item.id}
                bg="white"
                p={3}
                shadow="sm"
                rounded="md"
                display="flex"
                justifyContent="space-between"
              >
                <Text>
                  {item.nome} x{item.qtd}
                </Text>
                <Button
                  size="xs"
                  colorScheme="red"
                  onClick={() => removerItem(item.id)}
                >
                  Remover
                </Button>
              </Box>
            ))}
          </VStack>
        )}

        <Button
          colorScheme="green"
          size="lg"
          onClick={enviarPedido}
          isDisabled={pedido.length === 0}
        >
          Enviar Pedido
        </Button>
      </Container>
    </Box>
  );
}
