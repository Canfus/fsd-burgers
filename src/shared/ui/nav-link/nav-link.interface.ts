import type { NavLinkProps as NavLinkPrimitiveProps } from 'react-router-dom';

import type { RenderProp } from '@shared/types';

type NavLinkRenderProps = {
  isActive?: boolean;
  isPending?: boolean;
  isTransitioning?: boolean;
};

export interface NavLinkProps extends Omit<NavLinkPrimitiveProps, 'className'> {
  renderIcon: RenderProp<NavLinkRenderProps>;
  className?: string;
}
