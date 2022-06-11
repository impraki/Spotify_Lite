import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';
import "antd/dist/antd.min.css";
import { Table } from 'antd';

function Home() {
    const [songList, setSongList] = useState([]);
    // const [artistList, setArtistList] = useState([]);

    useEffect(() => {
                    getSongList();
                    // getArtistList();
                    console.log("render once");
                    }, []
                    );
  
    const getSongList = () => {
      Axios.get("http://localhost:9000/song")
        .then(res => {setSongList(res.data.data.map( (val) => ({
          key : val.id,
          name: val.name,
          artists_id: val.artists_id,
          avg_rating: val.avg_rating,
        })))
        console.log(res.data.data);
      });
    }


  // const getArtistList = () =>
  // {
  //   Axios.get("http://localhost:9000/artist")
  //     .then(res => {

  //     })
  // }

    const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Artists',
        dataIndex: 'artists_id',
        key: 'artists_id',
    },
    {
      title: 'Rating',
      dataIndex: 'avg_rating',
      key: 'avg_rating',
    },
    ];
    return (
        <div className="container">
            <div className="Table1">
                <h2>Top Rated Songs</h2>
                <Table dataSource={songList} columns={columns} />
            </div>
        </div>
    );
}

export default Home