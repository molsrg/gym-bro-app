import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

class ApiService {
  private client: AxiosInstance

  constructor(private baseURL: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 6000,
    })

    this.client.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers['X-Locale-Language'] = useLocaleStore().locale
      if (useTokenStore().getStatus) {
        config.headers.Authorization = `Bearer ${useTokenStore().getToken}`
      }
      return config
    })

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.config.method === 'post' || response.config.method === 'patch' || response.config.method === 'delete') {
          const toast = useToast()
          toast.add({ color: 'success', title: response.data.message })
        }
        return response.data.data
      },
      async (error) => {
        const toast = useToast()

        // Check timeout server
        if (error.code === 'ECONNABORTED') {
          toast.add({ color: 'error', title: 'Request timed out. Please try again.' })
          return Promise.reject(error)
        }

        // Handling 401 errors
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true

          await useTokenStore().updateToken()
          error.config.headers.Authorization = `Bearer ${useTokenStore().getToken}`

          return this.client(error.config)
        }

        // Handling other errors
        toast.add({ color: 'error', title: error.response?.data?.message || 'Unknown error' })
        return Promise.reject(error.response?.data || error)
      },
    )
  }

  async get<T>(url: string, params: Record<string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      params,
      withCredentials: true,
    }
    return this.client.get<T>(url, config)
  }

  async post<T>(url: string, data: Record<string> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      headers,
      withCredentials: true,
    }
    return this.client.post<T>(url, data, config)
  }

  async patch<T>(url: string, data: Record<string> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      headers,
    }
    return this.client.patch<T>(url, data, config)
  }

  async postFormData<T>(url: string, data: Record<string> = {}, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    headers['Content-Type'] = 'multipart/form-data'
    return this.client.post<T>(url, data, { headers })
  }

  async put<T>(url: string, data: Record<string> = {}): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data)
  }

  async delete<T>(url: string, params: Record<string> = {}): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      data: params,
    }
    return this.client.delete<T>(url, config)
  }
}

export { ApiService }
