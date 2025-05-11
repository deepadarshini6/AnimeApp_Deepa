import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap';
import './AnimeDetail.css';
import {RingLoader} from 'react-spinners';

function AnimeDetail(){
    const {id}  = useParams();
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const detailStyle = {
        position: 'absolute',
        left: '10vh',
        top: '25vh',
    }

    

    const buttonStyle = {
        position: 'absolute',
        left: '10vh',
        top: '2vh'
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try{
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
                const json = await res.json();
                setAnime(json.data || []);
                console.log(json.data);
                setLoading(false);
            }catch (err){
                console.log("API Error", err);
            }
        };
        fetchDetails();
        
    }, [id]);

    if(loading) return(
          <div className="loader-container">
            <RingLoader color="#000080" size={100} />
          </div>);
    
    if(!anime) return( 
        <div className="loader-container">
        <RingLoader color="#000080" size={100} />
        </div>);
    
    return(
        <div className="page-container">
        <div className="top-section background-tint">
            <Button onClick={() => navigate('/')} className="back-button" variant="warning">Back</Button>
            <div className="top-content">
                <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-image" />
                <h2 className="anime-title">{anime.title}</h2>
            </div>
        </div>

        <div align='center' className="bottom-section">
            <div style={{color:'white', marginTop:'1%', width:'70%'}}> 
                <h3>Synopsis</h3>
                <p style={{textAlign:'justify'}}>{anime.synopsis ? anime.synopsis : 'No Summary Available'}</p><br />
                <Row style={{rowGap:'20px'}}>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="stat-box">
                            <div className="stat-value" >{anime.score ? anime.score : 'N/A'}</div>
                            <div className="stat-label" >Score</div>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="stat-box">
                            <div className="stat-value">{anime.rank? '#' + anime.rank : 'N/A'}</div>
                            <div className="stat-label">Ranked</div>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="stat-box">
                            <div className="stat-value">{anime.popularity ? '#' + anime.popularity : 'N/A'}</div>
                            <div className="stat-label">Popularity</div>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="stat-box">
                            <div className="stat-value">{anime.members ? anime.members : 'N/A'}</div>
                            <div className="stat-label">Members</div>
                        </div>
                    </Col>
                </Row><br />
            </div>
        </div>
        </div>
    );
}

export default AnimeDetail