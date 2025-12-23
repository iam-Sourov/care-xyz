import PrivateRoute from '@/components/routes/PrivateRoute';
import React from 'react';

const page = () => {
  return (
    <PrivateRoute>
      <div className="container mx-auto">
      </div>
    </PrivateRoute>
  )
};

export default page;