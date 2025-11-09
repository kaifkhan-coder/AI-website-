
import React from 'react';

interface PreviewPanelProps {
  generatedCode: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ generatedCode }) => {
  return (
    <section className="lg:w-2/3 w-full flex flex-col bg-gray-800/50 rounded-lg shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="bg-gray-700/50 px-4 py-2 font-semibold text-gray-300 border-b border-gray-700">
        Live Preview
      </div>
      {generatedCode ? (
        <iframe
          srcDoc={generatedCode}
          title="Website Preview"
          className="w-full h-full flex-grow border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <div className="w-full h-full flex-grow flex items-center justify-center bg-gray-900 p-8">
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium">Your website will appear here</h3>
            <p className="mt-1 text-sm">Describe your website and click "Generate" to see the magic happen.</p>
          </div>
        </div>
      )}
    </section>
  );
};
