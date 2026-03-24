import React, { lazy } from "react";

export const lazyImport = <T extends React.ComponentType<any>>(
  loader: () => Promise<Record<string, any>>,
  name: string,
) => lazy(() => loader().then((m) => ({ default: m[name] as T })));