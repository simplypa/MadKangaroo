import axios, { AxiosResponse } from 'axios'

export interface Data {
  choices: {
    message: {
      content: string
    }
  }[]
}

const hiGPT3 = async (prompt: string): Promise<AxiosResponse<Data>> =>
  axios.post('/api/admin/gpt3', {
    prompt,
  })

export default hiGPT3
