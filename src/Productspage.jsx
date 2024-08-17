import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchButton from './SearchButton';
import './Productspage.css'
import { Container, Card, Row, Col, Pagination, Alert } from 'react-bootstrap';

function Productspage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    updateDisplayedProducts();
  }, [currentPage, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://intern-task-api.bravo68web.workers.dev/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (Array.isArray(response.data)) {
        setProducts(response.data);
        setFilteredProducts(response.data.slice(0, 8));
        setTotalPages(Math.ceil(response.data.length / 8));
      } else {
        setProducts([]);
        setError('Unexpected response format.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products.');
    }
  };

  const updateDisplayedProducts = () => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    setFilteredProducts(products.slice(startIndex, endIndex));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered.slice(0, 8));
    setTotalPages(Math.ceil(filtered.length / 8));
    setCurrentPage(1);
  };

  return (
    <>
      <Container className="mt-5">
        <div className='text-center'>
          <h5 className="styled-heading">Search Products Here! (Don't forget to click search button)</h5>
          {email && <h5 className="styled-email">User Name:- {email}</h5>}
        </div>

        <SearchButton onSearch={handleSearch} />
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product.id} md={3} className="mb-4">
                <Card className="p-2 h-100">
                  <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
                  <div className='price-tag'>
                    <div className='price'>
                      ${product.price}
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>


                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </Row>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination className="custom-pagination">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={currentPage === page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={currentPage === page + 1 ? 'active-page' : 'inactive-page'}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>


        )}
      </Container>
    </>
  );
}

export default Productspage;
