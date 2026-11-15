import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  themeVariables: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    primaryColor: '#eff6ff',
    primaryTextColor: '#1e3a8a',
    primaryBorderColor: '#3b82f6',
    lineColor: '#2563eb',
    secondaryColor: '#f8fafc',
    tertiaryColor: '#ffffff'
  },
  securityLevel: 'loose'
});

export const MermaidViewer = ({ chart, title = 'UML Diagram' }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      if (!chart || !containerRef.current) return;
      try {
        const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, chart);
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(err.message || 'Error rendering diagram');
        }
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [chart]);

  return (
    <div className="mermaid-diagram-box" ref={containerRef}>
      {error ? (
        <div style={{ width: '100%' }}>
          <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            Diagram preview (fallback source code view):
          </div>
          <pre style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', overflowX: 'auto' }}>
            {chart}
          </pre>
        </div>
      ) : svgContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        />
      ) : (
        <div style={{ padding: '2rem', color: '#94a3b8', fontStyle: 'italic' }}>
          Rendering diagram...
        </div>
      )}
    </div>
  );
};
