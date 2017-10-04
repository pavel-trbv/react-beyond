import React from 'react';

const NotFound = ({ location: { pathname } }) => (
  <div>Page `{pathname}` not found</div>
);

export default NotFound;