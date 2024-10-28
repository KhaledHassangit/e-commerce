import {Container} from "react-bootstrap"
import styles from "./style.module.css"
import Header from "@components/common/Header/Header"
import { Outlet } from "react-router-dom";
import Footer from "@components/common/Footer/Footer";

const MianLayout = () => {
    return (
        <Container className={styles.container}>
        <div className={styles.wrapper}>
        <Header/>
        <Outlet />
        </div>
        <Footer />
        </Container>
    )
}

export default MianLayout
