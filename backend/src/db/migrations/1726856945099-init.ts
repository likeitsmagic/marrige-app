import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1726856945099 implements MigrationInterface {
    name = 'Init1726856945099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
    }

}
