
const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-notes-infra-s3-uploads4f6eb0fd-1q1hr6at3te44"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://notes-api.dsplay.tv/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_524D4ikqa",
    APP_CLIENT_ID: "3f8r0cm0fqob7qfu768ru5kj03",
    IDENTITY_POOL_ID: "us-east-1:aa9700a7-ce14-45f3-9c7a-ac708bb13919"
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51HixbaC9V3j49QEeWLGF6BSzKDL1ozW8A3pY4aT8fAmg8E87muBVNTFPJnSC9cj5XGVyNyTJBj4Py72f4ZhFHmwt00O0ovErEb",
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-notes-infra-s3-uploads4f6eb0fd-1w39chxqnq6bz"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://notes-api.dsplay.tv/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_ZPIAhMX1c",
    APP_CLIENT_ID: "6823aee93dp223790cf5d9btn9",
    IDENTITY_POOL_ID: "us-east-1:1e65d5fe-0f46-4059-a24b-93307e781daf"
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51HixbaC9V3j49QEeWLGF6BSzKDL1ozW8A3pY4aT8fAmg8E87muBVNTFPJnSC9cj5XGVyNyTJBj4Py72f4ZhFHmwt00O0ovErEb",
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};