import React, { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

function SearchButton({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} md={6} lg={4}>
        <Form onSubmit={handleSearch}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search by title"
              className="shadow-sm"
            />
            <Button type="submit" variant="success" className="shadow-sm">
              Search
            </Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
}

export default SearchButton;
