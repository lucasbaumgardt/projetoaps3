import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class DateColumns {
  @CreateDateColumn({ name: "_created", select: false })
  created: Date;

  @UpdateDateColumn({ name: "_updated", select: false })
  updated: Date;

  @DeleteDateColumn({ name: "_deleted", select: false })
  deleted: Date;
}
