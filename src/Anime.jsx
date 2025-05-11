import React, {useState, useEffect} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import './Anime.css'
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function Anime(){
    const [anime, setAnime] = useState([]); //to set the anime in array
    const [search, setSearch] = useState(''); //search criteria
    const [searchApi, setSearchApi] = useState(''); //for debouncing
    const [page, setPage] = useState(1); //current page
    const [lastPage, setLastPage] = useState(1);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    //debounce search input
    useEffect(() => {
      const timer = setTimeout(() => {
         setSearchApi(search);
      }, 250);

      return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
      const fetchData = async() => {
        let url = '';

        if(searchApi.trim()){
           url = `https://api.jikan.moe/v4/anime?q=${searchApi}&page=${page}&limit=24`;
        }else{
          url = `https://api.jikan.moe/v4/anime?limit=12`;
        }

          try{
            const res = await fetch (url);
            if (!res.ok) throw new Error();

            const json = await res.json();

            if(json.data){
              setAnime(json.data || []);
              setLastPage(json.pagination.last_visible_page || 1);
              setLoading(false);
            }
          }catch (err){
              console.log('API error: ', err);
          }
      };

      fetchData();
    }, [searchApi, page]);

    //pagination button
    const showPagination = () => {
      const buttons = [];
      for(let i =1; i<= lastPage; i++){
        buttons.push(
          <Button key={i} variant={i === page ? 'primary' : 'outline-primary'}
                  onClick={() => setPage(i)} style={{margin: '0 5px 10px 0'}}>
           {i}
          </Button>
        );
      }
      return <div style={{textAlign:'center', marginTop:'20px'}}>{buttons}</div>
    }

    if(loading) return(
      <div className="loader-container">
        <RingLoader color="#000080" size={100} />
      </div>);

    if(!anime) return( 
      <div className="loader-container">
        <RingLoader color="#000080" size={100} />
      </div>);

    return (
      <div className='animePage'>
        <div className='mainCard'>
          <h5 style={{fontSize: '1.5em', textAlign: 'center', marginBottom: '5%'}}><b>アニメ</b></h5>
          
          <Form.Control
            type="text"
            id="search"
            value={search}
            placeholder='Search Anime Here'
            aria-describedby="search"
            onChange={(e) => setSearch(e.target.value)}
          />
           <br/>
            <Row>
              {anime.length > 1 ? anime.map((data, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <img
                    className="glow"
                    src={data.images.jpg.image_url}
                    alt={data.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor:'pointer'
                    }}
                    onClick={() => navigate(`/anime/${data.mal_id}`)}
                  />
                  <p style={{ textAlign: 'center' }}>
                    <i>{data.title}</i>
                  </p>
                </Col>
              )) : 'No matching titles found !'}
            </Row>
            {anime.length > 1 ? search && showPagination() : ''}
        </div>
      </div>
    );
}

export default Anime;