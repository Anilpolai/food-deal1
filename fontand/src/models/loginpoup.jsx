// import React, { useState, useContext } from 'react';
// import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Storecontext } from '../Context/Storecontext';
// import './loginpoup.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'react-toastify/dist/ReactToastify.css';

// const Loginpoup = ({ show, onHide, onCreateAccount, onForgotPassword }) => {
//   const { setUser } = useContext(Storecontext);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:5000/api/user/login', {
//         email,
//         password,
//       });

//       if (response.data.status) {
//         const userData = response.data.user;
//         const token = response.data.token;

//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('token', token);
//         setUser(userData);

//         toast.success('Login successful!');
//         onHide(); // Close modal
//         setEmail('');
//         setPassword('');
//         setErrors({});
//       } else {
//         toast.error(response.data.message || 'Login failed');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       centered
//       size="sm"
//       backdrop="static"
//       keyboard={false}
//       dialogClassName="login-modal"
//     >
//       <Modal.Header closeButton className="border-0 pb-0">
//         <Modal.Title className="text-dark fw-bold fs-3">Welcome Back</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-4" controlId="formEmail">
//             <Form.Label className="text-secondary fw-semibold">Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="your.email@example.com"
//               className={`input-style ${errors.email ? 'is-invalid' : ''}`}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//           </Form.Group>

//           <Form.Group className="mb-4" controlId="formPassword">
//             <Form.Label className="text-secondary fw-semibold">Password</Form.Label>
//             <InputGroup>
//               <Form.Control
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="••••••••"
//                 className={`input-style ${errors.password ? 'is-invalid' : ''}`}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button
//                 variant="outline-secondary"
//                 onClick={() => setShowPassword(!showPassword)}
//                 tabIndex={-1}
//               >
//                 <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//               </Button>
//             </InputGroup>
//             {errors.password && (
//               <div className="invalid-feedback d-block">{errors.password}</div>
//             )}
//             <div className="text-end mt-2">
//               <Button
//                 variant="link"
//                 className="p-0 fw-semibold small"
//                 onClick={onForgotPassword}
//               >
//                 Forgot Password?
//               </Button>
//             </div>
//           </Form.Group>

//           <Button
//             variant="primary"
//             type="submit"
//             className="w-100 fw-semibold btn-login"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Log In'}
//           </Button>

//           <div className="text-center mt-3">
//             <span className="text-secondary">Don’t have an account? </span>
//             <Button
//               variant="link"
//               className="p-0 fw-semibold"
//               onClick={onCreateAccount}
//             >
//               Create Account
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default Loginpoup;
import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Storecontext } from '../Context/Storecontext';
import './loginpoup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const Loginpoup = ({ show, onHide, onCreateAccount, onForgotPassword }) => {
  const { setUser } = useContext(Storecontext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });

      if (response.data.status) {
        const userData = response.data.user;
        const token = response.data.token;

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);

        toast.success('Login successful!');
        onHide();
        setEmail('');
        setPassword('');
        setErrors({});
        navigate('/'); // ✅ optional redirect after login
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="sm"
      backdrop="static"
      keyboard={false}
      dialogClassName="login-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-dark fw-bold fs-3">Welcome Back</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="text-secondary fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="your.email@example.com"
              className={`input-style ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="text-secondary fw-semibold">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`input-style ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </Button>
            </InputGroup>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
            <div className="text-end mt-2">
              <Button
                variant="link"
                className="p-0 fw-semibold small"
                onClick={() => onForgotPassword?.()}
              >
                Forgot Password?
              </Button>
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-semibold btn-login"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>

          <div className="text-center mt-3">
            <span className="text-secondary">Don’t have an account? </span>
            <Button
              variant="link"
              className="p-0 fw-semibold"
              onClick={onCreateAccount}
            >
              Create Account
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Loginpoup;
