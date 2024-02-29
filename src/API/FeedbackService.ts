import makeRequest from '@/API/makeRequest';

class FeedbackService {
  createFeedBack(data: FormData | object) {
    return makeRequest<void>({
      url: 'api/orders/',
      method: 'post',
      data: data,
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