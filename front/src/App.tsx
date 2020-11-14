import React from "react";
import { GlobalStyles } from "./ui/GlobalStyles/GlobalStyles";
import { Home } from "./views/home/home";
import { Container } from "./views/_components/Container";
import { Header } from "./views/_components/Header";

const App: React.FC = () => {
  console.log("hola mundo22");
  return (
    <Container>
      <GlobalStyles />
      <Header />
      <Home />
    </Container>
  );
};

export default App;
