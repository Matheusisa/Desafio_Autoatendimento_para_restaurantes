import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("teal.600", "teal.800");
  const textColor = useColorModeValue("white", "white");

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      {/* Header */}
      <Box bg={bg} color={textColor} py={4} shadow="md">
        <Container maxW="container.lg">
          <Flex align="center">
            <Heading size="md">🍽️ AutoPedido</Heading>
            <Spacer />
            <Flex gap={4} align="center">
              <Link as={NavLink} to="/" _hover={{ textDecor: "underline" }} _activeLink={{ fontWeight: "bold" }}>
                Pedido
              </Link>
              <Link as={NavLink} to="/cozinha" _hover={{ textDecor: "underline" }} _activeLink={{ fontWeight: "bold" }}>
                Cozinha
              </Link>
              <Link as={NavLink} to="/admin" _hover={{ textDecor: "underline" }} _activeLink={{ fontWeight: "bold" }}>
                Admin
              </Link>
              <IconButton
                size="sm"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                aria-label="Alternar tema"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Conteúdo */}
      <Container maxW="container.lg" py={6}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box bg={bg} color={textColor} py={3} mt={8}>
        <Container maxW="container.lg" textAlign="center">
          <Text fontSize="sm">Feito por Matheus – 2025</Text>
        </Container>
      </Box>
    </Box>
  );
}
