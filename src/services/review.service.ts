import { IReviewRepository } from "../interfaces/review.interface";

class ReviewService {
  private reviewRepository: IReviewRepository;
  constructor(_reviewRepository: IReviewRepository) {
    this.reviewRepository = _reviewRepository;
  }
}
export default ReviewService;
