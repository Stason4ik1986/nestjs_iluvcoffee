import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1647525701198 implements MigrationInterface {
    name = 'SchemaSync1647525701198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }

}
