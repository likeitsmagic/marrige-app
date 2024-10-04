import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUserData1728079159475 implements MigrationInterface {
    name = 'NewUserData1728079159475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "externalId" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarUrl" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`CREATE TYPE "public"."users_authprovider_enum" AS ENUM('email', 'yandex')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "authProvider" "public"."users_authprovider_enum" NOT NULL DEFAULT 'email'`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "location" TYPE geometry`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "authProvider"`);
        await queryRunner.query(`DROP TYPE "public"."users_authprovider_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "externalId"`);
    }

}
