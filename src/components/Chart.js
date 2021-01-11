import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();

  const [data, setData] = useState();

// query cases for each date from 7 days ago
  const handleUpdate = () => {
    axios.get('/api/record/past_seven')
      .then(response => {
        const data = response.data.data;
        setData(data.map(row => (
          createData(row.day, row.count)
        )));
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      }); 
  };

  React.useEffect(() => {
    handleUpdate();
  }, []);
  
  React.useEffect(() => {
      const interval = setInterval(() => {
        handleUpdate();
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  return (
    data ? (
    <React.Fragment>
      <Title>Week</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Cases (#)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment> ) : <div><p>Loading...</p></div>
  );
}