export const _checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        new Error(`Ошибка ${res.status}: ${res.statusText}`)
      );
};

export const BASE_URL = 'https://api.agurchkova.mesto15.nomoredomains.monster'
