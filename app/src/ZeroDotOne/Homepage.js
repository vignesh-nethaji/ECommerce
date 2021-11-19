import {
    Row,
    Col,
    CardHeader
} from "reactstrap";
import HeaderPage from "./HeaderPage";
import SidePage from "./SidePage";

const HomePage = () => {
    return (
        <div>
            <HeaderPage />
            <Row>
                <Col md="3"><CardHeader><SidePage /></CardHeader></Col>
                <Col md="7"></Col>
            </Row>
        </div>

    )
}
export default HomePage;