
import { toast } from "sonner";

export interface HealthData {
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
    }
  };
}

export const fetchHealthData = async (): Promise<HealthData> => {
  try {
    const response = await fetch(
      "https://15734573-beec-42a6-9f83-e25fb78af6f2.mock.pstmn.io/hcassigment"
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching health data:", error);
    toast.error("Failed to fetch data. Using sample data instead.");
    
    // Return sample data as fallback
    return {
      hospital_name: "General Hospital",
      claimbook_uhid: "UHID123456",
      total_limit_allocated: 1000000,
      subvention_per_claim: 10000,
      repayment_tenure: "24 months",
      current_limit_utilised_percentage: 60,
      current_unutilised_funds_percentage: 40,
      current_limit_utilised: 600000,
      current_unutilised_funds: 400000,
      bill_amount_discounted_to_date: 300000,
      amount_repaid_to_date: 150000,
      interest_paid_on_borrowed_amt_to_date: 5000,
      upcoming_repayment_date: "2024-08-01",
      disbursals_amount: 100000,
      repayments_amount: 80000,
      total_interest_amount: 2000,
      total_due: 120000,
      amount_to_be_repaid_on_upcoming_date: 30000,
      claims_data: {
        claim_1: {
          claim_id: "C12345",
          claim_amount: 20000,
          claim_date: "2024-01-15",
          claim_status: "Paid"
        },
        claim_2: {
          claim_id: "C12346",
          claim_amount: 35000,
          claim_date: "2024-02-10",
          claim_status: "Pending"
        },
        claim_3: {
          claim_id: "C12347",
          claim_amount: 15000,
          claim_date: "2024-03-20",
          claim_status: "Paid"
        }
      }
    };
  }
};
