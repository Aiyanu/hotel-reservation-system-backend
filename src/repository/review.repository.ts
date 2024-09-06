import {
  IFindReviewQuery,
  IReview,
  IReviewCreationBody,
  IReviewRepository,
} from "../interfaces/review.interface";
import { Review } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class ReviewRepository implements IReviewRepository {
  private reviewRepository: Repository<Review>;

  constructor() {
    this.reviewRepository = AppDataSource.getRepository(Review);
  }

  async fetchOne(query: IFindReviewQuery): Promise<IReview | null> {
    const review = await this.reviewRepository.findOne(query);
    return review;
  }
  async fetchAll(query: IFindReviewQuery): Promise<IReview[] | null> {
    const reviews = await this.reviewRepository.find(query);
    return reviews;
  }
  async create(record: IReviewCreationBody): Promise<IReview> {
    const review = this.reviewRepository.create(record);
    await this.reviewRepository.save(review);
    return review;
  }
  async updateOne(
    searchBy: IFindReviewQuery,
    data: Partial<IReview>
  ): Promise<void> {
    await this.reviewRepository.update(
      searchBy as FindOptionsWhere<Review>,
      data
    );
  }
  async deleteOne(searchBy: IFindReviewQuery): Promise<void> {
    await this.reviewRepository.delete(searchBy as FindOptionsWhere<Review>);
  }
}

export default ReviewRepository;
