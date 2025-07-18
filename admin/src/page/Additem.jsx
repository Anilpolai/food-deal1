import React, { useState } from 'react';
import { Button, Col, Form, Row, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Additem = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setData({
      name: '',
      description: '',
      price: '',
      category: ''
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:5000/api/food/add', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Product added successfully!');
        resetForm();
      } else {
        toast.error(result.message || 'Something went wrong!');
      }
    } catch (error) {
      toast.error('Error submitting form!');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="text-tomato mb-4">Add New Product</h3>
      <Form onSubmit={onSubmitHandler}>
        <Row className="mb-4">
          <Col md={4} className="text-center">
            <Form.Label>Upload Image</Form.Label>
            <div className="border rounded p-3">
              <Form.Label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                {imagePreview ? (
                  <Image src={imagePreview} rounded fluid />
                ) : (
                  <div className="text-muted">Click to upload image</div>
                )}
              </Form.Label>
              <Form.Control type="file" id="image-upload" accept="image/*" onChange={handleImageChange} hidden />
            </div>
          </Col>

          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Type here" name="name" value={data.name} onChange={onChangeHandler} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Write content here" name="description" value={data.description} onChange={onChangeHandler} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Select name="category" value={data.category} onChange={onChangeHandler} required>
                    <option value="">-- Select Category --</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sizzler">Sizzler</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Sandwich">Sandwich</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Price ($)</Form.Label>
                  <Form.Control type="number" name="price" placeholder="e.g. 20" value={data.price} onChange={onChangeHandler} required />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="danger" type="submit">
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Additem;
