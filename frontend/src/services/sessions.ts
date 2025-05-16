/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api";
import { ISession, IMeta, ICreateSession, PaymentFee } from "@/types";
import React from "react";
import toast from "react-hot-toast";

export const createSession = async ({
  sessionData,
  setLoading,
}: {
  sessionData: ICreateSession;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const url = "/session/entry";
    await api.post(url, { ...sessionData });
    toast.success("Parking Session created successfully");
  } catch (error: any) {
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error login you in");
  } finally {
    setLoading(false);
  }
};
export const getSessions = async ({
  page,
  limit,
  setLoading,
  setMeta,
  setSessions,
  searchKey,
}: {
  page: number;
  limit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  setSessions: React.Dispatch<React.SetStateAction<ISession[]>>;
  searchKey: string;
}) => {
  try {
    let url = `/session/all?page=${page}&limit=${limit}`;
    if (searchKey) url += `&searchKey=${searchKey}`;
    const response = await api.get(url);
    setSessions(response.data.data.sessions);
    setMeta(response.data.data.meta);
  } catch (error: any) {
    if (error.response.data.status === 401)
      return window.location.replace("/auth/login");
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error getting parking sessions");
  } finally {
    setLoading(false);
  }
};

export const getUserSessions = async ({
  page,
  limit,
  setLoading,
  setMeta,
  setSessions,
  searchKey,
}: {
  page: number;
  limit: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  setSessions: React.Dispatch<React.SetStateAction<ISession[]>>;
  searchKey: string;
}) => {
  try {
    let url = `/session/user/all?page=${page}&limit=${limit}`;
    if (searchKey) url += `&searchKey=${searchKey}`;
    const response = await api.get(url);
    setSessions(response.data.data.sessions);
    setMeta(response.data.data.meta);
  } catch (error: any) {
    if (error.response.data.status === 401)
      return window.location.replace("/auth/login");
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error getting parking sessions");
  } finally {
    setLoading(false);
  }
};

export const getPaymentFee = async ({
  sessionId,
  setLoading,
  setFeeDetails,
  setFeeModalOpen,
  setMeta,
}: {
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  sessionId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFeeDetails: React.Dispatch<React.SetStateAction<PaymentFee | null>>;
  setFeeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const url = `/session/${sessionId}/fee`;
    const response = await api.get(url);
    setFeeDetails(response.data.data);
    setMeta(response.data.data.meta);
  } catch (error: any) {
    if (error.response.data.status === 401)
      return window.location.replace("/auth/login");
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error getting parking sessions");
  } finally {
    setLoading(false);
    setFeeModalOpen(true);
  }
};

export const getSessionDetails = async ({
  sessionId,
  setLoading,
  setSessionDetails,
  setSessionModalOpen,
  setMeta,
}: {
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  sessionId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionDetails: React.Dispatch<React.SetStateAction<ISession>>;
  setSessionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const url = `/session/${sessionId}`;
    const response = await api.get(url);
    setSessionDetails(response.data.data.session);
    setMeta(response.data.data.meta);
  } catch (error: any) {
    if (error.response.data.status === 401)
      return window.location.replace("/auth/login");
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error getting parking sessions");
  } finally {
    setLoading(false);
    setSessionModalOpen(true);
  }
};

export const exitSession = async ({
  sessionId,
  setLoading,
  setSessionModalOpen,
  setMeta,
}: {
  setMeta: React.Dispatch<React.SetStateAction<IMeta>>;
  sessionId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    const url = `/session/${sessionId}/exit`;
    const response = await api.patch(url);
    setMeta(response.data.data?.meta);
    toast.success(response.data.message);
  } catch (error: any) {
    if (error.response.data.status === 401)
      return window.location.replace("/auth/login");
    error?.response?.data?.message
      ? toast.error(error.response.data.message)
      : toast.error("Error getting parking sessions");
  } finally {
    setLoading(false);
    setSessionModalOpen(false);
  }
};
