import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "URL Shortener" },
    { name: "description", content: "Shorten your URLs quickly and easily" },
  ];
};

export default function Index() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [language, setLanguage] = useState("en");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const translations = {
    en: {
      title: "Enter the URL address:",
      button: "Shorten",
      shortTitle: "Shortened URL:",
      copy: "Copy",
      loading: "Shortening URL...",
      placeholder: "https://example.com",
      thanks: "Thanks for using",
      by: "by"
    },
    de: {
      title: "URL-Adresse eingeben:",
      button: "Kürzen",
      shortTitle: "Gekürzte URL:",
      copy: "Kopieren",
      loading: "URL wird gekürzt...",
      placeholder: "https://beispiel.de",
      thanks: "Danke für die Nutzung von",
      by: "von"
    },
    it: {
      title: "Inserisci l'indirizzo URL:",
      button: "Abbrevia",
      shortTitle: "URL abbreviato:",
      copy: "Copia",
      loading: "Abbreviazione URL...",
      placeholder: "https://esempio.it",
      thanks: "Grazie per aver utilizzato",
      by: "di"
    }
  };

  const handleShorten = () => {
    // Simulate URL shortening
    if (url) {
      const randomString = Math.random().toString(36).substring(2, 8);
      setShortenedUrl(`https://short.url/${randomString}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <div className="fixed top-6 right-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="appearance-none bg-white border border-blue-200 rounded-md p-2 pl-8 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-800 shadow-sm"
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
      </div>
      <div className="w-full max-w-md border border-blue-800 rounded-lg shadow-lg p-6 bg-white">
        <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
            <span className="text-blue-800 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </span>
            {translations[language].title}
          </h1>
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                placeholder={translations[language].placeholder}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all duration-200 ${inputFocus ? 'shadow-md' : ''}`}
              />
              {url && (
                <button
                  onClick={() => setUrl('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={handleShorten}
              disabled={isLoading || !url}
              className={`${isLoading ? 'bg-blue-600' : 'bg-blue-800'} text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-transform`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              )}
            </button>
          </div>
          {isLoading && (
            <div className="mt-2 text-blue-600 flex items-center animate-pulse">
              <span className="ml-1 text-sm">{translations[language].loading}</span>
            </div>
          )}
        </div>

        {shortenedUrl && (
          <>
            <div className="bg-white p-4 rounded-lg shadow-sm animate-fadeIn">
              <h2 className="text-md font-medium mb-2 text-gray-900">
                {translations[language].shortTitle}
              </h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 h-10"
                />
                <button
                  onClick={handleCopy}
                  className="bg-blue-800 text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 active:scale-95 transition-transform"
                  title={translations[language].copy}
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-checkmark">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-600 animate-fadeIn">
              {translations[language].thanks} <span className="font-bold bg-gradient-to-r from-blue-800 to-blue-600 text-transparent bg-clip-text">URLShortener</span> {translations[language].by} <span className="text-blue-700 font-medium">Giada</span>
            </div>
          </>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes checkmark {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark 0.5s ease-out forwards;
        }
        
        body {
          background: linear-gradient(135deg, #f0f7ff 0%, #e8f4ff 100%);
        }
      `}</style>
    </div>
  );
}