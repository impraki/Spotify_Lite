import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Multiselect from "multiselect-react-dropdown";
import '../App.css'

function Addsong() {
    const [newSong, setSong] = useState("");
    const [newYear, setYear] = useState("");
    const [artistList, setArtistList] = useState([]); // to bind dropdown
    const [newRating, setRating] = useState();
    const [newArtists, setArtists] = useState();

    useEffect(() => {
        getArtist();
        }, []
        );
    
    

    const getArtist = () => {
        Axios.get("http://localhost:9000/artist")
            .then(res =>  { 
                setArtistList(
                    res.data.data.map( (val) => ([
                     val.name
                    ])
                )
                );
                console.log(res.data.data);
        });
    }    

    const handleSubmit = () => {
        Axios.post("http://localhost:9000/song" , {
                song : newSong,
                year : newYear,
                artists : newArtists,
                rating : newRating
            })
            .then(res => {
                console.log(res.status);
            })

    }

    return (
        <form className="Form">
            <div className="label">
                <label>
                    Enter Song
                </label>
                <input
                    value={newSong}
                    onChange={(e) => setSong(e.target.value)}
                    label="Song Name"
                />
            </div>
            
            <div className="label">
                <label>
                    Enter Year
                </label>
                <input
                    value={newYear}
                    onChange={(e) => setYear(e.target.value)}
                    label="Year"
                />
            </div>

            <div className="label">
                <label>
                    Enter Rating
                </label>
                <input
                    value={newRating}
                    onChange={(e) => setRating(e.target.value)}
                    label="Rating"
                />
            </div>


            <div className="multiSelect">

                <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                        setArtists(event)
                    }}
                    onSelect={(event) => {
                    setArtists(event)
                    }}
                    options={artistList}
                    showCheckbox
                />
            </div>
            <button className="a-btn">Add Artist</button>
            <button onClick={handleSubmit} > Submit </button>
        </form>
);
}

export default Addsong;
