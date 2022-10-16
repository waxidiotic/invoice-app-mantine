import React, { lazy, Suspense } from 'react';

const LazySocialButtons = lazy(() => import('./SocialButtons'));

const SocialButtons = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySocialButtons {...props} />
  </Suspense>
);

export default SocialButtons;
