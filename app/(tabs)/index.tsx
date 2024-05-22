import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { fetchMetrics } from '../../aws'; // Ensure this is the correct path to aws.js

interface MetricData {
  requests: number;
}

const Index: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [url, setUrl] = useState<string>('');

  const handleFetchMetrics = async () => {
    const data = await fetchMetrics();
    if (data && data.Datapoints) {
      setMetrics({
        requests: data.Datapoints.reduce((acc: number, point: any) => acc + point.Sum, 0), // Sum of requests in the period
      });
    }
  };

  useEffect(() => {
    handleFetchMetrics();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
        placeholder="Enter URL"
      />
      <Button
        title="Fetch Metrics"
        onPress={handleFetchMetrics}
      />
      {metrics && (
        <View>
          <Text>Total Requests: {metrics.requests}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});

export default Index;