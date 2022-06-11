import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { MultiSelect } from "react-multi-select-component";
import "antd/dist/antd.min.css";

function Addsong() {
    const [newSong, setSong] = useState("");
    const [newYear, setYear] = useState("");
    const [artistList, setArtistList] = useState([]);

    useEffect(() => {
        getArtist();
        }, []
        );
    
    

    const getArtist = () => {
        Axios.get("http://localhost:9000/artist")
            .then(res =>  { 
                setArtistList(
                {artistList:res.data.data}
                //     res.data.data.map( (val) => ({
                //     key : val.id,
                //     name: val.name,
                //     })
                // )
                );
                console.log(res.data.data);
        });
    }    

    const handleSubmit = () => {
        Axios.post("http://localhost:9000/song" , {
                song : newSong,
                year : newYear
            })
            .then(res => {
                console.log(res.status);
            })

    }
    return (
        <form className="Form">
            <label>
            Enter Song
            </label>
            <input
                value={newSong}
                onChange={(e) => setSong(e.target.value)}
                label="Song Name"
            />
            <label>
                Enter Year
            </label>
            <input
                value={newYear}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
            />

            <div className="multiSelect">
                {/* <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                    console.log(event);
                }}
                onSelect={(event) => {
                console.log(event);
                }}
                options={artistList}
                showCheckbox
                /> */}

                <MultiSelect
                    options={artistList}
                    displayValue="name"
                />

            </div>
            <button onClick={handleSubmit} > Submit </button>
        </form>
);
}

export default Addsong;