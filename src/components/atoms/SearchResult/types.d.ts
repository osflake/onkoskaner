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
    rating?: string;
    rating_amount?: string;
    successful_phone_calls?: string;
  };
}
