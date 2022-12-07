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
  };
  rating?: number;
  successfulCalls?: number;
  totalCalls?: number;
  avgTotalCallsPercents?: number;
}
