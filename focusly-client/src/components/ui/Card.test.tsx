import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Card, CardTitle } from './Card';

describe('Card', () => {
  it('uses the dark theme surface classes', () => {
    const html = renderToStaticMarkup(
      <Card className="p-4">
        <CardTitle>Title</CardTitle>
      </Card>,
    );

    expect(html).toContain('bg-rich-black/70');
    expect(html).toContain('text-canvas-white');
  });
});
