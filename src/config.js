
const config = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-upload-pcmnac"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://phcb09wsr5.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_iZh0BfzUw",
    APP_CLIENT_ID: "3qs6kuda08nkf92g9q91a8ajg4",
    IDENTITY_POOL_ID: "us-east-1:602e8dc2-428f-4eb3-b9c9-e5b2664b803f"
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51HixbaC9V3j49QEeWLGF6BSzKDL1ozW8A3pY4aT8fAmg8E87muBVNTFPJnSC9cj5XGVyNyTJBj4Py72f4ZhFHmwt00O0ovErEb",
};

export default config;