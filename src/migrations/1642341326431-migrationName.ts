import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationName1642341326431 implements MigrationInterface {
    name = 'migrationName1642341326431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" uuid, "boardId" uuid, "columnId" uuid, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "column_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_45a473cb99131da825f25086ffb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_9a1a7d507e2e23cc5af2a3e5d7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_2621bebd84d2624da37a34797fc" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_ab0e8bfc5d1eec5eab1f616d4e0" FOREIGN KEY ("boardId") REFERENCES "board_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_entity" ADD CONSTRAINT "FK_3e374a9be88948b63c7a14accd0" FOREIGN KEY ("columnId") REFERENCES "column_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "column_entity" ADD CONSTRAINT "FK_5155495cc40a64f56666ccebf04" FOREIGN KEY ("boardId") REFERENCES "board_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column_entity" DROP CONSTRAINT "FK_5155495cc40a64f56666ccebf04"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_3e374a9be88948b63c7a14accd0"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_ab0e8bfc5d1eec5eab1f616d4e0"`);
        await queryRunner.query(`ALTER TABLE "task_entity" DROP CONSTRAINT "FK_2621bebd84d2624da37a34797fc"`);
        await queryRunner.query(`DROP TABLE "board_entity"`);
        await queryRunner.query(`DROP TABLE "column_entity"`);
        await queryRunner.query(`DROP TABLE "task_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}