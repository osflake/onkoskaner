interface SearchResultsProps {
  facility: {
    name?: string;
    city: {
      id: number;
      name: string;
      nameLocalized: string;
    };
    id: number;
    earliest_appointment?: string;
    examination_waiting_time?: string;
    street?: string;
    zipCode?: string;
    rating?: number;
    rating_amount?: string;
    successful_phone_calls?: string;
  };
}
