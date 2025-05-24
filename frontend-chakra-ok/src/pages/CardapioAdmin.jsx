import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function CardapioAdmin() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [emoji, setEmoji] = useState("");
  const toast = useToast();

  const buscarProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/produtos");
      setProdutos(res.data);
    } catch (err) {
      toast({
        title: "Erro ao buscar produtos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const adicionarProduto = async () => {
    if (!nome || !preco) {
      toast({
        title: "Preencha todos os campos",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post("http://localhost:3000/produtos", {
        nome,
        preco: parseFloat(preco),
        emoji,
      });
      buscarProdutos();
      setNome("");
      setPreco("");
      setEmoji("");
      toast({
        title: "Produto adicionado",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao adicionar produto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const excluirProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      buscarProdutos();
      toast({
        title: "Produto excluído",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao excluir produto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <Box>
      <Heading mb={4}>📦 Admin de Cardápio</Heading>
      <Text mb={6}>Gerencie os produtos exibidos no sistema</Text>

      <VStack spacing={3} align="stretch" maxW="sm" mb={8}>
        <Input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          placeholder="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <Input
          placeholder="Imagem (emoji ou URL)"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
        <Button colorScheme="teal" onClick={adicionarProduto}>
          Adicionar
        </Button>
      </VStack>

      <VStack align="stretch" spacing={4}>
        {produtos.map((produto) => (
          <MotionBox
            key={produto.id}
            p={4}
            borderWidth="1px"
            rounded="md"
            shadow="sm"
            bg="whiteAlpha.100"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HStack justify="space-between">
              <Text fontSize="xl">
                {produto.emoji || "🍽️"} {produto.nome} — R$ {produto.preco.toFixed(2)}
              </Text>
              <HStack spacing={2}>
                <Button size="sm" variant="outline" colorScheme="blue">
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  colorScheme="red"
                  onClick={() => excluirProduto(produto.id)}
                >
                  Excluir
                </Button>
              </HStack>
            </HStack>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
}
