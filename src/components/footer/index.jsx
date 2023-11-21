import {Layout} from "antd";

const {Footer} = Layout;

const FooterComponent = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            <footer>
                Test App 2023
            </footer>
        </Footer>
    );
};

export default FooterComponent;