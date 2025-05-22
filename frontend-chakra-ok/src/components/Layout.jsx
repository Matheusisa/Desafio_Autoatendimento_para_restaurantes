import { Box, Container, Flex, Heading, Link } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box bg="gray.100" minH="100vh">
      {/* HEADER */}
      <Box bg="teal.600" color="white" py={4} shadow="md">
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Heading size="md">🍽️ AutoPedido</Heading>
            <Flex gap={4}>
              <Link as={NavLink} to="/" _hover={{ textDecor: "underline" }} _activeLink={{ fontWeight: "bold" }}>
                Pedido
              </Link>
              <Link as={NavLink} to="/cozinha" _hover={{ textDecor: "underline" }} _activeLink={{ fontWeight: "bold" }}>
                Cozinha
              </Link>
              <Link as={NavLink} to="/admin" _hover={{ textDecor: "underline" }} _activeLink={{ fontWeight: "bold" }}>
                Admin
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* CONTEÚDO */}
      <Container maxW="container.lg" py={6}>
        <Outlet />
      </Container>
    </Box>
  );
}
