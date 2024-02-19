import { useState } from 'react';
import fetchData from './fetchData';
import { RegData, SearchHotelsDto, SearchRoomsDto } from '../types/interfaces';

export default function useFetchData() {
  const [usersLoading, setUsersLoading] = useState(true);

  const usersDB = {
    loading: usersLoading,
    getInfo() {
      setUsersLoading(true);
  
      const result = fetchData('users/findall', { method: 'GET' }, false, () => setUsersLoading(false));
      return result;
    },
  };

  const authCheck = {
    getInfo(email: string) {
      const result = fetchData('auth/checkauth', { method: 'GET', params: { email } });
      return result;
    }
  }

  const authUser = {
    login(email: string, password: string) {
      const result = fetchData('auth/signin', { method: 'POST', data: { email, password } });
      return result;
    },
    register(data: RegData) {
      const result = fetchData('auth/signup', { method: 'POST', data });
      return result;
    }
  }

  const hotelsAPI = {
    search(searchParams: SearchHotelsDto) {
      const result = fetchData('hotels', { method: 'GET', params: searchParams });
      return result;
    },
    findById(id: string) {
      const result = fetchData(`hotels/findhotel/${id}`, { method: 'GET' });
      return result;
    },
    addHotel(data: FormData) {    
      const result = fetchData('hotels', { method: 'POST', data }, true);
      return result;
    },
    updateHotel(data: FormData, id: string) {
      const result = fetchData(`hotels/${id}`, { method: 'PUT', data }, true);
      return result;
    }
  };

  const roomsApi = {
    search(searchParams: SearchRoomsDto) {
      const result = fetchData('rooms', { method: 'GET', params: searchParams });
      return result;
    },
    addRoom(data: FormData) {    
      const result = fetchData('rooms', { method: 'POST', data }, true);
      return result;
    },
    updateRoom(data: FormData, id: string) {
      const result = fetchData(`rooms/${id}`, { method: 'PUT', data }, true);
      return result;
    }
  };

  return {
    usersDB, authCheck, authUser, hotelsAPI, roomsApi
  };
}
