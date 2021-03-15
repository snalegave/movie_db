import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'


export default function MovieDetailsModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.movie.title}
                    {console.log(props.movie)}
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
                        <p>Runtime: {props.movie.runtime}</p>
                        <p>Countries: {props.movie.countries ? props.movie.countries : "N/A"}</p>
                        <p>Release Date: {props.movie.release_date}</p>
                    </Media.Body>
                </Media>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}
