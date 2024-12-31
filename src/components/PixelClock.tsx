import React, { useState, useEffect } from 'react';

const PixelClock: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block bg-gray-800 p-4 rounded-lg shadow-inner">
      <div className="font-mono text-2xl bg-[#a0d8b3] p-3 rounded-md shadow-inner text-gray-800">
        {time}
      </div>
    </div>
  );
};

export default PixelClock;