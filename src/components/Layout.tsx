import { Container, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => <Container sx={{p: 4}}><Outlet/></Container>

export default Layout

export const PageTitle = styled('h2')`
  margin: 0;
  font-size: 2rem;
  line-height: 2em;
  display: flex;
  align-items: center;
`