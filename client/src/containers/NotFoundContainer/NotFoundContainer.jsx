import React, { useEffect } from 'react';

import { NotFoundPage } from '../../components/application/NotFoundPage';

/** @type {React.VFC} */
const NotFoundContainer = () => {

  useEffect(() => {
    window.title = 'ページが見つかりません - CAwitter';
  }, [])

  return (
    <>
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
