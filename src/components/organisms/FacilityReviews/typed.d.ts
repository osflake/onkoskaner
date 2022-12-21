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
}

interface ReviewsMetaTypes {
  totalResults: number;
}
