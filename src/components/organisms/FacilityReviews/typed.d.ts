interface ReviewsApiTypes {
  data: ReviewsDataTypes[];
  meta: ReviewsMetaTypes;
}

interface ReviewsDataTypes {
  id: string;
  name: string;
  rating: string;
  status: string;
  content: string;
  createdAt: string;
  facility: {
    id: number;
  };
}

interface ReviewsMetaTypes {
  totalResults: number;
}
