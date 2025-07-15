import { Handler } from '@netlify/functions';
import { createRoutes } from '../../server/routes';
import { MemStorage } from '../../server/storage';

// Initialize storage
const storage = new MemStorage();

// Add sample data for production
async function initializeData() {
  // Add Rishul Chanana as the primary judge
  await storage.createJudge({
    name: 'Rishul Chanana',
    title: 'Founder & CEO',
    company: 'Maximally',
    location: 'Chandigarh, India',
    bio: 'Rishul is a 16-year-old dropout-turned-founder from Zirakpur who\'s dead serious about one thing: execution. He runs Maximally, India\'s first high-stakes hackathon ecosystem designed for teenagers who\'d rather build than cram.\n\nHe doesn\'t do lectures or checkboxes. His events feel more like Red Bull meets YC — fast, chaotic, and real. His past hackathons have brought in thousands of young builders, and he\'s landed partnerships with orgs like Masters\' Union to back the movement.\n\nRishul\'s belief is simple: hackathons aren\'t events. They\'re engines. Engines for discovery, for proof, and for transformation.',
    judgingPhilosophy: 'I reward speed, not theory. I care about clarity, not complexity. The best builds are sharp, raw, and unapologetically weird.\n\nRishul judges with a "ship-first" lens — he prioritizes MVPs over mockups, originality over polish, and founder energy over fancy slides.',
    linkedin: 'https://linkedin.com/in/rishulchanana',
    twitter: '',
    website: 'https://maximally.in',
    avatar: null,
    expertise: ['Hackathons', 'Startup Ecosystem', 'Youth Entrepreneurship'],
    experience: 'Head Judge – CodeQuest (India\'s largest school hackathon), Judge & Mentor – Maximally Startup Makeathon, Advisor – Startup World Tapri, Consultant – PurpleRain TechSafe, Builder – HackSkye (4000+ student event)',
    slug: 'rishulchanana',
    status: 'approved',
    featured: true,
    badges: ['Startup Mentor', 'Youth Leader', 'Hackathon Expert'],
  });
}

// Initialize data on first run
initializeData().catch(console.error);

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