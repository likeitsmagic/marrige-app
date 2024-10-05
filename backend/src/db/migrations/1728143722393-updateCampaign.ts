import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCampaign1728143722393 implements MigrationInterface {
  name = 'UpdateCampaign1728143722393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."social_media_platform_enum" AS ENUM('site', 'vk', 'telegram')`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "campaignId" uuid NOT NULL, "platform" "public"."social_media_platform_enum" NOT NULL, "link" character varying NOT NULL, CONSTRAINT "UQ_3a712c9aad6a53d4c46fd4a734c" UNIQUE ("campaignId"), CONSTRAINT "PK_54ac0fd97432069e7c9ab567f8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "isReady"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "rating"`);
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP COLUMN "previewImage"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaigns_type_enum" AS ENUM('NONE', 'Photographer', 'Videographer', 'Caterer', 'Florist', 'DJ', 'Band', 'WeddingPlanner', 'Venue', 'Baker', 'MakeupArtist', 'HairStylist', 'Officiant', 'Transportation', 'Decorator', 'BridalShop')`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "type" "public"."campaigns_type_enum" NOT NULL DEFAULT 'NONE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "description" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "address" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."campaigns_status_enum" AS ENUM('ACTIVE', 'READY', 'MODERATION', 'REJECTED', 'DRAFT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "status" "public"."campaigns_status_enum" NOT NULL DEFAULT 'DRAFT'`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "minPrice" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "maxPrice" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "location" TYPE geometry`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ALTER COLUMN "phone" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_media" ADD CONSTRAINT "FK_3a712c9aad6a53d4c46fd4a734c" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "social_media" DROP CONSTRAINT "FK_3a712c9aad6a53d4c46fd4a734c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ALTER COLUMN "phone" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`,
    );
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "maxPrice"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "minPrice"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."campaigns_status_enum"`);
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."campaigns_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "previewImage" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "rating" double precision NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD "isReady" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`DROP TABLE "social_media"`);
    await queryRunner.query(`DROP TYPE "public"."social_media_platform_enum"`);
  }
}
