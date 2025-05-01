import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const { code } = params;
  
  if (!code) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    // Direct fetch to the shortened URL endpoint
    const response = await fetch(`https://8qd4m0q1zf.execute-api.eu-central-1.amazonaws.com/prod/${code}`);
    
    // If the API returns a successful response, it will be a redirect that Remix will follow
    if (response.ok) {
      // Get the redirect URL from the response
      const redirectUrl = response.url;
      return redirect(redirectUrl);
    } else {
      // If the API returns a 404, throw a 404 response
      throw new Response("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching shortened URL:", error);
    throw new Response("Not Found", { status: 404 });
  }
}

// We don't need a default export since successful requests will redirect
// This component will only be shown for errors

// Handle errors
export function ErrorBoundary() {
  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-md border border-red-800 rounded-lg shadow-lg p-6 bg-white text-center">
        <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
          <div className="text-red-800 mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          
          <h1 className="text-xl font-semibold mb-2 text-gray-900">
            URL Not Found
          </h1>
          
          <p className="text-gray-600 mb-4">
            The shortened URL you've requested does not exist or has expired.
          </p>
          
          <div className="mt-6">
            <a
              href="/"
              className="inline-block bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create a New Short URL
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-600">
          <span className="font-bold bg-gradient-to-r from-blue-800 to-blue-600 text-transparent bg-clip-text">URLShortener</span> by <span className="text-blue-700 font-medium">Giada</span>
        </div>
      </div>
      
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #f0f7ff 0%, #e8f4ff 100%);
        }
      `}</style>
    </div>
  );
}

// Handle metadata for the page
export function meta() {
  return [
    { title: "URL Not Found" },
    { name: "description", content: "The requested short URL could not be found" },
  ];
}