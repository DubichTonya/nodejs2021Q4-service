import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1642533317599 implements MigrationInterface {
    name = 'migrationName1642533317599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "name" SET NOT NULL`);
    }

}
