const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(email: string, password: string) {
  const formData = new URLSearchParams()

  formData.append('username', email)
  formData.append('password', password)

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: 'seeker' | 'employer';
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch(
    `${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    throw new Error('Registration failed')
  }

  return response.json()
}