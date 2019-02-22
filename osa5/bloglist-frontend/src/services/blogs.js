
import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const postBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const putBlog = async (blog, token, id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

export default { getAll, postBlog, putBlog };
