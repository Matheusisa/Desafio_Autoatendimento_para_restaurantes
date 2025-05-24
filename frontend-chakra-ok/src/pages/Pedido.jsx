import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Pedido() {
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const toast = useToast();

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/produtos");
      setProdutos(res.data);
    } catch (err) {
      toast({
        title: "Erro ao carregar produtos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const adicionar = (produto) => {
    setPedido((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const remover = (id) => {
    setPedido((prev) => prev.filter((item) => item.id !== id));
  };

  const enviarPedido = async () => {
    if (pedido.length === 0) {
      toast({
        title: "Adicione itens ao pedido",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post("http://localhost:3000/pedidos", {
        itens: pedido,
        status: "Recebido",
      });
      setPedido([]);
      toast({
        title: "Pedido enviado com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao enviar pedido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading mb={4}>📋 Monte seu Pedido</Heading>
      <Text mb={6}>Escolha seus produtos favoritos abaixo</Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={8}>
        {produtos.map((p) => (
          <MotionBox
            key={p.id}
            p={4}
            borderWidth="1px"
            rounded="md"
            shadow="sm"
            bg="whiteAlpha.100"
            textAlign="center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Text fontSize="3xl">{p.emoji || "🍽️"}</Text>
            <Text fontWeight="bold">{p.nome}</Text>
            <Text color="gray.500">R$ {p.preco.toFixed(2)}</Text>
            <Button
              mt={2}
              size="sm"
              colorScheme="teal"
              onClick={() => adicionar(p)}
            >
              Adicionar
            </Button>
          </MotionBox>
        ))}
      </SimpleGrid>

      <Heading size="md" mb={3}>🛒 Seu Pedido</Heading>

      {pedido.length === 0 ? (
        <Text color="gray.500">Nenhum item adicionado.</Text>
      ) : (
        <VStack align="stretch" spacing={3} mb={4}>
          {pedido.map((item) => (
            <HStack
              key={item.id}
              justify="space-between"
              p={3}
              bg="gray.100"
              rounded="md"
            >
              <Text>
                {item.quantidade}x {item.nome}
              </Text>
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => remover(item.id)}
              >
                Remover
              </Button>
            </HStack>
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
    </Box>
  );
}
