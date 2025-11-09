
import React from 'react';
import { Loader } from './Loader';
import { GenerateIcon } from './icons/GenerateIcon';
import { DeployIcon } from './icons/DeployIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ViewIcon } from './icons/ViewIcon';

interface EditorPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  onDeploy: () => void;
  onDownload: () => void;
  onViewInNewTab: () => void;
  isLoading: boolean;
  isDeployed: boolean;
  hasGeneratedCode: boolean;
  error: string | null;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  onDeploy,
  onDownload,
  onViewInNewTab,
  isLoading,
  isDeployed,
  hasGeneratedCode,
  error,
}) => {
  return (
    <aside className="lg:w-1/3 w-full flex flex-col bg-gray-800/50 rounded-lg p-6 shadow-xl border border-gray-700/50">
      <div className="flex-grow flex flex-col">
        <label htmlFor="prompt" className="text-lg font-semibold mb-2 text-gray-300">Describe Your Website</label>
        <p className="text-sm text-gray-400 mb-4">Be descriptive! Mention the purpose, style, and content you'd like to see. For example, "a modern portfolio for a photographer named John Doe with a dark theme and a gallery section."</p>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A landing page for a new coffee shop..."
          className="w-full flex-grow p-3 bg-gray-900 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 min-h-[200px]"
          disabled={isLoading}
        />
        {error && <div className="mt-4 text-red-400 bg-red-900/30 p-3 rounded-md">{error}</div>}
      </div>
      <div className="mt-6 flex flex-col space-y-3">
        <button
          onClick={onGenerate}
          disabled={!prompt.trim() || isLoading}
          className="w-full flex items-center justify-center p-3 font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader />
              Weaving your code...
            </>
          ) : (
            <>
              <GenerateIcon />
              Generate Website
            </>
          )}
        </button>

        {hasGeneratedCode && !isDeployed && (
          <button
            onClick={onDeploy}
            className="w-full flex items-center justify-center p-3 font-bold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-md hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse-fast"
          >
            <DeployIcon />
            Deploy Website
          </button>
        )}
        
        {isDeployed && (
          <div className="bg-green-900/30 border border-green-500/50 text-green-300 text-center p-4 rounded-lg">
            <h3 className="font-bold text-lg">🚀 Deployed Successfully!</h3>
            <p className="text-sm">Your website is now live (simulated). You can download the source code or view it in a new tab.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button onClick={onDownload} className="flex-1 flex items-center justify-center p-2 font-semibold bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                <DownloadIcon />
                Download Source
              </button>
              <button onClick={onViewInNewTab} className="flex-1 flex items-center justify-center p-2 font-semibold bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                <ViewIcon />
                View in New Tab
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
