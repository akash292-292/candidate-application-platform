import React, { useState, useEffect } from 'react';
import JobCard from './JobCard'; // Assuming JobCard is in a separate file
import { getData } from '../utils/api';

// pagination params
const limit = 10;
let dataCount = 0;
let prevDataCount = 0;

const JobList = ({ filters }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Flag for infinite scroll
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (offset === 0) {
      initialLoad();
    }
  }, []);

  const initialLoad = async () => {
    console.log('initial load');
    // Divide data into rows
    const rowData = [];

    prevDataCount = dataCount;
    while (dataCount - prevDataCount < 10) {
      // Calculate number of rows based on card width and viewport width
      const cardWidth = 345; // Assuming card width from JobCard
      const viewportWidth = window.innerWidth;
      const numCardsPerRow = Math.floor(viewportWidth / cardWidth);

      const body = JSON.stringify({
        limit,
        offset,
      });
      console.log(filters);
      const data = await getData(body, filters);
      dataCount += data.length;

      setOffset(offset + 1);

      let i = 0;

      if (rowData.length > 0 && rowData[rowData.length - 1].length != numCardsPerRow) {
        let lastRowData = rowData[rowData.length - 1];
        rowData[rowData.length - 1] = [...lastRowData, ...data.slice(0, numCardsPerRow - lastRowData.length)];
        i = numCardsPerRow - lastRowData.length;
      }

      for (; i < data.length; i += numCardsPerRow) {
        rowData.push(data.slice(i, i + numCardsPerRow));
      }

      setHasMore(dataCount - prevDataCount >= limit); // Update hasMore based on fetched data length
    }
    setRows(rowData);
    setLoading(false); // Set loading to false after initial data is fetched
  };

  const fetchMoreData = async () => {
    if (rows.length === 0) return;
    // Calculate number of cards per row based on card width and viewport width
    const cardWidth = 345; // Assuming card width from JobCard
    const viewportWidth = window.innerWidth;
    const numCardsPerRow = Math.floor(viewportWidth / cardWidth);

    if (hasMore) {
      setLoading(true); // Set loading to true while fetching more data
      const body = JSON.stringify({
        limit,
        offset,
      });
      const data = await getData(body, filters);
      dataCount += data.length;

      setOffset(offset + 1);

      // Divide data into rows
      const rowData = [...rows];

      let i = 0;

      if (rowData[rowData.length - 1].length != numCardsPerRow) {
        let lastRowData = rowData[rowData.length - 1];
        rowData[rowData.length - 1] = [...lastRowData, ...data.slice(0, numCardsPerRow - lastRowData.length)];
        i = numCardsPerRow - lastRowData.length;
      }

      for (; i < data.length; i += numCardsPerRow) {
        rowData.push(data.slice(i, Math.min(i + numCardsPerRow, data.length)));
      }

      setRows(rowData); // Append new rows to existing data
      setLoading(false); // Set loading to false after fetching more data
      setHasMore(data.length === limit); // Update hasMore based on fetched data length
    }
  };

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) { // Check if near bottom and hasMore is true
      fetchMoreData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, [hasMore]);

  return (
    <div
      style={{ height: '100vh', width: '100vw', overflowY: 'auto' }} // Add overflowY: 'auto' for scrolling
      onScroll={handleScroll} // Attach scroll event listener
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '20px' }}>
          {row.map((jobData, cardIndex) => (
            <JobCard key={cardIndex} jobData={jobData} />
          ))}
        </div>
      ))}
      {hasMore && loading && (
        <div>
          Loading ....
        </div>
      )}
      {!hasMore && !loading && (
        <div>
          No More Jobs
        </div>
      )}
    </div>
  );
};

export default JobList;
