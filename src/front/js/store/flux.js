const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: []
		},
		actions: {
			  registerUserData: async (registerUserData) => {
					try {
					const res = await fetch(process.env.BACKEND_URL + "/register", {
						method: 'POST',
						headers: {
						'Content-Type': 'application/json'
						},
						body: JSON.stringify(registerUserData)
					})
					const data = await res.json()
					if (!res.ok) {
						throw new Error(data.error)
					}
					return data
					} catch (error) {
					throw error
					}
				},

			  getUser: async () => {
				const id = JSON.parse(localStorage.getItem('userDataLogin')).id
				const resp = await fetch(process.env.BACKEND_URL + `/users/${id}`, {
				  method: 'GET'
				})
				if (resp.ok) {
				  const data = await resp.json()
				  setStore({ ...getStore(), userProfile: data })
				  return
				}
			  },

			  loginUserData: async (loginUserData) => {
				try {
				  const res = await fetch(process.env.BACKEND_URL + "/login", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify(loginUserData)
				  })
				  const data = await res.json()
				  if (!res.ok) {
					throw new Error(data.error)
				  }
				  if (data.access_token) {
					localStorage.setItem('userDataLogin', JSON.stringify(data))
				  }
				  setStore({ ...getStore(), userDataLogin: data })
				  return data
				} catch (error) {
				  throw error
				}
			  },
			
			  logOut: () => {
				localStorage.removeItem('userDataLogin')
			  },
			}
	};
};

export default getState;
