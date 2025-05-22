# HealthCred Dashboard

A healthcare finance management dashboard application for hospitals to monitor their credit utilization, claims, and repayment details.

## Project Overview

HealthCred Dashboard is a web application that provides hospitals with a comprehensive view of their financial status, including:

- Credit utilization and available funds
- Claims history and status
- Repayment schedules and history
- Financial distribution analytics

The dashboard uses interactive charts and tables to present complex financial data in an easy-to-understand format.

## Live Demo
-https://health-credd.vercel.app/
## Features

- **Overview Dashboard**: Quick view of key financial metrics
- **Credit Utilization Tracking**: Visual representation of used vs. available credit
- **Claims Management**: Table showing all claims with their status and amounts
- **Financial Analytics**: Charts showing distribution of funds and utilization
- **Repayment Details**: Information about upcoming payments and payment history

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- React Router DOM

## API Integration

The dashboard connects to a mock API endpoint for demonstration purposes:

```
https://15734573-beec-42a6-9f83-e25fb78af6f2.mock.pstmn.io/hcassigment
```

In a production environment, this would be replaced with your actual healthcare finance API endpoint.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```sh
git clone <repository-url>
```

2. Navigate to the project directory

```sh
cd healthcred-dashboard
```

3. Install dependencies

```sh
npm install
# or
yarn install
```

4. Start the development server

```sh
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```sh
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── components/        # UI components
│   ├── dashboard/     # Dashboard-specific components
│   └── ui/            # shadcn UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── services/          # API services
```

## Data Structure

The API returns the following data structure:

```typescript
interface HealthData {
  hospital_name: string;
  claimbook_uhid: string;
  total_limit_allocated: number;
  subvention_per_claim: number;
  repayment_tenure: string;
  current_limit_utilised_percentage: number;
  current_unutilised_funds_percentage: number;
  current_limit_utilised: number;
  current_unutilised_funds: number;
  bill_amount_discounted_to_date: number;
  amount_repaid_to_date: number;
  interest_paid_on_borrowed_amt_to_date: number;
  upcoming_repayment_date: string;
  disbursals_amount: number;
  repayments_amount: number;
  total_interest_amount: number;
  total_due: number;
  amount_to_be_repaid_on_upcoming_date: number;
  claims_data: {
    [key: string]: {
      claim_id: string;
      claim_amount: number;
      claim_date: string;
      claim_status: string;
    };
  };
}
```
