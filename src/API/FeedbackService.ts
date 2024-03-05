import makeRequest from '@/API/makeRequest';
import {RequestCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {getCookies} from "undici-types";
// @ts-ignore
import Cookies from 'cookies'
class FeedbackService {
  createFeedBack(data: FormData | object) {
    return makeRequest<void>({
      url: 'api/orders/',
      method: 'post',
      data: data,
      headers: {
        'X-CSRFToken':Cookies.get('csrftoken')
      }
    });
  }

  createFeedBackEmployee(data: FormData) {
    return makeRequest<void>({
      url: 'api/nurses/',
      method: 'post',
      data: data,
    });
  }

}

export default new FeedbackService();