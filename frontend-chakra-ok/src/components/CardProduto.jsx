// src/components/CardProduto.jsx
import { Box, Button, Heading, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function CardProduto({ produto, aoAdicionar }) {
  return (
    <MotionBox
      p={4}
      shadow="md"
      borderWidth="1px"
      rounded="md"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Text fontSize="2xl">{produto.emoji}</Text>
      <Heading size="md" mt={2}>{produto.nome}</Heading>
      <Text>R$ {produto.preco.toFixed(2)}</Text>
      <Button size="sm" mt={2} colorScheme="teal" onClick={() => aoAdicionar(produto)}>
        Adicionar
      </Button>
    </MotionBox>
  );
}
