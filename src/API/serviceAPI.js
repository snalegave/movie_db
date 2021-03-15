import axios from 'axios';

export function getMovieService(service, itemsPerPage, page, desc, order, callback) {
  console.log(desc)
  axios.get(`https://7778crvdmc.execute-api.us-west-2.amazonaws.com/Dev/movie/service?service=${service}&order=${order}&itemsPerPage=${itemsPerPage}&page=${page}${desc ? "&DESC=true" : ""}`)
  .then(response => {
    console.log(response)
    callback(response.data.result)
  }, error => {
    console.log(error)
  });
}
