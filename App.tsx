
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { generateWebsiteCode } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    setIsDeployed(false);

    try {
      const code = await generateWebsiteCode(prompt);
      const cleanCode = code.replace(/^```html\s*|```\s*$/g, '').trim();
      setGeneratedCode(cleanCode);
    } catch (err) {
      setError(err instanceof Error ? `Failed to generate website: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleDeploy = useCallback(() => {
    if (!generatedCode) return;
    setIsDeployed(true);
  }, [generatedCode]);

  const handleDownload = useCallback(() => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generatedCode]);

  const handleViewInNewTab = useCallback(() => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // We don't revoke the URL here because the new tab needs it.
  }, [generatedCode]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <EditorPanel
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          onDeploy={handleDeploy}
          onDownload={handleDownload}
          onViewInNewTab={handleViewInNewTab}
          isLoading={isLoading}
          isDeployed={isDeployed}
          hasGeneratedCode={!!generatedCode}
          error={error}
        />
        <PreviewPanel generatedCode={generatedCode} />
      </main>
    </div>
  );
};

export default App;
