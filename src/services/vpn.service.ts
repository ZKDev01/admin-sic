import { axiosInstance } from 'src/boot/axios';
import { API_ESOURECES } from './api_resources';

export interface VpnStatus {
  hasVPN: boolean;
  enableVPN: boolean;
}

export const VpnService = {
  getStatus: async function(ci: string) {
    return await axiosInstance.get<VpnStatus>(API_ESOURECES.VPN_STATUS, {
      params: { ci }
    });
  },

  enableVPN: async function(ci: string) {
    return await axiosInstance.post(
      API_ESOURECES.VPN_CREATE,
      {},
      { params: { ci } }
    );
  },
  disableVPN: async function(ci: string) {
    return await axiosInstance.post(
      API_ESOURECES.VPN_DISABLE,
      {},
      { params: { ci } }
    );
  },
  createVPN: async function(ci: string) {
    return await axiosInstance.post(
      API_ESOURECES.VPN_CREATE,
      {},
      { params: { ci } }
    );
  },
  deleteVPN: async function(ci: string) {
    return await axiosInstance.post(
      API_ESOURECES.VPN_DELETE,
      {},
      { params: { ci } }
    );
  }
};
