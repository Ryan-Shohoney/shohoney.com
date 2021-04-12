import { PageProps } from 'gatsby';
import React from 'react';
import { handleAuthentication } from '../../services/auth';

const Callback: React.FC<PageProps> = () => {
  handleAuthentication();

  return <p>Loading...</p>;
}

export default Callback;