import axios, { AxiosInstance } from 'axios';
import {Shop, ShopFormData, ShopType, ShopConcept, ShopLayout, ShopPhoto, Address} from '../types/shop';
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// axios インスタンスの作成
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  instance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  });

  return instance;
};

const axiosInstance = createAxiosInstance();

export const getShopTypes = async (): Promise<ShopType[]> => {
  console.log('Fetching shop types...');
  try {
    const response = await axiosInstance.get('/api/shops/types/');
    console.log('Shop types response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shop types:', error);
    throw error;
  }
};

export const getShopConcepts = async (): Promise<ShopConcept[]> => {
  try {
    const response = await axiosInstance.get('/api/shops/concepts/');
    return response.data;
  } catch (error) {
    console.error('Error fetching shop concepts:', error);
    throw error;
  }
};

export const getShopLayouts = async (): Promise<ShopLayout[]> => {
  try {
    const response = await axiosInstance.get('/api/shops/layouts/');
    return response.data;
  } catch (error) {
    console.error('Error fetching shop layouts:', error);
    throw error;
  }
};

export const createShop = async (shopData: ShopFormData): Promise<Shop> => {
  try {
    const formData = new FormData();
    Object.entries(shopData).forEach(([key, value]) => {
      if (key === 'address' && typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([addressKey, addressValue]) => {
          if (typeof addressValue === 'string') {
            formData.append(`address.${addressKey}`, addressValue);
          }
        });
      } else if (key === 'icon_image' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'opening_hours') {
        formData.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        value.forEach(item => formData.append(`${key}[]`, item.toString()));
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString());
      }
    });

    console.log('Sending shop data:', Object.fromEntries(formData));

    const response = await axiosInstance.post('/api/shops/shops/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
    }
    console.error('Error creating shop:', error);
    throw error;
  }
};

export const uploadShopPhoto = async (shopId: number, photo: File, caption: string): Promise<ShopPhoto> => {
  const formData = new FormData();
  formData.append('image', photo);
  formData.append('caption', caption);
  formData.append('shop', shopId.toString());

  const response = await axios.post(`${API_URL}/api/shops/photos/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getShops = async (): Promise<Shop[]> => {
  try {
    const response = await axiosInstance.get('/api/shops/shops/');
    return response.data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};

export const getAddressFromPostalCode = async (postalCode: string): Promise<Partial<Address>> => {
  try {
    const response = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
    const data = response.data;

    if (data.results) {
      const result = data.results[0];
      return {
        prefecture: result.address1,
        city: result.address2,
        town: result.address3,
        // district, street_address, buildingは API から取得できないので、
        // ユーザーに入力してもらう必要があります
        district: '',
        street_address: '',
        building: '',
      };
    } else {
      throw new Error('郵便番号に該当する住所が見つかりませんでした。');
    }
  } catch (error) {
    console.error('郵便番号から住所を取得中にエラーが発生しました:', error);
    throw error;
  }
};