import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration41725706767391 implements MigrationInterface {
    name = 'Migration41725706767391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" ADD CONSTRAINT "UQ_4e1924aa31055bed085a00a60b5" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "starRating" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "amenities"`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "amenities" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "amenities"`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD "amenities" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "starRating" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP CONSTRAINT "UQ_4e1924aa31055bed085a00a60b5"`);
    }

}
