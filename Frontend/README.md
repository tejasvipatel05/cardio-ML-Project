# CardioML Frontend

Next.js frontend application for the Cardiovascular Risk Assessment Platform.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file (optional, defaults to `http://localhost:5005/api`):
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL if different:
```env
NEXT_PUBLIC_API_URL=http://localhost:5005/api
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Pages

- **/** - Landing page
- **/assessment** - Health assessment form
- **/results** - Assessment results page
- **/how-it-works** - How the system works
- **/health-insights** - Health metrics guide
- **/model** - Model performance and information

## API Integration

The frontend connects to the Flask backend API. Make sure the backend is running on port 5005 (or update the API URL in `.env.local`).

### API Endpoints Used

- `GET /api/health` - Health check
- `GET /api/assessment` - Get model information
- `POST /api/predict` - Submit assessment and get prediction
- `POST /api/report` - Generate detailed report

## Technology Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Project Structure

```
Frontend/
├── components/      # Reusable components (Header, Footer)
├── config/         # Configuration files (API)
├── pages/          # Next.js pages (routes)
├── styles/         # Global styles
├── public/         # Static assets
└── package.json    # Dependencies
```