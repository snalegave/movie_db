import axios from 'axios';

export function getMovieService(service, itemsPerPage, page, desc, order, callback) {
  axios.get(`https://7778crvdmc.execute-api.us-west-2.amazonaws.com/Dev/movie/service?service=${service}&order=${order}&itemsPerPage=${itemsPerPage}&page=${page}${desc ? "&DESC=true" : ""}`)
  .then(response => {
    callback(response.data.result)
  }, error => {
    console.log(error)
  });
}

export function getIdByName(name, limit, callback) {
  axios.get(`https://7778crvdmc.execute-api.us-west-2.amazonaws.com/Dev/movie/search?name=${name}&limit=${limit}`)
  .then(response => {
    callback(response.data.result)
  }, error => {
    console.log(error)
  });
}

export function getServiceById(id, callback) {
  axios.get(`https://7778crvdmc.execute-api.us-west-2.amazonaws.com/Dev/service/?id=${id}`)
  .then(response => {
    callback(response.data.result)
  }, error => {
    console.log(error)
  });
}

export function getMovieDetail(id, callback) {
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=354ccc92dc2bcd9f6309c9902aaeb0f4`)
  .then(response => {
    callback(response.data)
  }, error => {
    console.log(error)
  });
}
