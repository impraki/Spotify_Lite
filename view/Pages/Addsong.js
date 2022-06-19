import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Multiselect from "multiselect-react-dropdown";
import '../App.css'

function Addsong() {
    const [newSong, setSong] = useState("");
    const [newYear, setYear] = useState("");
    const [artistList, setArtistList] = useState([]); // to bind dropdown
    const [newRating, setRating] = useState("");
    const [newArtists, setArtists] = useState(); // to send backend


    useEffect(() => {
        getArtist();
        }, []
        );
    

    // get the list of artist for dropdown
    const getArtist = () => {
        Axios.get("http://localhost:9000/artist")
            .then(res =>  { 
                setArtistList(
                    res.data.data.map( (val) => ({
                        id : val.id,
                        name : val.name
                    }
                    )
                )
                );
                console.log(res.data.data);
            })
    }    

    //post the song details to backend

    var artist_dropdown = [];

    for (var i=0; i<artistList.length;i++){
        artist_dropdown.push(artistList[i].name);
    }

    const handleSubmit = async (e) => {
            //e.preventDefault();
            let response = await Axios.post("http://localhost:9000/song" , {
                    song : newSong,
                    year : newYear,
                    artists : newArtists,
            })
           

            console.log(response.data);

            for (var i = 0; i<artistList.length;i++){
                if(newArtists[0] === artistList[i].name)
                {
                 var id = artistList[i].id;
                }
            }

            let response2 = await Axios.post("http://localhost:9000/rating", {
                song_id : response.id, // id property of response from first post call
                rating : newRating
            })

            console.log("rating_response"+response2);

            let response3 = await Axios.post("http://localhost:9000/asmapping", {
                song_id : response.id, // ifd property of response from first post call
                artist_id : id
            })

            console.log(response3);
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
                <label>
                    Enter Rating
                </label>
                <input
                    value={newRating}
                    onChange={(e) => setRating(e.target.value)}
                    label="Rating"
                />

            <div className="multiSelect">

                <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                        setArtists(event)
                    }}
                    onSelect={(event) => {
                    setArtists(event)
                    }}
                    options={artist_dropdown}
                    showCheckbox
                />
            </div>
            <button className="a-btn">Add Artist</button>
            <button onClick={handleSubmit} > Submit </button>
        </form>
);
}

export default Addsong;
