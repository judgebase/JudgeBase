import { Handler } from '@netlify/functions';
import { createRoutes } from '../../server/routes';
import { MemStorage } from '../../server/storage';

// Initialize storage
const storage = new MemStorage();

// No sample data initialization for production
async function initializeData() {
  console.log('Netlify function initialized - no sample data seeding');
}

// Create routes
const routes = createRoutes(storage);

export const handler: Handler = async (event, context) => {
  const { path = '', httpMethod = 'GET', headers = {}, body = null } = event;
  
  // Remove /api prefix if present
  const apiPath = path.replace(/^\/api/, '') || '/';
  
  // Create a mock request object
  const mockReq = {
    method: httpMethod,
    url: apiPath,
    headers,
    body: body ? JSON.parse(body) : undefined,
  };
  
  // Create a mock response object
  let responseBody = '';
  let statusCode = 200;
  let responseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  const mockRes = {
    status: (code: number) => ({ 
      json: (data: any) => {
        statusCode = code;
        responseBody = JSON.stringify(data);
        return mockRes;
      }
    }),
    json: (data: any) => {
      responseBody = JSON.stringify(data);
      return mockRes;
    },
    setHeader: (name: string, value: string) => {
      responseHeaders[name] = value;
    },
  };
  
  // Handle OPTIONS requests for CORS
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: '',
    };
  }
  
  try {
    // Route the request
    if (apiPath === '/judges/featured' && httpMethod === 'GET') {
      const judges = await storage.getFeaturedJudges();
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(judges),
      };
    }
    
    if (apiPath.startsWith('/judges/') && httpMethod === 'GET') {
      const slug = apiPath.split('/')[2];
      const judge = await storage.getJudgeBySlug(slug);
      if (!judge) {
        return {
          statusCode: 404,
          headers: responseHeaders,
          body: JSON.stringify({ error: 'Judge not found' }),
        };
      }
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(judge),
      };
    }
    
    if (apiPath === '/judges' && httpMethod === 'GET') {
      const judges = await storage.getAllJudges();
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(judges),
      };
    }
    
    // Handle judge applications
    if (apiPath === '/judges/apply' && httpMethod === 'POST') {
      const judgeData = JSON.parse(body || '{}');
      const newJudge = await storage.createJudge({
        ...judgeData,
        status: 'pending',
        featured: false,
      });
      return {
        statusCode: 201,
        headers: responseHeaders,
        body: JSON.stringify(newJudge),
      };
    }
    
    // Default 404 response
    return {
      statusCode: 404,
      headers: responseHeaders,
      body: JSON.stringify({ error: 'Endpoint not found' }),
    };
    
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers: responseHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};