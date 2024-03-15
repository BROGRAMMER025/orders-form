import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Orders({ refresh, setRefresh }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [orderData, setOrderData] = useState({
    name_of_parcel: '',
    destination: '',
    current_location: '',
    pickup: '',
    weight: '',
    price: 0,
  });

  const handleChange = (e) => {
    const newWeight = e.target.value;
    const calculatedPrice = parseInt(newWeight, 10) * 150;

    setOrderData({
      ...orderData,
      [e.target.name]: newWeight,
      price: calculatedPrice,
    });
  };

  const handleSubmit = () => {
    fetch('https://sendit-backend-lje2.onrender.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderData),
      mode: 'cors',
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
          enqueueSnackbar('You must be logged in to create an order', {
            variant: 'error',
          });
          navigate('/login');
          return Promise.reject('Not logged in');
        }
      })
      .then((data) => {
        setOrderData(data);
        setRefresh(!refresh);
        enqueueSnackbar('Order created successfully', { variant: 'success' });
        navigate('/tracker');
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Place an Order</Card.Title>
              <Form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
                <Form.Group controlId="name_of_parcel">
                  <Form.Label>Name of Parcel:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="name_of_parcel"
                    value={orderData.name_of_parcel}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="destination">
                  <Form.Label>Destination:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="destination"
                    value={orderData.destination}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="current_location">
                  <Form.Label>Current Location:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="current_location"
                    value={orderData.current_location}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="pickup">
                  <Form.Label>Pickup:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="pickup"
                    value={orderData.pickup}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="weight">
                  <Form.Label>Weight:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="weight"
                    value={orderData.weight}
                    onChange={handleChange}
                  />
                </Form.Group>
                {orderData.weight && (
                  <p className="text-muted mb-3">
                    Estimated Price: Ksh {orderData.price}
                  </p>
                )}
                <Button variant="primary" type="submit">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
