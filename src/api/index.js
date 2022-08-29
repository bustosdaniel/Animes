import axios from 'axios'

const URL = 'https://api.jikan.moe'

export const GetAnimes = async (params) => {
  const { data } = await axios.get(`${URL}/v4/top/anime`, params)
  return data
}
