import { MigrationInterface, QueryRunner } from "typeorm";

export class CampaignImage1727340080869 implements MigrationInterface {
    name = 'CampaignImage1727340080869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "previewImage" character varying`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "images" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "location" TYPE geometry`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "previewImage"`);
    }

}
