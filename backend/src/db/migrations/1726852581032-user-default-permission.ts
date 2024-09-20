import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDefaultPermission1726852581032 implements MigrationInterface {
    name = 'UserDefaultPermission1726852581032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regions" ALTER COLUMN "location" TYPE geometry`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "regions" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
    }

}
