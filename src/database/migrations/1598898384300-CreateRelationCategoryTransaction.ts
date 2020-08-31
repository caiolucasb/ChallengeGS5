import {MigrationInterface, QueryRunner , TableForeignKey} from "typeorm";

export default class CreateRelationCategoryTransaction1598898384300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey('transactions', new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',


      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'TransactionCategory')
    }


}
