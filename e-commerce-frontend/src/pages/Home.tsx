import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="home-page">
            <Row className="hero-section text-center py-5 mb-4">
                <Col>
                    <h1 className="hero-title text-white">Welcome to Our ECom</h1>
                    <p className="hero-subtitle text-info">
                        Discover exclusive deals and products tailored just for you!
                    </p>
                    <Link to="/categories">
                    <Button variant="info" className="mt-3">
                        Shop Now
                    </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="text-center py-4">
                <Col>
                    <h2 className="text-dark">Featured Products</h2>
                    <p className="text-muted">Top picks just for you</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
