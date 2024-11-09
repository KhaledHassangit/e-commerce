import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
    return (
        <Container className="about-us-page py-5">
            <Row className="mb-4 text-center">
                <Col>
                    <h1 className="text-dark">About Our ECom</h1>
                    <p className="text-info">Your trusted partner in online shopping</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2 className="text-dark">Our Mission</h2>
                    <p className="text-muted">
                        At Our ECom, we strive to provide the best online shopping experience by offering high-quality products, affordable prices, and exceptional customer service.
                    </p>
                </Col>
                <Col md={6}>
                    <h2 className="text-dark">Our Story</h2>
                    <p className="text-muted">
                        Our journey started with a vision to make online shopping easier and more accessible to everyone. We are constantly innovating to ensure a seamless experience for our customers.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;
