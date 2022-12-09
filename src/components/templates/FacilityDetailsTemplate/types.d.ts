interface FacilityDataTypes {
  facility: {
    id: number;
    insideNote?: any;
    name?: string;
    email?: string;
    latitude?: any;
    longitude?: any;
    website?: string;
    fax?: string;
    zipCode?: string;
    street?: string;
    description?: string;
    nfzContract?: any;
    commercialContract?: any;
    communicationType?: any;
    phoneNumber?: number;
    city?: {
      id: number;
      name: string;
      nameLocalized?: string;
    };
  };
  rating?: number;
  successfulCalls?: number;
  totalCalls?: number;
  avgTotalCallsPercents?: number;
  latestSurveys?: LatestSurveyTypes[];
}

interface LatestSurveyTypes {
  id: number;
  daysToExamination?: number;
  service: {
    id: number;
    name: string;
    active: boolean;
  };
}