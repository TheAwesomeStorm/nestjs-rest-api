import { Migration } from '@mikro-orm/migrations';

export class Migration20221119131858 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `users` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `users`;');
  }
}
