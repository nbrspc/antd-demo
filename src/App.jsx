import {HeaderComponent, FooterComponent, BodyComponent} from "./components";
import {Layout} from "antd";

export const App = () => {

    return (
        <Layout>
            <HeaderComponent/>
            <BodyComponent/>
            <FooterComponent/>
        </Layout>
    )
};