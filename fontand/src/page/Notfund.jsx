import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/footer';

const NotFound = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation */}
      <NavigationBar />

      {/* Main Content */}
      <main className="flex-fill d-flex justify-content-center align-items-center text-center px-3 mt-5 pt-5">
        <div>
          <h1 className="display-1 text-danger fw-bold">404</h1>
          <p className="lead text-muted mb-4">Oops! The page you’re looking for doesn’t exist.</p>
          <Link to="/" className="btn btn-primary px-4">
            Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;
