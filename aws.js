import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ca-central-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ca-central-1:1fd3817a-08a0-4e7b-8c8c-519c785db98b', // Replace with your Cognito Identity Pool ID
  }),
});

const cloudWatch = new AWS.CloudWatch();

export const fetchMetrics = async () => {
  const params = {
    Namespace: 'AWS/CloudFront', // Change this if using a different service
    MetricName: 'Requests',
    Dimensions: [
      { Name: 'DistributionId', Value: 'E3UU8H063VRSDL' }, // Replace with your CloudFront Distribution ID
      { Name: 'Region', Value: 'Global' },
    ],
    StartTime: new Date(new Date().getTime() - 24 * 3600 * 1000), // 24 hours ago
    EndTime: new Date(),
    Period: 3600, // One hour
    Statistics: ['Sum'],
  };

  try {
    const data = await cloudWatch.getMetricStatistics(params).promise();
    return data;
  } catch (err) {
    console.error('Error fetching metrics:', err);
  }
};
