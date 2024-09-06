import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31725621958538 implements MigrationInterface {
    name = 'Migration31725621958538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" RENAME COLUMN "token" TO "code"`);
        await queryRunner.query(`ALTER TABLE "token" RENAME CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" TO "UQ_4cc689510c7555354706bb37d19"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" RENAME CONSTRAINT "UQ_4cc689510c7555354706bb37d19" TO "UQ_d9959ee7e17e2293893444ea371"`);
        await queryRunner.query(`ALTER TABLE "token" RENAME COLUMN "code" TO "token"`);
    }

}
