import { MigrationInterface, QueryRunner } from "typeorm";

export class Campaigns1726852321441 implements MigrationInterface {
    name = 'Campaigns1726852321441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_permissions_enum" AS ENUM('super_admin', 'business', 'write_advantages')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "confirmedAt" TIMESTAMP, "permissions" "public"."users_permissions_enum" array NOT NULL, "isBanned" boolean NOT NULL DEFAULT false, "banReason" text, "bannedAt" TIMESTAMP, "phone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."localized_texts_locale_enum" AS ENUM('en', 'ru', 'fr')`);
        await queryRunner.query(`CREATE TABLE "localized_texts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "locale" "public"."localized_texts_locale_enum" NOT NULL, "entityType" character varying NOT NULL, "entityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cd6e52b7493bfaa35ec5d078eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4c270053362b334589d5025852" ON "localized_texts" ("entityType", "entityId", "locale") `);
        await queryRunner.query(`CREATE TABLE "regions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" geometry NOT NULL, "entityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."advantages_advantagetype_enum" AS ENUM('test')`);
        await queryRunner.query(`CREATE TABLE "advantages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "advantageType" "public"."advantages_advantagetype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3b41f5da17be4578843e9482ff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" uuid NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "regionId" uuid NOT NULL, "isReady" boolean NOT NULL DEFAULT false, "rating" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_90d64375279aec38e309f12ff78" UNIQUE ("ownerId"), CONSTRAINT "REL_5b5668bb449a1e4d7c4d4aa943" UNIQUE ("regionId"), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaign_advantages" ("campaignId" uuid NOT NULL, "advantageId" uuid NOT NULL, CONSTRAINT "PK_c7110564e5693a3defd1695ff80" PRIMARY KEY ("campaignId", "advantageId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f8e034e638846a576fe458512" ON "campaign_advantages" ("campaignId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6363044352faa5f66f5ca2b438" ON "campaign_advantages" ("advantageId") `);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_5b5668bb449a1e4d7c4d4aa9432" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign_advantages" ADD CONSTRAINT "FK_7f8e034e638846a576fe458512d" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "campaign_advantages" ADD CONSTRAINT "FK_6363044352faa5f66f5ca2b4389" FOREIGN KEY ("advantageId") REFERENCES "advantages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign_advantages" DROP CONSTRAINT "FK_6363044352faa5f66f5ca2b4389"`);
        await queryRunner.query(`ALTER TABLE "campaign_advantages" DROP CONSTRAINT "FK_7f8e034e638846a576fe458512d"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_5b5668bb449a1e4d7c4d4aa9432"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6363044352faa5f66f5ca2b438"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f8e034e638846a576fe458512"`);
        await queryRunner.query(`DROP TABLE "campaign_advantages"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "advantages"`);
        await queryRunner.query(`DROP TYPE "public"."advantages_advantagetype_enum"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c270053362b334589d5025852"`);
        await queryRunner.query(`DROP TABLE "localized_texts"`);
        await queryRunner.query(`DROP TYPE "public"."localized_texts_locale_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_permissions_enum"`);
    }

}
