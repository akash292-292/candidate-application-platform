import React, { useState, useEffect } from 'react';
import JobCard from './JobCard'; // Assuming JobCard is in a separate file
import { getData } from '../utils/api';

// pagination params
const limit = 10;
let offset = 0;

const JobList = ({ data }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Flag for infinite scroll

  useEffect(() => {
    if (offset === 0) {
      initialLoad();
    }
  }, [data]);

  const initialLoad = async () => {
    // Calculate number of rows based on card width and viewport width
    const cardWidth = 345; // Assuming card width from JobCard
    const viewportWidth = window.innerWidth;
    const numCardsPerRow = Math.floor(viewportWidth / cardWidth);

    const body = JSON.stringify({
      limit,
      offset,
    });
    const data = await getData(body);

    offset++;

    // Divide data into rows
    const rowData = [];
    for (let i = 0; i < data.length; i += numCardsPerRow) {
      console.log(data.slice(i, i + numCardsPerRow));
      rowData.push(data.slice(i, i + numCardsPerRow));
    }
    console.log(rowData);

    setRows(rowData);
    setLoading(false); // Set loading to false after initial data is fetched
    setHasMore(data.length === limit); // Update hasMore based on fetched data length
  };

  const fetchMoreData = async () => {
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
      const data = await getData(body);

      offset++;

      // Divide data into rows
      const rowData = [...rows];

      console.log(rows);

      let i = 0;

      if (rowData[rowData.length - 1].length != numCardsPerRow) {
        let lastRowData = rowData[rowData.length - 1];
        console.log(lastRowData);
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
      {loading && (
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
