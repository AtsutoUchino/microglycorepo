import { ReactNode } from "react";
import Container from "components/container";
import Header from "./header";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main>
                <Container large>
                { children }
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default Layout;