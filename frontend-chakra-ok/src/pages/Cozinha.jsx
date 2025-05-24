import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Cozinha() {
  const [pedidos, setPedidos] = useState([]);
  const toast = useToast();

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pedidos");
      setPedidos(res.data);
    } catch (err) {
      toast({
        title: "Erro ao buscar pedidos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const atualizarStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/pedidos/${id}`, { status });
      buscarPedidos();
      toast({
        title: `Status atualizado para ${status}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao atualizar status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading mb={4}>🍽️ Painel da Cozinha</Heading>
      <Text mb={6}>Gerencie os pedidos em andamento</Text>

      <VStack align="stretch" spacing={4}>
        {pedidos.length === 0 && (
          <Text color="gray.500" textAlign="center">
            Nenhum pedido no momento.
          </Text>
        )}

        {pedidos.map((pedido) => (
          <MotionBox
            key={pedido.id}
            p={4}
            borderWidth="1px"
            rounded="md"
            shadow="md"
            bg="whiteAlpha.100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Heading size="sm" mb={2}>
              Pedido #{pedido.id}
            </Heading>
            <VStack align="start" spacing={1}>
              {pedido.itens.map((item, index) => (
                <Text key={index}>
                  {item.nome} x{item.quantidade}
                </Text>
              ))}
            </VStack>

            <Text mt={2}>
              <strong>Status:</strong> {pedido.status}
            </Text>

            <HStack mt={3} spacing={2}>
              {["Recebido", "Em preparo", "Pronto", "Entregue"].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  onClick={() => atualizarStatus(pedido.id, status)}
                  colorScheme={
                    status === "Pronto"
                      ? "green"
                      : status === "Em preparo"
                      ? "orange"
                      : status === "Entregue"
                      ? "blue"
                      : "gray"
                  }
                  variant={pedido.status === status ? "solid" : "outline"}
                >
                  {status}
                </Button>
              ))}
            </HStack>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
}
