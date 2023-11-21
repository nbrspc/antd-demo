import HeaderComponent from '../src/components/header';
import BodyComponent from '../src/components/body';
import FooterComponent from '../src/components/footer';
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