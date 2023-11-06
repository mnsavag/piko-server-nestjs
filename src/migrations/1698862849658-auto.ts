import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1698862849658 implements MigrationInterface {
    name = 'Auto1698862849658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "mail" character varying, "password" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7395ecde6cda2e7fe90253ec59f" UNIQUE ("mail"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contest" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" character varying(250) NOT NULL, "previewFirst" character varying NOT NULL, "previewSecond" character varying NOT NULL, "options" jsonb NOT NULL, "amountOptions" integer NOT NULL, "countPassed" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "canBePublished" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_ba048331bed7d939b857e9c1c63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contest_categories_category" ("contestId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_211f653efa81d3704b2b14cf1e1" PRIMARY KEY ("contestId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ddad91c508a2862c096b212c2d" ON "contest_categories_category" ("contestId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e5caa5dfb26cc24df2d98984b" ON "contest_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "contest_users_liked_user" ("contestId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_19c62abbec24f20d441e84733df" PRIMARY KEY ("contestId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c2e0924374e801c969d566b040" ON "contest_users_liked_user" ("contestId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6e2a0bbb453bb357e8f0f129d" ON "contest_users_liked_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "contest_users_passed_user" ("contestId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0efaf1865f6932cf9baca598723" PRIMARY KEY ("contestId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d27374dc25dc2f448340a8ec87" ON "contest_users_passed_user" ("contestId") `);
        await queryRunner.query(`CREATE INDEX "IDX_14fec7ed62c1121391cfff8e5d" ON "contest_users_passed_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "contest" ADD CONSTRAINT "FK_37e1772990b3c3bfe60fa9428be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contest_categories_category" ADD CONSTRAINT "FK_ddad91c508a2862c096b212c2de" FOREIGN KEY ("contestId") REFERENCES "contest"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contest_categories_category" ADD CONSTRAINT "FK_3e5caa5dfb26cc24df2d98984b7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contest_users_liked_user" ADD CONSTRAINT "FK_c2e0924374e801c969d566b0402" FOREIGN KEY ("contestId") REFERENCES "contest"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contest_users_liked_user" ADD CONSTRAINT "FK_f6e2a0bbb453bb357e8f0f129d9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contest_users_passed_user" ADD CONSTRAINT "FK_d27374dc25dc2f448340a8ec879" FOREIGN KEY ("contestId") REFERENCES "contest"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contest_users_passed_user" ADD CONSTRAINT "FK_14fec7ed62c1121391cfff8e5d4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contest_users_passed_user" DROP CONSTRAINT "FK_14fec7ed62c1121391cfff8e5d4"`);
        await queryRunner.query(`ALTER TABLE "contest_users_passed_user" DROP CONSTRAINT "FK_d27374dc25dc2f448340a8ec879"`);
        await queryRunner.query(`ALTER TABLE "contest_users_liked_user" DROP CONSTRAINT "FK_f6e2a0bbb453bb357e8f0f129d9"`);
        await queryRunner.query(`ALTER TABLE "contest_users_liked_user" DROP CONSTRAINT "FK_c2e0924374e801c969d566b0402"`);
        await queryRunner.query(`ALTER TABLE "contest_categories_category" DROP CONSTRAINT "FK_3e5caa5dfb26cc24df2d98984b7"`);
        await queryRunner.query(`ALTER TABLE "contest_categories_category" DROP CONSTRAINT "FK_ddad91c508a2862c096b212c2de"`);
        await queryRunner.query(`ALTER TABLE "contest" DROP CONSTRAINT "FK_37e1772990b3c3bfe60fa9428be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14fec7ed62c1121391cfff8e5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d27374dc25dc2f448340a8ec87"`);
        await queryRunner.query(`DROP TABLE "contest_users_passed_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6e2a0bbb453bb357e8f0f129d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2e0924374e801c969d566b040"`);
        await queryRunner.query(`DROP TABLE "contest_users_liked_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e5caa5dfb26cc24df2d98984b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ddad91c508a2862c096b212c2d"`);
        await queryRunner.query(`DROP TABLE "contest_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "contest"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
