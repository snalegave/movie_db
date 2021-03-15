import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'
import { getMovieDetail, getServiceById } from '../API/serviceAPI';


export default function MovieDetailsModal(props) {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
      setLoading(true);
      getMovieDetail(props.movie.tmdb_id, (data) => {
        setInfo(data);
        getServiceById(props.movie.tmdb_id, (res) => {
          setServices(res);
          setLoading(false)
        })
      });
    }, [props.movie.tmdb_id])

    if (loading) {
      return null;
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          {
            loading ? null :
            <React.Fragment>
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      {props.movie.title}
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <Media>
                        <img
                            width={200}
                            height={300}
                            className="mr-3"
                            src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}` : "/image/noposter.jpg"}
                            alt="Generic placeholder"
                        />
                        <Media.Body>
                            <p>Language: {props.movie.original_language}</p>
                            <p>Runtime: {props.movie.runtime} min</p>
                            <p>Countries: {props.movie.countries ? props.movie.countries : "N/A"}</p>
                            <p>Release Date: {props.movie.release_date.substring(0, 10)}</p>
                            <div style={{display: "flex", alignItems: "center", marginBottom: "1em"}}>
                              <span>Availability: </span>
                              <div>
                                {services.map(service => {
                                  return <img key={service.service_name} src={`/image/${service.service_name}-logo.png`} alt="logo" height={25} style={{marginLeft: "0.5em"}} />
                                })}
                              </div>
                            </div>

                            <p>{info.overview}</p>
                        </Media.Body>
                    </Media>
                </Modal.Body>
              <Modal.Footer>
                  <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </React.Fragment>
          }
        </Modal>

    );
}
