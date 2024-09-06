import { Request, Response } from "express";
import ReviewService from "../services/review.service";

class ReviewController {
  private reviewService: ReviewService;
  constructor(_reviewService: ReviewService) {
    this.reviewService = _reviewService;
  }
  async getAllReviews(req: Request, res: Response) {}
  async createReview(req: Request, res: Response) {}
  async updateReview(req: Request, res: Response) {}
  async deleteReview(req: Request, res: Response) {}
}

export default ReviewController;
