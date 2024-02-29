import { FC } from 'react';

import { IPageWrapper } from './types';

const PageWrapper: FC<IPageWrapper> = ({ meta, mainStyles, children }) => {
  return (
    <>
      <main className={mainStyles}>{children}</main>
    </>
  );
};

export default PageWrapper;
