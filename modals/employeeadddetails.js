const mongoose = require("mongoose");

const addDetailsEmployeeSchema = mongoose.Schema({
  EmployeeName: {
    type: String,
  },
  location: {
    type: String,
  },
  brandName: {
    type: String,
  },
  firmName: {
    type: String,
  },
  firmOption: {
    type: String,
  },
  cinNo: {
    type: String,
  },
  panCard: {
    type: String,
  },
  fss: {
    type: String,
  },
  director: {
    type: String,
  },
  gstCopy: {
    type: String,
  },
  cancelCheck: {
    type: String,
  },
  tableCount: {
    type: Array,
  },
  tablePhotos: {
    type: Array,
  },
  billingSoftware: {
    type: String,
  },
  onlineAggregator: {
    type: String,
  },
  onlineAggregatersList: {
    type: Array,
  },
  twoWheelerSlot: {
    type: String,
  },
  fourWheelerSlot: {
    type: String,
  },
  restaurantMobileNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  contactPersonname: {
    type: String,
  },
  contactPersonNumber: {
    type: Number,
  },
  designation: {
    type: String,
  },
  twoWheelerparking: {
    type: String,
  },
  fourWheelerparking: {
    type: String,
  },
  status: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String
  },
  domain: {
    type: String,
  },
  domainName: {
    type: String,
  },
  tradeMark: {
    type: String,
  },
  tradePhotos: {
    type: Array,
  },
  dld: {
    type: String,
  },
  entityNo: {
    type: String,
  },
  dldEmail: {
    type: String,
  },
  dldPassword: {
    type: String,
  },

  address: [
    {
      doorNo: {
        type: String,
      },
      areaName: { type: String },
      landMark: { type: String },
      locationCity: { type: String },
      pinCode: { type: String },
      state: { type: String },

    },
  ],
  location : {
    type:Array
  },
  employeeId : {
    type:String,
    required: true
  },
  adminId: {
    type:String,
    required: true
  },
  leadStatus: {
    type: String,
    default:"new-lead"
  },
  booksLeadStatus:{
    type: String,
    default:"new-lead"
  },
  followupDate:{
    type: String
  },
  followupTime:{
    type:String
  },
  features:[{
    featureName: { type: String },
    featureDescription: { type: String },
}],
callRecord:{
  type:Array
},
businessStatus:{
  type:String,
  default:"telemarketing"
},
booksBusinessStatus:{
  type:String,
  default:"telemarketing"
},
videoRecord:{
  type:Array
},
videoFeatures:[{
  featureName: { type: String },
  featureDescription: { type: String },
}],
introduction:[{
  featureName: { type: String },
  featureDescription: { type: String },
}],
bdmFeatures:[{
  featureName: { type: String },
  featureDescription: { type: String },
}],
locationBdm: {
  latitude: { type: Number },
  longitude: { type: Number },
  locationName: { type: String }
},
bdmSelfie: {
  type:String
},
createdDate:{
  type:Date,
  default:Date.now
},
agreement: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

ecs:{
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

legalSelfie: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

diningAgreement: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

additionalAgreement: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

whoWeAre: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

termsAndConditions: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

trademark: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

paymentGateway: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

dlt: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

otherCharges: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},

paymentAcknowledgement: {
  location: {
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
      locationName: { type: String }
    }
  },
  description: { type: String },
  followUpDate: { type: String },
  document: { type: String }
},




});

module.exports = mongoose.model(
  "employeeaddeddetails",
  addDetailsEmployeeSchema
);
