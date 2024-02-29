import { ReactNode } from 'react';

import { TMeta } from '../../../../../../../навигатор-Next/navigator-next/src/types/general/unions';

export interface IPageWrapper {
  meta?: TMeta;
  mainStyles?: string;
  children: ReactNode;
}
