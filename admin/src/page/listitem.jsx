import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Image, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Listitem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch food items
  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/food/list');
      const data = await response.json();

      if (response.ok) {
        const items = Array.isArray(data) ? data : data.foods;
        if (Array.isArray(items)) {
          setFoodItems(items);
        } else {
          setError('Invalid data format received');
        }
      } else {
        setError(data.message || 'Failed to fetch food items');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error fetching food items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Delete food item
  const removeFood = async (foodId) => {
    // if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await axios.post('http://localhost:5000/api/food/delete', { id: foodId });
      if (response.data.status) {
        toast.success("Food item deleted successfully!");
        fetchList();
      } else {
        toast.error(response.data.message || "Failed to delete food item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Server error while deleting item");
    }
  };

  // Edit button placeholder
  const handleEdit = (item) => {
    toast.info(`Edit clicked for: ${item.name}`);
    // You can navigate to another page or open a modal here
  };

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="text-center my-3">{error}</Alert>;

  return (
    <Container className="my-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-center mb-4">Food Items</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <Image
                  src={`http://localhost:5000/images/${item.image}`}
                  alt={item.name}
                  thumbnail
                  style={{ height: '60px', width: '80px', objectFit: 'cover' }}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFood(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Listitem;
