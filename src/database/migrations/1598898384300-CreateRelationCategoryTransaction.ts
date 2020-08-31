import {MigrationInterface, QueryRunner , TableForeignKey, TableColumn} from "typeorm";

export default class CreateRelationCategoryTransaction1598898384300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('transactions', new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true

      }))
      await queryRunner.createForeignKey('transactions', new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'


      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'TransactionCategory')
        await queryRunner.dropColumn('transactions', 'category_id')
    }


}
