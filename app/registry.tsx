'use client';

import React, { ReactNode } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// For client-side rendering, we just need to render children normally
// styled-components handles the CSS injection automatically in client mode
export function StyledComponentsRegistry({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

// Server-side registry for SSR support
export function ServerStyledComponentsRegistry({
  children,
}: {
  children: ReactNode;
}) {
  // Create a new stylesheet instance for this render
  const sheet = new ServerStyleSheet();

  try {
    const html = sheet.collectStyles(children as any);
    const styleTags = sheet.getStyleTags();

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: styleTags }} />
        {html}
      </>
    );
  } finally {
    sheet.seal();
  }
}

