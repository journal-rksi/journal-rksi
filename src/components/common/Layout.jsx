import React, { Fragment } from 'react';

import Header from 'components/common/Header';

const Layout = ({ header, children }) => (
  <Fragment>
    {header && <Header />}
    {children}
  </Fragment>
);

export default Layout;
