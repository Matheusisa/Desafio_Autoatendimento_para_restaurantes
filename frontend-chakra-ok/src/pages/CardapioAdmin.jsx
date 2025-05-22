import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function CardapioAdmin() {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);
  const toast = useToast();

  const carregarProdutos = () => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then(setProdutos)
      .catch(() =>
        toast({
          title: "Erro ao carregar produtos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const salvarProduto = (e) => {
    e.preventDefault();

    if (!nome || !imagem || !preco) {
      toast({
        title: "Preencha todos os campos.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    const novo = { nome, imagem, preco: parseFloat(preco) };

    fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "Produto salvo com sucesso!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setNome("");
        setImagem("");
        setPreco("");
        carregarProdutos();
      })
      .catch(() =>
        toast({
          title: "Erro ao salvar produto.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.md">
        <Heading textAlign="center" color="purple.600" mb={6}>
          Cardápio – Admin 🍕
        </Heading>

        <Box bg="white" p={6} rounded="lg" shadow="md" mb={8}>
          <form onSubmit={salvarProduto}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  placeholder="Ex: X-Burguer"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Emoji</FormLabel>
                <Select
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                  placeholder="Selecione um emoji"
                >
                  <option value="🍔">🍔 Hamburguer</option>
                  <option value="🍕">🍕 Pizza</option>
                  <option value="🍟">🍟 Batata</option>
                  <option value="🥤">🥤 Bebida</option>
                  <option value="🍫">🍫 Sobremesa</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Preço (R$)</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 9.99"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FormControl>

              <Button type="submit" colorScheme="purple" size="lg">
                Salvar Produto
              </Button>
            </VStack>
          </form>
        </Box>

        <Heading size="md" mb={4}>
          Produtos cadastrados
        </Heading>

        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {produtos.map((p) => (
            <Box
              key={p.id}
              bg="white"
              shadow="sm"
              p={4}
              rounded="md"
              textAlign="center"
            >
              <Text fontSize="3xl">{p.imagem}</Text>
              <Text fontWeight="bold">{p.nome}</Text>
              <Text color="gray.600">R$ {p.preco.toFixed(2)}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
